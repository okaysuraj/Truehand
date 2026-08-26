import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW3zV1Zw9FxQwnGFtxCXmkGyZurd5r9qGqG2VsFEeVVLHyyxuSkLPdpB4slddd-enystPEQFmd6S_EqbPvcf8wq55DCxyi7jHjvDH1VOLkZvyelydIg5m0VGnT7pbQhVu_7b1y9uCFe9ako-KOJnRDOSBQ8nVJ7Zg64jueOIsHMaQrI-o7dkahVTJl-1b_UrJOLmxKQVFTn3VPgzIkAue5IgwUbq3WgLYOqHeejGSg1a4HJYj0uO-eRw',
    alt: 'Hand-thrown Stoneware Bowl Studio View',
  },
  {
    id: 2,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByRFeBEqfPcKnd9G1vn9PdpxRROA0UnfnUjgtjy7bYEu-U-9vhVUXqihCuN3A3vnsOMaq4PhVygi940z9ggCqDunVW7e5ksErYgbDAfo2Drm8FOeUPX5H9p3o5U38YMb7RlghrGnHubCxsitF5-xLPFg-2DwLrYoorFOjlw9EjWNIvbiCjT7a-T7EsZhyJkhHSphrwjxnEzWAUJzF2akuhA25jkqlVTyGQ7SkIzx-6lFGOlhtvMSSdDg',
    alt: 'Maker stamp seal on base',
  },
  {
    id: 3,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMu1rKoo3nyDxdu0-vOfs2mJ_m-7s58r3WtPEiv1PUfyf77TcN2xG0TKFtuoOCmA3787DYf6HO9Q_a0jrFqLI7JsrUw6mLZog7Sgn2Id78ZlfAgcncaIKuE5obCI9rIKB7O9b9luKndhdgB2ESiO_3GyDFN53E5Zmr8QgGBS21C8rC6qJpBGZYkEnMGB4StkqicdFTP_N6IppKk1f2yDBihQhMJSjVas7p1FeXHNQOHFJ3Ww4d5KU0-g',
    alt: 'Lifestyle pears in bowl on raw table',
  },
  {
    id: 4,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdZjZ36uB8QE7tCJ--F2md3y35o29jlmhnvGDQQ-C-P8h0MZF0dcaFTlqH4ysnB5i9OUtrfLnhC5mDPm6WiHVCVFWLndu47fGyhT9AW-yruRgEpBSn_owqjsmWljlLIC-ftqzgF2ttFuYYvl483qI5WKtfg_seHXI6nWjV9_llZnnsUA7tJ1AB2FXFw6_yA8JR6AIhFcLUMO11RNTwnuIKYIjcrl6iofpXNLTV4H_SjYyr_H4XziqSuA',
    alt: 'Master artisan wheel throwing action',
  },
];

const ProductGallery = ({ images = GALLERY_IMAGES, title = "Hand-thrown Stoneware Bowl", collection = "Terrene", onClose }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      if (e.key === 'Escape') {
        if (onClose) onClose();
        else navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, navigate, onClose]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-linen overflow-hidden">
      
      {/* Header / Controls Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-surface-linen/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
        <div className="flex flex-col">
          <h1 className="font-headline-md text-headline-md text-forest-green tracking-tight font-bold">{title}</h1>
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">Collection: {collection}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 font-label-md text-forest-green font-semibold">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <div className="w-12 h-px bg-forest-green/30"></div>
            <span className="opacity-50">{String(images.length).padStart(2, '0')}</span>
          </div>
          
          <button 
            onClick={onClose || (() => navigate(-1))}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-forest-green group-hover:scale-110 transition-transform">close</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden px-6 md:px-12 mt-16 mb-20">
        <button 
          onClick={handlePrev}
          className="absolute left-6 md:left-12 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition-all shadow-md cursor-pointer group"
        >
          <span className="material-symbols-outlined text-forest-green group-hover:-translate-x-0.5 transition-transform text-2xl">arrow_back_ios_new</span>
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-6 md:right-12 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition-all shadow-md cursor-pointer group"
        >
          <span className="material-symbols-outlined text-forest-green group-hover:translate-x-0.5 transition-transform text-2xl">arrow_forward_ios</span>
        </button>

        <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
          <img 
            className="object-contain max-h-full max-w-full rounded-lg shadow-lg select-none transition-opacity duration-300"
            alt={images[currentIndex].alt}
            src={images[currentIndex].url}
          />
        </div>
      </section>

      {/* Thumbnails Strip */}
      <nav className="fixed bottom-0 left-0 w-full pb-8 pt-4 px-6 bg-gradient-to-t from-surface-linen via-surface-linen/90 to-transparent">
        <div className="max-w-4xl mx-auto flex justify-center gap-4 overflow-x-auto pb-2 scroll-smooth">
          {images.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 shrink-0 ${
                currentIndex === idx 
                  ? 'border-forest-green scale-105 shadow-md opacity-100' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img className="w-full h-full object-cover" alt={img.alt} src={img.url} />
            </div>
          ))}
        </div>
      </nav>

    </main>
  );
};

export default ProductGallery;
