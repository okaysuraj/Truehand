import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const SAMPLE_ORDERS = [
  {
    id: 'AH-928374',
    orderNumber: '#AH-928374',
    name: 'Sumi-e Inspired Glazed Vessel',
    artisan: 'By Artisan Kenji Nakamura',
    price: 485.00,
    status: 'IN TRANSIT',
    statusTag: 'In Transit',
    statusColor: 'bg-emerald-100 text-emerald-800',
    estimatedArrival: 'Oct 24, 2024',
    currentLocation: 'Kyoto Hub',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxErMHRhrn2KkUOXA18bGbCos5_fd9pw1YBh0ocHhUnaIHEJxDFws_74yq_iB_himwxbHWzqM2BEYcqZOuCVo3CN2RlR93gNaUA3WnX6oYUyeptNi_PSJrzkwv0KeZUOGM_vnH1frl3UVVwid0Lak_QIHjumia3urt26J2qMRf7v14cG_xUieyxqE7RfO3Etxs35v_pUICyZ2jw4QdUL5x-S20xH-SUsVuKqR6xINIntrJzUrUNS1NRQ',
    type: 'active',
  },
  {
    id: 'AH-928112',
    orderNumber: '#AH-928112',
    name: 'Highlands Merino Weave',
    artisan: 'Studio Atelier Nord',
    price: 320.00,
    status: 'PREPARING',
    statusTag: 'Preparing Shipment',
    statusColor: 'bg-amber-100 text-amber-900',
    estimatedArrival: 'Oct 28, 2024',
    currentLocation: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeCYhd7I4h-n4OM1vRaUr-klBuiAWPt303dcypGEeiQkgQNi6_Xv0cYw0ZcpS5QT1zScqAD19e49mMXCzODp8ERcB3QOqfywWILT7TYZJolsC869cHiXOyNTmb1gsvcnGb5tGdcFiERAxHzA71PQNa6Xlwijgtn2Yb7ah8-2Dfbe9FZGTW_GBJ9VpW1oc567uw1kDm43JPK2-f3VFcc4SQQ9gTZwb3Cuxi07FbV2Wtxsy1ylB0bZdaFg',
    type: 'active',
  },
  {
    id: 'AH-912003',
    orderNumber: '#AH-912003',
    name: 'Hand-Carved Walnut Nesting Set',
    artisan: 'The Oregon Woodsmith',
    price: 215.00,
    status: 'DELIVERED',
    statusTag: 'Delivered',
    statusColor: 'bg-surface-container-high text-on-surface-variant',
    deliveredOn: 'Sept 12, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqd4TL6YM-02s_QxvUuoHr9W8C8c6zr6POoUxUDOS0PxjQcYqP3L1S8V1b-eE8dFGBE6-eGZ4EruYb3UHYl1jp36TbyAAeDPJSx472DW2rZMvOQQJ8bEMQUBJulQvwF5PAxoG9o578JKM48AdILKjy-a0BYsJ5S0SgVO9mw-SqRqLabQtaHE-V0e5Im0EIJdDRvnMEBmJTH3S2iPK9fdX-6_WtAXXkL7s4E9yeMmFRcI62hlgt-tVRg',
    type: 'completed',
  },
];

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('All Orders');
  const [orders, setOrders] = useState(SAMPLE_ORDERS);

  useEffect(() => {
    if (user?.id) {
      api.get(`/orders/user/${user.id}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            const mapped = res.data.map(o => ({
              id: o.id.toString(),
              orderNumber: `#TH-${o.id}`,
              name: o.orderItems?.[0]?.productName || 'Artisan Handcrafted Piece',
              artisan: 'TrueHand Studio Collective',
              price: o.totalAmount || 180.00,
              status: o.status || 'IN TRANSIT',
              statusTag: o.status === 'DELIVERED' ? 'Delivered' : 'In Transit',
              statusColor: o.status === 'DELIVERED' ? 'bg-surface-container-high text-on-surface-variant' : 'bg-emerald-100 text-emerald-800',
              estimatedArrival: 'In 3-5 days',
              currentLocation: 'Regional Fulfillment Hub',
              image: o.orderItems?.[0]?.productImage || SAMPLE_ORDERS[0].image,
              type: o.status === 'DELIVERED' ? 'completed' : 'active',
            }));
            setOrders(mapped);
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  const filteredOrders = orders.filter(o => {
    if (tab === 'Active') return o.type === 'active';
    if (tab === 'Completed') return o.type === 'completed';
    return true;
  });

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-2">Your Acquisitions</h1>
        <p className="font-body-md text-on-surface-variant text-xs md:text-sm max-w-2xl leading-relaxed">
          Refined craftsmanship takes time. Trace the journey of your hand-selected pieces from the artisan's studio to your home.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-8 border-b border-outline-variant/30 mb-8 overflow-x-auto">
        {['All Orders', 'Active', 'Completed'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 font-label-md text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap ${
              tab === t 
                ? 'border-b-2 border-forest-green text-forest-green' 
                : 'text-on-surface-variant hover:text-forest-green'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map(order => (
          <div 
            key={order.id} 
            className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div 
                className="w-28 h-28 bg-surface-container rounded-xl overflow-hidden shrink-0 cursor-pointer"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={order.name} src={order.image} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-on-surface-variant uppercase font-semibold">{order.orderNumber}</span>
                  <span className={`font-label-sm text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                    {order.statusTag}
                  </span>
                </div>
                <h3 
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="font-headline-md text-lg text-forest-green font-bold hover:text-terracotta transition-colors cursor-pointer"
                >
                  {order.name}
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant">{order.artisan}</p>
                <p className="font-headline-md text-sm text-charcoal font-bold pt-1">${order.price.toFixed(2)}</p>

                {order.estimatedArrival && (
                  <div className="flex items-center gap-4 text-[11px] text-on-surface-variant pt-2">
                    <div>
                      <span className="uppercase text-[9px] font-bold text-outline block">Estimated Arrival</span>
                      <span className="font-semibold text-charcoal">{order.estimatedArrival}</span>
                    </div>
                    {order.currentLocation && (
                      <div>
                        <span className="uppercase text-[9px] font-bold text-outline block">Current Location</span>
                        <span className="font-semibold text-charcoal">{order.currentLocation}</span>
                      </div>
                    )}
                  </div>
                )}

                {order.deliveredOn && (
                  <div className="text-[11px] text-on-surface-variant pt-2">
                    <span className="uppercase text-[9px] font-bold text-outline block">Delivered On</span>
                    <span className="font-semibold text-charcoal">{order.deliveredOn}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/20">
              {order.type === 'active' ? (
                <>
                  <button 
                    onClick={() => navigate(`/tracking/${order.id}`)}
                    className="px-5 py-2.5 border border-outline-variant text-charcoal font-label-md text-xs uppercase tracking-wider rounded-lg hover:bg-surface-container transition-colors font-semibold"
                  >
                    Track Order
                  </button>
                  <button 
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="px-5 py-2.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-wider rounded-lg hover:opacity-90 transition-all font-semibold shadow"
                  >
                    Order Details
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => alert('Downloading original tax invoice PDF...')}
                    className="px-5 py-2.5 border border-outline-variant text-charcoal font-label-md text-xs uppercase tracking-wider rounded-lg hover:bg-surface-container transition-colors font-semibold"
                  >
                    Download Invoice
                  </button>
                  <button 
                    onClick={() => navigate('/products')}
                    className="px-5 py-2.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-wider rounded-lg hover:opacity-90 transition-all font-semibold shadow"
                  >
                    Reorder
                  </button>
                </>
              )}
            </div>

          </div>
        ))}
      </div>

    </main>
  );
};

export default Orders;
