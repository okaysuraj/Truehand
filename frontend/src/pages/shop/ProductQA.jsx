import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    question: 'Is this bowl dishwasher safe?',
    user: 'Julian V.',
    date: '2 days ago',
    answer: 'While our stoneware is kiln-fired at high temperatures making it extremely durable, we recommend hand-washing with mild detergent to preserve the subtle luster of the oatmeal glaze over many years of use.',
    responder: 'Aesthete Studio Artisan',
    isPending: false,
  },
  {
    id: 2,
    question: 'Can I use this for hot soups or only cold items?',
    user: 'Elena R.',
    date: '1 week ago',
    answer: 'It is perfectly suited for hot liquids. The stoneware has excellent thermal retention properties, keeping your contents warm for longer than standard porcelain.',
    responder: 'Aesthete Studio Artisan',
    isPending: false,
  },
  {
    id: 3,
    question: 'Do you offer custom sizing for this specific glaze?',
    user: 'Marcus T.',
    date: '4 hours ago',
    answer: null,
    responder: null,
    isPending: true,
  },
];

const ProductQA = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [newQuestion, setNewQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get(`/questions/product/${id || 1}`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map(q => ({
            id: q.id,
            question: q.content || q.question,
            user: q.userName || 'Patron',
            date: 'Recently',
            answer: q.answer || (q.answers?.[0]?.content),
            responder: 'Artisan',
            isPending: !q.answer && (!q.answers || q.answers.length === 0),
          }));
          setQuestions([...mapped, ...DEFAULT_QUESTIONS]);
        }
      })
      .catch(e => console.warn(e));
  }, [id]);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setQuestions(prev => [
      {
        id: Date.now(),
        question: newQuestion.trim(),
        user: 'You',
        date: 'Just now',
        answer: null,
        responder: null,
        isPending: true,
      },
      ...prev,
    ]);
    setNewQuestion('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const filtered = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="pt-28 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen bg-surface font-body-md text-on-surface">
      
      {/* Breadcrumb / Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant/30 pb-6 gap-4">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 shadow-sm border border-outline-variant/20">
            <img 
              className="w-full h-full object-cover" 
              alt="Hand-thrown Stoneware Bowl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzLUlGwx1msKPavVFQ7178AIasC8jn3loMyoqwCfB7Ld0v-JnvApOb14t1vBtMtitSxT32AvvDm7sCgDpDtNovx24_asyILC5x46PiubkHFEYuEdmq_U1fXqmm2dWCRCNIYXlmUJvbXD1VsBIFyTOt8MAMT0DYrdKLiZMC_g7YcKNr278l68Y_sb5zV9D4CkfCS4Xd86e7QF3Pf4Jq0NTNyHvyMwzNmuox30wB25pl_pAZDaVEFsrsmg" 
            />
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-forest-green mb-1 font-bold">Hand-thrown Stoneware Bowl</h1>
            <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest">Product Inquiry &amp; Community Q&amp;A</p>
          </div>
        </div>

        <Link 
          to={`/product/${id || 1}`} 
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-forest-green transition-colors font-label-md text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Return to Product</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Info / Stats */}
        <aside className="md:col-span-4 space-y-6">
          <div className="p-6 bg-white shadow-sm rounded-lg border border-outline-variant/30">
            <h3 className="font-label-md text-xs text-forest-green mb-4 uppercase tracking-wider font-bold">Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Questions</span>
                <span className="font-bold text-on-surface">{questions.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Avg. Response Time</span>
                <span className="font-bold text-on-surface">24h</span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-outline-variant/30 rounded-lg bg-surface-container-low/50">
            <p className="font-body-md text-xs text-on-surface-variant italic leading-relaxed">
              "Aesthete pieces are crafted to be heirloom quality. Our artisans personally respond to material and care inquiries."
            </p>
          </div>
        </aside>

        {/* Q&A Feed */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Search Bar */}
          <div className="relative w-full">
            <input 
              className="w-full bg-white border border-outline-variant/40 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-forest-green font-body-md text-sm shadow-sm" 
              placeholder="Search for a specific question..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm">search</span>
          </div>

          {/* Vertical Feed */}
          <div className="space-y-6">
            {filtered.map(qa => (
              <div 
                key={qa.id}
                className={`p-6 rounded-lg shadow-sm border ${
                  qa.isPending 
                    ? 'bg-surface-container-low/60 border-dashed border-outline-variant' 
                    : 'bg-white border-outline-variant/20'
                }`}
              >
                <div className="flex gap-4">
                  <div className={`text-4xl font-display-lg leading-none select-none font-bold ${
                    qa.isPending ? 'text-terracotta/40' : 'text-terracotta'
                  }`}>
                    Q
                  </div>
                  <div className="flex-grow pt-1">
                    <h4 className="font-headline-md text-headline-md text-forest-green mb-1 font-semibold text-lg">{qa.question}</h4>
                    <p className="text-on-surface-variant text-xs mb-4 uppercase tracking-wider">Asked by {qa.user} • {qa.date}</p>

                    {qa.isPending ? (
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs uppercase tracking-widest rounded-full font-semibold">
                        Pending Response
                      </span>
                    ) : (
                      <div className="flex gap-4 mt-4 border-t border-outline-variant/20 pt-4">
                        <div className="text-4xl font-display-lg text-forest-green leading-none select-none font-bold">
                          A
                        </div>
                        <div className="pt-1">
                          <p className="font-body-lg text-sm text-on-surface leading-relaxed">{qa.answer}</p>
                          <div className="mt-3 flex items-center gap-1.5 text-forest-green font-semibold text-xs">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            <span className="font-label-md uppercase tracking-wider">{qa.responder}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ask a Question Field */}
          <div className="mt-12 bg-forest-green p-8 rounded-xl text-white shadow-md">
            <h3 className="font-headline-md text-headline-md mb-3 font-bold text-white">Curiosity is welcomed.</h3>
            <form onSubmit={handleSubmitInquiry}>
              <textarea 
                className="w-full bg-white/10 border-b border-white/30 focus:border-white focus:outline-none text-white placeholder:text-white/50 font-body-md text-sm p-4 rounded-t outline-none resize-none mb-4" 
                placeholder="Write your question here..." 
                rows="3"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <p className="font-label-sm text-xs text-white/70 italic">
                  {submitted ? 'Inquiry submitted for curator review!' : 'Your question will be reviewed by our curators before being posted.'}
                </p>
                <button 
                  type="submit"
                  className="bg-white text-forest-green px-6 py-3 font-label-md text-xs uppercase tracking-widest hover:bg-surface-linen transition-all rounded font-semibold whitespace-nowrap shadow"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

    </main>
  );
};

export default ProductQA;
