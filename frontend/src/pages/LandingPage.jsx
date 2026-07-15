import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      if (!section.classList.contains('relative')) { // Skip hero
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
      }
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20 bg-surface-linen selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* Hero Section: Editorial Story */}
      <section className="relative w-full h-[870px] overflow-hidden group">
        <div className="absolute inset-0 w-full h-full bg-charcoal/10 z-10"></div>
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaTz-qflZ7IMuB-nWdpZZit1KTgQeWKJw72aUN0UPx4kl2YNnkVIxKM5JhT7C4ZrT9XjlldHtwyp_rRgiIoxZqLKW_8fNKb0x1e3rEgJo2kdmgSQ-rgDTflRmPHAJg8UXAvBhsID5kT3HPcM2Z3otZ2u4zFjCnZ1XkL65chFD6AAKKbzT9KA-av00tTmXK_44-ABgYkqv9Pr151nIMAm_0cpE4yUgmXj5SCtEkyCZJPVbXu9ny_MByCw')" }}
        />
        <div className="relative z-20 h-full max-w-container-max mx-auto px-margin-desktop flex flex-col justify-center items-start">
          <span className="font-label-md text-label-md text-on-surface uppercase tracking-[0.2em] mb-stack-md bg-surface/80 backdrop-blur px-4 py-1">Editorial</span>
          <h1 className="font-display-lg text-display-lg text-on-surface max-w-2xl mb-stack-lg leading-tight">The Art of Wabi-Sabi: Finding Beauty in Imperfection</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-section-gap">Explore our curated collection of ceramics and textiles that celebrate the natural cycle of growth and decay.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-forest-green text-white font-label-md text-label-md transition-all duration-300 hover:translate-x-1 group">
            Explore Collection
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* New Arrivals: Horizontal Gallery */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-desktop">
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">New Arrivals</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Freshly forged pieces from our global artisan collective.</p>
          </div>
          <Link to="/products" className="font-label-md text-label-md text-on-surface border-b border-on-surface pb-1 hover:opacity-70 transition-opacity">Shop All</Link>
        </div>
        <div className="flex gap-gutter overflow-x-auto pb-stack-lg" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Product Card 1 */}
          <Link to="/product/1" className="min-w-[320px] group cursor-pointer block">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-stack-md relative">
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500 z-10 pointer-events-none"></div>
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hand-Woven Charcoal Linen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWF_vhLuInaKzneFXh8pm1zMsYg-BK73AOX_3WqgFVQeHFtPw2ExoIIe9au52-QXH-m8t97VV0Dqdgl8NCZ7x4JgfQPm6WL06yeY2YXNnRx25yo1J5FyluBYPmBfvp2NHEIjt34ysnKKXv0mxj6Ube9FafCCxgtCc-eg6K_J0gFvBEZgZs3VFvH5hqb3Tk5Re3JtvR0FekqV4b5Kn6dWGjKFvZXffj1BYjcpy9TZ231ADdnBQmlT0Kdg" />
              <button className="absolute top-4 right-4 material-symbols-outlined text-on-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">favorite</button>
            </div>
            <div className="text-center">
              <h3 className="font-body-md text-body-md text-on-surface mb-1">Hand-Woven Charcoal Linen</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">$185.00</p>
            </div>
          </Link>

          {/* Product Card 2 */}
          <Link to="/product/2" className="min-w-[320px] group cursor-pointer block">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-stack-md relative">
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500 z-10 pointer-events-none"></div>
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Smoke Tinted Glassware Set" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl32JIaQbyVRfKquoWr73CBK1P7KEV3FclqyVydZOXMW9b83FV7EglQeDBblwAxNrdVTtU1zGODJuR-ITbtOV_kxNg5U3lQaJmwi5nM8nG6WAqB_yN3luvUoNa9kUE0XRNoJ59nFaXxzPZ7-Z49tZfwG8M91aHCkskouHxtDctoQFL4_2KLhHEITPcaXWh8U-WiowONVUJU3DFhT8ULsza8-8imKcb6BuhOqPokG7v5laz--K2E3KwRQ" />
              <button className="absolute top-4 right-4 material-symbols-outlined text-on-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">favorite</button>
            </div>
            <div className="text-center">
              <h3 className="font-body-md text-body-md text-on-surface mb-1">Smoke Tinted Glassware Set</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">$120.00</p>
            </div>
          </Link>

          {/* Product Card 3 */}
          <Link to="/product/3" className="min-w-[320px] group cursor-pointer block">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-stack-md relative">
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500 z-10 pointer-events-none"></div>
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Raw Sandstone Sculpture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw" />
              <button className="absolute top-4 right-4 material-symbols-outlined text-on-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">favorite</button>
            </div>
            <div className="text-center">
              <h3 className="font-body-md text-body-md text-on-surface mb-1">Raw Sandstone Sculpture</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">$450.00</p>
            </div>
          </Link>

          {/* Product Card 4 */}
          <Link to="/product/4" className="min-w-[320px] group cursor-pointer block">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-stack-md relative">
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500 z-10 pointer-events-none"></div>
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Carved Walnut Nesting Set" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAihgFBpVMJrO3PO3Nkh0kMNQ_O3fG1p1x6mmmQjhpuxwDJtojvNkz0hHHUz-Dh0FHrXCTr4JxY3U7XlM97FLLPZ0a19omKGqfFJg0aGD2DNr1yFoLUxyimit52f4VN6cjsv3z0fKvXLvOc_Kjwm_aautVn6LWP1mFnNTlcFyjHCdSlA8vGC9eQMvut6TxHemacNecCLXNaL26n7wGEcz8cER6qPbmVU-JcxAzHzYX7lsksV-PGoXoJMA" />
              <button className="absolute top-4 right-4 material-symbols-outlined text-on-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">favorite</button>
            </div>
            <div className="text-center">
              <h3 className="font-body-md text-body-md text-on-surface mb-1">Carved Walnut Nesting Set</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">$240.00</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Shop by Discipline: Grid */}
      <section className="py-section-gap bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Shop by Discipline</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mt-2">Connecting you with the mastery of materials through time-honored traditions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Stonework */}
            <Link to="/products?category=Stonework" className="block md:col-span-4 group relative overflow-hidden h-[500px] cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfX25REApHwjW6Bi7lmjTNDdMZpL0ylKZopLaBLxkzldUvq0RCo34G_y9cC08ZfJLyIb7t7vzQIuP3kZTWeKxEZcP0FlGgq2Vhc5WG80VCqtGVtz8MSvRqWg82-2jgU9zbKGqbR7XecGJeNNP2Z8xN9flT14xOuhOwrX4AR0Y-NGuSn6f2KnOSPPjtze04FRqoXJOBDigPQ_EqipZfns2WMcNj9muasL447a2JTlAuoeqtCMxSZNsEQA')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent group-hover:from-charcoal/80 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">Stonework</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80">Ancient Mediums</p>
              </div>
            </Link>
            
            {/* Textiles */}
            <Link to="/products?category=Textiles" className="block md:col-span-8 group relative overflow-hidden h-[500px] cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent group-hover:from-charcoal/80 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">Textiles</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80">Woven Stories</p>
              </div>
            </Link>
            
            {/* Glass */}
            <Link to="/products?category=Glass" className="block md:col-span-8 group relative overflow-hidden h-[500px] cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnvq_o1x7ZpKHjIBpCbLtq7gYj6mW3OBFyBjLv2jU1GwyB6gML7G1DCfScRssPrqykpMPFoE_bRnXGC2P_8tFZjgDma6za59Vl26AsOzU1r4Xc0Wj-UTHlFqLnxBzm4Ma0rR-TDb8vP-XXg3Hjgci_dOfsKd_2DPp13vyCGCZLfvEkbdtgd6nwb_GFDoiM4vYTDlGrmNocpfAl0XBUqkDXiLb2Q3Z9d0qUdAkmPgBSkPr6YlxozAzugQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent group-hover:from-charcoal/80 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">Glass</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80">Fluid Form</p>
              </div>
            </Link>
            
            {/* Ceramics */}
            <Link to="/products?category=Ceramics" className="block md:col-span-4 group relative overflow-hidden h-[500px] cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent group-hover:from-charcoal/80 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">Ceramics</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80">Earth &amp; Fire</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-desktop text-center">
        <div className="max-w-2xl mx-auto border border-outline-variant/30 p-12 bg-surface">
          <span className="material-symbols-outlined text-4xl mb-6 text-forest-green">mail</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Join the Collective</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">Receive early access to limited artisan drops and stories from the workshop.</p>
          <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input className="flex-1 bg-transparent border-0 border-b border-clay-outline py-3 px-0 focus:ring-0 focus:border-forest-green transition-colors font-body-md outline-none" placeholder="Your email address" type="email" required />
            <button className="px-10 py-3 bg-forest-green text-white font-label-md text-label-md transition-all duration-300 hover:opacity-90" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
