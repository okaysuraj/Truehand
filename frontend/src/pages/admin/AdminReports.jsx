import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminReports = () => {
  const [filter, setFilter] = useState('all');

  const reports = [
    { id: 'RPT-0041', type: 'Product', subject: 'Misleading product description', reportedItem: 'Vintage Brass Lamp', reporter: 'Sarah L.', date: 'Oct 28, 2023', status: 'Pending', priority: 'High' },
    { id: 'RPT-0039', type: 'Seller', subject: 'Seller not responding to messages', reportedItem: 'Takeshi Blades', reporter: 'David K.', date: 'Oct 26, 2023', status: 'In Review', priority: 'Medium' },
    { id: 'RPT-0035', type: 'Review', subject: 'Fake/spam review detected', reportedItem: 'Hand-Thrown Ceramic Vase', reporter: 'System', date: 'Oct 24, 2023', status: 'Resolved', priority: 'Low' },
    { id: 'RPT-0032', type: 'Product', subject: 'Counterfeit product listing', reportedItem: 'Silk Screen Print', reporter: 'Emma W.', date: 'Oct 22, 2023', status: 'Pending', priority: 'Critical' },
    { id: 'RPT-0028', type: 'User', subject: 'Abusive language in Q&A', reportedItem: 'User: badactor99', reporter: 'Michael T.', date: 'Oct 20, 2023', status: 'Resolved', priority: 'Medium' }
  ];

  const priorityColor = (p) => {
    switch (p) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const statusColor = (s) => {
    switch (s) {
      case 'Pending': return 'text-amber-700';
      case 'In Review': return 'text-blue-600';
      case 'Resolved': return 'text-forest-green';
      default: return 'text-on-surface-variant';
    }
  };

  const filtered = filter === 'all' ? reports : reports.filter(r => r.status.toLowerCase().replace(' ', '-') === filter);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Reports & Flags</h1>
          <p className="font-body-md text-on-surface-variant">Review flagged content, users, and products across the platform.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Reports', value: reports.length, icon: 'flag' },
            { label: 'Pending', value: reports.filter(r => r.status === 'Pending').length, icon: 'hourglass_top', highlight: true },
            { label: 'In Review', value: reports.filter(r => r.status === 'In Review').length, icon: 'search' },
            { label: 'Resolved', value: reports.filter(r => r.status === 'Resolved').length, icon: 'check_circle' }
          ].map((s, i) => (
            <div key={i} className={`border rounded-lg p-5 shadow-sm ${s.highlight ? 'bg-amber-50 border-amber-200' : 'bg-surface-container-lowest border-outline-variant/30'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`material-symbols-outlined text-[18px] ${s.highlight ? 'text-amber-600' : 'text-on-surface-variant'}`}>{s.icon}</span>
                <span className="font-label-sm text-on-surface-variant">{s.label}</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'in-review', 'resolved'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
              filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>{f === 'all' ? 'All' : f.replace('-', ' ')}</button>
          ))}
        </div>

        {/* Reports List */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-outline-variant/30">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">verified_user</span>
                <p className="font-body-md text-on-surface-variant">No reports matching this filter.</p>
              </div>
            ) : (
              filtered.map(report => (
                <div key={report.id} className="p-6 hover:bg-surface-linen/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">{report.id}</span>
                        <span className={`font-label-sm px-2.5 py-0.5 rounded border ${priorityColor(report.priority)}`}>{report.priority}</span>
                        <span className="font-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">{report.type}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{report.subject}</h3>
                      <div className="flex flex-wrap items-center gap-3 font-body-sm text-on-surface-variant">
                        <span>Regarding: <span className="text-on-surface font-label-sm">{report.reportedItem}</span></span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span>Reported by: {report.reporter}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`font-label-md ${statusColor(report.status)}`}>{report.status}</span>
                      {report.status !== 'Resolved' && (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-forest-green text-white font-label-sm rounded hover:opacity-90 transition-opacity">Review</button>
                          <button className="px-4 py-2 border border-outline-variant text-on-surface font-label-sm rounded hover:bg-surface-variant/30 transition-colors">Dismiss</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
