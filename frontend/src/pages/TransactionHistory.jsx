import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const TransactionHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWalletData();
  }, [user, navigate]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletRes, txRes] = await Promise.all([
        api.get(`/wallet/${user.id}`),
        api.get(`/wallet/${user.id}/transactions`)
      ]);
      setWallet(walletRes.data);
      setTransactions(txRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Wallet & Transactions</h1>
            <p className="font-body-md text-on-surface-variant">Manage your funds and view payment history.</p>
          </div>
          {wallet && (
            <div className="bg-forest-green text-white px-6 py-4 rounded-lg shadow-sm text-right">
              <p className="font-label-sm text-white/80 uppercase tracking-widest mb-1">Available Balance</p>
              <p className="font-headline-lg text-3xl font-bold">₹{wallet.balance.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-12 text-center text-outline-variant">
              <span className="material-symbols-outlined text-5xl mb-4">receipt_long</span>
              <p className="font-body-md">No transactions found.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-surface-variant/50">
                <tr>
                  <th className="p-4 font-label-md text-on-surface-variant">Date</th>
                  <th className="p-4 font-label-md text-on-surface-variant">Description</th>
                  <th className="p-4 font-label-md text-on-surface-variant text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-body-sm text-on-surface-variant">
                      {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="p-4 font-body-md text-on-surface">
                      {tx.description}
                    </td>
                    <td className={`p-4 font-label-md text-right ${tx.type === 'CREDIT' ? 'text-forest-green' : 'text-error-red'}`}>
                      {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
