import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const FRAUD_RULES = [
  { id: 1, label: 'Multiple failed payments from same IP', threshold: 5, action: 'Flag & Alert' },
  { id: 2, label: 'Orders > $500 from new accounts', threshold: 1, action: 'Manual Review' },
  { id: 3, label: 'Same address, multiple accounts', threshold: 3, action: 'Auto-suspend' },
  { id: 4, label: 'Unusually high refund rate', threshold: 30, action: 'Flag & Alert' },
];

const AdminFraudDetection = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/fraud-alerts');
        setAlerts(res.data || []);
      } catch {
        setAlerts([
          { id: 1, type: 'Multiple Failed Payments', userId: 42, detail: '6 failed transactions in 1 hour from IP 192.168.1.1', severity: 'HIGH', status: 'OPEN', createdAt: new Date().toISOString() },
          { id: 2, type: 'High-Value New Account Order', userId: 89, detail: 'Order of $680 placed within 2 minutes of account creation', severity: 'MEDIUM', status: 'REVIEWING', createdAt: new Date(Date.now()-3600000).toISOString() },
          { id: 3, type: 'Refund Abuse', userId: 15, detail: '12 refund requests in 30 days — 89% refund rate', severity: 'HIGH', status: 'RESOLVED', createdAt: new Date(Date.now()-86400000).toISOString() },
        ]);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleResolve = (id) => setAlerts(a => a.map(al => al.id === id ? { ...al, status: 'RESOLVED' } : al));
  const handleDismiss = (id) => setAlerts(a => a.map(al => al.id === id ? { ...al, status: 'DISMISSED' } : al));

  const filtered = alerts.filter(a => filter === 'all' || a.status?.toLowerCase() === filter);
  const severityColor = (s) => s === 'HIGH' ? 'text-red-600 bg-red-50' : s === 'MEDIUM' ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50';

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Fraud Detection</h1>
          <p className="font-body-md text-on-surface-variant">Monitor suspicious activity and auto-flagged fraud alerts.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Open Alerts', value: alerts.filter(a=>a.status==='OPEN').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Under Review', value: alerts.filter(a=>a.status==='REVIEWING').length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Resolved', value: alerts.filter(a=>a.status==='RESOLVED').length, color: 'text-forest-green', bg: 'bg-forest-green/5' },
          ].map((s,i) => (
            <div key={i} className={`${s.bg} border border-outline-variant/30 rounded-lg p-5`}>
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              <p className={`font-headline-md text-headline-md ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {['open','reviewing','resolved','all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${filter===f?'bg-charcoal text-white':'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{f}</button>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-4 mb-10">
          {loading ? (
            <div className="text-center py-8"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">security</span>
              <p className="font-body-md text-on-surface-variant">No {filter} alerts.</p>
            </div>
          ) : filtered.map(alert => (
            <div key={alert.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-[22px] mt-0.5 ${alert.severity==='HIGH'?'text-red-600':'text-amber-600'}`}>warning</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-label-md text-on-surface">{alert.type}</p>
                      <span className={`font-label-sm text-[11px] px-2 py-0.5 rounded ${severityColor(alert.severity)}`}>{alert.severity}</span>
                      <span className={`font-label-sm text-[11px] px-2 py-0.5 rounded ${alert.status==='RESOLVED'?'bg-forest-green/10 text-forest-green':alert.status==='REVIEWING'?'bg-blue-50 text-blue-600':'bg-red-50 text-red-600'}`}>{alert.status}</span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant mb-1">{alert.detail}</p>
                    <p className="font-label-sm text-on-surface-variant">User #{alert.userId} · {new Date(alert.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {alert.status !== 'RESOLVED' && alert.status !== 'DISMISSED' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleResolve(alert.id)} className="px-4 py-1.5 text-xs bg-forest-green text-white rounded font-label-sm hover:opacity-90">Resolve</button>
                    <button onClick={() => handleDismiss(alert.id)} className="px-4 py-1.5 text-xs border border-outline-variant text-on-surface rounded font-label-sm hover:bg-surface-variant/30">Dismiss</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detection Rules */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-on-surface">Detection Rules</h2>
          </div>
          <ul className="divide-y divide-outline-variant/15">
            {FRAUD_RULES.map(r => (
              <li key={r.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-label-md text-on-surface">{r.label}</p>
                  <p className="font-body-sm text-on-surface-variant">Threshold: {r.threshold} · Action: {r.action}</p>
                </div>
                <div className="w-10 h-5 bg-forest-green rounded-full flex items-center justify-end px-0.5">
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminFraudDetection;
