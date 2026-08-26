import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const OrderDetail = () => {
  const { id, orderId } = useParams();
  const activeId = id || orderId || 'TH-29402851';
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    id: activeId.startsWith('TH-') ? activeId : `TH-${activeId}`,
    date: 'November 14, 2024',
    status: 'IN TRANSIT',
    statusText: 'Your order is currently moving through our Seattle distribution center. Expected delivery by Nov 18.',
    subtotal: 900.00,
    shipping: 45.00,
    tax: 72.00,
    total: 1017.00,
    shippingAddress: {
      name: 'Eleanor Sterling',
      line1: '1284 Oakwood Heights',
      line2: 'Studio 4B',
      cityStateZip: 'Seattle, WA 98101',
    },
    paymentMethod: 'Visa ending in 4492',
    items: [
      {
        id: 1,
        name: 'Hand-Thrown Celadon Vessel',
        series: 'ARTISAN SERIES',
        variant: 'Matte Oatmeal Glaze / Medium',
        price: 340.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
      },
      {
        id: 2,
        name: 'Organic Belgian Linen Throw',
        series: 'HERITAGE TEXTILE',
        variant: 'Forest Check / 150x200cm',
        price: 280.00,
        quantity: 2,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_xX6XEhU-WTrQjlSLaFlfKZ1jajQPNlnMpkVfsJXQaHHCgModNCKc__zGXk7a9ZukGcFD4D7myKQgF5TSD7AeC-X0cwPBMrhggJjXdxUdhQRpQgHEc5HfKkoru-eNrvNoJJaqu_frcl4H-7Ip6X0RCPQy_6S85Gil029ytx-wg9HXALK0-QjSEAnCTLmPOpS8qgn-opLdF-MdKKvwo3X6BgyI4lVmEY6ye7QfKLKkCMswrKzOOmndDw',
      },
    ]
  });

  useEffect(() => {
    if (activeId && activeId !== 'TH-29402851') {
      api.get(`/orders/${activeId}`)
        .then(res => {
          if (res.data) {
            setOrder(prev => ({
              ...prev,
              id: res.data.orderNumber || `TH-${res.data.id}`,
              total: res.data.totalAmount || prev.total,
            }));
          }
        })
        .catch(e => console.warn(e));
    }
  }, [activeId]);

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Back link */}
      <div className="mb-6">
        <Link to="/orders" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-label-md font-semibold text-on-surface-variant hover:text-forest-green transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Orders
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2 mb-8 pb-4 border-b border-outline-variant/30">
        <h1 className="font-display-lg text-2xl md:text-4xl text-forest-green font-bold">
          Order #{order.id}
        </h1>
        <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-bold">
          CONFIRMED &bull; {order.date}
        </span>
      </div>

      {/* In Transit Status Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-2xl">local_shipping</span>
          </div>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-emerald-900 block mb-0.5">
              Shipping Status: In Transit
            </span>
            <p className="font-body-md text-xs sm:text-sm text-emerald-950">
              {order.statusText}
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate(`/tracking/${order.id}`)}
          className="px-6 py-3 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2 shadow shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          Track Package
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Items Ordered & Order Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Items Section */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <h2 className="font-headline-md text-xl text-forest-green font-bold mb-6 border-b border-outline-variant/20 pb-4">
              Items Ordered
            </h2>

            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-b border-outline-variant/20 pb-6 last:border-0 last:pb-0">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-24 bg-surface-container rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="font-label-sm text-[10px] uppercase tracking-wider text-terracotta font-bold block mb-0.5">
                        {item.series}
                      </span>
                      <h3 className="font-body-lg text-sm md:text-base font-bold text-on-surface">{item.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">{item.variant}</p>
                      <p className="text-xs font-semibold text-on-surface mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <span className="font-headline-md text-base sm:text-lg text-forest-green font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3-Column Metadata Card */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="font-label-sm uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                Order Date
              </span>
              <p className="font-semibold text-charcoal">{order.date}</p>
            </div>

            <div>
              <span className="font-label-sm uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                Shipping Address
              </span>
              <div className="text-on-surface-variant leading-relaxed">
                <p className="font-semibold text-charcoal">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                <p>{order.shippingAddress.line2}</p>
                <p>{order.shippingAddress.cityStateZip}</p>
              </div>
            </div>

            <div>
              <span className="font-label-sm uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                Payment Method
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-terracotta text-[18px]">credit_card</span>
                <span className="font-semibold text-charcoal">{order.paymentMethod}</span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Order Summary & Return Policy */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Order Summary */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <h2 className="font-headline-md text-lg text-forest-green font-bold pb-3 border-b border-outline-variant/20">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-on-surface">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping (Premium Express)</span>
                <span className="font-semibold text-on-surface">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-semibold text-on-surface">${order.tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-outline-variant/20">
              <span className="font-headline-md text-base text-forest-green font-bold">Total</span>
              <span className="font-display-lg text-2xl text-forest-green font-bold">${order.total.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => alert('Downloading original tax invoice PDF...')}
              className="w-full py-3.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-all font-semibold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download Invoice
            </button>

            <p className="text-[11px] text-on-surface-variant text-center">
              Questions about your order?{' '}
              <Link to="/help" className="text-forest-green underline font-semibold">
                Contact Artisan Support
              </Link>
            </p>
          </div>

          {/* Return Policy Card */}
          <div className="bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/20 space-y-2">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Return Policy
            </span>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              As these are handcrafted items, we accept returns within 30 days of receipt in original packaging.
            </p>
            <Link to={`/return-request/${order.id}`} className="text-xs font-bold text-terracotta hover:underline inline-block pt-1">
              Start a Return Request &rarr;
            </Link>
          </div>

        </aside>

      </div>

    </main>
  );
};

export default OrderDetail;
