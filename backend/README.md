# Backend deployment

Render should build `backend/Dockerfile` and inject the backend environment
variables. Set `SPRING_PROFILES_ACTIVE=prod` and use
`/actuator/health/readiness` as the health check path. The server reads Render's
`PORT` automatically.

## Adopting the existing Hibernate database

`Found non-empty schema(s) "public" but no schema history table` means Flyway
connected successfully, but the database was created before Flyway was added.
The resulting Firebase repository and Tomcat startup errors are downstream
failures.

The legacy database has the 33 original entity tables, but lacks 20 columns from
`V1__entity_baseline.sql`. `V1_1__reconcile_legacy_entity_schema.sql` adds those
nullable columns before V2 adds constraints and indexes. It preserves existing
rows; V1 itself remains unchanged. New databases run V1 normally, then V1.1 and
the remaining migrations.

For this legacy schema, after taking a Neon backup or branch and reviewing the
schema and existing data against V1 and V2:

1. Deploy the code containing V1.1.
2. Set these Render environment variables for the first successful deployment:

   ```text
   SPRING_FLYWAY_BASELINE_ON_MIGRATE=true
   SPRING_FLYWAY_BASELINE_VERSION=1
   ```

3. Redeploy. Flyway records baseline version 1, skips the table creation in V1,
   and runs V1.1 followed by V2 through V22. Confirm startup completes and
   `/actuator/health/readiness` returns HTTP 200.
4. Remove `SPRING_FLYWAY_BASELINE_ON_MIGRATE` or set it back to `false`, then
   redeploy. The recorded history is retained and later startups use it normally.

Do not baseline at 22: that would skip the required migrations. For a database
with a different schema or existing Flyway history, review its migration state
separately. V2 intentionally rejects duplicate emails, invalid amounts, and
other invalid legacy data; resolve any reported violations before retrying.
Keep `spring.jpa.hibernate.ddl-auto=validate` and Flyway enabled so startup
continues to check that the database matches the application.
