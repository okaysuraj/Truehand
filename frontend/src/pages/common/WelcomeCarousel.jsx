import api from '../../services/api';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    label: 'Est. 2024',
    title: 'Handcrafted Heritage',
    description: 'A curated community for the discerning eye. We connect master artisans with those who appreciate the quiet luxury of objects made to last a lifetime, not just a season.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfkK7t-E95cWMxAc_PL--2EA07HgPl5DyM_crnZS7QaijIkIfgW9od5AJ7oUevEjYS2N3qQxAdxNLkyHlLJX7ZHmRg5dF10pGsjEp4Dxq39NAez-qS5Zjiyw8kRDbqYdZsMgZMaG93cdkdk7UoV92Zhknl0QeGnMkda00sBuiX9iFSP4ihIoU47iZDLquXnu9ib7noX9pujZ9qryyjuPklb5BzXbf5ert3-1Bh5zcgy5zCSaSLxeZkJw',
    featureLabel: 'Featured Material',
    featureTitle: 'Obsidian Clay',
    featureQuote: '"The soul of the earth, fired at 2200 degrees."',
  },
  {
    id: 2,
    label: 'Trusted Makers',
    title: 'Support Independent Artisans',
    description: 'When you buy from TrueHand, your payment goes directly to the artisan. No middlemen. Just honest craft and fair trade, connecting makers with those who value authenticity.',
    image: '/images/category-ceramics.jpg',
    featureLabel: 'Artisan Spotlight',
    featureTitle: 'Hand-Thrown Ceramics',
    featureQuote: '"Each vessel carries the maker\'s fingerprint."',
  },
  {
    id: 3,
    label: 'Verified Quality',
    title: 'Authenticity Guaranteed',
    description: 'Every seller is KYC-verified and every product is reviewed before going live. Shop with confidence knowing every item is genuinely handmade with integrity.',
    image: '/images/category-textiles.jpg',
    featureLabel: 'Craft Heritage',
    featureTitle: 'Woven Textiles',
    featureQuote: '"Threads that carry centuries of tradition."',
  },
];

const WelcomeCarousel = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleGetStarted = () => navigate('/register');
  const handleLogin = () => navigate('/login');

  const slide = slides[current];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <main className="min-h-screen pt-[88px] flex items-center bg-surface-linen">
      {/* Hero Section: Split Screen Carousel */}
      <section className="w-full max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-88px)] overflow-hidden">
        
        {/* Content Section (Left) */}
        <div className="flex flex-col justify-center px-margin-mobile md:px-margin-desktop bg-surface-linen z-10 relative">
          <div className="max-w-md">
            <div className="mb-stack-sm">
              <span className="font-label-md text-label-md text-terracotta uppercase tracking-widest">{slide.label}</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-forest-green mb-stack-md leading-tight">
              {slide.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg leading-relaxed">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-stack-md">
              <button
                onClick={handleGetStarted}
                className="bg-forest-green text-on-primary px-8 py-4 rounded-[4px] font-label-md text-label-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Get Started
              </button>
              <button
                onClick={handleLogin}
                className="border border-charcoal text-charcoal px-8 py-4 rounded-[4px] font-label-md text-label-md hover:bg-charcoal hover:text-white transition-all duration-300 active:scale-95"
              >
                Log In
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="mt-section-gap flex items-center gap-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[2px] transition-all cursor-pointer ${
                    i === current ? 'w-12 bg-forest-green' : 'w-8 bg-outline-variant hover:bg-forest-green'
                  }`}
                />
              ))}
              <span className="font-label-sm text-label-sm text-on-surface-variant ml-2">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Section (Right) */}
        <div className="relative overflow-hidden hidden md:block">
          <div className="h-full relative">
            {/* Image */}
            <img
              className="w-full h-full object-cover grayscale-[20%] contrast-[105%] transition-all duration-700"
              src={slide.image}
              alt={slide.title}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-forest-green/5 mix-blend-multiply" />
            {/* Feature Card */}
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm p-stack-md border border-outline-variant/30 max-w-[240px] shadow-lg">
              <p className="font-label-sm text-label-sm text-terracotta mb-1">{slide.featureLabel}</p>
              <h3 className="font-headline-md text-headline-md text-forest-green">{slide.featureTitle}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 italic text-sm">{slide.featureQuote}</p>
            </div>
          </div>
          {/* Floating Decorative Element */}
          <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-forest-green/20" />
        </div>
      </section>
    </main>
  );
};

export default WelcomeCarousel;
