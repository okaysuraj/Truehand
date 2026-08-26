import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_FLASH_ITEMS = [
  {
    id: 1,
    name: 'Obsidian Wash Earthenware',
    price: 420.00,
    badge: 'Vessel No. 12',
    claimedPercent: 82,
    soldOut: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6eMoTjUPL7L3OEO04Y4FhFfqMPY_0sR-Q-PC5U8XAFQMpOlszUgECJnt5Y5qZrKK77fSNSh8ghlhWTJD_Ix3o8w6snVNuISrYUx2oTW-TDE21C7XGHxyPa2pHjE3m8ToA6qq1jZWW3vmp5I2VytboJa4ozcqBqbkeB3dlVFdQfYahyvs7zopcTO1-BW0WuA338C3HoDGgF3ziL1YX78NoJRTZ63vLr9hfWvtygDMJnu7opKSBP2vlqA',
  },
  {
    id: 2,
    name: 'Raw Silk & Merino Throw',
    price: 890.00,
    badge: 'Collected',
    claimedPercent: 100,
    soldOut: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6-FXLr9LEVapp88Q0flHmJYcfFVbAtEWLTaJdmMQ7TSh1hj1cZ7p5L4VhfA6rYnO5wAZx1IeTq-3srg-9Tzsv7rZBAQB_Qhbv44hR9hy5RG15gNFt1ioMYBvhrZzoYHIdfTH0a2tVCRQc1wpjerg76S6JH2xvhAuGFQMDGKiZTVTdbisWIytI-yrzOd1j-jX-LQ0SfUrXg86pUUiwOWjSp5H939MdUtkUuoKLS-H6ucHioYtqhT1GIQ',
  },
  {
    id: 3,
    name: 'Charred Oak Occasional Table',
    price: 1250.00,
    badge: 'Last 2 Pieces',
    claimedPercent: 96,
    soldOut: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7WDVtJCEhzUEN6cff3c-r5zJvDLvWlmIBLa0L5odVLoDN2DvOM2kPpZ0NeNQvFif2-Vm_Cnay02-OoWXzlesaYHSxb4AuHsq1FKKKjl9L7dUs4-Dh-860TnJ4HeM0-avnyjTgg23c6p3eeLsAiClmxiIVeO-ggohFtqHphYN-ziAfKU53NHpDIj13LYxnd9vuOacoOvMNBtB59gjFIpgHaaHw39ewpDS9uX-HqP8A5n0QwJ230Lgbug',
  },
];

const FlashSale = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 38, seconds: 12 });
  const [items, setItems] = useState(DEFAULT_FLASH_ITEMS);

  useEffect(() => {
    api.get('/products/flash-sale')
      .then(res => {
        const data = res.data?.content || res.data;
        if (Array.isArray(data) && data.length > 0) {
          // Merge dynamic with defaults
          setItems(data.map((p, idx) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            badge: p.stockQuantity <= 2 ? `Last ${p.stockQuantity} Pieces` : `Edition ${idx + 1}`,
            claimedPercent: Math.min(95, Math.max(20, 100 - (p.stockQuantity || 1) * 10)),
            soldOut: p.stockQuantity === 0,
            image: p.imageUrl || DEFAULT_FLASH_ITEMS[idx % DEFAULT_FLASH_ITEMS.length].image,
          })));
        }
      })
      .catch(e => console.warn(e));

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;
        let d = prev.days;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          h = 23;
          d -= 1;
        }
        if (d < 0) {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days: d, hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex-grow pt-28 pb-20 bg-surface text-on-surface selection:bg-primary-fixed min-h-screen">
      
      {/* Hero: Limited Release & Countdown */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto text-center border-b border-outline-variant/20">
        <div className="space-y-2 mb-8">
          <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-terracotta font-semibold">Exclusively Available</span>
          <h1 className="font-display-lg text-display-lg text-forest-green">Limited Release</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto italic">
            A curated selection of hand-touched masterpieces available for a short window. Once these artifacts find their home, they will not return.
          </p>
        </div>

        {/* Countdown Timer Bento Box */}
        <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10 p-6 md:p-8 bg-surface-container-low rounded-lg shadow-sm">
          <div className="text-center min-w-[70px] md:min-w-[80px]">
            <div className="font-headline-lg text-4xl md:text-[48px] text-forest-green leading-none font-bold">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant mt-2">Days</div>
          </div>
          <div className="text-center min-w-[70px] md:min-w-[80px] border-l border-outline-variant/50 pl-6 md:pl-10">
            <div className="font-headline-lg text-4xl md:text-[48px] text-forest-green leading-none font-bold">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant mt-2">Hours</div>
          </div>
          <div className="text-center min-w-[70px] md:min-w-[80px] border-l border-outline-variant/50 pl-6 md:pl-10">
            <div className="font-headline-lg text-4xl md:text-[48px] text-forest-green leading-none font-bold">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant mt-2">Minutes</div>
          </div>
          <div className="text-center min-w-[70px] md:min-w-[80px] border-l border-outline-variant/50 pl-6 md:pl-10">
            <div className="font-headline-lg text-4xl md:text-[48px] text-terracotta leading-none font-bold">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant mt-2">Seconds</div>
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-gutter">
          {items.map(product => (
            <div
              key={product.id}
              className={`group relative flex flex-col gap-4 transition-all duration-500 ${
                product.soldOut ? 'opacity-60 grayscale-[0.5]' : ''
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-surface-container-highest relative rounded-lg shadow-sm">
                <img
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    product.soldOut ? '' : 'group-hover:scale-105'
                  }`}
                  alt={product.name}
                  src={product.image}
                />
                {product.soldOut ? (
                  <div className="absolute inset-0 bg-surface-dim/40 flex items-center justify-center">
                    <div className="bg-surface px-6 py-2 border border-outline-variant/30 shadow-md">
                      <span className="font-label-md text-label-md text-charcoal tracking-widest uppercase font-bold">Collected</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-surface-linen/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="font-label-sm text-label-sm text-forest-green font-medium">{product.badge}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col text-center space-y-2">
                <h3 className="font-headline-md text-headline-md text-on-surface">{product.name}</h3>
                <p className="font-label-md text-label-md text-on-surface-variant font-semibold">${Number(product.price).toFixed(2)}</p>
                
                {/* Inventory Progress */}
                <div className="w-full max-w-[240px] mx-auto space-y-2 pt-2">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Claimed</span>
                    <span className={`font-bold ${product.soldOut ? 'text-error-red' : 'text-forest-green'}`}>
                      {product.claimedPercent}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${product.soldOut ? 'bg-outline-variant' : 'bg-forest-green'}`}
                      style={{ width: `${product.claimedPercent}%` }}
                    />
                  </div>
                </div>

                {product.soldOut ? (
                  <button
                    disabled
                    className="mt-4 py-4 px-8 border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded transition-all uppercase tracking-widest cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="mt-4 py-4 px-8 bg-forest-green text-white font-label-md text-label-md rounded shadow-sm hover:opacity-90 transition-all uppercase tracking-widest"
                  >
                    Acquire Piece
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artisanal Detail Feature (Asymmetric) */}
      <section className="w-full bg-surface-container-low py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 relative">
            <img
              className="w-full aspect-video object-cover rounded-lg shadow-md"
              alt="Artisan studio"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEATzVYH5XlZCig2c4A7Sz1D6ytdFty4Msrsvvm3IUZk6THmDdDs9gl2cW7FYEa-12LBn0wv0usLmX0kREtyXbPHnU5qEox-SFNYEJUupg2FJ9rqbud2Iy9jENi8_rhYqPmQnk9FjZPhhiJELmgtbNsScaqla2OUOKSWHhLzZXsmOPz607FzmT9rmHVHymq3hFA8Lkbgk1-bURIKr7KLdAEq9iLKBKnfx1dgJyZRv6M55kZF-tVfkKxg"
            />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-forest-green/20 hidden lg:block rounded-lg pointer-events-none"></div>
          </div>
          <div className="lg:col-span-5 lg:pl-8 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-forest-green">The Hand of the Maker</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every limited release is the result of months of quiet preparation. Our artisans do not rush; they listen to the material. These pieces represent a specific moment in time—a singular fusion of clay, heat, and intent.
            </p>
            <div className="flex gap-8 pt-4 items-center">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-terracotta font-bold">24</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Artisans</span>
              </div>
              <div className="w-[1px] h-12 bg-outline-variant/30"></div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-terracotta font-bold">150</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total Works</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default FlashSale;
