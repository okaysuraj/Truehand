import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/orders/user/${user.id}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(o => {
    if (filter === 'active') return o.status !== 'DELIVERED' && o.status !== 'CANCELLED';
    if (filter === 'completed') return o.status === 'DELIVERED';
    return true;
  });

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Header Section */}
      <header className="mb-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="font-display-lg text-display-lg text-forest-green mb-base">Your Acquisitions</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Refined craftsmanship takes time. Trace the journey of your hand-selected pieces from the artisan's studio to your home.</p>
      </header>

      {/* Tabbed Navigation */}
      <div className="relative border-b border-outline-variant mb-12">
        <div className="flex gap-stack-lg relative">
          <button 
            className={`relative pb-4 font-label-md text-label-md transition-all duration-300 cursor-pointer ${filter === 'all' ? 'text-forest-green border-b-2 border-forest-green' : 'text-on-surface-variant hover:text-forest-green'}`}
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`relative pb-4 font-label-md text-label-md transition-all duration-300 cursor-pointer ${filter === 'active' ? 'text-forest-green border-b-2 border-forest-green' : 'text-on-surface-variant hover:text-forest-green'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`relative pb-4 font-label-md text-label-md transition-all duration-300 cursor-pointer ${filter === 'completed' ? 'text-forest-green border-b-2 border-forest-green' : 'text-on-surface-variant hover:text-forest-green'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Orders Grid/List */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-stack-md">auto_awesome_motion</span>
          <h2 className="font-headline-lg text-headline-lg text-forest-green mb-2">No acquisitions yet</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">Discover timeless pieces crafted by world-class artisans.</p>
          <Link to="/products" className="px-8 py-3 bg-forest-green text-white font-label-md text-label-md hover:bg-forest-green/90 transition-all duration-300 uppercase tracking-widest rounded-sm">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="space-y-gutter">
          {filteredOrders.map(o => {
            const isCompleted = o.status === 'DELIVERED';
            const isActive = o.status !== 'DELIVERED' && o.status !== 'CANCELLED';
            return (
              <div key={o.id} className="order-card-hover bg-white border border-surface-container-high p-gutter flex flex-col md:flex-row gap-gutter group cursor-default shadow-sm hover:shadow-md transition-all rounded-sm">
                <div className={`w-full md:w-48 h-48 overflow-hidden bg-surface-container rounded-sm flex-shrink-0 ${isCompleted ? 'opacity-90 group-hover:opacity-100' : ''}`}>
                  <img src={`https://picsum.photos/400/400?random=${o.id}`} alt="Order Item" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest">Order #{o.orderNumber.substring(0, 15)}</p>
                      <h3 className="font-headline-md text-headline-md text-forest-green">Curated Collection</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Placed: {new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`inline-flex items-center px-3 py-1 font-label-sm text-label-sm rounded-full mb-2 ${
                        isCompleted ? 'bg-surface-linen text-forest-green border border-outline-variant' : 
                        isActive ? 'bg-primary-fixed text-on-primary-fixed' : 
                        'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          {isCompleted ? 'task_alt' : isActive ? 'local_shipping' : 'history_edu'}
                        </span>
                        {o.status.replace(/_/g, ' ')}
                      </span>
                      <p className="font-label-md text-label-md text-forest-green">${o.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col md:flex-row justify-between items-end md:items-center gap-stack-md">
                    <div className="flex gap-gutter items-center">
                      <div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{isCompleted ? 'Delivered On' : 'Estimated Arrival'}</p>
                        <p className="font-body-md text-body-md font-semibold text-forest-green">
                          {isCompleted ? new Date(o.updatedAt).toLocaleDateString() : 'Processing'}
                        </p>
                      </div>
                      {!isCompleted && (
                        <>
                          <div className="h-8 w-px bg-outline-variant"></div>
                          <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Delivery To</p>
                            <p className="font-body-md text-body-md text-forest-green truncate max-w-[150px]">{o.deliveryAddress || 'Home'}</p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex gap-stack-sm w-full md:w-auto">
                      {isActive && (
                        <button 
                          onClick={() => navigate(`/tracking/${o.id}`)}
                          className="flex-1 md:flex-none px-6 py-2 border border-charcoal text-charcoal font-label-md text-label-md hover:bg-charcoal hover:text-white transition-all duration-300 rounded-sm"
                        >
                          Track Order
                        </button>
                      )}
                      {isCompleted && (
                        <button className="flex-1 md:flex-none px-6 py-2 border border-charcoal text-charcoal font-label-md text-label-md hover:bg-charcoal hover:text-white transition-all duration-300 rounded-sm">
                          Download Invoice
                        </button>
                      )}
                      <button className="flex-1 md:flex-none px-6 py-2 bg-forest-green text-white font-label-md text-label-md hover:bg-forest-green/90 transition-all duration-300 rounded-sm">
                        Order Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Orders;
