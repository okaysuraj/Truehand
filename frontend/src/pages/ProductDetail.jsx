import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    window.scrollTo(0, 0);
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
    return (
      <span className="flex text-terracotta">
        {Array(fullStars).fill().map((_, i) => <span key={`f-${i}`} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
        {Array(emptyStars).fill().map((_, i) => <span key={`e-${i}`} className="material-symbols-outlined">star</span>)}
      </span>
    );
  };

  if (!product) return (
    <div className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-forest-green border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-label-md text-label-md text-on-surface-variant">Loading piece...</p>
      </div>
    </div>
  );

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      {/* Main Product Section */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Product Images (Left) */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-stack-md">
          <div className="aspect-[4/5] bg-surface-container-highest overflow-hidden rounded-md">
            <img 
              src={product.imageUrl || `https://picsum.photos/800/1000?random=${product.id}`} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>
          <div className="grid grid-cols-2 gap-stack-md">
            <div className="aspect-square bg-surface-container-highest overflow-hidden rounded-md">
              <img 
                src={`https://picsum.photos/400/400?random=${product.id + 1}`} 
                alt="Detail 1"
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="aspect-square bg-surface-container-highest overflow-hidden rounded-md">
              <img 
                src={`https://picsum.photos/400/400?random=${product.id + 2}`} 
                alt="Detail 2"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
        
        {/* Product Details (Right) */}
        <div className="col-span-12 md:col-span-5 relative">
          <div className="sticky top-[120px] flex flex-col gap-stack-lg pl-0 md:pl-8">
            <div className="space-y-base">
              <span className="font-label-md text-label-md text-terracotta uppercase tracking-[0.2em]">{product.category || 'Collection'}</span>
              <h2 className="font-display-lg text-display-lg text-forest-green leading-none">{product.name}</h2>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="flex items-center gap-2">
              {renderStars(product.averageRating)}
              <span className="font-label-md text-label-md text-on-surface-variant">({product.reviewCount || 0} reviews)</span>
            </div>

            <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {product.description}
            </div>
            
            <div className="flex flex-col gap-stack-sm pt-4">
              <div className="flex items-center gap-4 mb-2">
                 <label className="font-label-md text-label-md text-on-surface">Quantity:</label>
                 <select 
                   value={qty} 
                   onChange={e => setQty(Number(e.target.value))} 
                   className="border border-outline-variant rounded p-2 focus:ring-1 focus:ring-forest-green outline-none bg-transparent"
                 >
                   {[...Array(Math.min(10, product.stockQuantity || 1)).keys()].map(x => (
                     <option key={x+1} value={x+1}>{x+1}</option>
                   ))}
                 </select>
              </div>

              {product.stockQuantity > 0 ? (
                <button 
                  onClick={() => addToCart(product, qty)}
                  className="w-full py-5 bg-forest-green text-white font-label-md text-label-md rounded-[4px] hover:bg-forest-green/90 transition-all active:scale-[0.98] uppercase tracking-wider"
                >
                  Add to Collection
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-5 bg-surface-variant text-outline font-label-md text-label-md rounded-[4px] cursor-not-allowed uppercase tracking-wider"
                >
                  Currently Unavailable
                </button>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToWishlist}
                  className="flex-1 py-4 border border-charcoal/20 text-charcoal font-label-md text-label-md rounded-[4px] hover:bg-surface-container transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  Save
                </button>
                <button 
                  onClick={handleAddToCompare}
                  className="flex-1 py-4 border border-charcoal/20 text-charcoal font-label-md text-label-md rounded-[4px] hover:bg-surface-container transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                  Compare
                </button>
              </div>
            </div>

            <div className="border-t border-charcoal/5 pt-stack-lg space-y-stack-md mt-4">
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center list-none font-label-md text-label-md text-on-surface py-2">
                  Dimensions & Details
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="font-body-md text-body-md text-on-surface-variant pt-2 leading-relaxed pb-4">
                  Sold by: {product.sellerName || 'TrueHand Collective'}<br/>
                  Stock: {product.stockQuantity} remaining<br/>
                  Authentic craftsmanship guaranteed.
                </div>
              </details>
              <details className="group cursor-pointer border-t border-charcoal/5 pt-stack-sm">
                <summary className="flex justify-between items-center list-none font-label-md text-label-md text-on-surface py-2">
                  Shipping & Returns
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="font-body-md text-body-md text-on-surface-variant pt-2 leading-relaxed pb-4">
                  Each piece is meticulously packed in sustainable, plastic-free packaging. Ships within 3-5 business days. Returns accepted within 14 days of delivery.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Maker's Note */}
      <section className="mt-section-gap bg-surface-container p-stack-lg md:p-24 flex flex-col items-center text-center rounded-lg">
        <div className="max-w-2xl space-y-stack-md">
          <span className="material-symbols-outlined text-4xl text-terracotta" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
          <h3 className="font-headline-lg text-headline-lg text-forest-green italic">
            "I believe objects carry the energy of their creation. This piece is meant to ground you—to make the act of holding it feel intentional and heavy with history."
          </h3>
          <div className="pt-8">
            <div className="font-label-md text-label-md text-on-surface font-bold">{product.sellerName || 'TrueHand Artisan'}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">Master Craftsman</div>
          </div>
        </div>
      </section>

      {/* Complementary Pieces (Recommendations) */}
      {recommendations.length > 0 && (
        <section className="mt-section-gap">
          <h3 className="font-headline-md text-headline-md text-forest-green mb-stack-lg">Complementary Pieces</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {/* Bento Layout mapping (first takes 2 cols if > 3 items) */}
            {recommendations.slice(0, 4).map((rec, idx) => (
              <div key={rec.id} className={`${idx === 0 && recommendations.length >= 3 ? 'md:col-span-2' : ''} group cursor-pointer`} onClick={() => navigate(`/product/${rec.id}`)}>
                <div className={`aspect-[${idx === 0 && recommendations.length >= 3 ? '16/10' : '1/1'}] bg-surface-container-highest overflow-hidden mb-4 rounded-md`}>
                  <img src={rec.imageUrl || `https://picsum.photos/400/400?random=${rec.id}`} alt={rec.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="text-center">
                  <h4 className="font-body-md text-body-md text-on-surface truncate">{rec.name}</h4>
                  <div className="font-label-md text-label-md text-on-surface-variant">${rec.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Q&A Section */}
      <section className="mt-section-gap">
        <h3 className="font-headline-md text-headline-md text-forest-green mb-8">Community Questions</h3>
        <div className="max-w-3xl">
          <form onSubmit={handleAskQuestion} className="flex gap-4 mb-8">
            <input 
              type="text"
              value={newQuestion} 
              onChange={e => setNewQuestion(e.target.value)} 
              placeholder="Ask a question about this piece..." 
              className="flex-1 bg-surface border-b border-charcoal/20 py-2 focus:outline-none focus:border-terracotta font-body-md px-2"
            />
            <button type="submit" className="font-label-md text-label-md text-white bg-forest-green px-6 py-2 rounded-[4px] hover:bg-forest-green/90 transition-colors uppercase tracking-wider">
              Ask
            </button>
          </form>

          {questions.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant italic">No questions have been asked yet. Be the first.</p>
          ) : (
            <div className="space-y-6">
              {questions.map(q => (
                <div key={q.id} className="p-6 border border-charcoal/10 rounded-lg bg-surface">
                  <div className="flex gap-4 mb-4">
                    <div className="font-headline-md text-terracotta leading-none mt-1">Q</div>
                    <div>
                      <div className="font-body-lg text-charcoal font-medium mb-1">{q.content}</div>
                      <div className="font-label-sm text-outline uppercase tracking-wider">Asked by {q.userName} on {new Date(q.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="font-headline-md text-forest-green leading-none mt-1">A</div>
                    <div>
                      {q.answer ? (
                        <>
                          <div className="font-body-md text-on-surface mb-1">{q.answer}</div>
                          <div className="font-label-sm text-outline uppercase tracking-wider">Answered by {product.sellerName || 'Artisan'}</div>
                        </>
                      ) : (
                        <div className="font-body-md text-on-surface-variant italic">Awaiting response from artisan.</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mt-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="col-span-12 md:col-span-4">
          <h3 className="font-headline-md text-headline-md text-forest-green mb-4">Reviews</h3>
          <div className="flex items-center gap-2 mb-2">
            {renderStars(product.averageRating)}
            <span className="font-headline-md text-charcoal ml-2">{product.averageRating ? product.averageRating.toFixed(1) : '0'} / 5</span>
          </div>
          <p className="font-label-md text-label-md text-outline tracking-wider uppercase mb-8">Based on {product.reviewCount || 0} reviews</p>
          
          <div className="bg-surface-container-low p-6 rounded-lg">
            <h4 className="font-label-md text-label-md text-charcoal mb-4 uppercase tracking-wider">Leave a Review</h4>
            {user ? (
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                <div>
                  <select 
                    value={reviewForm.rating} 
                    onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                    className="w-full bg-white border border-outline-variant rounded p-2 font-body-md focus:outline-none focus:border-forest-green"
                  >
                    <option value={5}>5 - Extraordinary Piece</option>
                    <option value={4}>4 - Beautiful</option>
                    <option value={3}>3 - Good Craftsmanship</option>
                    <option value={2}>2 - Disappointing</option>
                    <option value={1}>1 - Poor Quality</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    rows={4} 
                    value={reviewForm.comment}
                    onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                    placeholder="Share your thoughts on the craftsmanship..."
                    className="w-full bg-white border border-outline-variant rounded p-3 font-body-md focus:outline-none focus:border-forest-green resize-none"
                  />
                </div>
                {reviewError && <div className="text-error-red font-label-sm">{reviewError}</div>}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 border border-forest-green text-forest-green font-label-md text-label-md rounded-[4px] hover:bg-forest-green hover:text-white transition-colors uppercase tracking-wider"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 border border-charcoal/20 text-charcoal font-label-md text-label-md rounded-[4px] hover:bg-surface-container transition-colors uppercase tracking-wider"
              >
                Sign in to Review
              </button>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 md:pl-12">
          <h3 className="font-headline-md text-headline-md text-charcoal mb-8">Collector Thoughts</h3>
          {reviews.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant italic">No reviews yet. Be the first to share your thoughts.</p>
          ) : (
            <div className="space-y-8">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-charcoal/10 pb-8 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest-green text-white flex items-center justify-center font-headline-md">
                        {review.userName ? review.userName[0].toUpperCase() : 'C'}
                      </div>
                      <div>
                        <div className="font-label-md text-label-md text-charcoal">{review.userName}</div>
                        <div className="font-label-sm text-outline flex items-center gap-2">
                          <span className="material-symbols-outlined text-[14px] text-terracotta" style={{fontVariationSettings: "'FILL' 1"}}>verified</span> Verified Collector
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">{renderStars(review.rating)}</div>
                      <div className="font-label-sm text-outline uppercase tracking-wider">{new Date(review.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <p className="font-body-lg text-on-surface-variant leading-relaxed mt-4">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
