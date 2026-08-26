import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SUPPORT_TICKETS = [
  {
    id: '#4812',
    title: 'Custom Clay Finish Inquiry: Obsidian Glaze',
    status: 'OPEN',
    statusClass: 'border border-charcoal text-charcoal',
    updated: 'Updated 2 hours ago',
    assignedRole: 'ASSIGNED ARTISAN',
    assignedName: 'Elena Moretti',
  },
  {
    id: '#4795',
    title: 'Shipping Delay: Hand-blown Murano Suite',
    status: 'PENDING',
    statusClass: 'border border-[#97472a] text-[#97472a]',
    updated: 'Updated yesterday',
    assignedRole: 'ASSIGNED ARTISAN',
    assignedName: 'Logistics Team',
  },
  {
    id: '#4762',
    title: 'Material Origin Inquiry: Linen & Silk Blends',
    status: 'RESOLVED',
    statusClass: 'border border-outline-variant text-on-surface-variant',
    updated: 'Updated 3 days ago',
    assignedRole: 'ASSIGNED ARTISAN',
    assignedName: 'Sourcing Director',
  },
  {
    id: '#4711',
    title: 'Care Instructions: Unfinished Oak Series',
    status: 'RESOLVED',
    statusClass: 'border border-outline-variant text-on-surface-variant',
    updated: 'Updated 1 week ago',
    assignedRole: 'ASSIGNED ARTISAN',
    assignedName: 'Jacob Thorne',
  },
];

const MySupportRequests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL STATUSES');

  const filteredTickets = SUPPORT_TICKETS.filter(t => {
    if (filter === 'ALL STATUSES') return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal italic">
              Support Requests
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1 max-w-xl leading-relaxed">
              Manage your inquiries and track our team's progress on your custom commissions and material sourcing requests.
            </p>
          </div>

          <button 
            onClick={() => navigate('/report-issue')}
            className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">add</span>
            NEW REQUEST
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <button 
            onClick={() => setFilter('ALL STATUSES')}
            className={`px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
              filter === 'ALL STATUSES' ? 'bg-surface-container border-charcoal text-charcoal shadow-sm' : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            ALL STATUSES
          </button>

          <button 
            onClick={() => setFilter('OPEN')}
            className={`px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
              filter === 'OPEN' ? 'bg-surface-container border-charcoal text-charcoal shadow-sm' : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-forest-green" />
            OPEN
          </button>

          <button 
            onClick={() => setFilter('PENDING')}
            className={`px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
              filter === 'PENDING' ? 'bg-surface-container border-charcoal text-charcoal shadow-sm' : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            PENDING
          </button>

          <button 
            onClick={() => setFilter('RESOLVED')}
            className={`px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
              filter === 'RESOLVED' ? 'bg-surface-container border-charcoal text-charcoal shadow-sm' : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            RESOLVED
          </button>
        </div>

        {/* Ticket Cards Feed */}
        <div className="space-y-4 text-xs">
          {filteredTickets.map(ticket => (
            <div 
              key={ticket.id}
              onClick={() => navigate(`/support/request/${ticket.id.replace('#', '')}`)}
              className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <span className="p-3 bg-surface-container-low rounded-xl font-mono text-xs font-bold text-on-surface-variant shrink-0">
                  {ticket.id}
                </span>

                <div className="space-y-1.5">
                  <h3 className="font-display-md text-base md:text-lg font-bold text-charcoal group-hover:text-forest-green transition-colors">
                    {ticket.title}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${ticket.statusClass}`}>
                      {ticket.status}
                    </span>
                    <span className="text-on-surface-variant text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {ticket.updated}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-outline-variant/10">
                <div className="text-left md:text-right">
                  <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                    {ticket.assignedRole}
                  </span>
                  <h5 className="font-bold text-charcoal text-xs mt-0.5">{ticket.assignedName}</h5>
                </div>

                <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load History Button */}
        <div className="text-center pt-4 space-y-2">
          <button 
            onClick={() => alert('Loading complete ticket history...')}
            className="px-8 py-3 bg-white border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors shadow-sm"
          >
            LOAD HISTORY
          </button>
          <p className="text-[10px] text-on-surface-variant font-mono">Showing 4 of 28 inquiries</p>
        </div>

      </main>

      {/* Floating Concierge Agent Button */}
      <button 
        onClick={() => navigate('/support/request/4829')}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-forest-green text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-2xl">support_agent</span>
      </button>

    </div>
  );
};

export default MySupportRequests;
