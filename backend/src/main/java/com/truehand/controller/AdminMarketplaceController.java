package com.truehand.controller;

import com.truehand.service.MarketplaceFeatureService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/** Administrator operations for marketplace accounts, content, and oversight. */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminMarketplaceController {

    private final MarketplaceFeatureService features;
    private final com.truehand.service.OrderService orders;
    private final com.truehand.service.AdminService admin;
    private final org.springframework.jdbc.core.JdbcTemplate jdbc;
    private final com.truehand.service.ProductService products;

    @GetMapping("/admin/banners")
    public Object allBanners() {
        return features.banners(true);
    }

    @PostMapping("/admin/banners")
    public Object banner(@RequestBody Map<String, Object> body) {
        return features.saveBanner(body);
    }

    @DeleteMapping("/admin/banners/{id}")
    public void deleteBanner(@PathVariable long id) {
        features.deleteBanner(id);
    }

    @GetMapping("/admin/orders")
    public Object allOrders(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(orders.getAllOrders(pageable), paged);
    }

    @GetMapping("/admin/artisans")
    public Object artisans(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(
            features.page(
                "u.id,u.first_name,u.last_name,u.email,u.is_active,p.business_name,p.kyc_status,u.role",
                "from users u left join seller_profiles p on p.user_id=u.id where u.role='SELLER'",
                "u.id",
                pageable
            ),
            paged
        );
    }

    @GetMapping("/admin/delivery-agents")
    public Object deliveryAgents(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(
            features.page(
                "u.id,u.first_name,u.last_name,u.email,u.is_active,p.kyc_status,u.role",
                "from users u left join delivery_personnel p on p.user_id=u.id where u.role='DELIVERY'",
                "u.id",
                pageable
            ),
            paged
        );
    }

    @PutMapping("/admin/artisans/{id}/{action}")
    @org.springframework.transaction.annotation.Transactional
    public Object artisanAction(@PathVariable int id, @PathVariable String action) {
        features.admin();
        features.one("select id from users where id=? and role='SELLER'", id);
        if (Set.of("approve", "reject").contains(action)) {
            var result = admin.approveSellerKyc(
                id,
                "approve".equals(action) ? "APPROVED" : "REJECTED",
                null
            );
            features.audit(action, "SELLER", id, Map.of());
            return result;
        }
        return accountAction(id, action, "SELLER");
    }

    @PutMapping("/admin/delivery-agents/{id}/{action}")
    @org.springframework.transaction.annotation.Transactional
    public Object deliveryAction(@PathVariable int id, @PathVariable String action) {
        features.admin();
        features.one("select id from users where id=? and role='DELIVERY'", id);
        if (Set.of("approve", "reject").contains(action)) {
            var result = admin.approveDeliveryKyc(
                id,
                "approve".equals(action) ? "APPROVED" : "REJECTED",
                null
            );
            features.audit(action, "DELIVERY", id, Map.of());
            return result;
        }
        return accountAction(id, action, "DELIVERY");
    }

    private Object accountAction(int id, String action, String role) {
        if (
            !Set.of("suspend", "restore", "activate").contains(action)
        ) throw new IllegalArgumentException("Invalid account action");
        jdbc.update(
            "update users set is_active=? where id=? and role=?",
            !"suspend".equals(action),
            id,
            role
        );
        features.audit(action, role, id, Map.of());
        return Map.of("id", id, "isActive", !"suspend".equals(action));
    }

    @GetMapping("/admin/disputes")
    public Object disputes(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(
            features.page(
                "id,request_id,subject,description,status,type,date,last_update,order_id",
                "from support_requests where type in ('DISPUTE','RETURN')",
                "id desc",
                pageable
            ),
            paged
        );
    }

    @PostMapping("/admin/disputes/{id}/resolve")
    @org.springframework.transaction.annotation.Transactional
    public Object resolve(@PathVariable int id, @RequestBody Map<String, Object> body) {
        features.admin();
        features.one(
            "select id from support_requests where id=? and type in ('DISPUTE','RETURN')",
            id
        );
        features.message(id, Map.of("body", features.text(body, "resolution", 10000)));
        jdbc.update("update support_requests set status='RESOLVED' where id=?", id);
        features.audit("RESOLVE", "SUPPORT", id, body);
        return Map.of("id", id, "status", "RESOLVED");
    }

    @GetMapping("/admin/fraud-alerts")
    public Object fraud(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(
            features.page(
                "id,activity_type,description,status,created_at",
                "from suspicious_activity_logs",
                "id desc",
                pageable
            ),
            paged
        );
    }

    @GetMapping("/admin/suspicious-activity")
    public Object suspicious(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return fraud(paged, pageable);
    }

    @GetMapping("/admin/commission-settings")
    public Object commissionSettings() {
        features.admin();
        return features.query(
            "select c.id as category_id,c.name as category,r.percentage from categories c left join commission_rates r on r.category_id=c.id order by c.id"
        );
    }

    @PutMapping("/admin/commission-settings")
    @org.springframework.transaction.annotation.Transactional
    public Object commissionSettings(@RequestBody Map<String, Object> body) {
        features.admin();
        int category = features.integer(body, "categoryId");
        java.math.BigDecimal percentage;
        try {
            percentage = new java.math.BigDecimal(String.valueOf(body.get("percentage")));
            if (
                percentage.signum() < 0 ||
                percentage.compareTo(new java.math.BigDecimal("100")) > 0 ||
                percentage.scale() > 2
            ) throw new ArithmeticException();
        } catch (Exception failure) {
            throw new IllegalArgumentException("Percentage must be between 0 and 100");
        }
        jdbc.update(
            "insert into commission_rates(category_id,percentage) values (?,?) on conflict(category_id) do update set percentage=excluded.percentage,updated_at=now() at time zone 'UTC'",
            category,
            percentage
        );
        features.audit("UPDATE", "COMMISSION_RATE", category, body);
        return commissionSettings();
    }

    @GetMapping("/admin/audit-events")
    public Object auditEvents(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(
            features.page(
                "id,actor_id,action,resource_type,resource_id,details::text as details,created_at",
                "from admin_audit_events",
                "id desc",
                pageable
            ),
            paged
        );
    }

    @GetMapping("/admin/support")
    public Object support(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        features.admin();
        return PagedResponses.body(
            features.page(
                "id,request_id,subject,description,status,type,date,last_update,order_id",
                "from support_requests",
                "id desc",
                pageable
            ),
            paged
        );
    }

    @GetMapping("/seller/inventory-alerts")
    public Object inventoryAlerts(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return PagedResponses.body(
            features.page(
                "id,name,stock_quantity,price,approval_status as status",
                "from products where seller_id=? and stock_quantity<=5",
                "stock_quantity,id",
                pageable,
                features.userId()
            ),
            paged
        );
    }
}
