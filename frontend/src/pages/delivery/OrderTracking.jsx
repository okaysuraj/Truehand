import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import {
  createDeliveryTrackingHook,
  canManageDelivery,
  canShareDeliveryLocation,
  deliveryActionEndpoint,
  mapLink,
} from '../../../../shared/delivery-tracking';
import { useDeliveryLocation } from '../../services/delivery-location';
import { formatValue } from '../../../../shared/feature-contract';
import MarketplaceFeature from '../../components/MarketplaceFeature';
const useDeliveryTracking = createDeliveryTrackingHook(React, api);
export default function OrderTracking() {
  const params = useParams();
  const id = params.orderId || params.id;
  const { user } = useAuth();
  const { delivery, events, error, loading, reload } = useDeliveryTracking(id, user?.id);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const manage = canManageDelivery(delivery, user);
  const point = delivery?.currentLocation;
  const sharing = useDeliveryLocation(id, user, delivery);
  async function act(path, body) {
    setBusy(true);
    setNotice('');
    try {
      await api.post(deliveryActionEndpoint(id, path), body);
      setNotice(
        path === 'handover-code'
          ? 'Handover email queued to the customer.'
          : path === 'verify-otp'
            ? 'Handover code verified.'
            : 'Saved.',
      );
      reload();
    } catch (failure) {
      setNotice(failure.response?.data?.error || 'Unable to save. Please retry.');
    } finally {
      setBusy(false);
    }
  }
  if (!id)
    return <MarketplaceFeature feature={user?.role === 'DELIVERY' ? 'delivery-tasks' : 'orders'} />;
  return (
    <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg text-forest-green">Delivery tracking</h1>
      {!user ? (
        <Link to="/login">Sign in to view delivery tracking</Link>
      ) : (
        <>
          {loading && <p>Loading delivery...</p>}
          {error && (
            <p role="alert">
              {error} <button onClick={reload}>Retry</button>
            </p>
          )}
          {notice && <p role="status">{notice}</p>}
          {delivery && (
            <>
              <h2 className="text-2xl">{delivery.order.orderNumber}</h2>
              <p>Delivery status: {delivery.status}</p>
              <p>Order status: {delivery.order.status}</p>
              <p>Delivery address: {delivery.order.deliveryAddress}</p>
              <p>Estimated delivery: {formatValue(delivery.estimatedDeliveryTime, 'date')}</p>
              <p>Delivered: {formatValue(delivery.actualDeliveryTime, 'date')}</p>
              <p>
                Delivery partner:{' '}
                {delivery.deliveryBoy
                  ? [delivery.deliveryBoy.firstName, delivery.deliveryBoy.lastName]
                      .filter(Boolean)
                      .join(' ')
                  : 'Awaiting assignment'}
              </p>
              {point ? (
                <>
                  <MapContainer
                    key={`${point.latitude}:${point.longitude}`}
                    center={[Number(point.latitude), Number(point.longitude)]}
                    zoom={15}
                    style={{
                      height: 360,
                      width: '100%',
                    }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <CircleMarker center={[Number(point.latitude), Number(point.longitude)]}>
                      <Popup>Latest reported delivery location</Popup>
                    </CircleMarker>
                  </MapContainer>
                  <p>Last location update: {formatValue(point.timestamp, 'date')}</p>
                  <a className="underline" href={mapLink(point)} target="_blank" rel="noreferrer">
                    Open location in maps
                  </a>
                </>
              ) : (
                <p>No delivery location has been reported.</p>
              )}
              {manage && (
                <div className="space-y-4">
                  {delivery.status === 'ASSIGNED' && (
                    <button disabled={busy} onClick={() => act('start')}>
                      Start delivery
                    </button>
                  )}
                  {delivery.status === 'IN_TRANSIT' && (
                    <>
                      <button disabled={busy} onClick={() => act('handover-code')}>
                        Send handover code
                      </button>
                      <label className="block">
                        Customer handover code
                        <input
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          maxLength="6"
                          className="block border p-3"
                          value={code}
                          onChange={(event) => setCode(event.target.value)}
                        />
                      </label>
                      <button
                        disabled={busy || !/^\d{6}$/.test(code)}
                        onClick={() =>
                          act('verify-otp', {
                            otp: code,
                          })
                        }
                      >
                        Verify handover code
                      </button>
                      <button className="block" disabled={busy} onClick={() => act('complete')}>
                        Complete delivery
                      </button>
                    </>
                  )}
                </div>
              )}
              {canShareDeliveryLocation(delivery, user) && (
                <section className="space-y-3">
                  <button className="border p-3" onClick={sharing.toggle}>
                    {sharing.enabled ? 'Stop GPS sharing' : 'Share live GPS'}
                  </button>
                  <p>GPS sharing runs while this delivery screen is in the foreground.</p>
                  {sharing.lastSent && (
                    <p>Last GPS sent: {formatValue(sharing.lastSent, 'date')}</p>
                  )}
                  {sharing.error && <p role="alert">{sharing.error}</p>}
                </section>
              )}
              <Link className="underline block" to={`/delivery/contact/${id}`}>
                Delivery conversation
              </Link>
              <h2 className="text-2xl">Order timeline</h2>
              {!events.length && <p>No timeline events recorded.</p>}
              {events.map((event) => (
                <article className="border-b py-4" key={event.id}>
                  <p>{event.status}</p>
                  <p>{event.message}</p>
                  <p>{formatValue(event.createdAt, 'date')}</p>
                </article>
              ))}
              <h2 className="text-2xl">Order items</h2>
              {delivery.order.orderItems.map((item) => (
                <p key={item.id}>
                  {item.productName} {item.variantDescription || item.variantSku} × {item.quantity}
                </p>
              ))}
            </>
          )}
        </>
      )}
    </main>
  );
}
