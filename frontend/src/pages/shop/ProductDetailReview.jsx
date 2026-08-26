import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ProductDetailReview = () => {
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionStatus, setActionStatus] = useState(null);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleApprove = () => {
    setActionStatus('Product approved and published to the marketplace.');
    setTimeout(() => navigate('/admin/products'), 1500);
  };

  const handleRevision = () => {
    setActionStatus('Revision requested from artisan.');
  };

  const handleReject = () => {
    if (!rejectionReason) {
      alert('Please select a rejection reason.');
      return;
    }
    setActionStatus(`Submission rejected: ${rejectionReason}`);
    setTimeout(() => navigate('/admin/products'), 1500);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Left Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-outline-variant/30 fixed top-0 bottom-0 z-30">
        <div className="p-6 border-b border-outline-variant/20">
          <span className="font-display-lg text-xl tracking-wider text-forest-green font-bold">Artisanal Admin</span>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <Link to="/admin" className="flex items-center gap-3 text-on-surface-variant px-6 py-3 hover:bg-surface-container transition-colors font-label-md text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center gap-3 text-on-surface-variant px-6 py-3 hover:bg-surface-container transition-colors font-label-md text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">group</span>
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="flex items-center gap-3 text-forest-green font-bold border-l-4 border-forest-green px-5 py-3 bg-surface-container-low font-label-md text-xs">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="flex items-center gap-3 text-on-surface-variant px-6 py-3 hover:bg-surface-container transition-colors font-label-md text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/finances" className="flex items-center gap-3 text-on-surface-variant px-6 py-3 hover:bg-surface-container transition-colors font-label-md text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">payments</span>
                Finances
              </Link>
            </li>
            <li>
              <Link to="/admin/content" className="flex items-center gap-3 text-on-surface-variant px-6 py-3 hover:bg-surface-container transition-colors font-label-md text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                Content
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center gap-3 text-on-surface-variant px-6 py-3 hover:bg-surface-container transition-colors font-label-md text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Admin Profile Footer */}
        <div className="p-4 border-t border-outline-variant/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-surface-container-highest">
              <img 
                className="w-full h-full object-cover" 
                alt="Admin avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjh_tO9gjMmkhjZO4MI9w6SYSyevkGousv8aF5eIr4vNeXGbSIp5acYGvK8OTGp8wO7auO8MVqgzUVxHOnS2pn7rVZaDZU94IAkOiJ-wLFUTPnuCC64_fyvlE-MrtUmNHLvMdyiUL2DIngspW463ddKGxV8Daqf517rZmyqP9IxAMl7FuYh9T2ByxnoPWtp8_t1VcJ8mhjuL216MYPqskxuhLK_iq9OAK3vRz5BnM94ts_BWNbK9D9qQ" 
              />
            </div>
            <div className="overflow-hidden">
              <p className="font-label-md text-xs text-charcoal font-bold truncate">Artisanal Admin</p>
              <p className="font-label-sm text-[11px] text-on-surface-variant truncate">Marketplace Manager</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full text-center py-2 px-3 border border-outline rounded text-charcoal font-label-md text-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            View Storefront
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 px-6 md:px-10 flex justify-between items-center bg-surface/90 backdrop-blur-md border-b border-outline-variant/40 sticky top-0 z-20">
          <div 
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-2 text-on-surface-variant hover:text-forest-green transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className="font-label-md text-xs font-semibold">Back to Queue</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-forest-green cursor-pointer text-xl">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-forest-green cursor-pointer text-xl">help</span>
          </div>
        </header>

        {actionStatus && (
          <div className="mx-6 md:mx-10 mt-4 p-4 bg-forest-green/10 border border-forest-green text-forest-green rounded-lg text-sm font-semibold">
            {actionStatus}
          </div>
        )}

        <div className="p-6 md:p-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          
          {/* Main Content Canvas (Left Column) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-surface-container rounded font-label-sm text-xs text-on-surface-variant font-semibold">Pending Review</span>
                <span className="font-label-sm text-xs text-on-surface-variant/70">Submitted 2 hours ago</span>
              </div>
              <h1 className="font-display-lg text-headline-lg md:text-display-lg text-charcoal mb-2 font-bold">Hand-Thrown Terracotta Amphora</h1>
              <p className="font-body-lg text-on-surface-variant text-sm md:text-base leading-relaxed">
                A masterful interpretation of classical forms, shaped entirely by hand using locally sourced, iron-rich clay.
              </p>
            </div>

            {/* Bento Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="md:col-span-2 aspect-[4/3] bg-surface-container rounded-lg overflow-hidden relative group">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Hand-thrown Amphora" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL0paGr-V0HNGuVeidVaAtWttw5TZIT8shzZLbAR2NE6ccclt3vGZ0KX4jav7McTNFRx8MI8mOKkaG0reBVt5-UNcnhpTmP51Mh0rS-fKPl3E-EQiIlBgqsplHVBYbFX7TyZh_Aa99NEQDgxRqJrC-sWnE-wEtZTfFx5AdG_36kN6vWMMLdqwREf94MZ_7Hl2sPv45QY03PNlstCA4j2PAaPM3wN6Wdzix_gN-hVuJmViMbJm8NA9O8Q" 
                />
                <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur px-3 py-1 rounded text-xs flex items-center gap-1 font-semibold text-charcoal">
                  <span className="material-symbols-outlined text-[14px]">fullscreen</span> Expand
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Detail 1" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARWNebwqVU6k9zpEY6jMOa9QyuJHj0aMaYoZP_q1S1ykmNBmD7jsmlFIBlgM_O32rPOcBjOuu6rbPE6sGgTHYTrofNjHlpKTOhuXCyj2IwhWOV9_T5477iyTgBVbG-B_pjHKFf71tcjjiXZRMudDcxICFpHY2nn8tOosrUC4KxU5j6kpB6lbayaqySr5xwUlN373IxXn4_5jNJc94ttFfefPy_Pd8BpGt7C9lWw4DClSnh8eyBcgnFeQ" 
                  />
                </div>
                <div className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Detail 2" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHTpHV7aQR4KbxlAPe2dLixomIIIgiRP5FL7qFk8GxgK2UXM-5xYkK8X2GaQMywQvNky9NR6IT-VsKz0H23zN8bgOTdGsAs-fsMkKAbrVdrF7NAAVdmSFpanTdideuzUSuf7i9ssUzn_MZI8w7Lg42S7COjAYNQdLCJdr9Ma2PcD36FKlDW8d9jRrGXbzjxAMg-85RMYwlBHNe5IBkjlN1omzRIqbXd9zYOSCK3qYCfNnlhBfSUid9dA" 
                  />
                </div>
              </div>
            </div>

            {/* Specifications & Materials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-outline-variant/20 pt-6">
              <div>
                <h3 className="font-headline-md text-base text-charcoal mb-4 flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-outline text-[18px]">straighten</span> Dimensions &amp; Specs
                </h3>
                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <dt className="text-on-surface-variant font-medium">Height</dt>
                    <dd className="font-semibold text-charcoal">45 cm</dd>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <dt className="text-on-surface-variant font-medium">Diameter</dt>
                    <dd className="font-semibold text-charcoal">22 cm</dd>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <dt className="text-on-surface-variant font-medium">Weight</dt>
                    <dd className="font-semibold text-charcoal">3.2 kg</dd>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <dt className="text-on-surface-variant font-medium">Proposed Price</dt>
                    <dd className="font-bold text-forest-green text-sm">$240.00</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="font-headline-md text-base text-charcoal mb-4 flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-outline text-[18px]">category</span> Materials &amp; Tags
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Terracotta', 'Unglazed', 'Natural Iron'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-surface-container rounded font-label-sm text-xs text-charcoal border border-outline-variant/40 font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="font-label-sm text-xs text-on-surface-variant mb-2 font-medium">Artisan Defined Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {['Home Decor', 'Vessels'].map(cat => (
                    <span key={cat} className="px-3 py-1 bg-white rounded-full font-label-sm text-xs text-on-surface-variant border border-outline-variant/30">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Artisan Story */}
            <div className="border-t border-outline-variant/20 pt-6">
              <h3 className="font-headline-md text-base text-charcoal mb-4 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-outline text-[18px]">history_edu</span> Artisan Backstory
              </h3>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30 relative">
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6 italic">
                  "This piece was inspired by the ancient storage vessels found along the Mediterranean coast. I source the clay directly from a small vein near my studio in Umbria, ensuring the mineral composition is exactly as it was centuries ago. The firing process takes over 48 hours in a wood-fired kiln, which gives each amphora its unique, unrepeatable surface flashing."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Artisan" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcgc0B7I2F3ITLRH3z0eqTt39jtMyS2SKgrcjVmoKxIwa3Y4Oc9uORImm8rLOycmeTzwqHis16Ft9zpmsnM4lpxp7dsrVu0X8JkiAWsVhmPiTKlns4x3osABMydIqCU1tn1jHvB1Oro-U7S6f55L3qX8aKGG0yYW-JJFT8cDyvpRnqYZorGE99EOm-pQ-VMTtXKIzxReNxlO7abZASf5nL2Tm4eMJRMuRbKAdjgKwAj1uI2ppNLKoCsg" 
                    />
                  </div>
                  <div>
                    <p className="font-label-md text-sm text-charcoal font-bold">Studio Fabbrica</p>
                    <p className="font-label-sm text-xs text-on-surface-variant">Joined March 2022 • 42 Products Live</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Moderation Tools (Right Column Sticky) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* System Assessment */}
            <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-label-md text-xs text-charcoal font-bold uppercase tracking-wider">System Assessment</h4>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-label-sm text-[10px] tracking-wide uppercase font-bold">Low Risk</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-forest-green mt-0.5">check_circle</span>
                  <div>
                    <p className="font-label-sm text-xs text-charcoal font-bold">Image Authenticity</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">No stock photo matches detected. EXIF data valid.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-forest-green mt-0.5">check_circle</span>
                  <div>
                    <p className="font-label-sm text-xs text-charcoal font-bold">Description Integrity</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">Plagiarism scan clear. Tone matches brand guidelines.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-terracotta mt-0.5">info</span>
                  <div>
                    <p className="font-label-sm text-xs text-charcoal font-bold">Pricing Anomaly</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">Price is 15% higher than similar category averages.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Artisan History */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
              <h4 className="font-label-md text-xs text-charcoal mb-3 font-bold uppercase tracking-wider">Artisan History</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg text-center border border-outline-variant/20">
                  <p className="font-headline-md text-2xl text-charcoal font-bold">42</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Approved</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center border border-outline-variant/20">
                  <p className="font-headline-md text-2xl text-charcoal font-bold">1</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Rejected</p>
                </div>
              </div>
              <p className="font-label-sm text-[11px] text-on-surface-variant italic">Last rejection: "Image quality too low" (Oct 12, 2023)</p>
            </div>

            {/* Moderation Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 space-y-4">
              <h3 className="font-headline-md text-base text-charcoal border-b border-outline-variant/20 pb-2 font-bold">Moderation Action</h3>
              
              <button 
                onClick={handleApprove}
                className="w-full py-3 px-4 bg-forest-green text-white rounded font-label-md text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold shadow"
              >
                <span className="material-symbols-outlined text-[16px]">done_all</span>
                Approve Product
              </button>

              <button 
                onClick={handleRevision}
                className="w-full py-2.5 px-4 border border-outline-variant text-charcoal rounded font-label-md text-xs uppercase tracking-wider hover:bg-surface-container transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                Request Revision
              </button>

              <div className="pt-4 border-t border-outline-variant/20">
                <label className="block font-label-sm text-xs text-charcoal mb-2 font-semibold">Reject Submission</label>
                <select 
                  className="w-full bg-surface border border-outline-variant rounded py-2 px-3 text-xs text-on-surface focus:border-forest-green outline-none"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                >
                  <option value="">Select rejection reason...</option>
                  <option value="Poor photography quality">Poor photography quality</option>
                  <option value="Questionable authenticity">Questionable authenticity</option>
                  <option value="Inadequate description">Inadequate description</option>
                  <option value="Prohibited item">Prohibited item</option>
                </select>
                <button 
                  onClick={handleReject}
                  className="w-full mt-3 py-2 px-4 bg-red-100 text-red-700 rounded font-label-md text-xs uppercase tracking-wider hover:bg-red-200 transition-colors font-semibold"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ProductDetailReview;
