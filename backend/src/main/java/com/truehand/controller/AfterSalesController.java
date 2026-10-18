package com.truehand.controller;

import com.truehand.repository.OrderRepository;
import com.truehand.security.AccessPolicy;
import com.truehand.service.MarketplaceFeatureService;
import com.truehand.service.OrderEventService;
import java.math.BigDecimal;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AfterSalesController {

    private final MarketplaceFeatureService features;
    private final AccessPolicy access;
    private final JdbcTemplate jdbc;
    private final OrderRepository orders;
    private final OrderEventService events;

    private void seller() {
        if (
            !Set.of("SELLER", "ADMIN").contains(access.currentUser().getRole())
        ) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Seller access required");
    }

    @GetMapping("/admin/tax-documents")
    public Object taxAdmin() {
        features.admin();
        return features.query(
            "select t.*,o.order_number from tax_documents t join orders o on o.id=t.order_id order by t.id desc limit 200"
        );
    }

    @GetMapping("/seller/tax-documents")
    public Object taxSeller() {
        seller();
        return features.query(
            "select t.*,o.order_number from tax_documents t join orders o on o.id=t.order_id where t.seller_id=? order by t.id desc limit 200",
            features.userId()
        );
    }

    @GetMapping("/seller/invoice-orders")
    public Object invoiceOrders() {
        seller();
        return features.query(
            "select o.id,o.order_number,sum(oi.seller_net_amount+oi.commission_amount) as paid_amount from orders o join order_items oi on oi.order_id=o.id where oi.seller_id_snapshot=? and o.payment_status in ('PAID','REFUND_PENDING','REFUNDED') group by o.id order by o.id desc limit 200",
            features.userId()
        );
    }

    @GetMapping("/orders/{id}/tax-documents")
    public Object taxOrder(@PathVariable Integer id) {
        if (!access.ownsOrder(id)) throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "Access denied"
        );
        return features.query(
            "select t.id,t.invoice_number,t.invoice_date,t.supplier_gstin,t.taxable_amount,t.igst,t.cgst,t.sgst,t.total_amount,t.document_url from tax_documents t where order_id=? order by id",
            id
        );
    }

    private BigDecimal nonnegative(Map<String, Object> body, String key) {
        try {
            var value = new BigDecimal(String.valueOf(body.get(key)));
            if (
                value.signum() < 0 || value.scale() > 2 || value.precision() > 15
            ) throw new ArithmeticException();
            return value.setScale(2);
        } catch (Exception failure) {
            throw new IllegalArgumentException("Valid " + key + " in INR is required");
        }
    }

    @PostMapping("/seller/tax-documents")
    @Transactional
    public Object tax(@RequestBody Map<String, Object> body) {
        seller();
        int seller = features.userId(),
            orderId = features.integer(body, "orderId");
        var order = orders
            .findByIdForUpdate(orderId)
            .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (
            !Set.of("PAID", "REFUND_PENDING", "REFUNDED").contains(order.getPaymentStatus())
        ) throw new IllegalArgumentException("An invoice requires an actual verified payment");
        var gross = jdbc.queryForObject(
            "select sum(seller_net_amount+commission_amount) from order_items where order_id=? and seller_id_snapshot=?",
            BigDecimal.class,
            orderId,
            seller
        );
        if (gross == null || gross.signum() <= 0) throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "This order has no financially reconciled items from your store"
        );
        BigDecimal taxable = nonnegative(body, "taxableAmount"),
            igst = nonnegative(body, "igst"),
            cgst = nonnegative(body, "cgst"),
            sgst = nonnegative(body, "sgst");
        if (
            taxable.add(igst).add(cgst).add(sgst).compareTo(gross) != 0 ||
            (igst.signum() > 0 && (cgst.signum() > 0 || sgst.signum() > 0))
        ) throw new IllegalArgumentException(
            "Invoice amounts must equal your paid order value and use one tax split"
        );
        String gst = features.text(body, "supplierGstin", 15).toUpperCase(Locale.ROOT);
        if (
            !gst.matches("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]")
        ) throw new IllegalArgumentException(
            "Enter the supplier GST registration on the issued invoice"
        );
        var registered = jdbc.queryForList(
            "select gst_number from seller_profiles where user_id=?",
            String.class,
            seller
        );
        if (
            registered.isEmpty() || !gst.equals(registered.get(0))
        ) throw new IllegalArgumentException(
            "Invoice GST registration must match your stored business registration"
        );
        java.time.LocalDate date;
        try {
            date = java.time.LocalDate.parse(features.text(body, "invoiceDate", 10));
            if (
                date.isAfter(java.time.LocalDate.now(java.time.ZoneOffset.UTC))
            ) throw new IllegalArgumentException();
        } catch (Exception failure) {
            throw new IllegalArgumentException("An actual invoice date is required");
        }
        var row = features.one(
            "insert into tax_documents(order_id,seller_id,invoice_number,invoice_date,supplier_gstin,taxable_amount,igst,cgst,sgst,total_amount,document_url,recorded_by) values(?,?,?,?,?,?,?,?,?,?,?,?) returning *",
            orderId,
            seller,
            features.text(body, "invoiceNumber", 100),
            date,
            gst,
            taxable,
            igst,
            cgst,
            sgst,
            gross,
            features.https(features.text(body, "documentUrl", 2000)),
            features.userId()
        );
        features.audit("REGISTER", "TAX_DOCUMENT", row.get("id"), Map.of("orderId", orderId));
        return row;
    }

    @GetMapping("/seller/return-items")
    public Object returnItems() {
        seller();
        var user = access.currentUser();
        return features.query(
            "select oi.id,oi.order_id,o.order_number,oi.product_name_snapshot as product_name,oi.variant_sku_snapshot as sku,oi.quantity,coalesce((select sum(r.quantity) from return_receipts r where r.order_item_id=oi.id),0) as received_quantity from order_items oi join orders o on o.id=oi.order_id where o.status in ('RETURN_REQUESTED','RETURNED') and oi.quantity>oi.cancelled_before_shipment_quantity and (?='ADMIN' or oi.seller_id_snapshot=?) order by oi.id desc limit 200",
            user.getRole(),
            user.getId()
        );
    }

    @GetMapping("/seller/return-receipts")
    public Object receipts() {
        seller();
        var user = access.currentUser();
        return features.query(
            "select r.*,oi.product_name_snapshot as product_name,o.order_number from return_receipts r join order_items oi on oi.id=r.order_item_id join orders o on o.id=oi.order_id where (?='ADMIN' or oi.seller_id_snapshot=?) order by r.id desc limit 200",
            user.getRole(),
            user.getId()
        );
    }

    @PostMapping("/seller/return-receipts")
    @Transactional
    public Object receive(@RequestBody Map<String, Object> body) {
        seller();
        int itemId = features.integer(body, "orderItemId");
        var line = features.one(
            "select order_id,seller_id_snapshot from order_items where id=?",
            itemId
        );
        int orderId = (Integer) line.get("orderId");
        var order = orders.findByIdForUpdate(orderId).orElseThrow();
        if (
            !"ADMIN".equals(access.currentUser().getRole()) &&
            !features.userId().equals(line.get("sellerIdSnapshot"))
        ) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        if (
            !Set.of("RETURN_REQUESTED", "RETURNED").contains(order.getStatus())
        ) throw new IllegalArgumentException(
            "Customer return must be requested before physical receipt"
        );
        String reference = features.text(body, "receiptReference", 100),
            disposition = features.text(body, "disposition", 20);
        if (
            !Set.of("RESTOCKED", "DAMAGED", "QUARANTINED").contains(disposition)
        ) throw new IllegalArgumentException("Select a return disposition");
        int quantity = features.integer(body, "quantity");
        String notes = features.text(body, "conditionNotes", 2000);
        String image =
            body.get("imageUrl") instanceof String value && !value.isBlank()
                ? features.https(value)
                : null;
        var prior = features.query(
            "select * from return_receipts where order_item_id=? and receipt_reference=?",
            itemId,
            reference
        );
        if (!prior.isEmpty()) {
            var row = prior.get(0);
            if (
                !Integer.valueOf(quantity).equals(row.get("quantity")) ||
                !disposition.equals(row.get("disposition")) ||
                !notes.equals(row.get("conditionNotes")) ||
                !java.util.Objects.equals(image, row.get("imageUrl"))
            ) throw new IllegalArgumentException(
                "Receipt reference belongs to different return details"
            );
            return row;
        }
        var item = order
            .getOrderItems()
            .stream()
            .filter(value -> value.getId().equals(itemId))
            .findFirst()
            .orElseThrow();
        long already = jdbc.queryForObject(
            "select coalesce(sum(quantity),0) from return_receipts where order_item_id=?",
            Long.class,
            itemId
        );
        int cancelled = jdbc.queryForObject(
            "select cancelled_before_shipment_quantity from order_items where id=?",
            Integer.class,
            itemId
        );
        if (quantity > item.getQuantity() - cancelled - already) throw new IllegalArgumentException(
            "Return quantity exceeds the remaining shipped purchased quantity"
        );
        var receipt = features.one(
            "insert into return_receipts(order_item_id,quantity,disposition,receipt_reference,condition_notes,image_url,received_by) values(?,?,?,?,?,?,?) returning *",
            itemId,
            quantity,
            disposition,
            reference,
            notes,
            image,
            features.userId()
        );
        if ("RESTOCKED".equals(disposition)) {
            if (item.getVariant() == null) jdbc.update(
                "update products set stock_quantity=stock_quantity+? where id=?",
                quantity,
                item.getProduct().getId()
            );
            else jdbc.update(
                "update product_variants set stock_quantity=stock_quantity+? where id=?",
                quantity,
                item.getVariant().getId()
            );
        }
        boolean complete = Boolean.TRUE.equals(
            jdbc.queryForObject(
                "select not exists(select 1 from order_items oi where oi.order_id=? and oi.quantity-oi.cancelled_before_shipment_quantity>coalesce((select sum(r.quantity) from return_receipts r where r.order_item_id=oi.id),0))",
                Boolean.class,
                orderId
            )
        );
        if (complete) {
            order.setStatus("RETURNED");
            orders.save(order);
        }
        events.record(
            orderId,
            "return-receipt:" + receipt.get("id"),
            order.getStatus(),
            "Physical return received: " + quantity + " item(s), disposition " + disposition + "."
        );
        features.audit(
            "RECEIVE",
            "RETURN_RECEIPT",
            receipt.get("id"),
            Map.of("orderId", orderId, "quantity", quantity, "disposition", disposition)
        );
        return receipt;
    }
}
