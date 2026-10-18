import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function LocationAccess() {
  const [state, setState] = useState({ busy: false, position: null, error: '' });
  function request() {
    if (!navigator.geolocation) {
      setState({
        busy: false,
        position: null,
        error: 'Location access is unavailable in this browser.',
      });
      return;
    }
    setState({ busy: true, position: null, error: '' });
    navigator.geolocation.getCurrentPosition(
      (position) => setState({ busy: false, position: position.coords, error: '' }),
      (error) =>
        setState({
          busy: false,
          position: null,
          error: error.message || 'Unable to get your location.',
        }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }
  return (
    <main className="min-h-screen pt-32 p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="font-display-lg text-4xl text-forest-green">Location access</h1>
      <p>
        Location access supports address coordinates and delivery tracking. Couriers can share their
        location from an assigned delivery while that screen is open.
      </p>
      <button className="border p-3" disabled={state.busy} onClick={request}>
        {state.busy ? 'Getting location…' : 'Allow location access'}
      </button>
      {state.error && <p role="alert">{state.error}</p>}
      {state.position && (
        <p>
          Reported location: {state.position.latitude.toFixed(6)},{' '}
          {state.position.longitude.toFixed(6)}. Accuracy: {Math.round(state.position.accuracy)} m.
        </p>
      )}
      <Link className="block underline" to="/">
        Return to marketplace
      </Link>
    </main>
  );
}
