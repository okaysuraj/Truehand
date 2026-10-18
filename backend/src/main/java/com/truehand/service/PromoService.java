package com.truehand.service;

import com.truehand.dto.OrderDTO;
import com.truehand.model.OrderItem;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.ProductVariantRepository;
import com.truehand.security.AccessPolicy;
import java.math.*;
import java.time.*;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/** Validates promotion eligibility and reserves usage within the checkout transaction. */
@Service
@Transactional
@RequiredArgsConstructor
public class PromoService {

    private final MarketplaceFeatureService features;
    private final AccessPolicy access;
    private final JdbcTemplate jdbc;
    private final ProductRepository products;
    private final ProductVariantRepository variants;
    private final CommercePolicyService policies;

    public record Quote(
        Integer promoId,
        String code,
        BigDecimal eligibleSubtotal,
        BigDecimal discountAmount
    ) {}

    public List<Map<String, Object>> list() {
        var user = access.currentUser();
        if ("ADMIN".equals(user.getRole())) return features.query(
            "select * from promo_codes order by id desc limit 200"
        );
        if ("SELLER".equals(user.getRole())) return features.query(
            "select * from promo_codes where seller_id=? order by id desc limit 200",
            user.getId()
        );
        return features.query(
            "select p.* from promo_codes p where p.is_active=true and p.valid_until>(now() at time zone 'UTC') and (p.valid_from is null or p.valid_from<=(now() at time zone 'UTC')) and (p.seller_id is null or exists(select 1 from users u where u.id=p.seller_id and u.is_active=true)) and (p.maximum_uses is null or p.maximum_uses>(select count(*) from promo_redemptions r where r.promo_id=p.id and r.status<>'CANCELED')) and (p.maximum_uses_per_customer is null or p.maximum_uses_per_customer>(select count(*) from promo_redemptions r where r.promo_id=p.id and r.user_id=? and r.status<>'CANCELED')) order by p.id desc limit 100",
            user.getId()
        );
    }

    private String code(String raw) {
        if (
            raw == null || !raw.trim().matches("[A-Za-z0-9_-]{3,50}")
        ) throw new IllegalArgumentException(
            "Use a code of 3 to 50 letters, digits, underscores or hyphens"
        );
        return raw.trim().toUpperCase(Locale.ROOT);
    }

    private BigDecimal amount(Map<String, Object> body, String key, boolean zero) {
        try {
            var value = new BigDecimal(String.valueOf(body.get(key)));
            if (
                value.signum() < (zero ? 0 : 1) || value.scale() > 2 || value.precision() > 15
            ) throw new ArithmeticException();
            return value.setScale(2);
        } catch (Exception failure) {
            throw new IllegalArgumentException("Valid " + key + " in INR is required");
        }
    }

    private LocalDateTime time(Map<String, Object> body, String key) {
        try {
            String value = features.text(body, key, 40);
            return value.endsWith("Z") || value.matches(".*[+-]\\d\\d:\\d\\d$")
                ? OffsetDateTime.parse(value)
                      .withOffsetSameInstant(ZoneOffset.UTC)
                      .toLocalDateTime()
                : LocalDateTime.parse(value);
        } catch (Exception failure) {
            throw new IllegalArgumentException("Valid " + key + " in UTC is required");
        }
    }

    public Object create(Map<String, Object> body) {
        var user = access.currentUser();
        if (!Set.of("SELLER", "ADMIN").contains(user.getRole())) throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "Seller access required"
        );
        BigDecimal percent = amount(body, "discountPercentage", false);
        if (percent.compareTo(new BigDecimal("100")) > 0) throw new IllegalArgumentException(
            "Discount percentage cannot exceed 100"
        );
        var start =
            body.get("validFrom") == null || "".equals(body.get("validFrom"))
                ? null
                : time(body, "validFrom");
        var end = time(body, "validUntil");
        if (
            !end.isAfter(LocalDateTime.now(ZoneOffset.UTC)) ||
            (start != null && !start.isBefore(end))
        ) throw new IllegalArgumentException("Provide a future expiration after the start time");
        Integer seller = "SELLER".equals(user.getRole()) ? user.getId() : null;
        var row = features.one(
            "insert into promo_codes(code,discount_percentage,max_discount_amount,valid_until,is_active,seller_id,minimum_subtotal,maximum_uses,maximum_uses_per_customer,valid_from) values(?,?,?,?,true,?,?,?,?,?) returning *",
            code(features.text(body, "code", 50)),
            percent,
            amount(body, "maxDiscountAmount", false),
            end,
            seller,
            amount(body, "minimumSubtotal", true),
            features.integer(body, "maximumUses"),
            features.integer(body, "maximumUsesPerCustomer"),
            start
        );
        features.audit("CREATE", "PROMO", row.get("id"), Map.of("code", row.get("code")));
        return row;
    }

    public Object deactivate(int id) {
        var user = access.currentUser();
        var row = features.one("select * from promo_codes where id=? for update", id);
        if (
            !"ADMIN".equals(user.getRole()) &&
            (!"SELLER".equals(user.getRole()) || !user.getId().equals(row.get("sellerId")))
        ) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        jdbc.update("update promo_codes set is_active=false where id=?", id);
        features.audit("DEACTIVATE", "PROMO", id, Map.of());
        return Map.of("message", "Promo code deactivated");
    }

    public Map<String, Object> validate(String raw) {
        var row = lookup(raw, false);
        eligible(row, access.currentUser().getId());
        return row;
    }

    private Map<String, Object> lookup(String raw, boolean lock) {
        return features
            .query(
                "select * from promo_codes where code=?" + (lock ? " for update" : ""),
                code(raw)
            )
            .stream()
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Invalid promo code"));
    }

    private void eligible(Map<String, Object> promo, int user) {
        var now = LocalDateTime.now(ZoneOffset.UTC);
        if (
            !Boolean.TRUE.equals(promo.get("isActive")) ||
            !((LocalDateTime) promo.get("validUntil")).isAfter(now) ||
            (promo.get("validFrom") instanceof LocalDateTime start && start.isAfter(now))
        ) throw new IllegalArgumentException(
            "Promo code is inactive or outside its validity period"
        );
        if (
            promo.get("sellerId") != null &&
            !Boolean.TRUE.equals(
                jdbc.queryForObject(
                    "select is_active from users where id=?",
                    Boolean.class,
                    promo.get("sellerId")
                )
            )
        ) throw new IllegalArgumentException("This seller offer is unavailable");
        long used = jdbc.queryForObject(
            "select count(*) from promo_redemptions where promo_id=? and status<>'CANCELED'",
            Long.class,
            promo.get("id")
        );
        long own = jdbc.queryForObject(
            "select count(*) from promo_redemptions where promo_id=? and user_id=? and status<>'CANCELED'",
            Long.class,
            promo.get("id"),
            user
        );
        if (
            promo.get("maximumUses") instanceof Number maximum && used >= maximum.longValue()
        ) throw new IllegalArgumentException("Promo code usage limit reached");
        if (
            promo.get("maximumUsesPerCustomer") instanceof Number maximum &&
            own >= maximum.longValue()
        ) throw new IllegalArgumentException(
            "Your usage limit for this promo code has been reached"
        );
    }

    public Quote apply(String raw, int user, List<OrderItem> lines, boolean reserve) {
        var promo = lookup(raw, reserve);
        eligible(promo, user);
        Integer seller = (Integer) promo.get("sellerId");
        var applicable = lines
            .stream()
            .filter(line -> seller == null || seller.equals(line.getSellerIdSnapshot()))
            .toList();
        BigDecimal subtotal = applicable
            .stream()
            .map(line -> line.getPriceAtPurchase().multiply(BigDecimal.valueOf(line.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        if (
            subtotal.signum() <= 0 ||
            subtotal.compareTo((BigDecimal) promo.get("minimumSubtotal")) < 0
        ) throw new IllegalArgumentException(
            "The eligible items do not meet this offer's minimum subtotal"
        );
        BigDecimal discount = subtotal
            .multiply((BigDecimal) promo.get("discountPercentage"))
            .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        if (promo.get("maxDiscountAmount") instanceof BigDecimal cap) discount = discount.min(cap);
        discount = discount.min(subtotal);
        if (discount.signum() <= 0) throw new IllegalArgumentException(
            "This offer does not discount these items"
        );
        // Allocate in integer paise: each seller bears only the discount on their eligible items.
        allocateDiscount(applicable, discount, subtotal);
        return new Quote((Integer) promo.get("id"), (String) promo.get("code"), subtotal, discount);
    }

    static void allocateDiscount(List<OrderItem> lines, BigDecimal discount, BigDecimal subtotal) {
        BigInteger total = discount.movePointRight(2).toBigIntegerExact(),
            grossTotal = subtotal.movePointRight(2).toBigIntegerExact();
        List<BigInteger[]> shares = new ArrayList<>();
        BigInteger allocated = BigInteger.ZERO;
        for (var line : lines) {
            BigInteger gross = line
                .getPriceAtPurchase()
                .multiply(BigDecimal.valueOf(line.getQuantity()))
                .movePointRight(2)
                .toBigIntegerExact();
            var part = total.multiply(gross).divideAndRemainder(grossTotal);
            shares.add(new BigInteger[] { part[0], part[1], gross });
            allocated = allocated.add(part[0]);
        }
        List<Integer> ranked = new ArrayList<>();
        for (int index = 0; index < lines.size(); index++) ranked.add(index);
        ranked.sort((first, second) -> shares.get(second)[1].compareTo(shares.get(first)[1]));
        int extra = total.subtract(allocated).intValueExact();
        for (int index : ranked) {
            if (extra == 0) break;
            var share = shares.get(index);
            if (share[0].compareTo(share[2]) < 0) {
                share[0] = share[0].add(BigInteger.ONE);
                extra--;
            }
        }
        if (extra != 0) throw new IllegalStateException("Discount allocation does not reconcile");
        for (int index = 0; index < lines.size(); index++) lines
            .get(index)
            .setDiscountAmount(new BigDecimal(shares.get(index)[0], 2));
    }

    public Quote quote(Map<String, Object> body) {
        if (
            !(body.get("orderItems") instanceof List<?> requests) ||
            requests.isEmpty() ||
            requests.size() > 100
        ) throw new IllegalArgumentException("Provide 1 to 100 order items");
        List<OrderItem> lines = new ArrayList<>();
        Set<String> seen = new HashSet<>();
        var now = LocalDateTime.now(ZoneOffset.UTC);
        for (Object raw : requests) {
            if (!(raw instanceof Map<?, ?> row)) throw new IllegalArgumentException(
                "Invalid order item"
            );
            Map<String, Object> item = new HashMap<>();
            row.forEach((key, value) -> item.put(String.valueOf(key), value));
            int id = features.integer(item, "productId"),
                quantity = features.integer(item, "quantity");
            if (quantity > 1000) throw new IllegalArgumentException("Quantity cannot exceed 1000");
            Integer variantId =
                item.get("variantId") == null ? null : features.integer(item, "variantId");
            if (!seen.add(id + ":" + variantId)) throw new IllegalArgumentException(
                "Combine duplicate product variants"
            );
            var product = products
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            if (
                !Boolean.TRUE.equals(product.getIsAvailable()) ||
                !"APPROVED".equals(product.getApprovalStatus()) ||
                (product.getSeller() != null &&
                    !Boolean.TRUE.equals(product.getSeller().getIsActive()))
            ) throw new IllegalArgumentException("Product unavailable");
            if (
                product.getSeller() != null &&
                !policies.acceptingOrders(product.getSeller().getId())
            ) throw new IllegalArgumentException("This seller is not accepting new orders");
            var variant =
                variantId == null
                    ? null
                    : variants
                          .findById(variantId)
                          .orElseThrow(() -> new IllegalArgumentException("Variant not found"));
            if (
                variant != null &&
                (!idEquals(id, variant.getProduct().getId()) ||
                    !Boolean.TRUE.equals(variant.getIsActive()))
            ) throw new IllegalArgumentException("Invalid product variant");
            if (
                variant == null && !product.getVariants().isEmpty()
            ) throw new IllegalArgumentException("Choose a product variant");
            int stock = variant == null ? product.getStockQuantity() : variant.getStockQuantity();
            if (quantity > stock) throw new IllegalArgumentException("Insufficient stock");
            BigDecimal price =
                product.getSalePrice() != null &&
                product.getSaleStartsAt() != null &&
                product.getSaleEndsAt() != null &&
                !now.isBefore(product.getSaleStartsAt()) &&
                now.isBefore(product.getSaleEndsAt())
                    ? product.getSalePrice()
                    : product.getPrice();
            if (variant != null) price = price.add(variant.getAdditionalPrice());
            lines.add(
                OrderItem.builder()
                    .product(product)
                    .sellerIdSnapshot(
                        product.getSeller() == null ? null : product.getSeller().getId()
                    )
                    .priceAtPurchase(price)
                    .quantity(quantity)
                    .build()
            );
        }
        return apply(features.text(body, "code", 50), access.currentUser().getId(), lines, false);
    }

    private boolean idEquals(int first, Integer second) {
        return second != null && first == second;
    }

    public void reserve(Quote quote, int order, int user) {
        jdbc.update(
            "insert into promo_redemptions(promo_id,order_id,user_id,discount_amount) values(?,?,?,?)",
            quote.promoId(),
            order,
            user,
            quote.discountAmount()
        );
    }

    public void paid(int order) {
        jdbc.update(
            "update promo_redemptions set status='PAID',updated_at=now() at time zone 'UTC' where order_id=? and status='RESERVED'",
            order
        );
    }

    public void release(int order) {
        jdbc.update(
            "update promo_redemptions set status='CANCELED',updated_at=now() at time zone 'UTC' where order_id=? and status='RESERVED'",
            order
        );
    }

    public void refunded(int order) {
        jdbc.update(
            "update promo_redemptions set status='REFUNDED',updated_at=now() at time zone 'UTC' where order_id=? and status='PAID'",
            order
        );
    }
}
