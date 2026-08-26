import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'concierge',
    time: '2:00 PM',
    text: "Good afternoon. I'm your AESTHETE Concierge. How may I assist you in your discovery of fine craftsmanship today?",
  },
  {
    id: 2,
    sender: 'user',
    time: '2:01 PM',
    text: "I'm looking for a hand-thrown ceramic vase, something with a natural, earthy texture for a sunlit living room.",
  },
  {
    id: 3,
    sender: 'concierge',
    time: '2:01 PM',
    text: "A wonderful choice. For a sunlit space, I recommend pieces that play with light and shadow through their surface texture. Here are three exceptional works curated from our master potters:",
    products: [
      {
        id: 'cp_1',
        name: 'Ashen Tall Vessel',
        price: 320,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
      },
      {
        id: 'cp_2',
        name: 'Crackle Globe Bud Vase',
        price: 95,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw',
      },
      {
        id: 'cp_3',
        name: 'Low Basin in Moss',
        price: 185,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
      },
    ],
  },
];

const ArtisanConciergeAI = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: 'Just now',
      text: input.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'concierge',
        time: 'Just now',
        text: "I'd be glad to help you explore that! We work with master artisans specializing in ancient techniques and raw textures. Would you like to view our newest batch releases or learn more about their firing techniques?",
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="font-label-sm text-[10px] uppercase tracking-widest text-terracotta font-bold">
          Your Personal Guide
        </span>
        <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
          Artisan Concierge
        </h1>
        <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
          Discover the story behind every piece. Ask about materials, artisans, or find the perfect addition to your space.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col min-h-[600px] justify-between">
        
        {/* Messages List */}
        <div className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'concierge' && (
                <div className="w-10 h-10 rounded-full bg-forest-green text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-lg">smart_toy</span>
                </div>
              )}

              <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#163428] text-white rounded-tr-none shadow-sm'
                    : 'bg-surface-container-low text-charcoal rounded-tl-none border border-outline-variant/20'
                }`}>
                  <p>{msg.text}</p>
                </div>

                {/* Embedded Product Cards if available */}
                {msg.products && (
                  <div className="grid grid-cols-3 gap-3 pt-3">
                    {msg.products.map(p => (
                      <Link 
                        key={p.id} 
                        to={`/product/${p.id}`}
                        className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow transition-all"
                      >
                        <div className="aspect-square bg-surface-container overflow-hidden relative">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-charcoal hover:text-red-600">
                            <span className="material-symbols-outlined text-[14px]">favorite</span>
                          </button>
                        </div>
                        <div className="p-2 text-center">
                          <h5 className="font-display-md text-[11px] font-bold text-charcoal line-clamp-1 group-hover:text-forest-green">{p.name}</h5>
                          <span className="text-[10px] font-bold text-forest-green">${p.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-on-surface-variant block px-1">
                  {msg.sender === 'user' ? `You • ${msg.time}` : `Concierge • ${msg.time}`}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-charcoal text-lg">person</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar & Quick Prompt Pills */}
        <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/20 space-y-4">
          <form onSubmit={handleSend} className="relative flex items-center">
            <button 
              type="button" 
              onClick={() => alert('Attachment dialog opened.')}
              className="absolute left-4 text-on-surface-variant hover:text-charcoal"
            >
              <span className="material-symbols-outlined text-xl">attach_file</span>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about a piece, an artisan, or an order..."
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-2xl py-4 pl-12 pr-14 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-forest-green shadow-inner"
            />
            <button 
              type="submit"
              className="absolute right-3 w-10 h-10 bg-forest-green text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all shadow"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
            <button 
              type="button"
              onClick={() => handleQuickPrompt('Compare stoneware vs porcelain')}
              className="px-4 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-container hover:text-charcoal transition-colors"
            >
              Compare Materials
            </button>
            <button 
              type="button"
              onClick={() => handleQuickPrompt('Track my recent ceramic order')}
              className="px-4 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-container hover:text-charcoal transition-colors"
            >
              Track Recent Order
            </button>
            <button 
              type="button"
              onClick={() => handleQuickPrompt('Tell me about Master Potter Julian')}
              className="px-4 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-container hover:text-charcoal transition-colors"
            >
              Artisan Spotlight
            </button>
          </div>
        </div>

      </div>

    </main>
  );
};

export default ArtisanConciergeAI;
