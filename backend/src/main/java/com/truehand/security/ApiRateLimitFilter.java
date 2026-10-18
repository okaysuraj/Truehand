package com.truehand.security;

import com.truehand.model.User;
import com.truehand.service.RequestRateLimiter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class ApiRateLimitFilter extends OncePerRequestFilter {

    private final RequestRateLimiter limiter;

    @Value("${api.rate-limit.enabled:true}")
    private boolean enabled;

    @Value("${api.rate-limit.requests-per-minute:300}")
    private int general;

    @Value("${api.rate-limit.media-per-minute:20}")
    private int media;

    @Value("${api.rate-limit.payments-per-minute:30}")
    private int payments;

    @jakarta.annotation.PostConstruct
    void validate() {
        for (int limit : new int[] { general, media, payments })
            if (limit < 1 || limit > 100000) throw new IllegalStateException(
                "Request budgets must be between 1 and 100000 per minute"
            );
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain
    ) throws java.io.IOException, jakarta.servlet.ServletException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (
            !enabled ||
            !request.getRequestURI().startsWith("/api/") ||
            authentication == null ||
            !(authentication.getPrincipal() instanceof User user)
        ) {
            chain.doFilter(request, response);
            return;
        }
        response.setHeader("Cache-Control", "no-store");
        RequestRateLimiter.Decision decision;
        try {
            decision = limiter.consume(user.getId(), "GENERAL", general);
            if (
                decision.allowed() &&
                !"GET".equals(request.getMethod()) &&
                !"HEAD".equals(request.getMethod())
            ) {
                String path = request.getRequestURI();
                if (
                    path.equals("/api/media/upload") ||
                    path.equals("/api/products/image-search") ||
                    path.equals("/api/products/bulk-upload")
                ) decision = limiter.consume(user.getId(), "MEDIA", media);
                else if (
                    path.startsWith("/api/payment/") ||
                    path.endsWith("/subscribe") ||
                    path.matches("/api/sellers/[^/]+/subscription-purchases/[^/]+/refresh")
                ) decision = limiter.consume(user.getId(), "PAYMENTS", payments);
            }
        } catch (org.springframework.dao.DataAccessException unavailable) {
            response.setStatus(503);
            response.setHeader("Retry-After", "5");
            response.setContentType("application/json");
            response
                .getWriter()
                .write(
                    "{\"error\":\"Request protection is temporarily unavailable. Please retry.\"}"
                );
            return;
        }
        if (!decision.allowed()) {
            response.setStatus(429);
            response.setHeader("Retry-After", String.valueOf(decision.retryAfter()));
            response.setContentType("application/json");
            response
                .getWriter()
                .write(
                    "{\"error\":\"Too many requests. Retry in " +
                        decision.retryAfter() +
                        " seconds.\"}"
                );
            return;
        }
        chain.doFilter(request, response);
    }
}
