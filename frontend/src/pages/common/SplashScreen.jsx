import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/welcome');
  };

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-surface-linen">
      {/* Hero Content Wrapper */}
      <div className="relative z-10 w-full max-w-container-max px-margin-desktop flex flex-col items-center">

        {/* Logo Section */}
        <div className="mb-stack-lg text-center">
          <h1 className="font-display-lg text-display-lg text-forest-green tracking-tighter">
            TrueHand
          </h1>
          <p className="font-label-md text-label-md text-on-surface-variant mt-2 tracking-[0.2em] uppercase">
            The Art of Human Touch
          </p>
        </div>

        {/* Central High-Impact Imagery */}
        <div className="relative w-full max-w-4xl aspect-[16/9] mt-stack-lg rounded-lg overflow-hidden shadow-2xl shadow-forest-green/5">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7-jK34fhNHBPI02zAEV6SuHmWJuW2VTvK01RjDEWZE8nVZgEWG76pjDysByTUBOhiN4D9hAo0WJzKvz_ompdEN8PbNamrlkk0tQPZ7VQqXrVgU48IqpMY-rr5GvSp42oMAu9V444wqJzjMe_DUJGd8aiA71I3mCG3ayZhZ3dy0rmWkAmPDclj2Y_K9CRxdPokmIldDWd4TAWv26ATXJUQ1268V_xcDawyDLMzy6OiZSAVLRhJtPbXag')" }}
          />
          {/* Subtle Overlay Gradient for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-linen/40 to-transparent" />
        </div>

        {/* Enter Button / Action */}
        <div className="mt-section-gap flex flex-col items-center">
          <button
            onClick={handleEnter}
            className="group relative flex flex-col items-center gap-stack-sm cursor-pointer transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-full border border-forest-green/20 flex items-center justify-center group-hover:border-forest-green transition-colors duration-500">
              <span className="material-symbols-outlined text-forest-green animate-bounce">
                keyboard_double_arrow_down
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-forest-green transition-colors">
              Enter Marketplace
            </span>
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-margin-desktop hidden md:block">
        <div className="flex items-center gap-stack-md text-on-surface-variant/40">
          <div className="w-12 h-[1px] bg-outline-variant" />
          <p className="font-label-sm text-label-sm tracking-widest uppercase">Curated Gallery</p>
        </div>
      </div>
      <div className="absolute top-10 right-margin-desktop hidden md:block">
        <div className="flex items-center gap-stack-md text-on-surface-variant/40">
          <p className="font-label-sm text-label-sm tracking-widest uppercase">Established 2024</p>
          <div className="w-12 h-[1px] bg-outline-variant" />
        </div>
      </div>
    </main>
  );
};

export default SplashScreen;
