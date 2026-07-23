import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

const AdminSuspiciousActivityLog = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/admin/advanced/suspicious-activity');
      setLogs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.post(`/admin/advanced/suspicious-activity/${id}/resolve`);
      fetchLogs();
    } catch (err) {
      alert('Failed to resolve log');
    }
  };

  if (!user || user.role !== 'ADMIN') return <div className="p-24 text-center">Unauthorized. Admins only.</div>;

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex flex-col md:flex-row">
      <nav className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 hidden md:block">
        <h2 className="font-headline-sm text-forest-green mb-8">Admin Navigation</h2>
        <Link to="/admin" className="block text-on-surface-variant hover:text-forest-green mb-4">Dashboard</Link>
        <Link to="/admin/suspicious-activity" className="block text-forest-green font-bold border-l-2 border-forest-green pl-2">Security Logs</Link>
      </nav>

      <main className="flex-1 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Suspicious Activity Logs</h1>
          <p className="font-body-md text-on-surface-variant">Review platform security flags and take action.</p>
        </div>

        <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-forest-green">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-outline-variant">No suspicious activity detected.</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-surface-variant/50">
                <tr>
                  <th className="p-4 font-label-md">Date</th>
                  <th className="p-4 font-label-md">Type</th>
                  <th className="p-4 font-label-md">Description</th>
                  <th className="p-4 font-label-md">Status</th>
                  <th className="p-4 font-label-md text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-surface-container-lowest">
                    <td className="p-4 font-body-sm text-on-surface-variant">{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-body-sm text-error-red font-bold">{log.activityType}</td>
                    <td className="p-4 font-body-sm">{log.description}</td>
                    <td className="p-4 font-body-sm">
                      <span className={`px-2 py-1 rounded text-xs ${log.status === 'RESOLVED' ? 'bg-forest-green/10 text-forest-green' : 'bg-error-red/10 text-error-red'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {log.status !== 'RESOLVED' && (
                        <button onClick={() => handleResolve(log.id)} className="bg-forest-green text-white px-3 py-1 rounded text-xs">
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSuspiciousActivityLog;
