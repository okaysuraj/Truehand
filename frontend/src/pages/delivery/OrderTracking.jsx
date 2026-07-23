import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import LiveTracking from '../../components/LiveTracking';
import '../../styles/OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
        const dres = await api.get(`/deliveries/${orderId}`);
        setDelivery(dres.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-tracking-page">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="order-tracking-page">
      <div className="tracking-container">
        <h1>📦 Track Your Delivery</h1>

        {order && (
          <>
            {/* Live Tracking Component */}
            <LiveTracking orderId={parseInt(orderId)} />

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-header">Order Summary</div>
              <div className="summary-details">
                <div className="summary-item">
                  <span className="label">Order Number:</span>
                  <span className="value">#{order.orderNumber}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Status:</span>
                  <span className="value status-badge">{order.status}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Total Amount:</span>
                  <span className="value">₹{order.totalAmount}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Delivery Address:</span>
                  <span className="value">{order.deliveryAddress}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            {delivery && (
              <div className="delivery-details">
                <div className="details-header">Delivery Information</div>
                <div className="details-grid">
                  <div className="detail-card">
                    <div className="detail-label">Delivery Status</div>
                    <div className="detail-value">{delivery.status || 'In Transit'}</div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-label">Delivery Boy</div>
                    <div className="detail-value">{delivery.deliveryBoyName || 'Assigned soon'}</div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-label">Estimated Delivery</div>
                    <div className="detail-value">
                      {delivery.estimatedDeliveryTime 
                        ? new Date(delivery.estimatedDeliveryTime).toLocaleString()
                        : 'Calculating...'}
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-label">Contact</div>
                    <div className="detail-value">📞 Support available 24/7</div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="timeline">
              <div className="timeline-header">Delivery Timeline</div>
              <div className="timeline-items">
                <div className="timeline-item completed">
                  <div className="timeline-point"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Order Confirmed</div>
                    <div className="timeline-time">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Just now'}
                    </div>
                  </div>
                </div>

                <div className={`timeline-item ${order.status !== 'CONFIRMED' ? 'completed' : ''}`}>
                  <div className="timeline-point"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Being Prepared</div>
                    <div className="timeline-time">In progress</div>
                  </div>
                </div>

                <div className={`timeline-item ${order.status === 'DELIVERED' ? 'completed' : ''}`}>
                  <div className="timeline-point"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Out for Delivery</div>
                    <div className="timeline-time">
                      {delivery?.estimatedDeliveryTime 
                        ? new Date(delivery.estimatedDeliveryTime).toLocaleString()
                        : 'Soon'}
                    </div>
                  </div>
                </div>

                <div className={`timeline-item ${order.status === 'DELIVERED' ? 'completed' : ''}`}>
                  <div className="timeline-point"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Delivered</div>
                    <div className="timeline-time">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
