import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Subcategories = () => {
  const { category = 'Ceramics' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-24 bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      
      {/* Page Title & Breadcrumb Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 border-b border-outline-variant/20">
        <nav className="flex items-center gap-2 mb-4 text-label-sm text-on-surface-variant opacity-60">
          <Link to="/" className="hover:text-forest-green">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/categories" className="hover:text-forest-green">Materials</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-semibold">{category}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-display-lg text-display-lg text-forest-green mb-4">{category}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              From primitive pit-firing to modern high-tech kilns, our ceramic collection celebrates the fundamental dialogue between earth, water, and heat.
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid: Asymmetric Layout */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 space-y-24">
        
        {/* Section 1: Earthenware (Left Large Image) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 overflow-hidden rounded-lg shadow-sm">
            <img 
              className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700" 
              alt="Earthenware Pottery" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCUeHB-U-t0KyLvf5-Tm519rsVEMUN5qLiZ4nu_ohZ-U8FXpa0v24NwU6of5GULSl_YoPVIA_B3_j1DC436eqet6mYB-JDPhSy7hRVDfxIlEQKyRXMtsJ2dazqJdfHxU-Yr0o0fMt2WgCF0MpbXFdL7hrlSsIImmxRGGLUY4nmtZSqz2s2lOc_XBiHg-qRpYjNC_RGmkq5g-tnAOUhV7xn-V8nVarkW2lJE9ynx6LsYkmJrqEYjnJHoA"
            />
          </div>
          <div className="lg:col-span-5 lg:pl-8 space-y-4">
            <span className="font-label-sm text-label-sm tracking-widest text-secondary uppercase font-semibold">The Foundation</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Earthenware</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Characterized by its porous nature and warm, terrestrial hues, earthenware is the most ancient form of pottery. Fired at lower temperatures, these pieces retain a tactile connection to the raw clay, offering an organic, matte finish that breathes.
            </p>
            <ul className="space-y-2 py-4">
              <li className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Hand-burnished surfaces
              </li>
              <li className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Natural terracotta and clay pigments
              </li>
            </ul>
            <Link 
              to="/products?category=Ceramics&tag=earthenware"
              className="inline-flex items-center gap-3 bg-forest-green text-white px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-opacity-90 transition-all shadow-sm"
            >
              Explore Collection
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Section 2: Stoneware (Right Large Image) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 lg:order-1 order-2 space-y-4 lg:pr-8">
            <span className="font-label-sm text-label-sm tracking-widest text-secondary uppercase font-semibold">Everyday Resilience</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Stoneware</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Fired at intense temperatures until it reaches a stone-like hardness, stoneware is the marriage of durability and artistry. Non-porous and incredibly strong, our stoneware collection features complex glaze interactions and deep, speckled textures.
            </p>
            <div className="flex flex-wrap gap-3 py-4">
              <div className="bg-surface-container px-3 py-1 rounded text-label-sm text-on-surface-variant">High-Fire</div>
              <div className="bg-surface-container px-3 py-1 rounded text-label-sm text-on-surface-variant">Dishwasher Safe</div>
              <div className="bg-surface-container px-3 py-1 rounded text-label-sm text-on-surface-variant">Unique Speckle</div>
            </div>
            <Link 
              to="/products?category=Ceramics&tag=stoneware"
              className="inline-flex items-center gap-3 border border-charcoal text-on-surface px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-charcoal hover:text-white transition-all shadow-sm"
            >
              Explore Collection
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="lg:col-span-7 lg:order-2 order-1 overflow-hidden rounded-lg shadow-sm">
            <img 
              className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700" 
              alt="Stoneware Platter" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyHL7NsIV-jGWsKMg85-SF8xS7HKvLLCxAG5CMkKMpF7AcAj9JLYzTG7n3C0fRyLybva37qujUfQYa_YMgJpjm5jMLYIxL2rt7ebPXvrq-FmLMvsfeQQbS4tK38Ezp_vFXTBV6wTtSbMYPFIifja5yhG1nMy6ZLakwKKmRXyhhi_6mEyU8MJUdc3rDdu1NZfCdPzx8CAQ0v68qEiyExjA7ir6NHrmdLFlexfQOkuC2N_DqK89ZfPXCfA"
            />
          </div>
        </section>

        {/* Section 3: Porcelain (Split Screen Gallery) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-sm text-label-sm tracking-widest text-secondary uppercase font-semibold">Refined Elegance</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-4">Porcelain</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed italic">
              The pinnacle of ceramic refinement. Translucent, delicate yet surprisingly strong, porcelain represents the pure essence of white clay transformed by fire.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter h-auto md:h-[600px]">
            <div className="h-[300px] md:h-full relative overflow-hidden group rounded-lg shadow-sm">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Porcelain Teaware" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFXDO3XG9jkEDOldmXOQ4VYg9iqs8FGDUeD--6AT5dch1hhizFhQaEgVg66RunY26bEJAAfFz4SvQTKGeATZEExH-m6AmhVVv2YwfQtlwz-vQlbEDAbOu2gdV7yleC_hfwnsxpojgBoTly2WLNmI8y9wXAArti_OkptP2ZpbrD-At8tWUYjpVpH-1DR7Z0vsfciVi8Fkkp883cNac6iyh5tl24aaVJ5PjriEHzarXiJj3bmMr1dfnMjg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
                <h3 className="text-white font-headline-md text-headline-md">Functional White-ware</h3>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-gutter h-[400px] md:h-full">
              <div className="relative overflow-hidden group rounded-lg shadow-sm">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Sculptural Porcelain Forms" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtG-tmsD1V2wl2gY2CweYhe8ILGhGqlisScGL0IQqC9mDem5FNZ0Njj7wWM2eYM20xlUeXi_-ewZsF--0sRRUCkdGDfIZTe9TDHXKInZdKTgllcC0HvNto9MD1091c3VygpFJjIhOQ6DmIfis00zwxVG7R3LR0nJ-sBQHgrJUS8w6KC_UBxLBo9bvPi7xwGbZb-H_LXo6f674y3juP8OEp0FwfO-kA2AU9c7HYx4BdJ9NQh7NKhOZqvw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <h3 className="text-white font-headline-md text-headline-md">Sculptural Forms</h3>
                </div>
              </div>
              <div className="bg-forest-green p-8 md:p-10 flex flex-col justify-center items-start text-white rounded-lg shadow-sm">
                <p className="font-body-md text-body-md mb-6 opacity-90 leading-relaxed">
                  Our porcelain is sourced from heritage kilns in Jingdezhen and Limoges, where the kaolin clay is processed to unrivaled purity.
                </p>
                <Link 
                  to="/products?category=Ceramics&tag=porcelain"
                  className="font-label-md text-label-md underline underline-offset-8 decoration-secondary flex items-center gap-2 text-white hover:opacity-80"
                >
                  Browse Porcelain Collection
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Glazed Objects (Bento Grid) */}
        <section className="pt-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-l-4 border-secondary pl-6">
            <div>
              <span className="font-label-sm text-label-sm tracking-widest text-secondary uppercase font-semibold">Technique Spotlight</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">Glazed Objects</h2>
            </div>
            <Link to="/products?category=Ceramics" className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors pb-1 border-b border-outline-variant">
              View all finishes
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="md:col-span-2 space-y-4 bg-white p-8 rounded-lg shadow-sm border border-outline-variant/10">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Beyond the body lies the glaze—the chemist's art. Our artisans use unique mineral recipes including celadon, tenmoku, and ash glazes to create surfaces that are as much a painting as they are a vessel.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">Celadon</p>
                  <div className="h-2 w-full bg-[#ACE1AF] rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">Oxblood</p>
                  <div className="h-2 w-full bg-[#800020] rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">Shino</p>
                  <div className="h-2 w-full bg-[#f3e5ab] rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">Tenmoku</p>
                  <div className="h-2 w-full bg-[#1b1c1c] rounded-full"></div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/products?category=Ceramics')}
                className="w-full mt-6 py-4 bg-terracotta text-white rounded-lg font-label-md hover:opacity-90 transition-opacity shadow-sm"
              >
                Explore Glaze Gallery
              </button>
            </div>
            <div className="md:col-span-1 rounded-lg overflow-hidden group shadow-sm h-[320px] md:h-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Celadon Glaze" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYiDBUIWZ0zI6nrqE9Wc86WUz_22FQ5XoOnALhOEIcvwjpoX_SDATp49SKwhHc84SweKniI29AGXjZ49nU3ZHkn1FwLrnJ-6HCF5I-XidRP3H_scOwOsMq9pYzqrFUWrWmXyuTFHBMh6iuKFwBc_7a4eqsutVdAINrFW_NfL01Y3-9igdAQkI-CFZVTgDBD1hmR1I3PfHJe9Aj8mP1Stl48-7aHv41USFtwOAWVPGqNAnO7qTCpjTznw"
              />
            </div>
            <div className="md:col-span-1 rounded-lg overflow-hidden group shadow-sm h-[320px] md:h-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Tenmoku Glaze" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwZJnbqXozXs0P6OSML6Ef3Apuf7db8Nxckgjn74z9MRK_G5XU6W2Vos1MGX_ka2tJ12KHEeP7jvGlZZv8fOGkpJZxPaV90wQ9ugD433a5HxaovhCPIgrcj-n1zGKIbq5sdIhpUOW-85pC_ijEt3GPkoW7mgH280dxjM0nMLr2Vz6TMKGfcqA9AfN5gx4puGcFQ4TLMMbhCPdFvtE33xxukBS-BiplGhQ9oKlYj1NPiyMVZ2-TIwKuTw"
              />
            </div>
          </div>
        </section>

      </div>

      {/* Featured Artisan Quote */}
      <section className="bg-forest-green text-white py-20 overflow-hidden relative mt-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="material-symbols-outlined text-[48px] text-white/30 mb-6">format_quote</span>
          <blockquote className="font-display-lg text-headline-lg md:text-display-lg max-w-4xl mx-auto leading-tight mb-8">
            "Ceramics is a slow conversation between the maker and the mud. You have to listen to the clay, or it will never tell its true story."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-white/30"></div>
            <cite className="font-label-md text-label-md uppercase tracking-widest not-italic text-white/80">Kaito Tanaka, Master Ceramist</cite>
            <div className="w-12 h-[1px] bg-white/30"></div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Subcategories;
