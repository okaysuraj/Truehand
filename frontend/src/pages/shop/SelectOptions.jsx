import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const GLAZES = [
  {
    name: 'Speckled White',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGcftdShi8LvpSYkn5DD1Z8jyVySY75VDR2kh2Xo4WMPxzN1HZSPR5lS93OnGdDEL6TpSH-Q8kwMtb3RjZH7s14yZGOnTWs2X_e0ahUZuKc8cbyThXtdZrJMLEyyFcOQuGjJPgCmm6cCCRAfuowVhqKiC0KB1pCYnnQX7g47xk2DalqcnMZ-7wVjhgeFl6YLyUeNu7IluMwv8tE6WyBzG3zBxGSKdqFtk3SIKNiGVZiPOSqjE60ZWT8A',
  },
  {
    name: 'Iron Red',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEbtLdn8dp6E_sgd4y62n5OwPoRBxC-Bz1ZyJi8X_OqIIzsTnUXrEOz4S_r4rcK3dUJJd76W9RJAhJinfQ_31n66Iib9gTk1A8_YBjQz6EujaUfNV2SxJQumXZQ_HYc5k5oZQFpqkQ__qprZQiZDpaqY0noyIudrNT4G4RbB7X4WqKJSJF4feztm1kpYYMetY440tG29ItWSWSH6yg_L3TrV3X_o85OKgfULIIAieIWvwFSWigFZr_9g',
  },
  {
    name: 'Midnight Blue',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9YQydcS2Rg5AMv0oJeNGBu1iXMDcxKaAjSDRsRcdraeiH6R1nMYmJD7kwSjeTe2BU_0vY2NXdTNJQjW005x-4EbKtWyUpAdlIjMfPiXLtwZL3hCvQWkbCPtcYfyFhkmziLPRcPpxsxPYvbbHLYhOaKbL5Tov6-S9HsMoComFys2gYFNydFs3kGPcnu_ECS8mz7ExBcKUWG7QyPZ5LW1Q0AF_vCds0sXl6gsMHqZZy16WGGp8BC9MXQw',
  },
];

const SelectOptions = ({ onClose, onSelect }) => {
  const navigate = useNavigate();
  const [selectedGlaze, setSelectedGlaze] = useState('Speckled White');
  const [selectedSize, setSelectedSize] = useState('Medium');

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleConfirm = () => {
    if (onSelect) {
      onSelect({ glaze: selectedGlaze, size: selectedSize });
    }
    if (onClose) {
      onClose();
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="relative min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Background Context Underlay */}
      <main className="min-h-screen pt-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto filter blur-[2px] opacity-30 pointer-events-none select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-7 aspect-[4/5] bg-surface-container overflow-hidden rounded">
            <img 
              className="w-full h-full object-cover" 
              alt="The Origin Vessel" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVepdNO6Rq3cDt-MWzorfgEVWTUf1iFS81UvMjWOU0MTZ--RWYWHjoiQUxTaLhEfsyepm9rKasey23EDtAoyRfQ8_2Zh7uGr7ESdR3oekJcLS-LZQl4RSrl7icab4sS99lmcjtSeMfe-YIZecH1HglguZSlI_LQtyVfHwJyVpvYp7w2PIGsuIIT2jtHqbnJSUyWOxpi-9qkOzIUvjR4PMMMfShfRJeSq3uqLAfqHAYoBYS0UDAHuwEAw" 
            />
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-label-sm text-xs text-terracotta uppercase tracking-widest">Hand-Thrown Ceramic</span>
              <h2 className="font-display-lg text-display-lg text-forest-green">The Origin Vessel</h2>
              <p className="font-headline-md text-headline-md font-bold">$240.00</p>
            </div>
            <p className="font-body-md text-on-surface-variant">A singular piece of art, sculpted from reclaimed clay and fired with minerals sourced from the coastal ridges.</p>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-green/20 backdrop-blur-sm px-4">
        <div className="bg-white w-full max-w-[600px] shadow-2xl rounded-xl p-8 md:p-10 relative overflow-hidden flex flex-col gap-8 animate-in fade-in zoom-in duration-300">
          
          {/* Close button */}
          <button 
            onClick={onClose || (() => navigate(-1))}
            className="absolute top-6 right-6 text-on-surface-variant hover:text-forest-green transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="font-headline-lg text-headline-lg text-forest-green font-bold">Select Options</h2>
            <p className="font-body-md text-sm text-on-surface-variant">Tailor your piece to your environment</p>
          </div>

          {/* Selection Content */}
          <div className="space-y-6">
            
            {/* Glaze Selection */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="font-label-md text-xs text-forest-green uppercase tracking-wider font-semibold">Glaze</label>
                <span className="font-body-md text-xs text-on-surface-variant italic">{selectedGlaze}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {GLAZES.map((glaze) => (
                  <button
                    key={glaze.name}
                    onClick={() => setSelectedGlaze(glaze.name)}
                    className={`group flex flex-col items-center p-2 rounded-lg transition-all border ${
                      selectedGlaze === glaze.name
                        ? 'border-2 border-forest-green bg-surface-linen'
                        : 'border-outline-variant/40 hover:bg-surface-linen'
                    }`}
                  >
                    <div className="w-full aspect-square rounded overflow-hidden bg-surface-container mb-2">
                      <img className="w-full h-full object-cover" alt={glaze.name} src={glaze.image} />
                    </div>
                    <span className="font-label-sm text-xs text-center font-medium">{glaze.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="font-label-md text-xs text-forest-green uppercase tracking-wider font-semibold">Size</label>
                <span className="font-label-sm text-xs text-terracotta underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex gap-3">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 font-label-md text-xs uppercase tracking-wider rounded transition-all font-semibold ${
                      selectedSize === size
                        ? 'border-2 border-forest-green text-forest-green bg-surface-linen shadow-sm'
                        : 'border border-outline-variant/50 text-on-surface-variant hover:border-forest-green'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <span className="font-body-md text-xs text-on-surface-variant">Estimated Delivery</span>
              <span className="font-label-md text-xs text-forest-green font-semibold">Oct 24 — Nov 02</span>
            </div>
            <button 
              onClick={handleConfirm}
              className="w-full bg-forest-green py-4 text-white font-label-md text-xs uppercase tracking-[0.2em] rounded-lg hover:opacity-90 transition-all font-semibold shadow-md"
            >
              Confirm Selection
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SelectOptions;
