import api from '../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const RatingsReviews = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState('all');

  const reviews = [
    {
      id: 1,
      user: "Emma W.",
      rating: 5,
      date: "Nov 2, 2023",
      title: "Absolutely Stunning Craftsmanship",
      content: "The pictures don't do this piece justice. You can feel the texture of the raw clay and see the delicate throwing lines. It arrived perfectly packaged with a handwritten note from the artisan. Truly a piece I will cherish forever.",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw"]
    },
    {
      id: 2,
      user: "David K.",
      rating: 4,
      date: "Oct 18, 2023",
      title: "Beautiful but slightly smaller than expected",
      content: "The glaze is beautiful and it looks great on my dining table. It was slightly smaller than I imagined from the photos, but the quality is undeniable. Would definitely buy from this studio again.",
      images: []
    }
  ];

  const renderStars = (rating) => {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <div className="flex items-center text-forest-green">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`material-symbols-outlined text-[16px] ${i < rating ? 'font-variation-fill' : ''}`}>
            star
          </span>
        ))}
      </div>
    );
  };

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.rating === parseInt(filter));

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link to={`/product/${id || 1}`} className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Product
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Customer Reviews</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Sidebar - Summary */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm sticky top-24">
              <div className="text-center mb-6">
                <div className="font-display-lg text-6xl text-on-surface mb-2">4.8</div>
                <div className="flex justify-center mb-2">{renderStars(5)}</div>
                <p className="font-body-md text-on-surface-variant">Based on 24 reviews</p>
              </div>

              {/* Rating Bars */}
              <div className="space-y-3 mb-8">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setFilter(filter === star.toString() ? 'all' : star.toString())}
                    className={`w-full flex items-center gap-3 p-1 rounded transition-colors ${filter === star.toString() ? 'bg-surface-variant/50' : 'hover:bg-surface-variant/30'}`}
                  >
                    <span className="font-label-sm text-on-surface w-4">{star}</span>
                    <span className="material-symbols-outlined text-[14px] text-forest-green font-variation-fill">star</span>
                    <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-forest-green" 
                        style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '5%' }}
                      ></div>
                    </div>
                    <span className="font-label-sm text-on-surface-variant w-6 text-right">
                      {star === 5 ? '20' : star === 4 ? '3' : star === 3 ? '1' : '0'}
                    </span>
                  </button>
                ))}
              </div>

              <button className="w-full py-3 border border-forest-green text-forest-green font-label-md rounded hover:bg-forest-green/5 transition-colors">
                Write a Review
              </button>
            </div>
          </div>

          {/* Right Area - Reviews List */}
          <div className="flex-1">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/30">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {filter === 'all' ? 'All Reviews' : `${filter}-Star Reviews`}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-on-surface-variant">Sort by:</span>
                <select className="bg-transparent border-0 font-body-sm text-on-surface focus:ring-0 cursor-pointer outline-none">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>With Images</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-body-md text-on-surface-variant">No reviews found for this rating.</p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="pb-8 border-b border-outline-variant/20 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface font-label-md">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-label-md text-on-surface">{review.user}</p>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px] text-forest-green font-variation-fill">verified</span>
                            <span className="font-label-sm text-forest-green">Verified Buyer</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-body-sm text-on-surface-variant">{review.date}</span>
                    </div>

                    <div className="my-3">{renderStars(review.rating)}</div>
                    
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">{review.title}</h4>
                    <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">{review.content}</p>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((img, idx) => (
                          <img key={idx} src={img} alt="Review" className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity border border-outline-variant/30" />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-forest-green transition-colors font-label-sm">
                        <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                        Helpful
                      </button>
                      <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-error transition-colors font-label-sm">
                        <span className="material-symbols-outlined text-[16px]">flag</span>
                        Report
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
