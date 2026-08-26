import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CategoryListing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const curatedSeries = [
    {
      id: 1,
      name: 'Oatmeal Stoneware Bowl',
      price: '$48.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAb1K9hAE3zXozDRYcv6mJHt6Qzi4SxM9J_CrKJtHuJDzKEfd_7qGpJp_LOXP2c2fHPAyp1obySBvD2vQDh6O3LXasWh7w5u6dGpaoYJJqoqb6bg1cANbaHibwANMvW8gbl0Wpi2adFkI4moLHCCx0ypAmpI741JLWwY_ElG7PC4LTTttWf-GB3fRJqZGFZWY2faqMEeABr_a8dL4mu8Mn15_tE7K7QnJhyhJvmJ7WHYwVKRAMTMBshw',
    },
    {
      id: 2,
      name: 'Matte Pitcher No. 04',
      price: '$110.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDUTiSwtfEgvksQxx4TTrAh6pLO_wEQ5cNBRA7Yn7KS5ZKYog6q8--CCVEe6C3t-b-h9Iw3eDJbsIXuq4EMTLcUx7uKlax3gJCL87a0q43AMZ4mSeS8KU1dI2Tr7eJjq6bUCEHu4acdwHHMqiVc2l-uWMYojsmz98K6PDO3qs5g4loxV2fRGJxS_HIrh2bcus-_SGc7AAhnYORpHYUPTZyb8eAPk21koosTeeNtpCBzSaSC0tSirX-kw',
    },
    {
      id: 3,
      name: 'Crackle Glaze Pasta Set',
      price: '$160.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpunABdDPh54dZ0jz-pTlxy_GcFCBFZ6A9T_2ytaHZSAO8mn-evnMRtMjUfCf0m9m6BckXM73OGHzE0ZC99rjnI05_YLai-IHcXgqKez3HAN5zrJzzPYTg4m_LcTo0-hcFsw2OCdYYdrAXNZ6Wqnc9Qjk6C5cJ-Eblep0f7JRGNwA5whQ0LVSOUEAbStP3JQzdEVFrlSdWbyj3-IIlkwIIRj1i7q8BA9VUU41Jm7-chlHRoZfDF9wdTw',
    },
    {
      id: 4,
      name: 'Stone Incense Burner',
      price: '$35.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa_HVwnOHx9nfqrXIBtc_Bs1uAIoMPc-qfLbubUoXJ-tx8bldWir7_KqdJv_h2IISeUqPDsmfUdnEpzwlR672ZKNhREH2_T1RnInS1PGyl3urGJrOXjk98WoqNEamilubkqch5I0IDYSMXt4kEsCcSqLNx9hx9zhaPb1poJQ0qga_9m68R5aTVcmisY2FzWzdAHoAcpKD_A-pQ95tmlL07wd6_UNCJJpZw8wQDODwfNu6cesLgll2Bog',
    },
  ];

  return (
    <main className="pt-24 bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16">
        <div className="flex flex-col md:flex-row gap-gutter items-center">
          <div className="w-full md:w-5/12 order-2 md:order-1">
            <h1 className="font-display-lg text-display-lg text-forest-green mb-4">Home &amp; Living</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
              A curation of functional art for the modern sanctuary. Every piece tells a story of heritage techniques meeting contemporary minimalist sensibilities.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="bg-forest-green text-white px-8 py-3 rounded font-label-md hover:opacity-90 transition-opacity"
              >
                Discover All
              </button>
              <button 
                onClick={() => navigate('/products?sort=createdAt,desc')}
                className="border border-charcoal text-charcoal px-8 py-3 rounded font-label-md hover:bg-charcoal hover:text-white transition-all"
              >
                Latest Arrivals
              </button>
            </div>
          </div>
          <div className="w-full md:w-7/12 order-1 md:order-2 h-[500px] md:h-[600px] relative overflow-hidden group rounded-lg shadow-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFNFi1qcZwgqlMvh2XnFnIeK-o9XxCr1ZuPaROrqQ0L-Gzvnm8ym1dqwxiTZ_9P-pOjDK5gMbSEORdDMoKCEn6QDZ-KKOHI0Ffjcy9Dj_Ybjo2sO4PXpiUTkWIhHaPzQ2amFyMjiq3Y4AMRH7pIdK6IiY3pZfrbLjtPL4kmpzCQ6w5uI1Akn7fUykyxaxkkIWc8IE7I2zfLr8QPbujNy1u3Z_fg3LrUMrluy_mV5d08OvgYrOGrGS0TQ')" }}
            />
          </div>
        </div>
      </section>

      {/* Category Grid: Asymmetric Layout */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-20">
        <div className="grid grid-cols-12 gap-gutter">
          
          {/* Furniture: Large Vertical */}
          <Link to="/products?category=Furniture" className="col-span-12 md:col-span-6 lg:col-span-5 h-[600px] md:h-[800px] relative group overflow-hidden rounded-lg block">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAe5e7E37qlG_3OggWPnXietDoXVgqJSZn_B17AQ_0DjVq-I7rOjrD0tWydBGKwsV3WN0Msp45C6ePZ1jPaEOQDzxxtEBhmOLHcKNg867DMr8g3egR3dfcXl8nEoDIKdtQoLtjtLfLjs9yCWXhxN1y6ijBLZDteDMseUUAZM1cJqOs2lQSDHijZ25tycEAb_6HoYsyn3xWnQtqneqkq-f875Ly7hd8NUBPKPPRb_jlwE-BziALPGr49Rg')" }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-12 left-8 md:left-12 right-8 md:right-12 text-white">
              <span className="font-label-md text-label-md uppercase tracking-widest mb-2 block text-white/80">The Foundation</span>
              <h2 className="font-headline-lg text-headline-lg mb-4 text-white">Furniture</h2>
              <span className="inline-flex items-center gap-2 font-label-md text-label-md border-b border-white pb-1 group-hover:gap-4 transition-all">
                Explore Collection <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* Right Column Split */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-gutter">
            
            {/* Tableware: Horizontal Top */}
            <Link to="/products?category=Tableware" className="col-span-2 h-[320px] md:h-[388px] relative group overflow-hidden rounded-lg block">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_G1q2SdQ_OS_GSFxAX-HeGGVGvukSlkUaCIHHOmm7O81OU4Fc6_y9nXb2hmcnUzct4CcLFu1JhmuwTe-24-iiJBN_QnXrm2Q21s9zhRA8dMTteUYXkb9z-McdPSa9thyn1FSqtSVjyl0tukIME7s8GaxCJCdZxqVJQd_1c9e860dBNzPeWIrIZraKv7xdPlGJKldHNAvVdACF-QwdOe2ja9Bc2J_5KJbDsFLUmoRJrJOU18MVBVForQ')" }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 text-white">
                <span className="font-label-md text-label-md uppercase tracking-widest mb-2 block text-white/80">Daily Rituals</span>
                <h2 className="font-headline-lg text-headline-lg mb-4 text-white">Tableware</h2>
                <span className="inline-flex items-center gap-2 font-label-md text-label-md border-b border-white pb-1 group-hover:gap-4 transition-all">
                  Explore Collection <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>

            {/* Decor: Small */}
            <Link to="/products?category=Decor" className="col-span-2 md:col-span-1 h-[280px] md:h-[388px] relative group overflow-hidden rounded-lg block">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDShFSJ7Iu8iycY18m8emUYPLP9ki7_rl8B52aRiduNZD9RfRvSx7WmYptCk4UJ-TI73dtSe5FCvSsTIhXpnhgm4BNdVO6TAK6QLpzneb3eYywVwPz-sO4Apx87P4_p4_7ly8-PnjJC9tCJH7zC9TZA4MsowmU3f0twcEbv_0D0FM_n1cRGFocJpn5NXvYm5iVG5ADyn-agjgIlo_mMb9DE2QBmFCNHeVTZuk40QKn7m9AUyh33dT0Ceg')" }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="font-headline-md text-headline-md mb-2 text-white">Decor</h2>
                <span className="inline-flex items-center gap-2 font-label-md text-label-md border-b border-white pb-1 group-hover:gap-3 transition-all">
                  View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>

            {/* Lighting: Small */}
            <Link to="/products?category=Lighting" className="col-span-2 md:col-span-1 h-[280px] md:h-[388px] relative group overflow-hidden rounded-lg block">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUTjb8os7JIf_OReKfVd9mBROoAc2r72r8279I-_258ecXu-DSpz14kHXC-UxiBYWTYni4f-YkPggibJKps4L3uj6sDKnN7j8w9DNO7C-n8OhjKaTT8mdt-tHvy3TFQqRN0nlO0y4VOXy0a8qWk5QzFCFMQdE0t656Ii5RjIPg20LOy1ahHtQhy1OiFlH0ftzhSh2O2C8Qt_cPB1FqmvROKtkkAgJOJTO7g2pNLAKTntTwklCMMzT4PQ')" }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="font-headline-md text-headline-md mb-2 text-white">Lighting</h2>
                <span className="inline-flex items-center gap-2 font-label-md text-label-md border-b border-white pb-1 group-hover:gap-3 transition-all">
                  View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Collection: Horizontal Scroll */}
      <section className="bg-surface-container-low py-16 mb-20 overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-2 block">Curated Series</span>
              <h2 className="font-headline-lg text-headline-lg text-forest-green">The Ceramicist's Table</h2>
            </div>
            <Link to="/products?category=Ceramics" className="font-label-md text-label-md text-on-surface-variant hover:text-forest-green transition-colors flex items-center gap-2">
              View Entire Series <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
          
          <div className="flex gap-gutter overflow-x-auto pb-8 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {curatedSeries.map(item => (
              <div key={item.id} className="flex-none w-[280px] md:w-[320px] snap-start group cursor-pointer">
                <div className="aspect-[4/5] bg-surface-container-highest mb-4 overflow-hidden relative rounded-lg">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </div>
                </div>
                <h3 className="font-body-md text-body-md text-on-surface text-center mb-1 font-medium">{item.name}</h3>
                <p className="font-label-md text-label-md text-on-surface-variant text-center">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials / Philosophy Highlight */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative">
          <div className="h-[400px] md:h-[500px] w-full relative overflow-hidden rounded-lg shadow-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtjVOgGHJ2JMBiUxZvPeyfEevt3vu3q1xtpFo77qihJI7eDB9wf5BvZgYF2AlTe2dhmanqJy_hLGD4GyxGSVnrMzWAOk-3U6rJmh2AUY0zDxiQWHOFYtm4iak8nLNOp9eEfOBD5WT98KA6ccWiC-dbiNA1tDRWMGry2c7fcxkHC6RIGW-oPpOHNpIWLrWUBtu0RB_AQvjtNxMaZIB_p7PAazYjZ0vy7HDEW2wXb27IT05R620WH4sqbg')" }}
            />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 md:p-8 max-w-xs shadow-xl hidden sm:block rounded-lg">
            <span className="font-label-md text-label-md text-secondary uppercase mb-2 block font-semibold">Our Philosophy</span>
            <p className="font-body-md text-body-md italic text-on-surface-variant">"The beauty of a piece lies in the honesty of its material."</p>
          </div>
        </div>

        <div>
          <h2 className="font-headline-lg text-headline-lg text-forest-green mb-4">Rooted in Earth</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            We partner exclusively with artisans who respect the lifecycle of their materials. From sustainably sourced European oak to clays harvested from local riverbeds, every element is chosen for its longevity and aesthetic integrity.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-forest-green text-2xl">eco</span>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface font-semibold">Renewable Sourcing</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Traceable origins for every wood and textile used.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-forest-green text-2xl">handyman</span>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface font-semibold">Time-Honored Craft</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Techniques preserved through generations of family workshops.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16 border-t border-outline-variant/30 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline-md text-headline-md text-forest-green mb-3">The Artisan's Journal</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Receive invitations to new collection previews and stories from our global workshops.
          </p>
          {subscribed ? (
            <div className="p-4 bg-primary-fixed text-forest-green font-medium rounded-lg inline-block">
              Thank you for subscribing to The Artisan's Journal.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                className="flex-grow bg-surface-container px-4 py-3 border-0 rounded focus:ring-1 focus:ring-forest-green text-label-sm outline-none" 
                placeholder="Your email address" 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button className="bg-forest-green text-white px-8 py-3 rounded font-label-md uppercase tracking-wider hover:opacity-90 transition-opacity" type="submit">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  );
};

export default CategoryListing;
