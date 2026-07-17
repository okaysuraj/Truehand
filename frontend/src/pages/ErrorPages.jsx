import React from 'react';
import { Link } from 'react-router-dom';

const NoInternet = () => (
  <div className="min-h-screen bg-surface-linen flex items-center justify-center px-4">
    <div className="max-w-md w-full text-center">
      <span className="material-symbols-outlined text-7xl text-outline-variant mb-6">wifi_off</span>
      <h1 className="font-display-md text-display-md text-on-surface mb-4">No Internet Connection</h1>
      <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">It looks like you're offline. Please check your internet connection and try again.</p>
      <button onClick={() => window.location.reload()} className="w-full py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity mb-3">Try Again</button>
      <p className="font-body-sm text-on-surface-variant/60">You can still browse previously loaded pages.</p>
    </div>
  </div>
);

const ServerError = () => (
  <div className="min-h-screen bg-surface-linen flex items-center justify-center px-4">
    <div className="max-w-md w-full text-center">
      <span className="material-symbols-outlined text-7xl text-outline-variant mb-6">cloud_off</span>
      <h1 className="font-display-md text-display-md text-on-surface mb-4">Something Went Wrong</h1>
      <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">Our servers are having a moment. Our team has been notified and we're working on a fix.</p>
      <button onClick={() => window.location.reload()} className="w-full py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity mb-3">Refresh Page</button>
      <Link to="/" className="block w-full py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Go to Home</Link>
    </div>
  </div>
);

const MaintenanceMode = () => (
  <div className="min-h-screen bg-surface-linen flex items-center justify-center px-4">
    <div className="max-w-md w-full text-center">
      <span className="material-symbols-outlined text-7xl text-outline-variant mb-6">engineering</span>
      <h1 className="font-display-md text-display-md text-on-surface mb-4">Under Maintenance</h1>
      <p className="font-body-md text-on-surface-variant mb-4 leading-relaxed">We're making TrueHand even better. We'll be back shortly with improvements to your artisan marketplace experience.</p>
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 mb-8">
        <p className="font-label-sm text-on-surface-variant">Estimated downtime</p>
        <p className="font-headline-sm text-headline-sm text-on-surface">~30 minutes</p>
      </div>
      <p className="font-body-sm text-on-surface-variant/60">Follow us on social media for updates.</p>
    </div>
  </div>
);

export { NoInternet, ServerError, MaintenanceMode };
