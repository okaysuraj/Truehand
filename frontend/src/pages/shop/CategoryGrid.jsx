import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CategoryGrid = () => {
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-28 pb-20 bg-surface-linen min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header Section */}
        <header className="mb-12 max-w-2xl">
          <span className="font-label-md text-label-md text-terracotta uppercase tracking-[0.2em] mb-2 block">Master of Craft</span>
          <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-forest-green mb-4 leading-tight">Curated Disciplines</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Discover the foundational elements of our marketplace. Each category represents a lifelong commitment to material, form, and the human spirit.
          </p>
        </header>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Large Featured: Ceramics */}
          <Link to="/products?category=Ceramics" className="md:col-span-8 group cursor-pointer overflow-hidden block">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-sm">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700 z-10"></div>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0jb_KY7xqr4HNhh7aUOOuYoS0JDQHlVCt02s7bfgFQCgXmGwSaaGW6O5gONtvDRN3zxASe_qNh5DOCDiZxHsbLKP7gc35gUlBxgGHMrjeJPLiAEKBNSqswyf42aTW8M3GXyBVzQXrNwtTEQgjHfLzTZHie-zfkhdLx_rsJAxanrpvgYPfStMgRmrC33ia-8lxM7A9OVoot7enGv9owu6Zjxr8niQg7njrOEJF7S_m0Ev2ZHLx5ZvKyQ')" }}
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h2 className="font-headline-lg text-headline-lg mb-1">Ceramics</h2>
                <p className="font-label-md text-label-md uppercase tracking-widest opacity-90">Earth &amp; Fire</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-start">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">From raw clay to vitrified porcelain, explore vessels that bridge the gap between utility and art.</p>
              <span className="material-symbols-outlined text-forest-green group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          {/* Vertical Card: Woodwork */}
          <Link to="/products?category=Woodwork" className="md:col-span-4 group cursor-pointer block">
            <div className="relative h-[calc(100%-2.5rem)] flex flex-col">
              <div className="relative flex-grow overflow-hidden rounded-lg shadow-sm min-h-[260px]">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700 z-10"></div>
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaXYGgHUWsgsda61YHdHQhI47rhrxIU3zYTnJUMRcVAxOUOIt4EI-OsAu2LdLMhy19eOx5Ppq6ckaIa5WmyDgjA-mquVnkKxevZyAdUZXNOW8xoEmivWnY8ON6og-V7UMYyYPY53Sdq-R47epVhtYzQZMqvvohrLORoM60772Y6YB8WYidRPomdVFDQxa2-6yQhLagQHPrUAk3W5Oab30L2tQwqBRJXFck6qrTW24_bPitWpJzA8V9mA')" }}
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                  <h2 className="font-headline-lg text-headline-lg mb-1">Woodwork</h2>
                  <p className="font-label-md text-label-md uppercase tracking-widest opacity-90">Grain &amp; Structure</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-body-md text-body-md text-on-surface-variant">Heirloom furniture and objects carved from sustainably sourced timber.</p>
              </div>
            </div>
          </Link>

          {/* Square Card: Textiles */}
          <Link to="/products?category=Textiles" className="md:col-span-4 group cursor-pointer block">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700 z-10"></div>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk4TjnFVq-mEs6Kd7KU9P0cr1dj2pr6FaSuuI7GRkoJAu23chXpvkcwSt0i6akrYRorzy2fmUCPYeE6aZuhC8PF2rfJvSTxOTNNFWJmHn0LOPqXmx1hFj5p9Sohf8kDV34QQqcm25oRVvPt2uOgGqvVYK39CJyibXGLbzx9Rj4S27oZ4TF4MRusFni5a3nIL5qM_T55ixHOTS_Kf-zuQZuCqX9uUr2RWLnBmNjm7RAo39sSRrC_0c5kQ')" }}
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h2 className="font-headline-lg text-headline-lg mb-1">Textiles</h2>
                <p className="font-label-md text-label-md uppercase tracking-widest opacity-90">Thread &amp; Weave</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="font-body-md text-body-md text-on-surface-variant">Hand-loomed fabrics and hand-dyed fibers for the modern home.</p>
            </div>
          </Link>

          {/* Wide Card: Glassware */}
          <Link to="/products?category=Glassware" className="md:col-span-8 group cursor-pointer block">
            <div className="relative aspect-[16/7] overflow-hidden rounded-lg shadow-sm">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700 z-10"></div>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTnrEV0-T20TGmHaLyc2kiZo-9C6BITOnNO5m6-tEROdFhouPN8eow_ZnFUsSlRMdaEXqki5EMVI5VqDmij7p_DRmPMyGTC6yXhFov3pczjUyIAz98KjGYkWFXS-2EvQy_7QavU4Ja4YbO7HPybT08tSGK69aGdtFnhc5a06rGqYSZ1LDJvWzKwR2qGeP4eVY5mLuEnTUxIMxLHPwrvzcnPz3LRzfh2j2qp5WvFgx29lG0zNTL-dc5pw')" }}
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h2 className="font-headline-lg text-headline-lg mb-1">Glassware</h2>
                <p className="font-label-md text-label-md uppercase tracking-widest opacity-90">Light &amp; Clarity</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-start">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Ethereal forms captured in molten state, then cooled into timeless transparency.</p>
              <span className="material-symbols-outlined text-forest-green group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

        </div>

        {/* Artisan Spotlight Banner */}
        <section className="mt-16 bg-surface-container p-8 md:p-16 rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <h3 className="font-label-md text-label-md text-terracotta uppercase tracking-widest mb-3">Behind the Discipline</h3>
            <h2 className="font-headline-lg text-headline-lg text-forest-green mb-4 leading-snug">"Craft is the visible bridge between the heart and the physical world."</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">Learn about our rigorous selection process and the artisans who define contemporary craft.</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-forest-green text-white px-8 py-4 rounded-lg font-label-md hover:bg-forest-green/90 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-md"
            >
              Meet Our Artisans
            </button>
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-surface-linen shadow-lg">
              <img 
                className="w-full h-full object-cover" 
                alt="Silvia Moretti, Master Ceramicist" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6r8hygdKEtH2Q3XdTDS26VTlr879gmk8NeCIoA3OB9SVc2v2S8kbECOa9ENqj4-kLgNWarFLazufk4yETd2AS2tEvBFSOJsDL38Ajt9nAfgxKRh6Ub9MSBTja5-hGTytaZyXpmMDrCEPeuaF0jnahS1gNApPLiNw0OeytMVstgxinDN5GV5rl3xuZYUy-7IE_3acU96QkhAwpNNewPhrj-OBYB8R-Ua9Zx1p-BwH78f9hh5Hn70kXdQ" 
              />
            </div>
            <div className="absolute bottom-2 right-4 md:right-8 bg-white p-4 rounded-lg shadow-md max-w-[200px]">
              <h4 className="font-headline-sm text-sm text-forest-green font-bold">Silvia Moretti</h4>
              <p className="font-label-sm text-xs text-on-surface-variant">Master Ceramicist, Umbria</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default CategoryGrid;
