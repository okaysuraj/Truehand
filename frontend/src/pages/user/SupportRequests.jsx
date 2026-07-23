import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SupportRequests = () => {
  const [filter, setFilter] = useState('all');

  const tickets = [
    {
      id: 'SR-1024',
      subject: 'Ceramic vase arrived with chip on rim',
      orderId: 'TH-29481',
      status: 'In Progress',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
      date: 'Oct 28, 2023',
      lastUpdate: '2 hours ago',
      category: 'Damaged Item'
    },
    {
      id: 'SR-1019',
      subject: 'Where is my order TH-28912?',
      orderId: 'TH-28912',
      status: 'Resolved',
      statusColor: 'text-forest-green bg-forest-green/5 border-forest-green/20',
      date: 'Oct 15, 2023',
      lastUpdate: 'Oct 17, 2023',
      category: 'Shipping'
    },
    {
      id: 'SR-1001',
      subject: 'Request for custom engraving option',
      orderId: null,
      status: 'Closed',
      statusColor: 'text-on-surface-variant bg-surface-variant/50 border-outline-variant/30',
      date: 'Sep 22, 2023',
      lastUpdate: 'Sep 25, 2023',
      category: 'Product Inquiry'
    }
  ];

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.status.toLowerCase().replace(' ', '-') === filter);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Profile
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">My Support Requests</h1>
              <p className="font-body-md text-on-surface-variant">Track and manage your open and past support tickets.</p>
            </div>
            <Link to="/report-issue" className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 self-start md:self-auto">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Request
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'resolved', label: 'Resolved' },
            { key: 'closed', label: 'Closed' }
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full font-label-md whitespace-nowrap transition-colors ${
                filter === f.key ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tickets */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">confirmation_number</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No Tickets Found</h3>
              <p className="font-body-md text-on-surface-variant">You don't have any support requests matching this filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="p-6 hover:bg-surface-linen/30 transition-colors cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">{ticket.id}</span>
                        <span className={`font-label-sm px-2.5 py-0.5 rounded border ${ticket.statusColor}`}>{ticket.status}</span>
                        <span className="font-label-sm text-on-surface-variant">{ticket.category}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{ticket.subject}</h3>
                      <div className="flex items-center gap-3 font-body-sm text-on-surface-variant flex-wrap">
                        <span>Created {ticket.date}</span>
                        {ticket.orderId && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                            <Link to={`/order/${ticket.orderId}`} className="text-forest-green hover:underline">Order {ticket.orderId}</Link>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-body-sm text-on-surface-variant">Last updated</p>
                      <p className="font-label-sm text-on-surface">{ticket.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SupportRequests;
