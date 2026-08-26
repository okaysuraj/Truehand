import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ShippingLabelPreview = () => {
  const navigate = useNavigate();

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
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/seller/fulfillment" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Fulfillment
            </Link>
            <Link to="/shipping-label-preview" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-emerald-50 text-forest-green font-bold shadow-sm">
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs text-on-surface-variant font-label-sm">
              <Link to="/seller/orders" className="hover:text-forest-green">Orders</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Order #TH-8821</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-charcoal">Shipping Label</span>
            </nav>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Label Ready for Printing
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Order #TH-8821: Set of 3 Minimalist Speckled Bowls
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Printing shipping label...')}
              className="px-6 py-3 bg-charcoal text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-forest-green transition-all flex items-center gap-2 shadow"
            >
              <span className="material-symbols-outlined text-base">print</span>
              Print Label
            </button>
            <button 
              onClick={() => alert('Carrier pickup requested with USPS.')}
              className="px-6 py-3 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              Request Carrier Pickup
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Preview on Left, Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Label Preview Canvas */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                Label Preview
              </span>
              <div className="flex gap-2 text-on-surface-variant">
                <button onClick={() => alert('Zooming in')} className="p-1 hover:text-charcoal"><span className="material-symbols-outlined text-base">zoom_in</span></button>
                <button onClick={() => alert('Downloading PDF')} className="p-1 hover:text-charcoal"><span className="material-symbols-outlined text-base">download</span></button>
              </div>
            </div>

            {/* Postal Label Simulation */}
            <div className="border-2 border-charcoal rounded-lg p-6 bg-white space-y-6 text-charcoal font-mono text-xs shadow-inner relative overflow-hidden">
              <div className="flex justify-between items-start border-b-2 border-charcoal pb-4">
                <div>
                  <h3 className="font-bold text-lg font-sans tracking-tight">PRIORITY MAIL&reg;</h3>
                  <p className="text-[10px] text-gray-600 font-sans uppercase">U.S. POSTAGE PAID</p>
                  <p className="text-[10px] text-gray-600 font-sans uppercase font-bold">TRUEHAND SELLER</p>
                </div>
                <div className="w-12 h-12 bg-charcoal text-white flex items-center justify-center font-bold text-2xl font-sans rounded">
                  P
                </div>
              </div>

              {/* Origin Address */}
              <div className="text-[11px] leading-tight space-y-0.5">
                <p className="font-bold font-sans">TRUEHAND CERAMICS</p>
                <p>128 STUDIO LANE</p>
                <p>ASHEVILLE, NC 28801</p>
              </div>

              {/* Destination Address */}
              <div className="pt-2">
                <span className="text-[10px] font-sans uppercase text-gray-500 font-bold block mb-1">SHIP TO:</span>
                <div className="text-sm font-bold font-sans leading-tight space-y-0.5">
                  <p>ELEANOR THORNE</p>
                  <p>442 OAKMONT TERRACE</p>
                  <p>APT 4B</p>
                  <p>PORTLAND, OR 97205</p>
                </div>
              </div>

              {/* Barcode Area */}
              <div className="pt-6 border-t border-gray-300 text-center space-y-2">
                <div className="h-16 flex items-center justify-center gap-[2px] overflow-hidden px-4">
                  {[...Array(60)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-charcoal h-full" 
                      style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }}
                    />
                  ))}
                </div>
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider block text-gray-600">
                    USPS TRACKING # EP
                  </span>
                  <span className="text-xs font-bold font-mono tracking-widest">
                    9405 5000 0000 0000 00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Shipment Details & Next Steps */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
              <h3 className="font-display-lg text-lg font-bold text-charcoal">Shipment Details</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-forest-green shrink-0">
                    <span className="material-symbols-outlined text-lg">local_shipping</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Carrier &amp; Service</span>
                    <h4 className="font-bold text-charcoal mt-0.5">USPS Priority Mail&reg;</h4>
                    <p className="text-[11px] text-on-surface-variant">Estimated Delivery: 2-3 Business Days</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-forest-green shrink-0">
                    <span className="material-symbols-outlined text-lg">package_2</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Package Type</span>
                    <h4 className="font-bold text-charcoal mt-0.5">Custom Box (Artisan Packaging)</h4>
                    <p className="text-[11px] text-on-surface-variant">Fragile: High-Impact Protection</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-forest-green shrink-0">
                    <span className="material-symbols-outlined text-lg">straighten</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Dimensions &amp; Weight</span>
                    <p className="text-xs text-charcoal font-semibold mt-0.5">12 &times; 12 &times; 10 in &bull; 4 lbs 2 oz</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Postage Cost</span>
                  <p className="text-[11px] text-on-surface-variant">Paid by Seller Account</p>
                </div>
                <span className="font-display-lg text-2xl font-bold text-forest-green">$14.85</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-surface-container-low rounded-full text-[11px] font-semibold text-charcoal">Fragile</span>
                <span className="px-3 py-1 bg-surface-container-low rounded-full text-[11px] font-semibold text-charcoal">Insured ($100)</span>
                <span className="px-3 py-1 bg-surface-container-low rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-50">Carbon Neutral</span>
              </div>
            </div>

            {/* Next Steps Box */}
            <div className="bg-surface-container-low/70 p-6 rounded-2xl border border-outline-variant/20 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-charcoal font-bold">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Next Steps</span>
              </div>
              <ul className="space-y-2 text-on-surface-variant list-disc pl-5 leading-relaxed">
                <li>Print on standard 4&times;6" thermal label or 8.5&times;11" paper.</li>
                <li>Attach the label securely, ensuring barcodes are flat and scannable.</li>
                <li>Drop off at any USPS location or schedule an artisan studio pickup.</li>
              </ul>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ShippingLabelPreview;
