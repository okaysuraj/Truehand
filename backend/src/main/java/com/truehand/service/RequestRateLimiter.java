package com.truehand.service;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequestRateLimiter {

    private final JdbcTemplate jdbc;

    public record Decision(boolean allowed, int retryAfter) {}

    public Decision consume(Integer userId, String bucket, int limit) {
        if (
            limit < 1 ||
            limit > 100000 ||
            !java.util.Set.of("GENERAL", "MEDIA", "PAYMENTS").contains(bucket)
        ) throw new IllegalArgumentException("Invalid request budget");
        // A single upsert serializes each user's shared budget across API instances.
        return jdbc.queryForObject(
            """
            insert into api_rate_windows(user_id,bucket,attempts,window_started_at)
            values(?,?,1,clock_timestamp() at time zone 'UTC')
            on conflict(user_id,bucket) do update set
              attempts=case when api_rate_windows.window_started_at+interval '60 seconds'<=clock_timestamp() at time zone 'UTC'
                then 1 else least(api_rate_windows.attempts+1,?+1) end,
              window_started_at=case when api_rate_windows.window_started_at+interval '60 seconds'<=clock_timestamp() at time zone 'UTC'
                then clock_timestamp() at time zone 'UTC' else api_rate_windows.window_started_at end
            returning attempts<=? as allowed,
              greatest(1,ceil(extract(epoch from (window_started_at+interval '60 seconds'-(clock_timestamp() at time zone 'UTC'))))::integer) as retry_after
            """,
            (rs, row) -> new Decision(rs.getBoolean("allowed"), rs.getInt("retry_after")),
            userId,
            bucket,
            limit,
            limit
        );
    }
}
