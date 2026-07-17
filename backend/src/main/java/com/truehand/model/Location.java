package com.truehand.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id", nullable = false)
    private Delivery delivery;

    @Column(nullable = false, columnDefinition = "DECIMAL(10, 8)")
    private BigDecimal latitude;

    @Column(nullable = false, columnDefinition = "DECIMAL(11, 8)")
    private BigDecimal longitude;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private BigDecimal accuracy;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
