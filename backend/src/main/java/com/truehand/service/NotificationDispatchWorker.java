package com.truehand.service;

import java.time.*;
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
public class NotificationDispatchWorker {

    private final JdbcTemplate jdbc;
    private final TransactionTemplate transaction;
    private final NotificationDispatchService dispatches;
    private final NotificationTransport transport;

    @Scheduled(fixedDelayString = "${notifications.poll-ms:10000}", initialDelay = 10000)
    public void tick() {
        var rows = transaction.execute(ignored -> {
            jdbc.update(
                "update notification_dispatches set status='EXPIRED',lease_until=null,updated_at=now() at time zone 'UTC' where expires_at<= (now() at time zone 'UTC') and status in ('QUEUED','SENDING','TICKETED')"
            );
            jdbc.update(
                "update notification_dispatches set status=coalesce(lease_previous_status,'QUEUED'),lease_until=null,lease_token=null where status='SENDING' and lease_until<(now() at time zone 'UTC')"
            );
            var jobs = jdbc.queryForList(
                "select * from notification_dispatches where status in ('QUEUED','TICKETED') and next_attempt_at<=(now() at time zone 'UTC') and ((channel='EMAIL' and ?) or (channel='PUSH' and ?)) order by mandatory desc,next_attempt_at,id for update skip locked limit 5",
                transport.available("EMAIL"),
                transport.available("PUSH")
            );
            for (var job : jobs) {
                UUID token = UUID.randomUUID();
                job.put("claimToken", token);
                jdbc.update(
                    "update notification_dispatches set lease_previous_status=status,status='SENDING',attempts=attempts+1,lease_until=(now() at time zone 'UTC')+interval '2 minutes',lease_token=? where id=?",
                    token,
                    job.get("id")
                );
            }
            return jobs;
        });
        for (var job : rows) {
            try {
                process(job);
            } catch (Exception failure) {
                boolean ticketed = "TICKETED".equals(job.get("status"));
                finish(
                    job,
                    new NotificationTransport.Outcome(
                        ticketed ? "TICKETED" : "QUEUED",
                        ticketed ? (String) job.get("provider_reference") : null,
                        failure.getClass().getSimpleName(),
                        false
                    )
                );
            }
        }
    }

    private void process(Map<String, Object> job) throws Exception {
        if (
            job.get("expires_at") instanceof java.sql.Timestamp expiry &&
            !expiry.toLocalDateTime().isAfter(LocalDateTime.now(ZoneOffset.UTC))
        ) {
            finish(job, new NotificationTransport.Outcome("EXPIRED", null, null, false));
            return;
        }
        int user = (Integer) job.get("user_id");
        boolean active = Boolean.TRUE.equals(
            jdbc.queryForObject("select is_active from users where id=?", Boolean.class, user)
        );
        if (
            !active ||
            (!Boolean.TRUE.equals(job.get("mandatory")) &&
                !dispatches.allowed(
                    user,
                    (String) job.get("category"),
                    (String) job.get("channel")
                ))
        ) {
            finish(
                job,
                new NotificationTransport.Outcome("CANCELED", null, "PREFERENCE_DISABLED", false)
            );
            return;
        }
        String channel = (String) job.get("channel"),
            recipient,
            provider = null;
        if ("EMAIL".equals(channel)) recipient = jdbc.queryForObject(
            "select email from users where id=?",
            String.class,
            user
        );
        else {
            var devices = jdbc.queryForList(
                "select token,provider from device_tokens where id=? and user_id=? and active=true",
                job.get("device_id"),
                user
            );
            if (devices.isEmpty()) {
                finish(
                    job,
                    new NotificationTransport.Outcome("CANCELED", null, "DEVICE_INACTIVE", false)
                );
                return;
            }
            recipient = (String) devices.get(0).get("token");
            provider = (String) devices.get(0).get("provider");
        }
        var outcome = "TICKETED".equals(job.get("status"))
            ? transport.receipt((String) job.get("provider_reference"))
            : transport.send(
                  channel,
                  recipient,
                  provider,
                  dispatches.decode((String) job.get("encrypted_payload"))
              );
        finish(job, outcome);
    }

    private void finish(Map<String, Object> job, NotificationTransport.Outcome outcome) {
        transaction.executeWithoutResult(ignored -> {
            int attempts = ((Number) job.get("attempts")).intValue() + 1;
            String status = outcome.invalidDevice() ? "FAILED" : outcome.status();
            if (Set.of("QUEUED", "TICKETED").contains(status) && attempts >= 8) status = "FAILED";
            long seconds = "TICKETED".equals(status)
                ? 900
                : Math.min(3600, 30L * (1L << Math.min(attempts, 7)));
            String error = outcome.error();
            if (error != null && error.length() > 200) error = error.substring(0, 200);
            int finished = jdbc.update(
                "update notification_dispatches set status=?,provider_reference=?,last_error=?,lease_until=null,lease_token=null,lease_previous_status=null,next_attempt_at=?,updated_at=now() at time zone 'UTC' where id=? and status='SENDING' and lease_token=?",
                status,
                outcome.reference(),
                error,
                LocalDateTime.now(ZoneOffset.UTC).plusSeconds(seconds),
                job.get("id"),
                job.get("claimToken")
            );
            if (finished == 1 && outcome.invalidDevice()) jdbc.update(
                "update device_tokens set active=false where id=? and user_id=?",
                job.get("device_id"),
                job.get("user_id")
            );
        });
    }
}
