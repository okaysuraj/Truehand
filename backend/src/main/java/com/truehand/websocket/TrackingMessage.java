package com.truehand.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackingMessage {
    private String action;
    private Integer orderId;
    private String data;
}
