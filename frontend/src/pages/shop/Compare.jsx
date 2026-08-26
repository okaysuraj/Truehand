import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartProvider';

const DEFAULT_COMPARE_PRODUCTS = [
  {
    id: 1,
    name: 'Hand-thrown Stoneware Bowl',
    price: 85.00,
    artisan: 'Elias Thorne',
    material: 'Iron-rich Stoneware',
    dimensions: 'Ø 18cm, H 8cm',
    finish: 'Satin Matte, Oatmeal',
    care: 'Dishwasher Safe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVLE33ysiTEcxMFf1v-yZudSwX6gx6Bia1ZKzrN1UvJ8F1EiaGT1tq5LZCmiQ939lBykZBfPM4NB-pypfW-JaAodm3aAcER5wPcQsCU1Apaveb41UmWy1vPnSNldSiDl0cASQ4701eAja8Kp27YzlI3Kx7fJIjf5Z56ts8EC9fNWudk3ARkwD1tWcHrnj2_FlgxHzI0GGTWik0NFbnQxdnjgku_Z2atZtJE4wkJaiA-5LxDVXQN6yG8A',
  },
  {
    id: 2,
    name: 'Celadon Porcelain Vessel',
    price: 120.00,
    artisan: 'Sanae Kobayashi',
    material: 'Fine Limoges Porcelain',
    dimensions: 'Ø 16cm, H 6.5cm',
    finish: 'High Gloss, Crackle',
    care: 'Hand Wash Only',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCdIb-6MnU9ZsLgbtO2Zzf1L9Vx8xyVEltVn0U9n4X46FRrocHH5jrAXMgwy-7CWWIEReV5wM75j_BWq1aC2ifqdEdOvscM_oW2fOh6380qSmRjloGo9DrRs7m5PUVwRyLF6us3h1Tu9LOSJIu-OULsko_btzddxtt0VWYQZNKWxpHva996_cCnEvPZPdtsqj9oqElQ3ETpOCnn3bc7vQqLqt8wggasfz9mkz_IhltSeTs9dSQbSYmFw',
  },
  {
    id: 3,
    name: 'Obsidian Raku Bowl',
    price: 95.00,
    artisan: 'Marcus Arlow',
    material: 'Grogged Red Clay',
    dimensions: 'Ø 20cm, H 9cm',
    finish: 'Semi-matte, Iridescent',
    care: 'Hand Wash Only',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC66KMoMEsSEVuxExeRb_J0JYGPZ0HQV_ZyiaZfDPdX2R1QVNcg8XkYA3mT3fqulw8sKnRjRencJeCKKzPH6ZG6V39EIeAFJ5mDqTGH8AP3gl_rYKNMvGnA7TtWb9-pCTBb3AIa6_qySIJMWL9XCsV5F2GkUDiz2EWX5wMI-cdPXyu2VXWeN9OQEWVvcbzrGU1Nwyp7KmXTuLxqXgUNVSFMAe-afz5ZOX-1BtqBtPPvJraP4IrSas164Q',
  },
];

const Compare = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState(DEFAULT_COMPARE_PRODUCTS);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Header Section */}
      <div className="mb-10">
        <nav className="flex items-center gap-2 mb-4 text-xs font-label-sm">
          <Link to="/" className="text-on-surface-variant hover:text-forest-green uppercase tracking-widest font-semibold transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/products?category=Ceramics" className="text-on-surface-variant hover:text-forest-green uppercase tracking-widest font-semibold transition-colors">Ceramics</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-forest-green uppercase tracking-widest font-bold">Compare Bowls</span>
        </nav>
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-forest-green font-bold mb-2">Compare Artisanal Bowls</h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl text-sm">
          Discover the subtle differences in texture, finish, and form between our most coveted hand-thrown ceramic pieces.
        </p>
      </div>

      {/* Comparison Table Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 mb-16">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] grid grid-cols-4">
            
            {/* Top Row: Imagery & Titles */}
            <div className="bg-surface-container-low p-6 flex flex-col justify-end border-b border-r border-outline-variant/20">
              <span className="font-label-md text-xs text-forest-green uppercase tracking-widest font-bold">Specifications</span>
            </div>

            {products.map((item, idx) => (
              <div 
                key={item.id} 
                className={`p-6 border-b border-outline-variant/20 ${
                  idx === 0 ? 'bg-surface-container-lowest' : ''
                } ${idx < products.length - 1 ? 'border-r' : ''}`}
              >
                <div className="aspect-square mb-4 overflow-hidden bg-surface-linen rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h3 className="font-headline-md text-sm md:text-base text-charcoal mb-1 font-bold line-clamp-1">{item.name}</h3>
                <p className="font-label-md text-sm text-terracotta font-bold mb-4">${item.price.toFixed(2)}</p>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-2.5 font-label-md text-xs uppercase tracking-wider rounded transition-all font-semibold ${
                    idx === 0
                      ? 'bg-forest-green text-white hover:opacity-90 shadow-sm'
                      : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            ))}

            {/* Row: Artisan */}
            <div className="bg-surface-container-low p-4 border-b border-r border-outline-variant/20 flex items-center font-label-md text-xs text-on-surface-variant font-semibold">
              Artisan
            </div>
            {products.map((item, idx) => (
              <div key={item.id} className={`p-4 border-b border-outline-variant/20 text-xs font-body-md ${idx < products.length - 1 ? 'border-r' : ''}`}>
                {item.artisan}
              </div>
            ))}

            {/* Row: Material */}
            <div className="bg-surface-container-low p-4 border-b border-r border-outline-variant/20 flex items-center font-label-md text-xs text-on-surface-variant font-semibold">
              Material
            </div>
            {products.map((item, idx) => (
              <div key={item.id} className={`p-4 border-b border-outline-variant/20 text-xs font-body-md ${idx < products.length - 1 ? 'border-r' : ''}`}>
                <span className="px-2.5 py-1 bg-surface-container-highest text-charcoal rounded-full font-label-sm text-[11px] font-medium">
                  {item.material}
                </span>
              </div>
            ))}

            {/* Row: Dimensions */}
            <div className="bg-surface-container-low p-4 border-b border-r border-outline-variant/20 flex items-center font-label-md text-xs text-on-surface-variant font-semibold">
              Dimensions
            </div>
            {products.map((item, idx) => (
              <div key={item.id} className={`p-4 border-b border-outline-variant/20 text-xs font-body-md ${idx < products.length - 1 ? 'border-r' : ''}`}>
                {item.dimensions}
              </div>
            ))}

            {/* Row: Finish */}
            <div className="bg-surface-container-low p-4 border-b border-r border-outline-variant/20 flex items-center font-label-md text-xs text-on-surface-variant font-semibold">
              Finish
            </div>
            {products.map((item, idx) => (
              <div key={item.id} className={`p-4 border-b border-outline-variant/20 text-xs font-body-md ${idx < products.length - 1 ? 'border-r' : ''}`}>
                {item.finish}
              </div>
            ))}

            {/* Row: Care */}
            <div className="bg-surface-container-low p-4 border-r border-outline-variant/20 flex items-center font-label-md text-xs text-on-surface-variant font-semibold">
              Care
            </div>
            {products.map((item, idx) => (
              <div key={item.id} className={`p-4 text-xs font-body-md ${idx < products.length - 1 ? 'border-r border-outline-variant/20' : ''}`}>
                {item.care}
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Secondary Info Section (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
        <div className="md:col-span-7 bg-forest-green p-8 md:p-12 text-white flex flex-col justify-center h-full">
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-4">The Artisan's Choice</h2>
          <p className="font-body-md text-white/80 text-sm leading-relaxed mb-8">
            Every piece in our collection is hand-selected for its unique voice. Whether you prefer the grounding weight of stoneware or the ethereal lightness of porcelain, your choice supports independent makers and traditional techniques.
          </p>
          <button 
            onClick={() => navigate('/brands')}
            className="self-start px-6 py-3 bg-white text-forest-green font-label-md text-xs uppercase tracking-widest rounded hover:bg-surface-linen transition-colors font-bold shadow"
          >
            Read Artisans' Stories &rarr;
          </button>
        </div>
        <div className="md:col-span-5 h-64 md:h-full min-h-[300px] overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            alt="Artisan hands throwing on wheel" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ" 
          />
        </div>
      </section>

    </main>
  );
};

export default Compare;
