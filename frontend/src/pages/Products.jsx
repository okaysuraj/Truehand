import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentMinRating = searchParams.get('minRating') || '';
  const currentSort = searchParams.get('sort') || '';

  const handleAddToWishlist = async (e, productId) => {
    e.preventDefault();
    if (!user) { alert('Please login to add to wishlist'); return; }
    try {
      await api.post(`/wishlist/user/${user.id}/product/${productId}`);
      alert('Added to Wishlist!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCompare = (product) => {
    let items = JSON.parse(localStorage.getItem('compareItems')) || [];
    if (items.length >= 4) { alert('You can only compare up to 4 items'); return; }
    if (!items.find(i => i.id === product.id)) {
      items.push(product);
      localStorage.setItem('compareItems', JSON.stringify(items));
      alert('Added to Compare list!');
    } else {
      alert('Already in Compare list!');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (currentSearch) params.search = currentSearch;
        if (currentCategory) params.category = currentCategory;
        if (currentMinPrice) params.minPrice = currentMinPrice;
        if (currentMaxPrice) params.maxPrice = currentMaxPrice;
        if (currentMinRating) params.minRating = currentMinRating;
        if (currentSort) params.sort = currentSort;
        
        // Always ask for 50 items for now
        params.size = 50;

        const res = await api.get('/products/filter', { params });
        if (res.data && res.data.content) {
          setProducts(res.data.content);
          setTotalElements(res.data.totalElements);
        } else {
          setProducts(res.data);
          setTotalElements(res.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [currentSearch, currentCategory, currentMinPrice, currentMaxPrice, currentMinRating, currentSort]);

  const updateFilter = (key, value) => {
    setSearchParams(prev => {
      if (value === null || value === '') {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  };

  const setPriceFilter = (min, max) => {
    setSearchParams(prev => {
      if (min !== null) prev.set('minPrice', min); else prev.delete('minPrice');
      if (max !== null) prev.set('maxPrice', max); else prev.delete('maxPrice');
      return prev;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const categories = ['Electronics', 'Fashion', 'Home', 'Groceries', 'Vegetables', 'Fruits', 'Dairy'];

  return (
    <div className="products-layout" style={{ display: 'flex', gap: 24, maxWidth: 1400, margin: '0 auto', padding: 20 }}>
      {/* Sidebar Filters */}
      <div className="sidebar" style={{ width: 260, flexShrink: 0 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>Filters</h3>
          <button onClick={clearFilters} style={{ fontSize: 13, color: '#007185', background: 'none', border: 'none', cursor: 'pointer' }}>Clear All</button>
        </div>

        <h4 style={{ marginBottom: 8 }}>Department</h4>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
          {categories.map(cat => (
            <li key={cat} style={{ marginBottom: 6 }}>
              <button 
                onClick={() => updateFilter('category', cat)}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  color: currentCategory === cat ? '#e47911' : '#111',
                  fontWeight: currentCategory === cat ? 'bold' : 'normal'
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        <h4 style={{ marginBottom: 8 }}>Customer Review</h4>
        <div style={{ marginBottom: 24 }}>
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} style={{ marginBottom: 6 }}>
              <button 
                onClick={() => updateFilter('minRating', rating)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <span style={{ color: '#FFA41C', fontSize: 18 }}>{renderStars(rating)}</span>
                <span style={{ color: currentMinRating == rating ? '#e47911' : '#111', fontWeight: currentMinRating == rating ? 'bold' : 'normal' }}>
                  & Up
                </span>
              </button>
            </div>
          ))}
        </div>

        <h4 style={{ marginBottom: 8 }}>Price</h4>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
          <li style={{ marginBottom: 6 }}><button onClick={() => setPriceFilter(null, 100)} style={{ background:'none', border:'none', cursor:'pointer', color: currentMaxPrice == 100 ? '#e47911' : '#111' }}>Under ₹100</button></li>
          <li style={{ marginBottom: 6 }}><button onClick={() => setPriceFilter(100, 500)} style={{ background:'none', border:'none', cursor:'pointer', color: (currentMinPrice == 100 && currentMaxPrice == 500) ? '#e47911' : '#111' }}>₹100 - ₹500</button></li>
          <li style={{ marginBottom: 6 }}><button onClick={() => setPriceFilter(500, 1000)} style={{ background:'none', border:'none', cursor:'pointer', color: (currentMinPrice == 500 && currentMaxPrice == 1000) ? '#e47911' : '#111' }}>₹500 - ₹1000</button></li>
          <li style={{ marginBottom: 6 }}><button onClick={() => setPriceFilter(1000, null)} style={{ background:'none', border:'none', cursor:'pointer', color: (currentMinPrice == 1000 && !currentMaxPrice) ? '#e47911' : '#111' }}>Over ₹1000</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="products-content" style={{ flexGrow: 1 }}>
        <div className="products-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, padding: 10, border: '1px solid #ddd', borderRadius: 8, background: '#f8f8f8' }}>
          <span style={{ fontWeight: 'bold' }}>
            {products.length} {products.length === 1 ? 'result' : 'results'} {currentSearch ? `for "${currentSearch}"` : ''}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>Sort by:</span>
            <select 
              value={currentSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              style={{ padding: '6px', borderRadius: 8, border: '1px solid #ccc', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
            >
              <option value="">Featured</option>
              <option value="price,asc">Price: Low to High</option>
              <option value="price,desc">Price: High to Low</option>
              <option value="averageRating,desc">Avg. Customer Review</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', fontSize: 18, color: '#565959' }}>
            No products match your selected filters. Try clearing some filters.
          </div>
        ) : (
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {products.map(p => (
              <div key={p.id} className="product-card" style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', transition: 'box-shadow 0.2s' }}>
                <div className="product-img-container" style={{ height: 220, padding: 20, background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link to={`/product/${p.id}`}>
                    <img src={p.imageUrl || `https://picsum.photos/200/200?random=${p.id}`} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </Link>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Link to={`/product/${p.id}`}><h3 style={{ fontSize: 16, marginBottom: 8, color: '#0f1111', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</h3></Link>
                  <div style={{ fontSize: 12, color: '#565959', marginBottom: 4 }}>Sold by {p.sellerName || 'TrueHand'}</div>
                  
                  <div className="star-rating" style={{ color: '#FFA41C', marginBottom: 8, fontSize: 18 }}>
                    {renderStars(p.averageRating)} <span className="rating-count" style={{ color: '#007185', fontSize: 14 }}>{p.reviewCount || 0}</span>
                  </div>
                  
                  <div className="price-display" style={{ marginBottom: 12 }}>
                    <span className="price-symbol" style={{ fontSize: 12, position: 'relative', top: '-0.4em' }}>₹</span>
                    <span className="price-whole" style={{ fontSize: 24, fontWeight: 'bold' }}>{Math.floor(p.price)}</span>
                    <span className="price-fraction" style={{ fontSize: 12, position: 'relative', top: '-0.4em' }}>{(p.price % 1).toFixed(2).substring(2)}</span>
                  </div>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button 
                      onClick={() => addToCart(p, 1)}
                      style={{ width: '100%', padding: '8px 0', borderRadius: 20, background: '#FFD814', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Add to Cart
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button 
                        onClick={(e) => handleAddToWishlist(e, p.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B12704', fontSize: 18 }}
                        title="Add to Wishlist"
                      >
                        ❤️
                      </button>
                      <button 
                        onClick={() => handleAddToCompare(p)}
                        style={{ fontSize: 12, padding: '4px 8px', borderRadius: 4, background: '#f0f2f2', border: '1px solid #d5d9d9', cursor: 'pointer' }}
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
