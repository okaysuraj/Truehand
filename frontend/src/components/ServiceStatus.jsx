import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { createServiceStatusHook } from '../../../shared/service-status';
const useServiceStatus = createServiceStatusHook(React, api);
export default function ServiceStatus() {
  const state = useServiceStatus();
  return (
    <main className="min-h-screen pt-32 p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl text-forest-green font-display-lg">Service status</h1>
      {state.loading ? (
        <p role="status">Checking connection…</p>
      ) : state.error ? (
        <p role="alert">{state.error}</p>
      ) : (
        <>
          <p>{state.data.maintenanceMode ? 'Maintenance is enabled.' : 'Connected to TrueHand.'}</p>
          {state.data.message && <p>{state.data.message}</p>}
        </>
      )}
      <button disabled={state.loading} className="border p-3" onClick={state.retry}>
        Retry connection
      </button>
      <Link className="block underline" to="/">
        Return to marketplace
      </Link>
      <Link className="block underline" to="/features/help">
        Help
      </Link>
    </main>
  );
}
