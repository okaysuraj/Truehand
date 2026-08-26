import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DealsOffers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-24 bg-surface text-on-surface font-body-md min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[614px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCw_RA63qjUpSWoT9vo8SAOoEryhAHwGQ8_pT78K0mFTNeV2Bidpui4qY8nM7cZGaOxAMqoLeww7hdYV0625cj0RvKhgXr1oYM4SYeZ_pjB4iryOQ_M20O2B7NmYRAjKLwLwjkpi5IqUI-eFrcXfyXv8Xhfv6wNfW5hwohs4hsQHlOu83h93zZeBpmP5ED3liBF8Py9NTHJr367AUaH2y2pXf7ByOl0B0geSzGg_HDZpUXlOhQw4y3-9Q')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-linen/90 via-surface-linen/50 to-transparent"></div>
        
        <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="max-w-2xl">
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-forest-green mb-3 block font-semibold">Limited Release</span>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-4 leading-tight">Seasonal Curations</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              A deliberate selection of masterworks from our collective's latest cycles. Each piece carries the distinct rhythm of the maker's hand and the season's unique atmospheric influence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Canvas */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 space-y-24">
        
        {/* End of Season Kiln Firing */}
        <section className="grid grid-cols-12 gap-gutter items-center">
          <div className="col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/2] relative overflow-hidden rounded-lg group shadow-sm">
            <div 
              className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaV5zg5e1WixEehVmJo05h2uukB4pg7nIZAbLLU6NvaFPWgPK53NlTtfa_Ym6eymgSRtyJ9Z8lBQNaSXAS3-mHYS_KH_p3_rAOc2nxELzSrJjhhzMJO0NB0k03ighT0ryWJe52JdS0z7y7xZhPpUIjIX-A3c0woyO2o2Dj-2_pAuCrdDqHy2A0uty7h2qRID3zcU_9tG2qVuEHEbIVZn0tOItuuqMzW5u13-8QXHPfHGlpJ7VhCx6uTQ')" }}
            />
          </div>
          <div className="col-span-12 md:col-span-5 px-2 md:px-8 flex flex-col justify-center">
            <h2 className="font-headline-lg text-headline-lg mb-3 text-on-surface">End of Season Kiln Firing</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic leading-relaxed">
              The final reduction firing of the winter cycle. These ceramics bear the 'fire-kissed' marks of high-temperature variation, resulting in unique, unrepeatable glaze patterns.
            </p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-label-md text-label-md text-forest-green font-semibold">FROM</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">$120</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant line-through">$185</span>
            </div>
            <button 
              onClick={() => navigate('/products?category=Ceramics')}
              className="w-fit bg-forest-green text-white font-label-md text-label-md px-8 py-3 rounded hover:opacity-90 transition-opacity shadow-sm"
            >
              EXPLORE CERAMICS
            </button>
          </div>
        </section>

        {/* Weaver's Reserve */}
        <section className="grid grid-cols-12 gap-gutter items-center">
          <div className="col-span-12 md:col-span-5 order-2 md:order-1 px-2 md:px-8 flex flex-col justify-center items-start md:items-end text-left md:text-right">
            <h2 className="font-headline-lg text-headline-lg mb-3 text-on-surface">Weaver's Reserve</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic leading-relaxed">
              A curated archive of limited-run textiles. Hand-loomed using heirloom organic cotton and naturally dyed using pomegranate rind and indigo. Soft, tactile, and heavy-weighted for the changing seasons.
            </p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-label-md text-label-md text-forest-green font-semibold">OFFERING</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">30% OFF</span>
            </div>
            <button 
              onClick={() => navigate('/products?category=Textiles')}
              className="w-fit border border-charcoal text-on-surface font-label-md text-label-md px-8 py-3 rounded hover:bg-charcoal hover:text-white transition-all shadow-sm"
            >
              VIEW TEXTILES
            </button>
          </div>
          <div className="col-span-12 md:col-span-7 order-1 md:order-2 aspect-[4/5] md:aspect-[3/2] relative overflow-hidden rounded-lg group shadow-sm">
            <div 
              className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_IeYoKyN7pqQM8RRQ8b2-oudlAnswLOqFOGOHWEcsF5ejcb40ozFUrlB57AputxIMzXfpceFUJEVb0l3FW_jIgoF9dBSskVcCst7q-zxPh6Hlz6Tbm-NF_DiBDAemzR4aqeRpL9fCTIuVHOo2LtqnFzFqMFXysXOOUKcWZS3JNeKyypawQUfxit1rlxD_-XlATkSzZLgLvDQGsmg6qRnSUJDDKUQcHnSrTnHoPIXWtMqpKvaqzMwVQQ')" }}
            />
          </div>
        </section>

        {/* Salvaged Walnut Series (Bento Grid Style) */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Salvaged Walnut Series</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Reclaimed timber from fallen orchard trees, transformed into functional sculpture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Featured Item */}
            <div 
              onClick={() => navigate('/products?category=Woodwork')}
              className="md:col-span-2 relative h-[400px] md:h-[500px] group overflow-hidden bg-white rounded-lg cursor-pointer shadow-sm"
            >
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Orchard Dining Slab" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByKYtxo3xE-Hx6YH5T6pQ02NkeNuDDcAE8wgJsSbGjItMRPZt0XoJNxBrvDd6R1OL0Ux511gSeu0IWt2dR3bUwZHqwPuaA7V5IMROkHgTGAnkHXzq3J7v3wHCYnHH0Xmc3sL4Re8lcSTEU5yFcY8_TXtXX7Bxevii2OFiachpZoo3BYYbdDC9GWY9Xbp3E42sTGZD6frSZm7VkUS58Uifg846gqy-BS5Slz7BN269-ko2LBjkXKZA9kw"
              />
              <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent w-full text-white">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-surface-linen mb-1 block opacity-90">Featured Masterwork</span>
                <h3 className="font-headline-md text-headline-md text-white">Orchard Dining Slab</h3>
                <p className="font-label-md text-label-md mt-2 text-white font-semibold">$2,450 <span className="opacity-70 ml-2 line-through font-normal">$3,100</span></p>
              </div>
            </div>

            {/* Secondary Items */}
            <div className="flex flex-col gap-gutter">
              <div 
                onClick={() => navigate('/products?category=Woodwork')}
                className="h-[200px] md:h-[238px] group overflow-hidden relative bg-white rounded-lg cursor-pointer shadow-sm"
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Walnut serving board" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7Cw9auyTpUKOLL964JRU5IK6JhyYrmpZtvbw2Bjwff4L4lyCL86jScPiD9EWIYxbLRue40iFU-QvzI44ykUqbLjtetR-xIcleSicPJ2dn0fjMyvi9hgNKIqD30TITVZuscayK0kGsaeXWu09ftpSxqPmSIBVATvSbGGh_1Xb2zlrzj2I0oqln042Tw8Gxs1BWqWrYmNix21KatM2xH_OamHxHe9_QFIAghmSQReo_NsWJ2Px1ONeEWw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-surface text-on-surface px-4 py-2 font-label-md text-label-md rounded shadow">QUICK VIEW</span>
                </div>
              </div>
              
              <div 
                onClick={() => navigate('/products?category=Woodwork')}
                className="h-[200px] md:h-[238px] group overflow-hidden relative bg-white rounded-lg cursor-pointer shadow-sm"
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Walnut stools" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw7OooGn46sNErwfzPccKUNJtOIwUqnGgkbANxPB7duHiUxdBt9_pdpyKXK7H7wCaJ0a8JKOWFkD_nbPDZ9PRGD3h-kHV7BcPVjOYlkf34SjesPEHC11UZcDfCXFV2F9v3Zkz3sKLZjLq0WsiU_ABFBRXLtQNfGjNGTv47XGLN814M0cWz6pWUtPzyAA0PWTWke0Ts4rgE7lmT15-NBm7Jc000LaVP6FxH0LGmo9XGSBUUqx-IR6v8Ow"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-surface text-on-surface px-4 py-2 font-label-md text-label-md rounded shadow">QUICK VIEW</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Atmospheric Quote Module */}
      <section className="bg-surface-container-low py-20 text-center border-t border-outline-variant/20">
        <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop">
          <span className="material-symbols-outlined text-forest-green mb-6 text-[40px]">format_quote</span>
          <p className="font-headline-md text-headline-md italic text-on-surface leading-relaxed">
            "Craft is the antidote to the temporary. It is the language of things built to endure, to age with grace, and to tell the story of the hands that held them."
          </p>
          <div className="mt-8 w-12 h-[1px] bg-outline-variant mx-auto"></div>
          <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mt-6 font-semibold">The Aesthete Manifesto</p>
        </div>
      </section>

    </main>
  );
};

export default DealsOffers;
