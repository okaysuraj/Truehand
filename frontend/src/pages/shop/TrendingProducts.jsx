import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_TRENDING = [
  {
    id: 1,
    name: 'Speckled Stoneware Vase',
    price: 145.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Pg_0h40VWwLix8OexGcz_8j-TiMnaoEts_5Oxqdfj_vDotuwjadcLWkQNTqBpMRi7Xmlv7iJmAafjmBrT9BaCL78z0zplFjM32pprt0A-wBaNHogAztXSSNjzx6KyqwAsvYgI-B9LTefjGrlEFFJTnJZB43zS6JroIFSLgOlJEghiVMGRbHn0Vor8PqDkKFymPEtc9BsiAu1QW7ull9lKh2oLGIMLhrJ5xpQroUhvHRmC70g_EuSA',
  },
  {
    id: 2,
    name: 'Heritage Duffel',
    price: 480.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfZQq5Vo-qftp8fFxNQ9lNDSA3NwpFd7cPahvjKv7iRx4ItaoVAQzFkVGM217xe6JrWZsczYBOSfSOp9JatdVrvVkymE0Aj3ss6bKCgYFtTd3QMB_KbBI2I9NdLfzWdDLwW_AHSmScWKL5rpwhI_OqLlQIlOqNz34kiWR3Vd2Fw1hvsLOoxrvqigckqhf1CwQDpBin-yXV_-NVCTasxmp4NT1_Y6bQxtgMerVpv_bSLHOlq6MpJrAqvQ',
  },
  {
    id: 3,
    name: 'Raw Emerald Pendant',
    price: 320.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFN8hKMoKiGBXACaUICg-wcSEUcjpYyUazYSlVV4TaV4BkYeobKr2sGdRPr3-tYSGofN3iIq5j332mdM4VEXNLjsgu5KdJk21eWS8Tyaz6JqKkiz7d3g_vOgyt9Xu8XW9uTkpWQPcC-L6kZ_ebqeWlxUUVEZtSBBo9isTSSo0PUY_U25lhx174rwe10IieMxzRq7z6fOKSlpF5AgdODzH1JaU0IJYJ0VT-sfor6nYHD4HGQRAdfRLJmA',
  },
  {
    id: 4,
    name: 'Oak Canvas Lounge',
    price: 895.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyUCBWLpPaxRG5b8C_y-Lo75j3vAh4uRYmWK1EWpZkwEOKPMQRW73Uos9LLu0bTSzaSsgQ_rTyAbPHBohJbG-2JIEoV8fFw6-_Al4AzrkGqUtaOXSPJKl-zgjoPBZlE_exZkxAK3ifHOIUi9fuBRZweXNeKeljgH7_gEKjEhK8ur2KPg-Z4-mklTED3ufvd5lfkrriN1imcwPdubjgGIMK9xPeFHK4AV6ffMpJErSq37ZwZuzcyMcL-w',
  },
];

const TrendingProducts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('newest');
  const [products, setProducts] = useState(DEFAULT_TRENDING);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/products/trending')
      .then(res => {
        const data = res.data?.content || res.data;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-28 pb-20 bg-surface-linen text-on-surface font-body-md min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header & Filters */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-label-md text-label-md text-terracotta tracking-[0.2em] uppercase font-semibold">Curated Gallery</span>
            <h1 className="font-display-lg text-display-lg text-forest-green">Trending Now</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('newest')}
              className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all ${
                filter === 'newest'
                  ? 'border border-forest-green bg-forest-green text-white shadow-sm'
                  : 'border border-outline-variant/50 bg-transparent text-on-surface-variant hover:border-forest-green hover:text-forest-green'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all ${
                filter === 'popular'
                  ? 'border border-forest-green bg-forest-green text-white shadow-sm'
                  : 'border border-outline-variant/50 bg-transparent text-on-surface-variant hover:border-forest-green hover:text-forest-green'
              }`}
            >
              Popular
            </button>
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-4 rounded-lg shadow-sm">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={product.imageUrl || DEFAULT_TRENDING[0].imageUrl}
                  alt={product.name}
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-forest-green opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
                  >
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-body-lg text-body-lg text-on-surface group-hover:text-forest-green transition-colors">{product.name}</h3>
                <p className="font-label-md text-label-md text-on-surface-variant font-semibold">${Number(product.price).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Story Section: Craftsmanship over mass production */}
        <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative aspect-square lg:aspect-video rounded-lg overflow-hidden shadow-sm">
            <img
              className="w-full h-full object-cover"
              alt="Artisan at pottery wheel"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRz_gJ7VkMzRVdUlpC-elsxUK3NPBCQRGOfExfJ5YIqiF-Xt0Ny1th2iIDgDCx-c2scV8TOBu8DgfS7Up7A47bqa9b7mPpjl4X0U9inKeCm5SeY7gSlYnPSP2B-2rehM56Y0U9_n7yosl34CVYtC_PGBmG4ix6UQ_qpoyMveU24te6FgB8dfYOm-Bgk5qj8V9gY2TUs6k5R02uBSHpveQtdxJRRl9C20nCaoHH2R_JQ8h4PU80lM6zQw"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-4 px-2 lg:px-6">
            <h2 className="font-headline-lg text-headline-lg text-forest-green">Craftsmanship over mass production</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Every piece in our trending collection is selected not just for its aesthetic, but for the story of the hands that shaped it. We believe in objects that gain character with age.
            </p>
            <button 
              onClick={() => navigate('/brands')}
              className="mt-3 inline-flex items-center gap-2 font-label-md text-label-md text-forest-green border-b border-forest-green pb-1 hover:gap-4 transition-all duration-300 font-semibold"
            >
              View Our Artisans
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};

export default TrendingProducts;
