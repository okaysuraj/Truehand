import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactDeliveryAgent = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Good afternoon! I've just picked up your 'Ethereal Clay Vase' from the artisan studio. I'll be handling your white-glove delivery today.",
      time: '14:02 PM',
    },
    {
      id: 2,
      sender: 'collector',
      text: "Hello Julian, thank you for the update! It's quite a delicate piece. Do you have an estimated arrival time?",
      time: '14:05 PM',
    },
    {
      id: 3,
      sender: 'agent',
      text: "Absolutely, I'm taking the scenic route to avoid the construction on 5th. I should be at your doorstep in approximately 15 minutes. Would you like me to leave it at the concierge or bring it up?",
      time: '14:07 PM',
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatLog(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'collector',
        text: message.trim(),
        time: 'Just now',
      },
    ]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-surface-linen font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Chat Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 flex flex-col">
        
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xl overflow-hidden flex flex-col flex-1 min-h-[600px]">
          
          {/* Agent Chat Header */}
          <div className="p-4 px-6 border-b border-outline-variant/20 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30 relative">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
                  alt="Julian M." 
                  className="w-full h-full object-cover" 
                />
                <span className="w-2.5 h-2.5 rounded-full bg-forest-green border-2 border-white absolute bottom-0 right-0" />
              </div>
              <div>
                <h3 className="font-headline-md text-sm font-bold text-charcoal">Julian M.</h3>
                <p className="text-[10px] text-forest-green font-semibold">Active Now</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => alert('Initiating voice call...')} className="w-9 h-9 rounded-xl border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-base">phone</span>
              </button>
              <button onClick={() => alert('Agent profile info')} className="w-9 h-9 rounded-xl border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-base">info</span>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-surface-container-lowest/40 text-xs leading-relaxed">
            
            <div className="text-center">
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-widest bg-surface-container px-3 py-1 rounded-full">
                TODAY
              </span>
            </div>

            {chatLog.map(item => (
              <div 
                key={item.id}
                className={`flex flex-col ${item.sender === 'collector' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-md p-4 rounded-2xl ${
                    item.sender === 'collector'
                      ? 'bg-[#163428] text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-outline-variant/30 text-charcoal rounded-bl-none shadow-sm'
                  }`}
                >
                  {item.text}
                </div>
                <span className="text-[9px] text-on-surface-variant mt-1 px-1 font-mono">{item.time}</span>
              </div>
            ))}

          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-4 px-6 border-t border-outline-variant/20 bg-white flex items-center gap-3">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-forest-green"
            />
            <button type="button" onClick={() => alert('Attach file')} className="text-on-surface-variant hover:text-charcoal p-1">
              <span className="material-symbols-outlined text-xl">attach_file</span>
            </button>
            <button 
              type="submit" 
              className="w-10 h-10 rounded-2xl bg-forest-green text-white flex items-center justify-center hover:opacity-90 transition-all shadow shrink-0"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>

        </div>

      </main>

    </div>
  );
};

export default ContactDeliveryAgent;
