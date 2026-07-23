import api from '../../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SupportRequestDetail = () => {
  const { ticketId } = useParams();
  const id = ticketId || 'REQ-8892';
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', name: 'Jane Doe', time: 'Oct 28, 10:30 AM', text: 'Hi, I received my ceramic vase today but it seems to have a small chip on the rim. Can I get a replacement?' },
    { id: 2, sender: 'support', name: 'Support Team', time: 'Oct 28, 11:15 AM', text: 'Hello Jane, we are so sorry to hear about the damaged vase. Yes, we can certainly arrange a replacement. Could you please upload a photo of the chip so we can process this with the artisan?' }
  ]);
  const [reply, setReply] = useState('');

  const sendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'user', name: 'Jane Doe', time: 'Just now', text: reply }]);
    setReply('');
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <Link to="/support-requests" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Requests
          </Link>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Request {id}</h1>
              <p className="font-body-md text-on-surface-variant">Damaged Item (Order TH-29481)</p>
            </div>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded font-label-md inline-block">Open</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm flex flex-col h-[600px]">
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.sender === 'user' ? 'bg-forest-green text-white rounded-tr-sm' : 'bg-surface-variant/30 text-on-surface rounded-tl-sm'
                }`}>
                  <div className="flex justify-between items-end gap-4 mb-2">
                    <span className="font-label-sm opacity-80">{msg.name}</span>
                    <span className="text-[10px] opacity-60">{msg.time}</span>
                  </div>
                  <p className="font-body-md whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Reply Area */}
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest rounded-b-lg">
            <form onSubmit={sendReply} className="flex gap-3">
              <button type="button" className="p-3 text-on-surface-variant hover:bg-surface-variant/30 rounded-full transition-colors flex shrink-0">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <input 
                type="text" 
                value={reply} 
                onChange={(e) => setReply(e.target.value)} 
                placeholder="Type your reply here..." 
                className="flex-1 bg-transparent border border-outline-variant/50 rounded-full px-5 focus:border-forest-green outline-none font-body-md text-on-surface"
              />
              <button type="submit" disabled={!reply.trim()} className={`p-3 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                reply.trim() ? 'bg-forest-green text-white hover:opacity-90' : 'bg-surface-variant text-on-surface-variant/50 cursor-not-allowed'
              }`}>
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SupportRequestDetail;
