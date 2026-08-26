import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_COLLECTOR_REVIEWS = [
  {
    id: 1,
    author: 'Elena Moretti',
    initials: 'EM',
    verified: true,
    rating: 5,
    date: 'October 14, 2024',
    title: 'A masterpiece of ceramic art',
    comment: "I recently received the hand-thrown obsidian vessel and I am absolutely speechless. The weight, the texture, and the way it catches the morning light in my studio is nothing short of divine. You can truly feel the maker's intention in every curve. The packaging was also incredibly thoughtful and sustainable.",
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPWHEFcOB2UrEbqr4YgXdBqCKxYzkIxUTbZQBKXorkmKiDg36bXjYo0PZ6YatonqDlMYX8hmqwM7NxT4GgdCNt4vcKNEuFKZzejENDfmfM26-4idpD8zl5kf4XRu6Mx18_-4TuiVSYz-4xzPcsWeB504NDHaLFSClp0chEjHGhKLACKcTeJkZNuU5xBPvieKLa4VaR0LoWPjadQzgAxAim8i0hSbxx_gWj4V8CkyfVEWuNwWuujbscdA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ppEKWUX-7NTiDK-toBiQsTM9D5A0byz6ZEym6_haWw7NwO4qp0_n2kKisBL7WoAGxeC4JoekWOi8juf9Og2M7RLB7wcacU2e8hOkr7259eifb2hbfP15nTSCvgKLyY0k5dW-plwkKW6R7z3A5xsc3kX1TXjVu0KyQpWD9ShGplJVSHaDdjWCgXq6vGgDpcEnalCUtlx2zadJ9s8uwLCFKWwnNX07HPxB-HokDrgvAm0lDC4RnWmecQ',
    ],
    response: {
      artisan: 'Julian, Master Potter',
      text: "Elena, thank you for your kind words. Knowing that the Obsidian Vessel found such a beautiful home in your studio brings our team immense joy. That specific batch of glaze was a labor of love, and we're so glad you're enjoying the way it interacts with light.",
    },
    helpfulCount: 24,
  },
  {
    id: 2,
    author: 'Samuel K.',
    initials: 'SK',
    verified: true,
    rating: 5,
    date: 'September 29, 2024',
    title: 'Heirloom quality woodcraft',
    comment: "The Walnut Serving Tray is even more beautiful in person. The grain pattern is spectacular and the joinery is flawless. It’s rare to find products today that feel like they will actually last several lifetimes. Highly recommended for anyone who appreciates real craftsmanship.",
    photos: [],
    response: null,
    helpfulCount: 8,
  },
  {
    id: 3,
    author: 'Claire V.',
    initials: 'CV',
    verified: true,
    rating: 5,
    date: 'September 15, 2024',
    title: 'Sublime textures for a serene home',
    comment: "The hand-loomed linen runner is breathtaking. Subtle variations in the weave remind me of traditional loom work. Arrived in recyclable, bespoke cotton wrapping with a handwritten note from the studio.",
    photos: [],
    response: null,
    helpfulCount: 15,
  },
];

const RatingsReviews = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [reviews, setReviews] = useState(DEFAULT_COLLECTOR_REVIEWS);

  useEffect(() => {
    api.get(`/reviews/product/${id || 1}`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const apiReviews = res.data.map(r => ({
            id: r.id,
            author: r.authorName || 'Artisan Collector',
            initials: (r.authorName || 'AC').slice(0, 2).toUpperCase(),
            verified: true,
            rating: r.rating || 5,
            date: new Date(r.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            title: r.title || `${r.rating} Star Review`,
            comment: r.comment,
            photos: [],
            response: null,
            helpfulCount: 0,
          }));
          setReviews([...DEFAULT_COLLECTOR_REVIEWS, ...apiReviews]);
        }
      })
      .catch(e => console.warn(e));
  }, [id]);

  const filteredReviews = reviews.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Header Section */}
      <header className="mb-10 border-b border-outline-variant/30 pb-8">
        <nav className="flex items-center gap-2 mb-4 text-xs font-label-sm">
          <Link to="/" className="text-on-surface-variant hover:text-forest-green uppercase tracking-widest font-semibold transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to={`/product/${id || 1}`} className="text-on-surface-variant hover:text-forest-green uppercase tracking-widest font-semibold transition-colors">Product</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-forest-green uppercase tracking-widest font-bold">Collector Reviews</span>
        </nav>
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-forest-green font-bold mb-2">Collector Reviews</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl text-sm md:text-base leading-relaxed">
          Honest feedback from our global community of collectors. Every piece tells a story, and every review helps us maintain our standard of handcrafted excellence.
        </p>
      </header>

      {/* Ratings Overview Bento */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Global Average Card */}
        <div className="md:col-span-4 bg-white p-8 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-center items-center text-center">
          <span className="font-display-lg text-[64px] leading-none text-forest-green font-bold mb-2">4.9</span>
          <div className="flex gap-1 text-terracotta mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className="material-symbols-outlined text-xl fill text-terracotta">star</span>
            ))}
          </div>
          <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest font-bold">Global Collector Rating</p>
          <p className="font-body-md text-xs text-on-surface-variant/70 mt-1">Based on 124 verified reviews</p>
        </div>

        {/* Distribution Bar Chart */}
        <div className="md:col-span-8 bg-white p-8 rounded-xl shadow-sm border border-outline-variant/20">
          <h3 className="font-label-md text-xs text-forest-green mb-4 uppercase tracking-widest font-bold">Rating Distribution</h3>
          <div className="space-y-3 text-xs">
            
            <div className="flex items-center gap-4">
              <span className="w-12 text-on-surface-variant font-medium">5 stars</span>
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-forest-green w-[88%] rounded-full"></div>
              </div>
              <span className="w-10 text-right font-semibold">109</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 text-on-surface-variant font-medium">4 stars</span>
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-forest-green w-[8%] rounded-full"></div>
              </div>
              <span className="w-10 text-right font-semibold">10</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 text-on-surface-variant font-medium">3 stars</span>
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-forest-green w-[3%] rounded-full"></div>
              </div>
              <span className="w-10 text-right font-semibold">4</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 text-on-surface-variant font-medium">2 stars</span>
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-forest-green w-[1%] rounded-full"></div>
              </div>
              <span className="w-10 text-right font-semibold">1</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 text-on-surface-variant font-medium">1 star</span>
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-forest-green w-[0%] rounded-full"></div>
              </div>
              <span className="w-10 text-right font-semibold">0</span>
            </div>

          </div>
        </div>

      </section>

      {/* Filters and Search */}
      <section className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 sticky top-20 bg-surface-linen/95 backdrop-blur-sm py-4 z-20 border-b border-outline-variant/30">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-5 py-2 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all font-semibold">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Filter Reviews
          </button>
          <div className="relative flex-1 md:w-64">
            <input 
              className="w-full bg-white border border-outline-variant/40 rounded-lg py-2 pl-3 pr-10 text-xs focus:outline-none focus:border-forest-green" 
              placeholder="Search within reviews..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Sort By:</span>
          <select 
            className="bg-transparent border-0 font-label-md text-xs text-forest-green font-bold focus:ring-0 cursor-pointer outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Helpful First</option>
            <option>With Photos</option>
          </select>
        </div>
      </section>

      {/* Review List */}
      <div className="space-y-8">
        {filteredReviews.map(review => (
          <article 
            key={review.id}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/20 hover:border-outline-variant/40 transition-all"
          >
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* User Info & Rating */}
              <div className="md:w-1/4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-forest-green font-bold text-xs">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-label-md text-xs text-forest-green font-bold">{review.author}</h4>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mt-0.5">
                        <span className="material-symbols-outlined text-[12px] text-emerald-700">verified</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Verified Buyer</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-0.5 text-terracotta mt-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] fill text-terracotta">star</span>
                  ))}
                </div>
                <time className="block mt-2 font-label-sm text-xs text-on-surface-variant/70">{review.date}</time>
              </div>

              {/* Content */}
              <div className="md:w-3/4">
                <h3 className="font-headline-md text-base md:text-lg text-forest-green mb-2 italic font-bold">"{review.title}"</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {review.comment}
                </p>

                {/* Review Photos */}
                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                    {review.photos.map((photo, pIdx) => (
                      <div key={pIdx} className="shrink-0 w-40 h-52 bg-surface-container rounded-lg overflow-hidden cursor-zoom-in">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Review photo" src={photo} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Artisan Response */}
                {review.response && (
                  <div className="bg-surface-container-low p-5 rounded-lg border-l-4 border-forest-green mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-forest-green text-[18px]">auto_awesome</span>
                      <h5 className="font-label-md text-xs text-forest-green uppercase tracking-widest font-bold">Artisan Response</h5>
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant italic leading-relaxed">
                      "{review.response.text}"
                    </p>
                    <p className="mt-2 font-label-sm text-xs text-forest-green font-semibold">— {review.response.artisan}</p>
                  </div>
                )}

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-1.5 font-label-sm text-xs text-on-surface-variant hover:text-forest-green transition-colors font-medium">
                    <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                    Helpful ({review.helpfulCount})
                  </button>
                  <button className="flex items-center gap-1.5 font-label-sm text-xs text-on-surface-variant hover:text-forest-green transition-colors font-medium">
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    Share
                  </button>
                </div>

              </div>

            </div>
          </article>
        ))}
      </div>

    </main>
  );
};

export default RatingsReviews;
