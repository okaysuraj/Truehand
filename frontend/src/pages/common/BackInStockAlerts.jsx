import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const BackInStockAlerts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen bg-surface-linen text-on-surface font-body-md">
      
      {/* Hero Header */}
      <header className="mb-12 max-w-3xl">
        <span className="font-label-md text-label-md text-terracotta uppercase tracking-[0.2em] mb-2 block font-semibold">Curated Selection</span>
        <h1 className="font-display-lg text-display-lg text-forest-green mb-4 leading-tight">Returned to the Gallery</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          A collection of our most anticipated artisan pieces, now restocked in limited quantities. Each item represents hundreds of hours of patient hand-craftsmanship.
        </p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-12 gap-gutter mb-20">
        
        {/* Featured Large Item: Kyoto Ribbed Vessel */}
        <div className="col-span-12 md:col-span-8 group relative overflow-hidden bg-white shadow-sm transition-all duration-500 hover:shadow-md rounded-lg">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Kyoto Ribbed Vessel" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh6efXA-FdQugnBfd7Avu-ximZHHPp5iUiZ2XvN6GU_yflBv4jMXSpayUwnVOIOomOw0zvvjc3j-xsgWaepnqTWBjVNiWD3NglGZw8St40xIiRhHoAVuxTc33J9ftsCret79iJqs5CGrnsqB9THxysuyNUZcn8EHBoyT6ImL2x2NJECLaiPmwiWIYS8t3FZ_qQQrDvIrTF4MeopI9vhdi3sh20CAB1Ti3l5SiyKRNOXZjVvUoMPZwYdA"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-forest-green text-white font-label-sm text-xs px-2.5 py-0.5 rounded-sm tracking-widest uppercase font-semibold">Restocked</span>
                <span className="text-terracotta font-label-md text-sm font-medium">Limit 2 Per Collector</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-forest-green font-bold">Kyoto Ribbed Vessel</h2>
              <p className="text-on-surface-variant font-body-md mt-1 italic text-sm">Hand-thrown Shigaraki Clay</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-headline-md text-headline-md text-on-surface mb-3 block font-bold">$1,240</span>
              <button 
                onClick={() => navigate('/product/1')}
                className="bg-forest-green text-white font-label-md text-sm px-6 py-3 hover:opacity-90 transition-all uppercase tracking-widest rounded font-semibold shadow-sm"
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>

        {/* Side Small Item: Walnut Edge Board */}
        <div className="col-span-12 md:col-span-4 group relative bg-white shadow-sm transition-all duration-500 hover:shadow-md rounded-lg flex flex-col">
          <div className="aspect-square w-full overflow-hidden rounded-t-lg">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Walnut Edge Board" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-qhPPfrQm6jiECsRKLPfB04doGCs0Ql727PjqP4NrPBrTQ4YVCatf_em8kSd3pB3YvcwW389MUk1acFFV0xv8m5jQpTsbviJPsgFABPRGfHqxyjvGBMiUfCDTosr0PTVd9o8585rqJD3753NgV3XEemZ7FmhtMU2Z8VtKP0RtFFb0kCX_PgzAGk9xgGyiEeBK4cJLQ7jyUKII0msSK_y9oh18Ri29z6lN_88otfhhP97pJxBCSZFeSg"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-1">
                <span className="text-terracotta font-label-sm text-xs uppercase tracking-wider font-semibold">Limited Quantity</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-forest-green font-bold">Walnut Edge Board</h3>
              <p className="text-on-surface-variant font-body-md mb-4 italic text-sm">Aged American Walnut</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="font-headline-md text-lg text-on-surface font-bold">$385</span>
              <button 
                onClick={() => navigate('/product/2')}
                className="border border-outline-variant text-on-surface font-label-md text-xs px-4 py-2 hover:bg-forest-green hover:text-white transition-all uppercase tracking-wider rounded font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Row of smaller items */}
        {/* Item 1: Eclipse Glass Carafe */}
        <div className="col-span-12 md:col-span-4 group relative bg-white shadow-sm transition-all duration-500 hover:shadow-md rounded-lg overflow-hidden">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Eclipse Glass Carafe" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZDKyddysBlkWM9JobbjnMAJQtgnlBXEydGLSmK_LhJtdi_5MMM8KUcISqQjIS-MELH8B-2gNg10f1jFPel0qEUgUwpqXu5qxMKmm0lttEMaX_RvR3PsdZ-ZqkFswzPfcVLgHSMYyovIStgzrsdxdLqcBFHUgB5MuTRBF9XrOWschuBBAvukXhVQiTwXV4-WlnwKvmMsX76BTN3wr80frcB4euRQE3-0BqF3_RFM_u2BmUCeSyI6By-A"
            />
          </div>
          <div className="p-6 text-center">
            <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-xs px-2 py-0.5 rounded-sm uppercase tracking-widest mb-2 inline-block font-semibold">Returned</span>
            <h3 className="font-headline-md text-headline-md text-forest-green font-bold">Eclipse Glass Carafe</h3>
            <p className="font-label-md text-sm text-on-surface mt-1 font-semibold">$210</p>
            <button 
              onClick={() => navigate('/product/3')}
              className="mt-4 w-full border border-forest-green text-forest-green font-label-md text-xs py-3 hover:bg-forest-green hover:text-white transition-all uppercase tracking-widest rounded font-semibold"
            >
              Secure Piece
            </button>
          </div>
        </div>

        {/* Item 2: Sari Linen Pendant */}
        <div className="col-span-12 md:col-span-4 group relative bg-white shadow-sm transition-all duration-500 hover:shadow-md rounded-lg overflow-hidden">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Sari Linen Pendant" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGAEhUjT3lfdjaVgmJH06p0VIii1lVwpTDEWq7v19aqkf8Z1g2KcOf0lscFWejb0t2QdIAGjIgTqqUp3xidbI6PggOXbcRiu7iCxsHv0xCB8vUZGa6pWFDT8bn5r2q1ztuAjz2iPDL2RBuo5dbJVtY0YzQ_np3OWnUDCU4w3w-_9RZS5iJ3OVliLvJ0Hy-rq_wr1xx1by-xYX8R7jAUBUCuuhcDAX4wzlpU7nbJyhhDac1RLlARnGYew"
            />
          </div>
          <div className="p-6 text-center">
            <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-xs px-2 py-0.5 rounded-sm uppercase tracking-widest mb-2 inline-block font-semibold">Restocked</span>
            <h3 className="font-headline-md text-headline-md text-forest-green font-bold">Sari Linen Pendant</h3>
            <p className="font-label-md text-sm text-on-surface mt-1 font-semibold">$745</p>
            <button 
              onClick={() => navigate('/product/4')}
              className="mt-4 w-full border border-forest-green text-forest-green font-label-md text-xs py-3 hover:bg-forest-green hover:text-white transition-all uppercase tracking-widest rounded font-semibold"
            >
              Secure Piece
            </button>
          </div>
        </div>

        {/* Item 3: Iron & Rattan Kettle */}
        <div className="col-span-12 md:col-span-4 group relative bg-white shadow-sm transition-all duration-500 hover:shadow-md rounded-lg overflow-hidden">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Iron & Rattan Kettle" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcynM7W7fqWxBS4iuFCyRf_4-fhdPml7QH6PmmwGz9ulPkQ4xt8zWqZNLA6H6hej9KBzq28cYtlt2YTZp2s2JGApkeCov0dik4EJijJoYg4mHnxQ09oXuoXSJVMgxV7naagVZf9WuwqB5_6xVFdN4vLppnNmzY5dAnVdyuCyi5AUQ6Znr12B-rLkTpyWcR5UGGF6c0KaCEYsrMf7wjle11L8dzoo9iC2dDYTCikZpLSsXHw25b8p8BrQ"
            />
          </div>
          <div className="p-6 text-center">
            <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-xs px-2 py-0.5 rounded-sm uppercase tracking-widest mb-2 inline-block font-semibold">Last 5 Pieces</span>
            <h3 className="font-headline-md text-headline-md text-forest-green font-bold">Iron &amp; Rattan Kettle</h3>
            <p className="font-label-md text-sm text-on-surface mt-1 font-semibold">$320</p>
            <button 
              onClick={() => navigate('/product/5')}
              className="mt-4 w-full border border-forest-green text-forest-green font-label-md text-xs py-3 hover:bg-forest-green hover:text-white transition-all uppercase tracking-widest rounded font-semibold"
            >
              Secure Piece
            </button>
          </div>
        </div>

      </div>

      {/* Artisan Spotlight Banner */}
      <section className="bg-forest-green text-white p-8 md:p-14 rounded-xl relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-white font-bold leading-tight">The Hands Behind the Return</h2>
            <p className="font-body-lg text-body-lg text-white/80 leading-relaxed">
              We waited six months for this collection. Our artisans in Kyoto and the Pacific Northwest work at a pace dictated by the material, not the market. We thank you for your patient appreciation of true craft.
            </p>
            <Link 
              to="/brands" 
              className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-[0.2em] border-b border-white pb-1 hover:opacity-70 transition-all font-semibold"
            >
              Meet the Artisans <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <img 
              className="w-full h-[260px] md:h-[300px] object-cover rounded-lg shadow" 
              alt="Artisan hands shaping clay" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZkvL61OShuNpa-_xQEYQMlYzDDK0Gxrab7olcheaDRYfJy05rph6LEALYJ8EEz1n_wdd5qydj9BZk-0OeLsnyPfMQQ1FbXoep11m_eaRkvUR5d4GJGzYHGRtCJB0zzzoqFpRO6SIR4A6ussXBr39srGFIvDkgOqvgj_zAqJXhWkWI2ck-jVDIyG5DvlCV5guDjLi0RHKy0Q-VCaCKLutmjr66hcMRa6W8RtKv9L0iuyP_k0nAO7tsUw"
            />
          </div>
        </div>
      </section>

    </main>
  );
};

export default BackInStockAlerts;
