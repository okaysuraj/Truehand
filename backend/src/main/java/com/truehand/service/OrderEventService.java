package com.truehand.service;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderEventService {

    private final JdbcTemplate jdbc;
    private final NotificationDispatchService dispatches;

    public void record(Integer orderId, String key, String status, String message) {
        int inserted = jdbc.update(
            "insert into order_events(order_id,event_key,status,message) values(?,?,?,?) on conflict do nothing",
            orderId,
            key,
            status,
            message
        );
        if (inserted > 0) {
            jdbc.update(
                "insert into notifications(user_id,title,body,type,is_read,created_at) select user_id,order_number,?,'ORDER',false,now() at time zone 'UTC' from orders where id=?",
                message,
                orderId
            );
            dispatches.orderEvent(orderId, key, message);
        }
    }
}
