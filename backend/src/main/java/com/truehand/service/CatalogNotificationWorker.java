package com.truehand.service;

import java.math.BigDecimal;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "notifications.dispatch.enabled", havingValue = "true")
public class CatalogNotificationWorker {

    private final JdbcTemplate jdbc;
    private final TransactionTemplate transaction;
    private final NotificationDispatchService dispatches;
    private static final String VISIBLE =
        "p.approval_status='APPROVED' and p.is_available=true and (p.seller_id is null or exists(select 1 from users seller where seller.id=p.seller_id and seller.is_active=true))";
    private static final String PRICE =
        "case when p.sale_price is not null and p.sale_starts_at<=(now() at time zone 'UTC') and p.sale_ends_at>(now() at time zone 'UTC') then p.sale_price else p.price end";
    private static final String STOCK =
        "case when exists(select 1 from product_variants v where v.product_id=p.id) then coalesce((select sum(v.stock_quantity) from product_variants v where v.product_id=p.id and v.is_active=true),0) else p.stock_quantity end";

    @Scheduled(fixedDelayString = "${notifications.catalog-poll-ms:30000}", initialDelay = 15000)
    public void tick() {
        transaction.executeWithoutResult(tx -> {
            var alerts = jdbc.queryForList(
                "select a.id,a.user_id,a.product_id,a.type,a.activation_version,p.name," +
                    PRICE +
                    " as observed_price from product_alerts a join products p on p.id=a.product_id join users u on u.id=a.user_id where a.active=true and u.is_active=true and " +
                    VISIBLE +
                    " and ((a.type='PRICE' and (" +
                    PRICE +
                    ")<=a.threshold) or (a.type='STOCK' and (" +
                    STOCK +
                    ")>0)) order by a.id for update of a skip locked limit 100"
            );
            for (var alert : alerts) {
                boolean price = "PRICE".equals(alert.get("type"));
                String event =
                        "product-alert:" + alert.get("id") + ":" + alert.get("activation_version"),
                    name = (String) alert.get("name");
                dispatches.catalogNotice(
                    (Integer) alert.get("user_id"),
                    event,
                    price ? "Price alert" : "Stock alert",
                    price
                        ? name +
                              " is listed at INR " +
                              ((BigDecimal) alert.get("observed_price")).toPlainString()
                        : name + " has saleable stock. Review the available product options.",
                    (Integer) alert.get("product_id"),
                    price ? "promotions" : "newArrivals"
                );
                jdbc.update("update product_alerts set active=false where id=?", alert.get("id"));
            }
        });
        transaction.executeWithoutResult(tx -> {
            var arrivals = jdbc.queryForList(
                "select p.id,p.name,n.user_id from notification_preferences n join users u on u.id=n.user_id cross join products p where u.is_active=true and n.catalog_updates_since is not null and p.catalog_announced_at>=n.catalog_updates_since and (n.preferences -> 'newArrivals' ->> 'email'='true' or n.preferences -> 'newArrivals' ->> 'push'='true') and " +
                    VISIBLE +
                    " and not exists(select 1 from notifications notice where notice.user_id=n.user_id and notice.event_key='catalog-product:'||p.id::text) order by p.catalog_announced_at,p.id,n.user_id limit 100"
            );
            for (var product : arrivals)
                dispatches.catalogNotice(
                    (Integer) product.get("user_id"),
                    "catalog-product:" + product.get("id"),
                    "New catalog product",
                    (String) product.get("name"),
                    (Integer) product.get("id"),
                    "newArrivals"
                );
        });
    }
}
