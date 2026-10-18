package com.truehand.service;

import com.truehand.model.Order;
import com.truehand.repository.OrderItemRepository;
import com.truehand.repository.OrderRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Moves paid order funds into the seller settlement and payout lifecycle. */
@Service
@Transactional
@RequiredArgsConstructor
public class SettlementService {

    private final JdbcTemplate jdbc;
    private final OrderRepository orders;
    private final OrderItemRepository items;
    private final LedgerService ledger;
    private final WalletService wallets;

    public void capture(Order order) {
        BigDecimal gross = order
                .getOrderItems()
                .stream()
                .map(item ->
                    item.getPriceAtPurchase().multiply(BigDecimal.valueOf(item.getQuantity()))
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add),
            remaining = order.getTotalAmount();
        var lines = order.getOrderItems();
        boolean lineDiscounts =
            lines
                .stream()
                .map(line ->
                    line
                        .getPriceAtPurchase()
                        .multiply(BigDecimal.valueOf(line.getQuantity()))
                        .subtract(line.getDiscountAmount())
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .compareTo(order.getTotalAmount()) == 0;
        for (int i = 0; i < lines.size(); i++) {
            var line = lines.get(i);
            BigDecimal allocated = lineDiscounts
                ? line
                      .getPriceAtPurchase()
                      .multiply(BigDecimal.valueOf(line.getQuantity()))
                      .subtract(line.getDiscountAmount())
                : i == lines.size() - 1
                  ? remaining
                  : order
                        .getTotalAmount()
                        .multiply(line.getPriceAtPurchase())
                        .multiply(BigDecimal.valueOf(line.getQuantity()))
                        .divide(gross, 2, RoundingMode.DOWN);
            remaining = remaining.subtract(allocated);
            Integer seller = line.getSellerIdSnapshot();
            if (seller == null && line.getProduct().getSeller() != null) {
                seller = line.getProduct().getSeller().getId();
                line.setSellerIdSnapshot(seller);
            }
            var category = line.getProduct().getCategory();
            List<BigDecimal> rates =
                category == null
                    ? List.of()
                    : jdbc.queryForList(
                          "select percentage from commission_rates where category_id=?",
                          BigDecimal.class,
                          category.getId()
                      );
            BigDecimal rate = rates.isEmpty() ? BigDecimal.ZERO : rates.get(0),
                commission =
                    seller == null
                        ? allocated
                        : allocated
                              .multiply(rate)
                              .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
            line.setCommissionAmount(commission);
            line.setSellerNetAmount(allocated.subtract(commission));
            items.save(line);
        }
        ledger.transfer(
            "payment:" + order.getId(),
            "Verified payment " + order.getOrderNumber(),
            "GATEWAY",
            "CUSTOMER_FUNDS",
            order.getTotalAmount()
        );
    }

    public void deliver(Integer orderId) {
        Order order = orders.findByIdForUpdate(orderId).orElseThrow();
        if (
            !"PAID".equals(order.getPaymentStatus()) || !"DELIVERED".equals(order.getStatus())
        ) throw new IllegalArgumentException("Settlement requires a paid, delivered order");
        if (
            Boolean.TRUE.equals(
                jdbc.queryForObject(
                    "select exists(select 1 from order_settlements where order_id=?)",
                    Boolean.class,
                    orderId
                )
            )
        ) return;
        if (
            order
                .getOrderItems()
                .stream()
                .anyMatch(line -> line.getSellerNetAmount() == null)
        ) throw new IllegalArgumentException(
            "This legacy order requires financial reconciliation before settlement"
        );
        Map<Integer, BigDecimal> credits = new TreeMap<>();
        for (var line : order.getOrderItems())
            if (
                line.getSellerIdSnapshot() != null && line.getSellerNetAmount().signum() > 0
            ) credits.merge(line.getSellerIdSnapshot(), line.getSellerNetAmount(), BigDecimal::add);
        List<LedgerService.Entry> entries = new ArrayList<>();
        entries.add(
            new LedgerService.Entry("CUSTOMER_FUNDS", order.getTotalAmount(), BigDecimal.ZERO)
        );
        BigDecimal platform = order.getTotalAmount();
        for (var entry : credits.entrySet()) {
            Integer seller = entry.getKey();
            BigDecimal net = entry.getValue();
            platform = platform.subtract(net);
            var wallet = wallets.getWalletByUserId(seller);
            var debts = jdbc.queryForList(
                "select amount from seller_debts where user_id=? for update",
                BigDecimal.class,
                seller
            );
            BigDecimal repayment = debts.isEmpty() ? BigDecimal.ZERO : debts.get(0).min(net);
            if (repayment.signum() > 0) {
                jdbc.update(
                    "update seller_debts set amount=amount-?,updated_at=now() at time zone 'UTC' where user_id=?",
                    repayment,
                    seller
                );
                entries.add(
                    new LedgerService.Entry(
                        "SELLER_RECEIVABLE:" + seller,
                        BigDecimal.ZERO,
                        repayment
                    )
                );
            }
            BigDecimal available = net.subtract(repayment);
            if (available.signum() > 0) {
                wallets.applyTransaction(
                    seller,
                    available,
                    "CREDIT",
                    "Delivered order " + order.getOrderNumber()
                );
                entries.add(
                    new LedgerService.Entry("WALLET:" + seller, BigDecimal.ZERO, available)
                );
            }
        }
        if (platform.signum() > 0) entries.add(
            new LedgerService.Entry("COMMISSION_REVENUE", BigDecimal.ZERO, platform)
        );
        Long journal = ledger.post(
            "settlement:" + orderId,
            "Delivered order settlement " + order.getOrderNumber(),
            entries
        );
        jdbc.update(
            "insert into order_settlements(order_id,journal_id) values(?,?)",
            orderId,
            journal
        );
        jdbc.update(
            "update order_fulfillments set status='DELIVERED' where order_id=? and status='SHIPPED'",
            orderId
        );
    }

    public void refund(Order order) {
        boolean settled = Boolean.TRUE.equals(
            jdbc.queryForObject(
                "select exists(select 1 from order_settlements where order_id=?)",
                Boolean.class,
                order.getId()
            )
        );
        if (settled) {
            List<LedgerService.Entry> entries = new ArrayList<>();
            Map<Integer, BigDecimal> debits = new TreeMap<>();
            BigDecimal commission = order.getTotalAmount();
            for (var line : order.getOrderItems())
                if (line.getSellerIdSnapshot() != null) debits.merge(
                    line.getSellerIdSnapshot(),
                    line.getSellerNetAmount(),
                    BigDecimal::add
                );
            for (var entry : debits.entrySet()) {
                Integer seller = entry.getKey();
                BigDecimal net = entry.getValue();
                commission = commission.subtract(net);
                BigDecimal available = wallets.getWalletByUserId(seller).getBalance().min(net),
                    debt = net.subtract(available);
                if (available.signum() > 0) {
                    wallets.applyTransaction(
                        seller,
                        available,
                        "DEBIT",
                        "Refunded order " + order.getOrderNumber()
                    );
                    entries.add(
                        new LedgerService.Entry("WALLET:" + seller, available, BigDecimal.ZERO)
                    );
                }
                if (debt.signum() > 0) {
                    jdbc.update(
                        "insert into seller_debts(user_id,amount) values(?,?) on conflict(user_id) do update set amount=seller_debts.amount+excluded.amount,updated_at=now() at time zone 'UTC'",
                        seller,
                        debt
                    );
                    entries.add(
                        new LedgerService.Entry(
                            "SELLER_RECEIVABLE:" + seller,
                            debt,
                            BigDecimal.ZERO
                        )
                    );
                }
            }
            if (commission.signum() > 0) entries.add(
                new LedgerService.Entry("COMMISSION_REVENUE", commission, BigDecimal.ZERO)
            );
            entries.add(
                new LedgerService.Entry("CUSTOMER_FUNDS", BigDecimal.ZERO, order.getTotalAmount())
            );
            ledger.post(
                "refund-reversal:" + order.getId(),
                "Settlement reversal " + order.getOrderNumber(),
                entries
            );
        }
        ledger.transfer(
            "refund:" + order.getId(),
            "Verified refund " + order.getOrderNumber(),
            "CUSTOMER_FUNDS",
            "GATEWAY",
            order.getTotalAmount()
        );
    }
}
