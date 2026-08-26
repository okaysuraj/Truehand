import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ArtisanProfile1 = () => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-20 bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-[20s] hover:scale-105" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_xKxv6DT0oUzCZnmBvU32oqLSzdqlMfjYFHl105jkAJ4g8K9zHMu80UNWkfWpbBZhrq-g5Xs5hySj2-bdmauo5CBm3CM6bhNpHdNaux0612xBiwp1Z_Z296vbwhPS3mB-Bafg22hwlPLxKHCxvGLGs80mumgTsSrxOybBdn9_4zC5uOC5QiCvn0grPRaqmiVCdB6iuKlWJhMNI1mV_OcavMTJKxIhYRKlycqK7hDRwOMjoZ0ls4nkTw')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-margin-mobile md:px-margin-desktop pb-12 md:pb-16 max-w-container-max mx-auto text-white">
          <div className="max-w-3xl">
            <span className="font-label-md text-xs tracking-[0.2em] uppercase text-emerald-300 mb-2 block font-semibold">Featured Artisan</span>
            <h1 className="font-display-lg text-4xl md:text-6xl lg:text-7xl leading-tight font-bold mb-3">Studio Arancia</h1>
            <p className="font-headline-md text-lg md:text-xl italic text-white/90">Curating the intersection of organic form and Florentine heritage.</p>
          </div>
        </div>
      </section>

      {/* Editorial Feature Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Sidebar: Profile Info */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6 border-b lg:border-b-0 lg:border-r border-outline-variant/30 pb-8 lg:pb-0 lg:pr-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-md shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Elena Rossi" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2sRUlMHYAqunDu0S0UGudA_km7cwaxcOZpcG_0GYVpEcDfdmAYF1FuSy4WMGLT3Ej-EsVBBfHBDxxAajhVIxE_5Ebyr6AhRy_Ayt3al5UM29KeaSXVxiFG1zojjZ9aTmlIfi_UXHM6Uj2PwPs1F79y5o7rlLV1R_zkAMsDBM1Zu7OsoK3YMxiGG37arkMmn4pcdlNnlS70P7iadQnbGw6tERZLHSMZXAi1vbdJ-qSuuFVmIUqd5-5hA" 
              />
            </div>
            <div>
              <h2 className="font-headline-md text-xl text-forest-green font-bold">Elena Rossi</h2>
              <p className="font-label-md text-xs text-on-surface-variant">Founder &amp; Master Artisan</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-terracotta text-[18px]">location_on</span>
              <span className="font-body-md">Florence, Italy</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-terracotta text-[18px]">calendar_today</span>
              <span className="font-body-md">Artisan since 2015</span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <span className="material-symbols-outlined text-terracotta text-[18px] mt-0.5">architecture</span>
              <div>
                <span className="font-label-md font-semibold block mb-1">Materials</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Tuscan Clay', 'Iron-Oxide Glaze', 'Recycled Oak'].map(m => (
                    <span key={m} className="bg-surface-container px-2.5 py-1 font-label-sm text-[11px] text-charcoal rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setFollowing(!following)}
            className={`w-full py-3 font-label-md text-xs uppercase tracking-wider rounded transition-all font-semibold shadow-sm ${
              following 
                ? 'bg-surface-container text-forest-green border border-forest-green' 
                : 'bg-forest-green text-white hover:bg-forest-green/90'
            }`}
          >
            {following ? 'Following Studio' : 'Follow Studio'}
          </button>

          <div className="pt-6 border-t border-outline-variant/30">
            <p className="font-label-sm text-xs text-on-surface-variant italic leading-relaxed">
              "My work is a conversation between the weight of tradition and the lightness of a modern silhouette."
            </p>
          </div>
        </aside>

        {/* Main Content: Bio & Editorial */}
        <article className="lg:col-span-8 lg:pl-6 space-y-16">
          
          <div className="space-y-4">
            <h3 className="font-headline-lg text-2xl text-forest-green border-b-2 border-terracotta inline-block pb-1 font-bold">The Essence of Form</h3>
            <div className="font-body-lg text-sm md:text-base text-on-surface leading-relaxed space-y-4">
              <p>Elena Rossi founded Studio Arancia with a singular vision: to strip away the noise of mass production and return to the tactile intimacy of hand-worked clay. Based in the heart of Florence, her studio operates as a sanctuary for slow craft.</p>
              <p>Each piece is thrown on a manual wheel, a process that ensures no two silhouettes are ever identical. Elena’s aesthetic is deeply influenced by the architectural shadows of the Renaissance, translating historic structural integrity into minimalist, functional art for the contemporary home.</p>
            </div>
          </div>

          {/* Process Section */}
          <div className="space-y-8" id="process">
            <h3 className="font-headline-lg text-2xl text-forest-green font-bold">The Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-3">
                <div className="aspect-[4/5] overflow-hidden rounded-lg group shadow-sm">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt="Centering" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC_uMpUnjnz4mmpVa6G4sdc_Cwq-xs-FUfPGzYSV_eB4N3JY1VTylryqYt41EnZFFkH7DoQka9fglulDGp14XWpHEZcsMpIMzPQj7FKIX5gUvKClhFc2pwWRz7mXKxJwrnwF3g7vGb3Q4o6hv3wd8PV5mzj6_wDFP9p8VpKDwSc9CyG2rFbmoNf6KweSVxrKruGW_CD-yUmeUbALTOG5uPk6vzkygHNO3rQdiAR0d4gT4kizKlJmUMHA" 
                  />
                </div>
                <h4 className="font-label-md text-xs text-terracotta uppercase tracking-wider font-bold">I. Centering</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  The foundation of every piece begins with the raw Tuscan clay, prepared and wedged by hand to eliminate air, ensuring structural purity from the very first touch.
                </p>
              </div>

              <div className="space-y-3 md:pt-8">
                <div className="aspect-[4/5] overflow-hidden rounded-lg group shadow-sm">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt="Transformation" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD6sglOUXdi0EKyKYA5EYuK1dJYUYk7k_wM5g-BxMEQIitKS76-eArshj7_EeLUwKN0S-gsi9bPJbYRy78XnwxAR1t_ixxeBPajve4tSomfnYrXNY77TRgiCEOQvxX5QtstB-hJ31AvFeSkwB9BRenyywbIGDZmphq59XGD1JH_fQLaXkf5CwhGwcnmFZgAuJzdbLpAYvqU9ZTUmwUbIiDbKMrNrcs5xcRVRxc8VMM-Fx5NFAxWcRLqw" 
                  />
                </div>
                <h4 className="font-label-md text-xs text-terracotta uppercase tracking-wider font-bold">II. Transformation</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Through a triple-fire process reaching temperatures of 1200°C, the organic matter is vitrified, locking in the iron-oxide glazes that define the Studio's signature palette.
                </p>
              </div>

            </div>

            <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/20">
              <blockquote className="font-headline-md text-base md:text-lg text-forest-green italic text-center leading-relaxed">
                "We do not seek perfection in the industrial sense. We seek the perfection of the hand’s slight tremor, the proof that a human was here."
              </blockquote>
            </div>
          </div>

          {/* Curated Collection Interstitial */}
          <div className="relative h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <img 
              className="w-full h-full object-cover" 
              alt="Curated Collection" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3qMpRGiS5tKmtvFiThRxUcevw4OUiUxlCa3xEM_TtvmkUb8hHJT0VszjjUz_9IUUfXtIsfOrQuoO9a7LHXSyw1ydPPhgKTD5dFl-VNcW7PzSUrgQELa62_03ArlUVo6YBy9ePaWjr5iQFuB1qLni2TaUQ4HyVyccbvfuMD7IYm8kGxHS2zJZ7-lQR0PXcUYM7S8Cu9rwvcRZEsQ6DiaBfdKd3UgOoUAwDsXRVke3Yyw7C624ykBAAdw" 
            />
            <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center p-6">
              <div className="bg-white/95 backdrop-blur-md p-8 max-w-md text-center rounded-xl shadow-2xl">
                <h5 className="font-headline-md text-xl text-forest-green mb-2 font-bold">The Curated Collection</h5>
                <p className="font-body-md text-xs text-on-surface-variant mb-4">Explore pieces designed to last generations.</p>
                <button 
                  onClick={() => navigate('/products?artisan=Elena%20Rossi')}
                  className="font-label-md text-xs uppercase tracking-wider text-terracotta border-b border-terracotta hover:text-forest-green hover:border-forest-green transition-all font-bold"
                >
                  Shop Elena's Work &rarr;
                </button>
              </div>
            </div>
          </div>

        </article>

      </section>

    </main>
  );
};

export default ArtisanProfile1;
