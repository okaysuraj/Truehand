import api from '../services/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    icon: 'palette',
    title: 'Discover Authentic Craft',
    subtitle: 'Every piece tells a story',
    description: 'Explore thousands of handcrafted items made by independent artisans from around the world. From ceramics to textiles — real craftsmanship, direct to you.',
    accent: 'text-forest-green',
    bg: 'from-forest-green/5 to-transparent',
    cta: 'Explore Collections',
  },
  {
    id: 2,
    icon: 'storefront',
    title: 'Support Independent Artisans',
    subtitle: 'Makers behind every piece',
    description: 'When you buy from TrueHand, 100% of your payment goes directly to the artisan. No middlemen. Just honest craft and fair trade.',
    accent: 'text-terracotta',
    bg: 'from-terracotta/5 to-transparent',
    cta: 'Meet the Makers',
  },
  {
    id: 3,
    icon: 'verified',
    title: 'Verified & Trusted',
    subtitle: 'Authenticity guaranteed',
    description: 'Every seller is KYC-verified and every product is reviewed before going live. Shop with confidence knowing every item is genuinely handmade.',
    accent: 'text-charcoal',
    bg: 'from-charcoal/5 to-transparent',
    cta: 'Get Started',
  },
];

const WelcomeCarousel = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/login');
    }
  };

  const skip = () => navigate('/login');

  const slide = slides[current];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="min-h-screen bg-surface-linen flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background decoration */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-700 pointer-events-none`} />

      {/* Skip */}
      <button
        onClick={skip}
        className="absolute top-8 right-8 font-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
      >
        Skip
      </button>

      {/* Content */}
      <div className="relative max-w-md w-full text-center">

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-lg flex items-center justify-center mx-auto mb-8 transition-all duration-500">
          <span className={`material-symbols-outlined text-5xl ${slide.accent}`}>{slide.icon}</span>
        </div>

        {/* Text */}
        <p className={`font-label-sm uppercase tracking-wider mb-3 ${slide.accent}`}>{slide.subtitle}</p>
        <h1 className="font-display-sm text-display-sm text-on-surface mb-4 leading-tight">{slide.title}</h1>
        <p className="font-body-md text-on-surface-variant leading-relaxed mb-12">{slide.description}</p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-8 h-2.5 bg-forest-green' : 'w-2.5 h-2.5 bg-outline-variant/40'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={next}
          className="w-full py-4 bg-forest-green text-white font-label-lg rounded-xl hover:opacity-90 transition-opacity text-lg flex items-center justify-center gap-2"
        >
          {slide.cta}
          <span className="material-symbols-outlined text-[20px]">
            {current < slides.length - 1 ? 'arrow_forward' : 'login'}
          </span>
        </button>

        {current === 0 && (
          <button
            onClick={() => navigate('/register')}
            className="w-full py-4 mt-3 border border-outline-variant text-on-surface font-label-lg rounded-xl hover:bg-surface-container transition-colors"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeCarousel;
