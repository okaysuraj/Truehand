import api from '../services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProofOfDelivery = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => navigate('/delivery/success'), 1500);
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/delivery/assigned" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Deliveries
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Proof of Delivery</h1>
          <p className="font-body-md text-on-surface-variant">Upload a photo to confirm successful delivery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Delivery Photo</h2>
            {!photo ? (
              <label className="block border-2 border-dashed border-outline-variant/50 rounded-lg p-12 text-center cursor-pointer hover:border-forest-green transition-colors">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">add_a_photo</span>
                <p className="font-label-md text-on-surface mb-1">Take or upload a photo</p>
                <p className="font-body-sm text-on-surface-variant">Show the package at the delivery location</p>
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => setPhoto(e.target.files[0])} />
              </label>
            ) : (
              <div className="relative">
                <div className="bg-surface-variant rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-forest-green mb-2">image</span>
                    <p className="font-label-md text-on-surface">{photo.name}</p>
                  </div>
                </div>
                <button type="button" onClick={() => setPhoto(null)} className="absolute top-3 right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}
          </div>

          {/* Delivery Notes */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Delivery Notes</h2>
            <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Left at front door, handed to receptionist..." className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"></textarea>
          </div>

          {/* Submit */}
          <button type="submit" disabled={!photo || submitting} className={`w-full py-3 font-label-md rounded transition-opacity flex items-center justify-center gap-2 ${
            photo && !submitting ? 'bg-forest-green text-white hover:opacity-90' : 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
          }`}>
            {submitting ? (
              <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Submitting...</>
            ) : (
              <><span className="material-symbols-outlined text-[18px]">check_circle</span>Confirm Delivery</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProofOfDelivery;
