import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewError, setReviewError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProductAndReviews();
  }, [id]);

  const fetchProductAndReviews = async () => {
    try {
      const prodRes = await api.get(`/products/${id}`);
      setProduct(prodRes.data);
      const revRes = await api.get(`/reviews/product/${id}`);
      setReviews(revRes.data);
      const qRes = await api.get(`/questions/product/${id}`);
      setQuestions(qRes.data);
      try {
        const recRes = await api.get(`/products/${id}/recommendations`);
        setRecommendations(recRes.data);
      } catch (err) {
        console.log('No recommendations found');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!user) { alert('Please login to ask a question'); return; }
    if (!newQuestion.trim()) return;
    try {
      await api.post(`/questions/product/${id}/user/${user.id}`, { content: newQuestion });
      setNewQuestion('');
      alert('Question submitted successfully');
      fetchProductAndReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewError('You must be logged in to review.');
      return;
    }
    setIsSubmitting(true);
    setReviewError('');
    try {
      await api.post('/reviews', {
        productId: product.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      setReviewForm({ rating: 5, comment: '' });
      fetchProductAndReviews(); // refresh reviews and product rating
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Error submitting review. Make sure you have purchased this item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) { alert('Please login to add to wishlist'); return; }
    try {
      await api.post(`/wishlist/user/${user.id}/product/${product.id}`);
      alert('Added to Wishlist!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCompare = () => {
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

  if (!product) return <div style={{padding: 20}}>Loading...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <div className="product-detail-container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 30 }}>
        {/* Left: Image */}
        <div>
          <img src={product.imageUrl || `https://picsum.photos/600/600?random=${product.id}`} alt={product.name} className="detail-image" style={{ width: '100%', borderRadius: 8 }} />
        </div>

        {/* Center: Details */}
        <div className="detail-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 className="detail-title" style={{ fontSize: 28, marginBottom: 8, flex: 1 }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: 10 }}>
              <button 
                onClick={handleAddToWishlist}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B12704', fontSize: 24 }}
                title="Add to Wishlist"
              >
                ❤️
              </button>
              <button 
                onClick={handleAddToCompare}
                style={{ fontSize: 14, padding: '4px 12px', borderRadius: 4, background: '#f0f2f2', border: '1px solid #d5d9d9', cursor: 'pointer', height: 'fit-content', alignSelf: 'center' }}
              >
                Compare
              </button>
            </div>
          </div>
          <div style={{color:'#007185', marginBottom: 8}}>Visit the {product.sellerName || 'TrueHand'} Store</div>
          
          <div className="star-rating" style={{fontSize: 20, color: '#FFA41C'}}>
            {renderStars(product.averageRating)} <span className="rating-count" style={{fontSize: 16, color: '#007185', marginLeft: 8}}>{product.reviewCount || 0} ratings</span>
          </div>
          
          <hr style={{margin: '10px 0', border: 'none', borderTop: '1px solid #ddd'}} />
          
          <div className="price-display">
            <span className="price-symbol" style={{fontSize: 14}}>₹</span>
            <span className="price-whole" style={{fontSize: 28}}>{Math.floor(product.price)}</span>
            <span className="price-fraction" style={{fontSize: 14}}>{(product.price % 1).toFixed(2).substring(2)}</span>
          </div>
          
          <div style={{fontSize: 14, color: '#565959'}}>Inclusive of all taxes</div>
          
          <hr style={{margin: '14px 0', border: 'none', borderTop: '1px solid #ddd'}} />
          
          <h3 style={{fontSize: 16, marginBottom: 8}}>About this item</h3>
          <ul style={{paddingLeft: 20, fontSize: 14, lineHeight: 1.6}}>
            <li>{product.description}</li>
            <li>Category: {product.category}</li>
          </ul>
        </div>

        {/* Right: Buy Box */}
        <div>
          <div className="detail-buybox" style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
            <div className="price-display" style={{marginBottom: 14}}>
              <span className="price-symbol" style={{fontSize: 14}}>₹</span>
              <span className="price-whole" style={{fontSize: 24}}>{Math.floor(product.price)}</span>
              <span className="price-fraction" style={{fontSize: 14}}>{(product.price % 1).toFixed(2).substring(2)}</span>
            </div>
            
            <div style={{fontSize: 14, marginBottom: 14}}>
              <span style={{color:'#007185'}}>FREE delivery</span> <b>Tomorrow 8 AM - 12 PM</b>. Order within 10 hrs 30 mins.
            </div>
            
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom: 14}}>
              <span style={{fontSize:20}}>📍</span> <span style={{color:'#007185', fontSize:14}}>Deliver to India</span>
            </div>
            
            {product.stockQuantity > 0 ? (
              <div className="in-stock" style={{ color: '#007600', fontSize: 18, marginBottom: 10 }}>In stock</div>
            ) : (
              <div style={{color:'#B12704', fontSize:18, marginBottom:10}}>Currently unavailable.</div>
            )}
            
            <div style={{marginBottom: 14}}>
              <label style={{fontSize:13}}>Quantity: </label>
              <select value={qty} onChange={e => setQty(Number(e.target.value))} style={{padding: '4px 8px', borderRadius: 8}}>
                {[...Array(Math.min(10, product.stockQuantity || 1)).keys()].map(x => (
                  <option key={x+1} value={x+1}>{x+1}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="btn btn-primary w-full" 
              style={{marginBottom: 10, borderRadius: 20, padding: '8px 0', width: '100%', background: '#FFD814', border: 'none', cursor: 'pointer'}}
              onClick={() => addToCart(product, qty)}
              disabled={product.stockQuantity === 0}
            >
              Add to Cart
            </button>
            
            <button 
              className="btn btn-secondary w-full" 
              style={{marginBottom: 14, borderRadius: 20, padding: '8px 0', width: '100%', background: '#FFA41C', border: 'none', cursor: 'pointer'}}
              onClick={() => { addToCart(product, qty); navigate('/checkout'); }}
              disabled={product.stockQuantity === 0}
            >
              Buy Now
            </button>
            
            <div style={{fontSize: 12, color: '#565959', display: 'grid', gridTemplateColumns: '80px 1fr', gap: 4}}>
              <span>Ships from</span><span>TrueHand</span>
              <span>Sold by</span><span style={{color:'#007185'}}>{product.sellerName || 'TrueHand'}</span>
            </div>
          </div>
        </div>
      </div>

      <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid #ddd'}} />

      {/* Smart Recommendations */}
      {recommendations.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 20 }}>You Might Also Like</h2>
          <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 10 }}>
            {recommendations.map(rec => (
              <div key={rec.id} style={{ minWidth: 200, border: '1px solid #ddd', borderRadius: 8, padding: 15, background: '#fff', cursor: 'pointer' }} onClick={() => navigate(`/product/${rec.id}`)}>
                <img src={rec.imageUrl || `https://picsum.photos/200/200?random=${rec.id}`} alt={rec.name} style={{ width: '100%', height: 150, objectFit: 'contain', marginBottom: 10 }} />
                <h4 style={{ margin: '0 0 5px 0', fontSize: 14, color: '#0f1111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.name}</h4>
                <div style={{ color: '#B12704', fontSize: 18, fontWeight: 'bold' }}>₹{rec.price}</div>
                <div style={{ color: '#FFA41C', fontSize: 12 }}>{renderStars(rec.averageRating)} ({rec.reviewCount})</div>
              </div>
            ))}
          </div>
          <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid #ddd'}} />
        </div>
      )}

      {/* Customer Questions & Answers */}
      <div style={{ marginBottom: 40 }}>
        <h2>Customer Questions & Answers</h2>
        <form onSubmit={handleAskQuestion} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input 
            value={newQuestion} 
            onChange={e => setNewQuestion(e.target.value)} 
            placeholder="Have a question? Ask here..." 
            style={{ flex: 1, padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: 4, background: '#f0f2f2', border: '1px solid #d5d9d9', cursor: 'pointer' }}>Ask</button>
        </form>

        {questions.length === 0 ? (
          <p style={{ color: '#565959' }}>No questions have been asked yet. Be the first!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {questions.map(q => (
              <div key={q.id} style={{ padding: 15, border: '1px solid #eee', borderRadius: 8 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ fontWeight: 'bold' }}>Q:</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: '#007185', marginBottom: 4 }}>{q.content}</div>
                    <div style={{ fontSize: 12, color: '#565959' }}>Asked by {q.userName} on {new Date(q.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  <div style={{ fontWeight: 'bold' }}>A:</div>
                  <div style={{ flex: 1 }}>
                    {q.answer ? (
                      <div>
                        <div style={{ marginBottom: 4 }}>{q.answer}</div>
                        <div style={{ fontSize: 12, color: '#565959' }}>Answered by {product.sellerName || 'Seller'}</div>
                      </div>
                    ) : (
                      <div style={{ fontStyle: 'italic', color: '#565959' }}>Seller hasn't answered yet.</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid #ddd'}} />

      {/* Customer Reviews Section */}
      <div className="reviews-section" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40 }}>
        {/* Review Summary & Write Review */}
        <div>
          <h2>Customer Reviews</h2>
          <div style={{ fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#FFA41C', fontSize: 24 }}>{renderStars(product.averageRating)}</span> 
            <span>{product.averageRating ? product.averageRating.toFixed(1) : '0'} out of 5</span>
          </div>
          <p style={{ color: '#565959', marginBottom: 24 }}>{product.reviewCount || 0} global ratings</p>
          
          <hr style={{margin: '20px 0', border: 'none', borderTop: '1px solid #ddd'}} />
          
          <h3>Review this product</h3>
          <p style={{ fontSize: 14, color: '#565959', marginBottom: 16 }}>Share your thoughts with other customers</p>
          
          {user ? (
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Rating</label>
                <select 
                  value={reviewForm.rating} 
                  onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                  style={{ padding: 8, borderRadius: 4, width: '100%' }}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Written Review (Optional)</label>
                <textarea 
                  rows={4} 
                  value={reviewForm.comment}
                  onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder="What did you like or dislike?"
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #888' }}
                />
              </div>
              {reviewError && <div style={{ color: '#B12704', fontSize: 14 }}>{reviewError}</div>}
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ padding: '8px 16px', borderRadius: 8, background: '#fff', border: '1px solid #d5d9d9', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content' }}
              >
                {isSubmitting ? 'Submitting...' : 'Write a customer review'}
              </button>
            </form>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              style={{ padding: '8px 16px', borderRadius: 8, background: '#fff', border: '1px solid #d5d9d9', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign in to write a review
            </button>
          )}
        </div>

        {/* Review List */}
        <div>
          <h3 style={{ marginBottom: 16 }}>Top reviews from India</h3>
          {reviews.length === 0 ? (
            <p style={{ color: '#565959' }}>No reviews yet. Be the first to review this product!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      👤
                    </div>
                    <span style={{ fontWeight: 'bold' }}>{review.userName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: '#FFA41C' }}>{renderStars(review.rating)}</span>
                    <span style={{ fontWeight: 'bold', fontSize: 14, color: '#C45500' }}>Verified Purchase</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#565959', marginBottom: 8 }}>
                    Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <p style={{ lineHeight: 1.5, fontSize: 14 }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
