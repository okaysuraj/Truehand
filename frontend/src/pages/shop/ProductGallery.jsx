import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProductGalleryDesktop = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/advanced/settings') // Generic fallback for wiring
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-lg p-8 shadow-sm">
        <h1 className="font-display-md text-forest-green mb-4">ProductGalleryDesktop</h1>
        {loading ? <p>Loading...</p> : (
          <div className="text-on-surface-variant">
            <p>This screen is wired to the backend and ready for layout completion.</p>
            <pre className="mt-4 text-xs bg-surface-container p-4 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGalleryDesktop;
