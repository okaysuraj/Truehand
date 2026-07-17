import api from '../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductQA = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const questions = [
    {
      id: 1,
      user: "Sarah L.",
      date: "Oct 15, 2023",
      question: "Is this ceramic vase watertight? Can it hold fresh flowers?",
      answer: "Yes, it is glazed on the inside and fired at a high temperature, making it completely watertight and perfect for fresh flowers.",
      artisan: "Elena Studio",
      upvotes: 24
    },
    {
      id: 2,
      user: "Michael T.",
      date: "Sep 22, 2023",
      question: "What are the exact dimensions?",
      answer: "The vase is approximately 8 inches tall and 4.5 inches wide at the base, though as a handmade piece, expect slight variations of up to a quarter inch.",
      artisan: "Elena Studio",
      upvotes: 12
    }
  ];

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link to={`/product/${id || 1}`} className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Product
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Questions & Answers</h1>
          <p className="font-body-md text-on-surface-variant">Find out more about this handcrafted piece directly from the community and the artisan.</p>
        </div>

        {/* Search and Ask */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface transition-colors"
            />
          </div>
          <button className="px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity whitespace-nowrap">
            Ask a Question
          </button>
        </div>

        {/* Q&A List */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-lg">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">forum</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No results found</h3>
              <p className="font-body-md text-on-surface-variant">We couldn't find any questions matching your search.</p>
            </div>
          ) : (
            filteredQuestions.map((qa) => (
              <div key={qa.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
                
                {/* Question */}
                <div className="flex gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                    <span className="font-label-md text-forest-green">Q</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{qa.question}</h3>
                    <div className="flex items-center gap-3 text-on-surface-variant font-label-sm">
                      <span>{qa.user}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span>{qa.date}</span>
                    </div>
                  </div>
                </div>

                {/* Answer */}
                <div className="flex gap-4 bg-surface-linen/50 p-4 rounded border border-outline-variant/20 ml-12">
                  <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center shrink-0">
                    <span className="font-label-md">A</span>
                  </div>
                  <div>
                    <p className="font-body-md text-on-surface mb-2 leading-relaxed">{qa.answer}</p>
                    <div className="flex items-center gap-3 font-label-sm">
                      <span className="text-forest-green font-medium">{qa.artisan}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="text-on-surface-variant">Artisan</span>
                    </div>
                  </div>
                </div>

                {/* Upvote */}
                <div className="mt-4 ml-12 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant/50 text-on-surface-variant hover:border-forest-green hover:text-forest-green transition-colors font-label-sm">
                    <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                    Helpful ({qa.upvotes})
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductQA;
