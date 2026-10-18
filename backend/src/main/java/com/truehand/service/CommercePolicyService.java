package com.truehand.service;

import com.truehand.security.AccessPolicy;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Applies seller availability and platform commerce rules to customer operations. */
@Service
@RequiredArgsConstructor
@Transactional
public class CommercePolicyService {

    private final JdbcTemplate jdbc;
    private final AccessPolicy access;

    public boolean acceptingOrders(Integer seller) {
        return (
            seller == null ||
            !Boolean.TRUE.equals(
                jdbc.queryForObject(
                    "select exists(select 1 from seller_settings where user_id=? and accepting_orders=false)",
                    Boolean.class,
                    seller
                )
            )
        );
    }

    public boolean acceptingCommissions(Integer seller) {
        return !Boolean.TRUE.equals(
            jdbc.queryForObject(
                "select exists(select 1 from seller_settings where user_id=? and accepting_commissions=false)",
                Boolean.class,
                seller
            )
        );
    }

    public Map<String, Object> sellerSettings(int seller) {
        access.requireOwner(seller);
        seller(seller);
        jdbc.update(
            "insert into seller_settings(user_id) values(?) on conflict do nothing",
            seller
        );
        return jdbc.queryForObject(
            "select * from seller_settings where user_id=?",
            (rs, row) -> {
                var result = new LinkedHashMap<String, Object>();
                result.put("userId", seller);
                result.put("acceptingOrders", rs.getBoolean("accepting_orders"));
                result.put("acceptingCommissions", rs.getBoolean("accepting_commissions"));
                result.put("availabilityNotice", rs.getString("availability_notice"));
                result.put("updatedAt", rs.getTimestamp("updated_at").toLocalDateTime());
                return result;
            },
            seller
        );
    }

    private void seller(int id) {
        if (
            !Boolean.TRUE.equals(
                jdbc.queryForObject(
                    "select exists(select 1 from users where id=? and role='SELLER')",
                    Boolean.class,
                    id
                )
            )
        ) throw new IllegalArgumentException("Seller account required");
    }

    public Map<String, Object> save(int seller, Map<String, Object> body) {
        access.requireOwner(seller);
        seller(seller);
        jdbc.queryForObject("select id from users where id=? for update", Integer.class, seller);
        if (
            !(body.get("acceptingOrders") instanceof Boolean orders) ||
            !(body.get("acceptingCommissions") instanceof Boolean commissions)
        ) throw new IllegalArgumentException("Both availability settings require a boolean");
        String notice =
            body.get("availabilityNotice") == null
                ? null
                : String.valueOf(body.get("availabilityNotice")).trim();
        if (notice != null && notice.length() > 2000) throw new IllegalArgumentException(
            "Availability notice cannot exceed 2000 characters"
        );
        jdbc.update(
            "insert into seller_settings(user_id,accepting_orders,accepting_commissions,availability_notice) values(?,?,?,?) on conflict(user_id) do update set accepting_orders=excluded.accepting_orders,accepting_commissions=excluded.accepting_commissions,availability_notice=excluded.availability_notice,updated_at=now() at time zone 'UTC'",
            seller,
            orders,
            commissions,
            notice
        );
        return sellerSettings(seller);
    }

    public Map<String, Object> platformStatus() {
        var rows = jdbc.queryForList(
            "select maintenance_mode,maintenance_message,registrations_enabled from platform_settings limit 1"
        );
        var result = new LinkedHashMap<String, Object>();
        result.put(
            "maintenanceMode",
            !rows.isEmpty() && Boolean.TRUE.equals(rows.get(0).get("maintenance_mode"))
        );
        result.put("message", rows.isEmpty() ? null : rows.get(0).get("maintenance_message"));
        result.put(
            "registrationsEnabled",
            rows.isEmpty() || Boolean.TRUE.equals(rows.get(0).get("registrations_enabled"))
        );
        return result;
    }

    public void requireRegistration() {
        if (
            !Boolean.TRUE.equals(platformStatus().get("registrationsEnabled"))
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE,
            "New registrations are currently disabled"
        );
    }
}
