package com.truehand.controller;

import java.util.Map;
import org.springframework.data.domain.Page;

public final class PagedResponses {

    private PagedResponses() {}

    public static org.springframework.data.domain.Pageable bounded(
        org.springframework.data.domain.Pageable pageable
    ) {
        return org.springframework.data.domain.PageRequest.of(
            pageable.getPageNumber(),
            Math.min(100, pageable.getPageSize())
        );
    }

    public static org.springframework.data.domain.Pageable bounded(
        org.springframework.data.domain.Pageable pageable,
        org.springframework.data.domain.Sort sort
    ) {
        return org.springframework.data.domain.PageRequest.of(
            pageable.getPageNumber(),
            Math.min(100, pageable.getPageSize()),
            sort
        );
    }

    public static Object body(Page<?> page, boolean paged) {
        if (!paged) return page.getContent();
        return Map.of(
            "content",
            page.getContent(),
            "number",
            page.getNumber(),
            "size",
            page.getSize(),
            "totalElements",
            page.getTotalElements(),
            "totalPages",
            page.getTotalPages(),
            "first",
            page.isFirst(),
            "last",
            page.isLast(),
            "empty",
            page.isEmpty()
        );
    }
}
