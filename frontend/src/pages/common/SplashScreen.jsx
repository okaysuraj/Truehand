import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const SplashScreen = () => {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 md:px-8 text-center">
        <h1 className="font-display-md text-display-md text-on-surface mb-4">Splash</h1>
        <p className="font-body-md text-on-surface-variant mb-8">This page is currently under construction. Check back soon for updates!</p>
        <Link to="/" className="px-6 py-3 bg-forest-green text-white font-label-md rounded-lg hover:bg-forest-green/90 transition-colors shadow-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default SplashScreen;
