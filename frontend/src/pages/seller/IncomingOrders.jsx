import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const SAMPLE_INCOMING_ORDERS = [
  {
    id: 'TH-9421',
    placed: 'Placed 12m ago',
    name: 'Obsidian Serving Bowl',
    qty: 1,
    price: 124.00,
    note: "Please engrave 'M & S - 2024' on the base in serif.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
    status: 'New',
  },
  {
    id: 'TH-9419',
    placed: 'Placed 45m ago',
    name: 'Hand-Carved Cherry Spoon Set',
    qty: 1,
    price: 85.00,
    total: 92.50,
    note: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
    status: 'New',
  },
  {
    id: 'TH-9415',
    placed: 'Placed 2h ago',
    customer: 'Julianna Vance',
    shipping: 'Priority Artisan Pack',
    total: 420.00,
    status: 'New',
    items: [
      {
        name: 'Crackle Glaze Vase',
        detail: 'Custom Height: 24"',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
      },
      {
        name: 'Stone Coaster Set',
        detail: 'Classic Sage',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
      },
      {
        name: 'Celadon Tea Bowl',
        detail: 'Qty: 2',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w',
      },
    ],
  },
];

const IncomingOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('New (4)');
  const [orders, setOrders] = useState(SAMPLE_INCOMING_ORDERS);

  useEffect(() => {
    if (user?.id) {
      api.get(`/seller/${user.id}/orders`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            // retain populated live orders
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  const acceptOrder = (id) => {
    alert(`Order #${id} accepted! Ready for fulfillment.`);
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
                alt="Master Potter" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-forest-green">Master Potter</h2>
              <p className="text-[10px] text-on-surface-variant">Hand-thrown Ceramics</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-emerald-50 text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/seller/fulfillment" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Fulfillment
            </Link>
            <Link to="/seller/shipping" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Shipping
            </Link>
            <Link to="/seller/returns" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">assignment_return</span>
              Returns
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant/20">
          <Link to="/new-listing" className="w-full py-3 bg-forest-green text-white rounded-lg text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Top bar with Print Slips */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-charcoal font-display-md text-lg font-bold">
            <span className="material-symbols-outlined text-xl">menu</span>
            <span>TrueHand Seller</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('Printing packing slips...')}
              className="px-5 py-2 bg-charcoal text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-forest-green transition-colors flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print Slips
            </button>
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
          </div>
        </div>

        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">Orders Management</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Review and manage your incoming artisan orders.
            </p>
          </div>

          <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant/30 text-xs font-semibold">
            {['New (4)', 'In Progress (12)', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab 
                    ? 'bg-white text-charcoal font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:text-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Order 1: Obsidian Serving Bowl */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#ffdecb] text-[#97472a]">
                    New
                  </span>
                  <span className="font-headline-md text-xs font-bold text-charcoal">#TH-9421</span>
                </div>
                <span className="text-[11px] text-on-surface-variant">Placed 12m ago</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src={SAMPLE_INCOMING_ORDERS[0].image} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-sm font-bold text-charcoal">{SAMPLE_INCOMING_ORDERS[0].name}</h4>
                      <p className="text-[11px] text-on-surface-variant">Qty: 1</p>
                    </div>
                    <span className="font-headline-md text-sm font-bold text-charcoal">$124.00</span>
                  </div>
                  <div className="mt-3 bg-surface-container-low p-2.5 rounded-lg border-l-2 border-terracotta">
                    <p className="text-[10px] text-terracotta italic leading-tight">
                      Note: "{SAMPLE_INCOMING_ORDERS[0].note}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
              <span className="text-[11px] text-on-surface-variant font-semibold">+1 item</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/order-fulfillment-detail')}
                  className="px-4 py-2 border border-outline-variant text-charcoal rounded-lg font-label-md text-xs font-semibold hover:bg-surface-container transition-colors"
                >
                  Details
                </button>
                <button 
                  onClick={() => acceptOrder('TH-9421')}
                  className="px-5 py-2 bg-forest-green text-white rounded-lg font-label-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow"
                >
                  Accept Order
                </button>
              </div>
            </div>
          </div>

          {/* Order 2: Hand-Carved Cherry Spoon Set */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#ffdecb] text-[#97472a]">
                    New
                  </span>
                  <span className="font-headline-md text-xs font-bold text-charcoal">#TH-9419</span>
                </div>
                <span className="text-[11px] text-on-surface-variant">Placed 45m ago</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src={SAMPLE_INCOMING_ORDERS[1].image} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-sm font-bold text-charcoal">{SAMPLE_INCOMING_ORDERS[1].name}</h4>
                      <p className="text-[11px] text-on-surface-variant">Qty: 1</p>
                    </div>
                    <span className="font-headline-md text-sm font-bold text-charcoal">$85.00</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2 italic">No custom notes</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
              <span className="text-xs font-bold text-charcoal">Total: $92.50 <span className="text-[10px] text-on-surface-variant font-normal">(incl. tax)</span></span>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/order-fulfillment-detail')}
                  className="px-4 py-2 border border-outline-variant text-charcoal rounded-lg font-label-md text-xs font-semibold hover:bg-surface-container transition-colors"
                >
                  Details
                </button>
                <button 
                  onClick={() => acceptOrder('TH-9419')}
                  className="px-5 py-2 bg-forest-green text-white rounded-lg font-label-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow"
                >
                  Accept Order
                </button>
              </div>
            </div>
          </div>

          {/* Order 3: Full Width Julianna Vance Order with 3 item thumbnails */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#ffdecb] text-[#97472a]">
                  New
                </span>
                <span className="font-headline-md text-xs font-bold text-charcoal">#TH-9415</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant">Customer: <strong className="text-charcoal">{SAMPLE_INCOMING_ORDERS[2].customer}</strong></p>
                <p className="text-xs text-on-surface-variant">Shipping: <strong className="text-charcoal">{SAMPLE_INCOMING_ORDERS[2].shipping}</strong></p>
              </div>
              <h3 className="font-display-lg text-lg font-bold text-forest-green">Total: $420.00</h3>

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => alert('Opening conversation with customer Julianna Vance...')}
                  className="px-4 py-2 border border-outline-variant text-charcoal rounded-lg font-label-md text-xs font-semibold hover:bg-surface-container transition-colors"
                >
                  Message
                </button>
                <button 
                  onClick={() => acceptOrder('TH-9415')}
                  className="px-5 py-2 bg-forest-green text-white rounded-lg font-label-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow"
                >
                  Accept All
                </button>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-3 gap-4">
              {SAMPLE_INCOMING_ORDERS[2].items.map((it, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30">
                    <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-headline-md text-xs font-bold text-charcoal line-clamp-1">{it.name}</h5>
                    <p className="text-[10px] text-on-surface-variant">{it.detail}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-on-surface-variant pt-4 border-t border-outline-variant/20">
          <span>Showing <strong>4</strong> of <strong>16</strong> pending orders</span>
          <Link to="/orders" className="text-forest-green hover:underline flex items-center gap-1 font-bold">
            <span>View Order History</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

      </main>

    </div>
  );
};

export default IncomingOrders;
