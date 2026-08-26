import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_RESULTS = [
  {
    id: 1,
    name: 'Obsidian Glaze Shallow Bowl',
    artisan: 'Elena Rossi',
    price: 124.00,
    material: 'Terracotta',
    region: 'Mediterranean',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaV5zg5e1WixEehVmJo05h2uukB4pg7nIZAbLLU6NvaFPWgPK53NlTtfa_Ym6eymgSRtyJ9Z8lBQNaSXAS3-mHYS_KH_p3_rAOc2nxELzSrJjhhzMJO0NB0k03ighT0ryWJe52JdS0z7y7xZhPpUIjIX-A3c0woyO2o2Dj-2_pAuCrdDqHy2A0uty7h2qRID3zcU_9tG2qVuEHEbIVZn0tOItuuqMzW5u13-8QXHPfHGlpJ7VhCx6uTQ',
  },
  {
    id: 2,
    name: 'Azure Mist Tea Bowl',
    artisan: 'Kenji Tanaka',
    price: 86.00,
    material: 'Porcelain',
    region: 'Kyoto, Japan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTTWeuVYDDRe0x4ZU51h8rL4iG58TGr81FhoCMkQpQOUIVAGka_3xyykWtamLLGlvWL2pZO4hmx_gg1ZUB41Lhlzve-nlIwmKkNbyqYZdjc_6wjoA1HQXtbSK7pbx1saHgilkALjF20vG07_7qQfEBsZHP7-5Wstx2gtJuvENMBcybzoMo8RVY9ulri5MvvU5W88tw3k7kq5OPUHGbatM5VepcjaQPuBwzsFejZh6wwdSbomP-YDuuA',
  },
  {
    id: 3,
    name: 'Sandscape Nesting Trio',
    artisan: 'Søren Lund',
    price: 210.00,
    material: 'Stoneware',
    region: 'Scandinavian',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5AP7HQGh0LspMcziUto_0uYpmrPu1P-7z7EFsm99EDbaKdm-z01vIc7FjvFdStbcx-11XJS7OMRTK5KqTiylAKEOuShpESLCpop2DvpVzmd4xcN8DcLGOpugxxqp5m_ZcD97eCr1VS5qe4PGCQjM7ftNXa_iw9hAKnMm03TmbdRL5WUb6SxGqPcwEOYHeETHmguAWy7_SeDFWurBK8xgF6gk4OqT2CEWMWxnGs94RfsodsPc51-lkg',
  },
  {
    id: 4,
    name: 'Moss Hearth Serving Bowl',
    artisan: 'Clara Dupont',
    price: 155.00,
    material: 'Raku',
    region: 'Mediterranean',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhzaetYRdJNKME-R2JoF7cu-bbRCCWIPRR5kfwYV5g00yn-P-A74ZPWzShTAJhu0IskvtnVBudJNMx5bCzmdGAWEjP48JgRVIqdruFvicFCt4xfhPtUiqEtdDTA1LuGtQysrAHysZd71zENSZNWMafchvJadKDhM4HM8FRt8B18Lnye-FoUaXdH8Ef0uF-qTJ4qUGH8ICKtDvlMWR9LfM-PZyJROsM3byJJpnG-VQrsJMb4rCYtwpaLQ',
  },
  {
    id: 5,
    name: 'Blush Earth Small Bowl',
    artisan: 'Mei Lin',
    price: 45.00,
    material: 'Terracotta',
    region: 'Kyoto, Japan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv8uUJE0kRFVYaPiokIGJmTfmPQQFrJ9mZmYwmp3Mkacuuca-Z8uawl7ZwAMveU7JPcFBV3nwVDQz146PAtuwhyqztsgr7_W8Xdw-yz6DXXFxDF5Z8RSdc2toWMPGfJE8fk994HBccBqtyJzC0MRbOx3zSvjtk15DZx2Dphl_XBbrmM89EUodN9CNuKRacf6PTGle2Zldhmw03MkioEaz22BakAyItU24Au1Dg15IMgH4YTC_Cp4_jHQ',
  },
  {
    id: 6,
    name: 'Copper Flash Raku Vessel',
    artisan: 'Hiroshi Yamamoto',
    price: 320.00,
    material: 'Raku',
    region: 'Kyoto, Japan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRsAbCE5hzwo-4AuO2ROhc4s_eD2u0-fjQZMWQL21TiuiNMlMLSHliE2NzZrdQXvAsPw4neZ129tDCxa7LN6kdjQwE9FTMkTZn_nkz0Ti5t2fd977W2Eyyiekt8ltZMfPtc5nJiWyGztLXAyiqr5utJiGX1W9js0ISFGOUamDbwRKeKwWqVITHn407jcMGMYzNwvMXFsFhTAI9H13PQ_4o6mGUlsz8uyjYt0QN_wqDtdvvXeP2FDS4wQ',
  },
  {
    id: 7,
    name: 'Raw Speckled Hand-Formed Bowl',
    artisan: 'Anna Weber',
    price: 92.00,
    material: 'Stoneware',
    region: 'Scandinavian',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3AoUmX8La34ZYtmSOG69aUzef5bD4UZIQ2emGtkJML5dDe17AT6_hMogw1ZKgNsvhyqBAPEkobaTl06wRaPzZY4tPsAdsyKdZH0Br0QUzVnCKnev5EhFTH3NYx7VScMOuiIIqxi9L7CVM_4CcxX03j4QA7Lp9IwSSrRg3-raPtAr0RDN2a31bGQB1BkuE9yZRdkkNFuUB0EFUB41BEOVPT_vVWfSxQu0PUmK8LZKBSssT9UUBH_pQbQ',
  },
  {
    id: 8,
    name: 'Origami Porcelain Basin',
    artisan: 'Lucas Silva',
    price: 178.00,
    material: 'Porcelain',
    region: 'Andean Highs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_vJI7Pm76RJElv2hKBUy0vLlvXm9MBYHLNOzExK_mE56g4_a5bevQ9_VkrG0tv0QnE-1mHbUwJ_KFstztcWyPmsVurnkCg-3Cw_sWlF4g28dXx_P00UgxpD_SRNa5ls3tn9iyKL5Tu7kQi7LhfRvsppIiyd7hniNnp094fsRwKU4B9GtI14BoZNfe7bPy4j097OZg7kP84aomZgMrZDMrLQgDbB4JSDRRm1J_vdoXpNzneXjXU_Ejg',
  },
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get('q') || 'Ceramic Bowls';
  
  const [selectedMaterials, setSelectedMaterials] = useState(['Terracotta']);
  const [selectedPriceRange, setSelectedPriceRange] = useState('50-150');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [sortBy, setSortBy] = useState('Most Recent');
  const [products, setProducts] = useState(DEFAULT_RESULTS);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    api.get('/products/filter', { params: { search: queryParam, size: 20 } })
      .then(res => {
        const items = res.data?.content || res.data;
        if (Array.isArray(items) && items.length > 0) {
          const mapped = items.map((p, idx) => ({
            id: p.id,
            name: p.name,
            artisan: p.sellerName || DEFAULT_RESULTS[idx % DEFAULT_RESULTS.length].artisan,
            price: p.price,
            material: p.material || DEFAULT_RESULTS[idx % DEFAULT_RESULTS.length].material,
            region: p.region || DEFAULT_RESULTS[idx % DEFAULT_RESULTS.length].region,
            image: p.imageUrl || DEFAULT_RESULTS[idx % DEFAULT_RESULTS.length].image,
          }));
          setProducts(mapped);
        }
      })
      .catch(e => console.warn(e));
  }, [queryParam]);

  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleRegion = (reg) => {
    setSelectedRegions(prev => 
      prev.includes(reg) ? prev.filter(r => r !== reg) : [...prev, reg]
    );
  };

  const filteredProducts = products.filter(p => {
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material)) {
      return false;
    }
    if (selectedRegions.length > 0 && !selectedRegions.includes(p.region)) {
      return false;
    }
    if (selectedPriceRange === 'under-50' && p.price >= 50) return false;
    if (selectedPriceRange === '50-150' && (p.price < 50 || p.price > 150)) return false;
    if (selectedPriceRange === '150-300' && (p.price < 150 || p.price > 300)) return false;
    if (selectedPriceRange === 'over-300' && p.price <= 300) return false;
    return true;
  });

  const displayList = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop bg-surface text-on-surface font-body-md min-h-screen">
      
      {/* Search Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-baseline justify-between border-b border-outline-variant/30 pb-6">
        <div>
          <h1 className="font-display-lg text-display-lg text-charcoal mb-1 font-bold">{queryParam}</h1>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">
            {displayList.length} artisan pieces found
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <span className="font-label-sm text-xs text-on-surface-variant">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-label-md text-sm text-on-surface bg-transparent border-b border-charcoal/30 pb-1 focus:outline-none cursor-pointer"
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Highest Rated">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Side Filter Panel */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="space-y-6">
            
            {/* Material Filter */}
            <div className="border-b border-outline-variant/20 pb-6">
              <h3 className="font-label-md text-label-md text-charcoal mb-3 uppercase tracking-wider font-semibold text-xs">Material</h3>
              <div className="space-y-2">
                {['Terracotta', 'Porcelain', 'Stoneware', 'Raku'].map(mat => (
                  <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="w-4 h-4 rounded-sm border-outline accent-forest-green"
                    />
                    <span className="font-body-md text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {mat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-b border-outline-variant/20 pb-6">
              <h3 className="font-label-md text-label-md text-charcoal mb-3 uppercase tracking-wider font-semibold text-xs">Price</h3>
              <div className="space-y-2">
                {[
                  { label: 'Under $50', value: 'under-50' },
                  { label: '$50 — $150', value: '50-150' },
                  { label: '$150 — $300', value: '150-300' },
                  { label: 'Over $300', value: 'over-300' },
                ].map(p => (
                  <label key={p.value} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === p.value}
                      onChange={() => setSelectedPriceRange(p.value)}
                      className="w-4 h-4 accent-forest-green"
                    />
                    <span className="font-body-md text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {p.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div className="pb-6">
              <h3 className="font-label-md text-label-md text-charcoal mb-3 uppercase tracking-wider font-semibold text-xs">Region</h3>
              <div className="space-y-2">
                {['Mediterranean', 'Kyoto, Japan', 'Scandinavian', 'Andean Highs'].map(reg => (
                  <label key={reg} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedRegions.includes(reg)}
                      onChange={() => toggleRegion(reg)}
                      className="w-4 h-4 rounded-sm border-outline accent-forest-green"
                    />
                    <span className="font-body-md text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {reg}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {}}
              className="w-full py-3 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded hover:opacity-90 transition-opacity font-semibold shadow-sm"
            >
              Apply Filters
            </button>

          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayList.slice(0, visibleCount).map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group cursor-pointer block"
              >
                <div className="aspect-[4/5] overflow-hidden mb-3 bg-surface-container rounded-lg shadow-sm">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={product.name} 
                    src={product.image} 
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-body-md text-sm text-on-surface font-semibold group-hover:text-forest-green transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant italic mb-1">
                    by {product.artisan}
                  </p>
                  <p className="font-label-md text-sm text-forest-green font-bold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Pieces */}
          {visibleCount < displayList.length && (
            <div className="mt-12 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-8 py-3 border border-outline text-on-surface font-label-md text-xs uppercase tracking-widest hover:bg-forest-green hover:text-white transition-all rounded font-semibold"
              >
                Load More Pieces
              </button>
              <p className="text-xs text-on-surface-variant mt-2">
                Showing {Math.min(visibleCount, displayList.length)} of {displayList.length} unique creations
              </p>
            </div>
          )}
        </section>

      </div>

    </main>
  );
};

export default SearchResults;
