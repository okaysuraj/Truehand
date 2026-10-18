package com.truehand.config;

import com.truehand.security.FirebaseAuthenticationFilter;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final FirebaseAuthenticationFilter firebaseAuthenticationFilter;
    private final com.truehand.security.ApiRateLimitFilter apiRateLimitFilter;

    @Bean
    public org.springframework.boot.web.servlet.FilterRegistrationBean<FirebaseAuthenticationFilter> firebaseServletRegistration() {
        var registration = new org.springframework.boot.web.servlet.FilterRegistrationBean<>(
            firebaseAuthenticationFilter
        );
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    public org.springframework.boot.web.servlet.FilterRegistrationBean<com.truehand.security.ApiRateLimitFilter> rateLimitServletRegistration() {
        var registration = new org.springframework.boot.web.servlet.FilterRegistrationBean<>(
            apiRateLimitFilter
        );
        registration.setEnabled(false);
        return registration;
    }

    @Value(
        "${cors.allowed-origins:http://localhost:3000,http://localhost:8080,http://localhost:8081,http://localhost:19006}"
    )
    private String allowedOriginsConfig;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .exceptionHandling(errors ->
                errors
                    .authenticationEntryPoint((request, response, exception) -> {
                        response.setStatus(401);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\":\"Authentication required\"}");
                    })
                    .accessDeniedHandler((request, response, exception) -> {
                        response.setStatus(403);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\":\"Access denied\"}");
                    })
            )
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/auth/register"),
                        new AntPathRequestMatcher("/api/auth/login")
                    )
                    .denyAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/auth/firebase-login", "POST"))
                    .permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/payment/webhook", "POST"))
                    .permitAll()
                    .requestMatchers(
                        new AntPathRequestMatcher("/actuator/health", "GET"),
                        new AntPathRequestMatcher("/actuator/health/**", "GET")
                    )
                    .permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/questions/product/*", "GET"))
                    .permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/products/*/view", "POST"))
                    .authenticated()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/products/image-search/history", "GET"),
                        new AntPathRequestMatcher("/api/products/image-search", "POST")
                    )
                    .authenticated()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/products/**", HttpMethod.GET.name())
                    )
                    .permitAll()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/categories/**", HttpMethod.GET.name())
                    )
                    .permitAll()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/reviews/**", HttpMethod.GET.name())
                    )
                    .permitAll()
                    .requestMatchers(
                        new AntPathRequestMatcher(
                            "/api/community/commissions",
                            HttpMethod.GET.name()
                        )
                    )
                    .authenticated()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/community/**", HttpMethod.GET.name())
                    )
                    .permitAll()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/social/**", HttpMethod.GET.name())
                    )
                    .permitAll()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/products/**", HttpMethod.POST.name())
                    )
                    .hasAnyRole("SELLER", "ADMIN")
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/products/**", HttpMethod.PUT.name())
                    )
                    .hasAnyRole("SELLER", "ADMIN")
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/products/**", HttpMethod.DELETE.name())
                    )
                    .hasAnyRole("SELLER", "ADMIN")
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/categories/**", HttpMethod.POST.name())
                    )
                    .hasRole("ADMIN")
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/categories/**", HttpMethod.PUT.name())
                    )
                    .hasRole("ADMIN")
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/categories/**", HttpMethod.DELETE.name())
                    )
                    .hasRole("ADMIN")
                    .requestMatchers(new AntPathRequestMatcher("/api/seller/**"))
                    .hasAnyRole("SELLER", "ADMIN")
                    .requestMatchers(new AntPathRequestMatcher("/api/admin/**"))
                    .hasRole("ADMIN")
                    .requestMatchers(new AntPathRequestMatcher("/api/promo/quote", "POST"))
                    .authenticated()
                    .requestMatchers(
                        new AntPathRequestMatcher("/api/promo", "POST"),
                        new AntPathRequestMatcher("/api/promo/**", "DELETE")
                    )
                    .hasAnyRole("SELLER", "ADMIN")
                    .requestMatchers(new AntPathRequestMatcher("/api/delivery/**"))
                    .hasAnyRole("DELIVERY", "ADMIN")
                    .requestMatchers(new AntPathRequestMatcher("/ws/**"))
                    .permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/error"))
                    .permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/h2-console/**"))
                    .denyAll()
                    .anyRequest()
                    .authenticated()
            )
            .addFilterBefore(
                firebaseAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )
            .addFilterAfter(apiRateLimitFilter, FirebaseAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> allowedOrigins = Arrays.stream(allowedOriginsConfig.split(","))
            .map(String::trim)
            .filter(origin -> !origin.isEmpty())
            .toList();

        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(
            Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        );
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
