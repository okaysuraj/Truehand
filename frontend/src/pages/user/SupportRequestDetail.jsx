import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SupportRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Elena',
      time: '10:15 AM',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
      isUser: false,
      text: "Good morning, Julian. I've just reviewed the images you uploaded of the Satori Hand-thrown Vase. I'm so sorry to see the hairline fracture near the base.\n\nAs this was a limited batch from our Kyoto studio, I've already contacted the artisan to see if a replacement is available. I will update you as soon as I hear back.",
    },
    {
      id: 2,
      sender: 'Julian',
      time: '10:42 AM',
      initials: 'J',
      isUser: true,
      text: "Thank you, Elena. I appreciate the quick response. It's a beautiful piece otherwise, so I'm hoping we can find a replacement. If not, what would be the next steps for a return?",
    },
    {
      id: 3,
      sender: 'Elena',
      time: '11:05 AM',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
      isUser: false,
      text: "Understood. If a replacement isn't possible, we can process a full refund or provide store credit with an additional 15% artisanal appreciation bonus for the inconvenience.\n\nI've attached a temporary return label below just in case we decide to go that route. You don't need to print it yet.",
      attachment: {
        name: 'Return_Label_TH88210.pdf',
        size: '245 KB • PDF',
      },
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!response.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Julian',
        time: 'Just now',
        initials: 'J',
        isUser: true,
        text: response,
      }
    ]);
    setResponse('');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8">
        
        {/* Ticket Header & Metadata */}
        <div className="space-y-2 pb-6 border-b border-outline-variant/20">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
            <span className="uppercase font-bold tracking-wider">SUPPORT CASE #{id || '4829'}</span>
            <span>&bull;</span>
            <span className="text-forest-green font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-green" />
              Active Discussion
            </span>
          </div>

          <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
            Damaged Ceramic Glaze on Arrival
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-on-surface-variant pt-1">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              Order Reference: <strong className="text-charcoal font-mono">TH-88210-XC</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              Opened Oct 24, 2024
            </span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="space-y-8">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-4 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              {msg.isUser ? (
                <div className="w-9 h-9 rounded-xl bg-charcoal text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {msg.initials}
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-xl space-y-1.5 ${msg.isUser ? 'items-end text-right' : ''}`}>
                <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant px-1">
                  <span>{msg.sender}</span>
                  <span className="text-[10px] font-mono text-on-surface-variant/60">{msg.time}</span>
                </div>

                <div className={`p-6 rounded-3xl text-xs leading-relaxed space-y-4 shadow-sm ${
                  msg.isUser 
                    ? 'bg-forest-green text-white rounded-tr-sm text-left' 
                    : 'bg-white border border-outline-variant/30 text-charcoal rounded-tl-sm'
                }`}>
                  <p className="whitespace-pre-line font-body-md">{msg.text}</p>

                  {/* Attachment Box */}
                  {msg.attachment && (
                    <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-charcoal shadow-sm">
                          <span className="material-symbols-outlined text-lg">description</span>
                        </div>
                        <div className="text-left">
                          <h6 className="font-bold text-charcoal text-xs font-mono">{msg.attachment.name}</h6>
                          <p className="text-[10px] text-on-surface-variant font-mono">{msg.attachment.size}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => alert(`Downloading ${msg.attachment.name}...`)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">download</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Response Composer Card */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
          <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
            Write your response...
          </label>

          <form onSubmit={handleSend} className="space-y-4">
            <textarea 
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-xs font-body-md text-charcoal focus:outline-none focus:border-forest-green"
            />

            <div className="flex justify-between items-center pt-1">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <button type="button" onClick={() => alert('Add attachment')} className="p-2 hover:text-charcoal"><span className="material-symbols-outlined text-lg">attach_file</span></button>
                <button type="button" onClick={() => alert('Add image')} className="p-2 hover:text-charcoal"><span className="material-symbols-outlined text-lg">image</span></button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={() => alert('Ticket closed')}
                  className="px-5 py-2.5 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
                >
                  Close Ticket
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>

      </main>

    </div>
  );
};

export default SupportRequestDetail;
