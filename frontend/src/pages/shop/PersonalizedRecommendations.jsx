import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CERAMICS_ITEMS = [
  {
    id: 1,
    name: 'Neriage Earth Vessel',
    price: 320,
    tag: 'Hand-thrown Clay',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5AP7HQGh0LspMcziUto_0uYpmrPu1P-7z7EFsm99EDbaKdm-z01vIc7FjvFdStbcx-11XJS7OMRTK5KqTiylAKEOuShpESLCpop2DvpVzmd4xcN8DcLGOpugxxqp5m_ZcD97eCr1VS5qe4PGCQjM7ftNXa_iw9hAKnMm03TmbdRL5WUb6SxGqPcwEOYHeETHmguAWy7_SeDFWurBK8xgF6gk4OqT2CEWMWxnGs94RfsodsPc51-lkg',
  },
  {
    id: 2,
    name: 'Basalt Tea Set',
    price: 185,
    tag: 'Oxidized Glaze',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRsAbCE5hzwo-4AuO2ROhc4s_eD2u0-fjQZMWQL21TiuiNMlMLSHliE2NzZrdQXvAsPw4neZ129tDCxa7LN6kdjQwE9FTMkTZn_nkz0Ti5t2fd977W2Eyyiekt8ltZMfPtc5nJiWyGztLXAyiqr5utJiGX1W9js0ISFGOUamDbwRKeKwWqVITHn407jcMGMYzNwvMXFsFhTAI9H13PQ_4o6mGUlsz8uyjYt0QN_wqDtdvvXeP2FDS4wQ',
  },
  {
    id: 3,
    name: 'Celadon Stem Vase',
    price: 240,
    tag: 'Celadon Porcelain',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_vJI7Pm76RJElv2hKBUy0vLlvXm9MBYHLNOzExK_mE56g4_a5bevQ9_VkrG0tv0QnE-1mHbUwJ_KFstztcWyPmsVurnkCg-3Cw_sWlF4g28dXx_P00UgxpD_SRNa5ls3tn9iyKL5Tu7kQi7LhfRvsppIiyd7hniNnp094fsRwKU4B9GtI14BoZNfe7bPy4j097OZg7kP84aomZgMrZDMrLQgDbB4JSDRRm1J_vdoXpNzneXjXU_Ejg',
  },
  {
    id: 4,
    name: 'Oatmeal Serving Bowl',
    price: 150,
    tag: 'Speckled Stoneware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv8uUJE0kRFVYaPiokIGJmTfmPQQFrJ9mZmYwmp3Mkacuuca-Z8uawl7ZwAMveU7JPcFBV3nwVDQz146PAtuwhyqztsgr7_W8Xdw-yz6DXXFxDF5Z8RSdc2toWMPGfJE8fk994HBccBqtyJzC0MRbOx3zSvjtk15DZx2Dphl_XBbrmM89EUodN9CNuKRacf6PTGle2Zldhmw03MkioEaz22BakAyItU24Au1Dg15IMgH4YTC_Cp4_jHQ',
  },
];

const PersonalizedRecommendations = () => {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState('Hand-thrown Ceramic');

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const interests = [
    'Hand-thrown Ceramic',
    'Ancient Woodworking',
    'Textile Arts',
    'Cold-Pressed Paper',
    'Minimalist Metalwork',
    'Organic Glass',
    'Sustainable Weaving',
  ];

  return (
    <main className="pt-28 pb-20 bg-surface text-on-surface font-body-md min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Hero / Introduction */}
        <section className="mb-12 max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-forest-green mb-3">For You</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            A curated sanctuary of artisanal treasures, tailored to your appreciation for form, materiality, and the quiet resonance of the handmade.
          </p>
        </section>

        {/* Daily Discovery Editorial (Bento Layout) */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            
            {/* Left large card */}
            <div className="md:col-span-8 relative group overflow-hidden bg-surface-container h-[420px] md:h-[500px] rounded-lg shadow-sm">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbnXbKLymoxy60SZA46TyB-EzIuSlzRfj5udacfM0rrRothUJE5J5f5re0vA0Wt4Gn_1wW7bigWtTS8WBxC3HGeqrcm4GxM6cPctNtrzyF5Pa1sy3TD0B6lIB36sce3hdUTMrUze453wg3v-Yu4GMsLXYtpLn2w3XgtB3tJipnrcaG3O7eLK1LnysxfLrBV_gSe2X3szJdVlVTKF6Npys--qziJaQhm21FrIJel-miGf8sh5ADuHWnNw')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-green/80 via-forest-green/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="font-label-md text-label-md uppercase tracking-widest mb-1 block opacity-80">Daily Discovery</span>
                <h2 className="font-headline-lg text-headline-lg mb-4 max-w-lg text-white">The Silent Narrative of Warp and Weft</h2>
                <button 
                  onClick={() => navigate('/products?category=Textiles')}
                  className="bg-white text-forest-green px-6 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider hover:bg-forest-green hover:text-white transition-colors font-semibold"
                >
                  Read Story
                </button>
              </div>
            </div>

            {/* Right split cards */}
            <div className="md:col-span-4 flex flex-col gap-gutter">
              <div className="flex-1 bg-surface-container p-6 rounded-lg flex flex-col justify-center border border-outline-variant/20 shadow-sm">
                <h3 className="font-headline-md text-headline-md text-forest-green mb-2">The Curated Palette</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-sm">Discover pieces selected for your specific affinity for Obsidian and Cedarwood.</p>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full bg-[#4a3728] shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full bg-[#e2dfd9] shadow-sm border border-outline-variant/30"></div>
                </div>
              </div>

              <div 
                onClick={() => navigate('/products')}
                className="flex-1 relative group overflow-hidden rounded-lg cursor-pointer shadow-sm min-h-[200px]"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6OdPcLSKS5QGAQwsgQJTTl9fAbo-ZjB1zVoRytjOejAmutrrg-DhtwlyasZ8uCz7c0S3AOKXP9Cf6Q_CpZ7uPqFfDH4CpRqIzytcJPS2CfF5LaYGi4j0fMPty-z2gR94ZBIySegiXljyfzcRE-jyaEV6xZE5pvhwbNHP6ONy5tz5KWvHBcFWPdvoqBv2gzGenCqw-4kDWozHBlpFLWN--iyvIfHS8jWBEuANF2Vp9GN5EaxrEWeCNzA')" }}
                />
                <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-label-md text-label-md border-b border-white py-1">Explore Materiality</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Behavior Based Section: Ceramics */}
        <section className="bg-surface-container-low py-16 mb-20 -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1 block font-semibold">Because you admired Ceramics</span>
                <h2 className="font-headline-lg text-headline-lg text-forest-green">Vessels of Intention</h2>
              </div>
              <Link to="/products?category=Ceramics" className="font-label-md text-label-md text-on-surface-variant border-b border-outline hover:text-on-surface transition-colors pb-1">
                View All Ceramics
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              {CERAMICS_ITEMS.map(item => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/products?category=Ceramics`)}
                  className="group cursor-pointer block"
                >
                  <div className="aspect-[4/5] overflow-hidden mb-3 bg-white rounded-lg shadow-sm">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={item.name} 
                      src={item.image} 
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-body-md text-body-md text-on-surface mb-1 group-hover:text-secondary transition-colors font-medium">{item.name}</h4>
                    <p className="font-label-md text-label-md text-on-surface-variant">${item.price}</p>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-label-sm text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant">{item.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General Recommendations Grid */}
        <section className="mb-20">
          <h3 className="font-headline-md text-headline-md text-forest-green mb-8">Artisanal Pieces for Your Collection</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            
            {/* Large Feature Card: The Solar Orb */}
            <div className="md:col-span-2 row-span-2 group relative overflow-hidden bg-white rounded-lg shadow-sm h-[400px] md:h-[500px]">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="The Solar Orb" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB44Gi6fCZIkoviKXgoxh0tV4sViBLBygAKC7TH9qy1gDFXM-1R0wG4s5KUbJDudXDx4s23BJ5WHesMPI4Vocz0bzW6Mq4AjMbuzqc9FO2cNlgK9V6WzTrxmv7MwrleQg82juby9twvgCZJ7VkAcIxl0wTbxXVS5Kuc9GUmYOWPbgcISaKdemVVmkIQtzxJe3UbU1fNBC0Wg7WdL3Nwcjs4PM2fDv6CILIOR4vs0IzjAenKBIaIrWoKhQ" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 mb-1">New in Glasswork</p>
                <h4 className="font-headline-lg text-headline-lg text-white">The Solar Orb</h4>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-body-lg text-body-lg text-white font-semibold">$1,250</p>
                  <button 
                    onClick={() => navigate('/products?category=Glasswork')}
                    className="bg-white text-forest-green p-3 rounded-full flex items-center justify-center hover:bg-forest-green hover:text-white transition-colors shadow"
                  >
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Smaller Card 1: Indigo Nomad Rug */}
            <div 
              onClick={() => navigate('/products?category=Textiles')}
              className="group border border-outline-variant/30 p-4 hover:shadow-lg transition-shadow bg-white rounded-lg cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-4 rounded bg-surface-container">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Indigo Nomad Rug" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm1D84B1TgbEJ0tKeyL7niI2JIp7ZjU1i6gggHRpV7PC_au9qtZvsOfRMuxIFPumkvFWyck0khe6eitUKyfk0BndF6H-VsZK6gT7rlYvt0hPXfEPKdGQTJiXva1PckAqrCBDJE5zoxsxjaL3cMBbgONBUX-JK41aPCnulGAknTGLxkeyIzBVp8zb2I5gHx_E9iCbtYda43l2xSUDnfJpfrvNMpjEyqaQlQw_RNE3A-bLx72S13kFVz7Q" 
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-label-md text-label-md text-on-surface mb-1 font-semibold">Indigo Nomad Rug</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">$480</p>
              </div>
            </div>

            {/* Smaller Card 2: Aurum Desk Lamp */}
            <div 
              onClick={() => navigate('/products?category=Lighting')}
              className="group border border-outline-variant/30 p-4 hover:shadow-lg transition-shadow bg-white rounded-lg cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-4 rounded bg-surface-container">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Aurum Desk Lamp" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNU5vhLScTFBYMPjYaywkz6twJkdWkK8aUHa83XbA_5B_bTK_3Kcy_xpnsa8odDMIGRp475WUmybZ203YsuaIHY_vO5w8a9wcHnISRgboSuUJxnfAoVs33xUdFscC2nF5ZkcmYc_tR29CXuy_rtScrqWuzRC0CzQrIcFMXxnmI14urdDMbBpgC-OptqRAfGd-MbtROc_Zd610ykpyjcQcqB8aoc0b-GBwAwGjeYngfipSDkxg3xGCXpA" 
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-label-md text-label-md text-on-surface mb-1 font-semibold">Aurum Desk Lamp</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">$620</p>
              </div>
            </div>

          </div>
        </section>

        {/* Visual Divider Quote */}
        <section className="h-48 relative overflow-hidden mb-16 rounded-xl bg-forest-green/10 flex items-center justify-center">
          <div className="text-center px-6">
            <h3 className="font-headline-md text-headline-md text-forest-green italic">"Craft is the language of the soul made visible."</h3>
          </div>
        </section>

        {/* Personalized Category Chips */}
        <section className="mb-16 overflow-hidden">
          <p className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider font-semibold">Explore Your Interests</p>
          <div className="flex gap-3 overflow-x-auto pb-4 custom-scroll whitespace-nowrap">
            {interests.map(interest => (
              <button
                key={interest}
                onClick={() => setSelectedInterest(interest)}
                className={`px-6 py-2.5 rounded font-label-md text-label-md transition-all ${
                  selectedInterest === interest
                    ? 'bg-forest-green text-white shadow-md'
                    : 'bg-surface-container-highest text-on-surface border border-outline-variant/30 hover:bg-forest-green hover:text-white'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default PersonalizedRecommendations;
