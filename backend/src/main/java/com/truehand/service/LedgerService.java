package com.truehand.service;

import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Writes balanced financial journals; money movements must pass through this ledger. */
@Service
@Transactional
@RequiredArgsConstructor
public class LedgerService {

    private final JdbcTemplate jdbc;

    public record Entry(String account, BigDecimal debit, BigDecimal credit) {}

    public Long post(String key, String description, List<Entry> entries) {
        BigDecimal total = BigDecimal.ZERO;
        for (var entry : entries) {
            if (
                entry.account() == null ||
                entry.debit().signum() < 0 ||
                entry.credit().signum() < 0 ||
                entry.debit().scale() > 2 ||
                entry.credit().scale() > 2 ||
                entry.debit().signum() > 0 == entry.credit().signum() > 0
            ) throw new IllegalArgumentException("Invalid ledger entry");
            total = total.add(entry.debit()).subtract(entry.credit());
        }
        if (entries.size() < 2 || total.signum() != 0) throw new IllegalArgumentException(
            "Ledger entries must balance"
        );
        var id = jdbc.queryForList(
            "insert into financial_journals(event_key,description) values(?,?) on conflict(event_key) do nothing returning id",
            Long.class,
            key,
            description
        );
        if (id.isEmpty()) return jdbc.queryForObject(
            "select id from financial_journals where event_key=?",
            Long.class,
            key
        );
        for (var entry : entries)
            jdbc.update(
                "insert into financial_entries(journal_id,account,debit,credit) values(?,?,?,?)",
                id.get(0),
                entry.account(),
                entry.debit(),
                entry.credit()
            );
        return id.get(0);
    }

    public Long transfer(
        String key,
        String description,
        String debitAccount,
        String creditAccount,
        BigDecimal amount
    ) {
        return post(
            key,
            description,
            List.of(
                new Entry(debitAccount, amount, BigDecimal.ZERO),
                new Entry(creditAccount, BigDecimal.ZERO, amount)
            )
        );
    }
}
