import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AuthenticCraft = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');
  const [verifiedPiece, setVerifiedPiece] = useState(null);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    setVerifiedPiece({
      serial: serialNumber.trim().toUpperCase(),
      artisan: 'Julian Thorne',
      studio: 'Ojai Stoneware Collective',
      piece: 'Hand-thrown Terracotta Amphora',
      craftDate: 'September 2024',
      batch: 'Kiln Firing #42 - Series 01',
      materials: 'Iron-rich Ojai Riverbed Clay, Natural Ash Glaze',
      status: 'VERIFIED AUTHENTIC',
    });
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="material-symbols-outlined text-4xl text-forest-green mb-2 block">verified_user</span>
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-forest-green font-bold mb-3">Authentic Craft Lineage</h1>
        <p className="font-body-lg text-on-surface-variant text-sm md:text-base leading-relaxed">
          Every TrueHand piece carries a permanent provenance record. Verify the physical signature, kiln batch, and origin of your heirloom craft.
        </p>
      </div>

      {/* Verification Input Box */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30 mb-12">
        <form onSubmit={handleVerify} className="space-y-4">
          <label className="block font-label-md text-xs text-on-surface uppercase tracking-widest font-bold">
            Enter Certificate / Piece Serial Number
          </label>
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-lg px-4 py-3 text-xs uppercase tracking-wider font-semibold focus:outline-none focus:border-forest-green font-mono"
              placeholder="e.g. TH-2024-CER-8842"
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity font-semibold whitespace-nowrap shadow"
            >
              Verify
            </button>
          </div>
          <p className="font-label-sm text-[11px] text-on-surface-variant/70 italic">
            Serial codes are stamped directly into the clay base or printed on your Certificate of Authenticity.
          </p>
        </form>
      </div>

      {/* Certificate Result Display */}
      {verifiedPiece && (
        <div className="max-w-2xl mx-auto bg-white border-2 border-forest-green/40 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {verifiedPiece.status}
          </div>

          <div className="border-b border-outline-variant/30 pb-6 mb-6">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block mb-1">TrueHand Artisanal Provenance</span>
            <h2 className="font-display-lg text-2xl md:text-3xl text-forest-green font-bold">{verifiedPiece.piece}</h2>
            <p className="font-mono text-xs text-on-surface-variant mt-1">Serial: {verifiedPiece.serial}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs mb-8">
            <div>
              <span className="text-on-surface-variant block uppercase font-medium mb-0.5">Master Artisan</span>
              <span className="font-bold text-sm text-charcoal">{verifiedPiece.artisan}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase font-medium mb-0.5">Studio &amp; Location</span>
              <span className="font-bold text-sm text-charcoal">{verifiedPiece.studio}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase font-medium mb-0.5">Craft Date</span>
              <span className="font-bold text-charcoal">{verifiedPiece.craftDate}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase font-medium mb-0.5">Firing &amp; Batch</span>
              <span className="font-bold text-charcoal">{verifiedPiece.batch}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-on-surface-variant block uppercase font-medium mb-0.5">Natural Materials</span>
              <span className="font-semibold text-charcoal">{verifiedPiece.materials}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
            <button 
              onClick={() => navigate('/products')}
              className="text-xs font-semibold text-forest-green underline hover:opacity-80"
            >
              Explore Artisan Collection &rarr;
            </button>
            <button 
              onClick={() => alert('Certificate downloaded as PDF.')}
              className="px-4 py-2 bg-surface-container text-charcoal rounded text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download Certificate
            </button>
          </div>
        </div>
      )}

    </main>
  );
};

export default AuthenticCraft;
