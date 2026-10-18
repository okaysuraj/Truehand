package com.truehand.service;

import com.truehand.security.AccessPolicy;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryRoutingService {

    private final JdbcTemplate jdbc;
    private final AccessPolicy access;
    private final MarketplaceFeatureService features;

    public Object list() {
        return features.query(
            "select id,total_distance_meters as straight_line_distance_meters,optimized_polyline as coordinates,created_at from delivery_routes where agent_id=? order by id desc limit 100",
            features.userId()
        );
    }

    public Object optimize(Map<String, Object> body) {
        var user = access.currentUser();
        if (!"DELIVERY".equals(user.getRole())) throw new IllegalArgumentException(
            "Use an assigned delivery partner account to plan a route"
        );
        double latitude = coordinate(body, "originLatitude", 90),
            longitude = coordinate(body, "originLongitude", 180);
        var pending = new ArrayList<>(
            features.query(
                "select o.id as order_id,a.latitude,a.longitude,o.delivery_address_snapshot as address from deliveries d join orders o on o.id=d.order_id join addresses a on a.id=o.address_id where d.delivery_boy_id=? and d.status in ('ASSIGNED','IN_TRANSIT') and o.payment_status='PAID' order by o.id limit 100",
                user.getId()
            )
        );
        if (pending.isEmpty()) throw new IllegalArgumentException(
            "There are no assigned deliveries to plan"
        );
        if (
            pending
                .stream()
                .anyMatch(stop -> stop.get("latitude") == null || stop.get("longitude") == null)
        ) throw new IllegalArgumentException(
            "All delivery addresses require saved coordinates before planning a route"
        );
        List<Map<String, Object>> stops = new ArrayList<>();
        List<List<Double>> points = new ArrayList<>();
        points.add(List.of(longitude, latitude));
        double distance = 0;
        while (!pending.isEmpty()) {
            int nearest = 0;
            double shortest = Double.MAX_VALUE;
            for (int i = 0; i < pending.size(); i++) {
                var candidate = pending.get(i);
                double length = meters(
                    latitude,
                    longitude,
                    ((Number) candidate.get("latitude")).doubleValue(),
                    ((Number) candidate.get("longitude")).doubleValue()
                );
                if (length < shortest) {
                    shortest = length;
                    nearest = i;
                }
            }
            var stop = pending.remove(nearest);
            stops.add(stop);
            distance += shortest;
            latitude = ((Number) stop.get("latitude")).doubleValue();
            longitude = ((Number) stop.get("longitude")).doubleValue();
            points.add(List.of(longitude, latitude));
        }
        String coordinates;
        try {
            coordinates = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(
                points
            );
        } catch (Exception failure) {
            throw new IllegalStateException(failure);
        }
        Integer id = jdbc.queryForObject(
            "insert into delivery_routes(agent_id,optimized_polyline,total_distance_meters,created_at) values(?,?,?,now() at time zone 'UTC') returning id",
            Integer.class,
            user.getId(),
            coordinates,
            (int) Math.round(distance)
        );
        for (int i = 0; i < stops.size(); i++) jdbc.update(
            "insert into delivery_route_stops(route_id,order_id,position) values(?,?,?)",
            id,
            stops.get(i).get("orderId"),
            i
        );
        return Map.of(
            "id",
            id,
            "stops",
            stops,
            "straightLineDistanceMeters",
            Math.round(distance),
            "method",
            "Nearest delivery by straight-line distance"
        );
    }

    private double coordinate(Map<String, Object> body, String key, double bound) {
        try {
            double value = Double.parseDouble(String.valueOf(body.get(key)));
            if (
                !Double.isFinite(value) || Math.abs(value) > bound
            ) throw new IllegalArgumentException();
            return value;
        } catch (Exception failure) {
            throw new IllegalArgumentException("Valid " + key + " is required");
        }
    }

    public static double meters(double a, double b, double c, double d) {
        double first = Math.toRadians(c - a),
            second = Math.toRadians(d - b);
        double h =
            Math.sin(first / 2) * Math.sin(first / 2) +
            Math.cos(Math.toRadians(a)) *
                Math.cos(Math.toRadians(c)) *
                Math.sin(second / 2) *
                Math.sin(second / 2);
        return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
    }
}
