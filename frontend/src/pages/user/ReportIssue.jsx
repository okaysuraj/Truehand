import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [nature, setNature] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [details, setDetails] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderRef || !details) {
      alert('Please fill in the order reference and details.');
      return;
    }
    alert('Report submitted successfully. Our concierge team will respond within 24 hours.');
    navigate('/support/requests');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 md:p-12 space-y-8">
        
        {/* Form Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-xl space-y-8 text-xs">
          
          <div className="text-center space-y-2">
            <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
              Tell us what happened
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Our artisans take pride in every piece. If something isn't perfect, we're here to make it right.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nature of Issue */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                NATURE OF ISSUE
              </label>
              <select 
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/60 py-3 text-xs font-semibold text-charcoal focus:outline-none focus:border-forest-green"
              >
                <option value="">Select an option</option>
                <option value="damaged">Damaged or fractured upon arrival</option>
                <option value="incorrect">Incorrect piece or finish received</option>
                <option value="delayed">Severe delivery delay</option>
                <option value="customization">Bespoke sizing/color mismatch</option>
              </select>
            </div>

            {/* Order Reference */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                ORDER REFERENCE
              </label>
              <input 
                type="text"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="TH-0000-00"
                className="w-full bg-transparent border-b border-outline-variant/60 py-3 font-mono font-bold text-xs text-charcoal focus:outline-none focus:border-forest-green"
              />
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                DETAILS
              </label>
              <textarea 
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the issue in detail..."
                className="w-full bg-transparent border-b border-outline-variant/60 py-3 text-xs font-body-md text-charcoal focus:outline-none focus:border-forest-green"
              />
            </div>

            {/* Supporting Media Dropzone */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                SUPPORTING MEDIA
              </label>
              <div 
                onClick={() => alert('Browse image files')}
                className="p-8 border-2 border-dashed border-outline-variant/60 rounded-2xl text-center space-y-2 cursor-pointer hover:border-forest-green transition-colors bg-surface-container-lowest"
              >
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">cloud_upload</span>
                <p className="font-bold text-charcoal text-xs">
                  Drop files here or click to browse
                </p>
                <p className="text-[10px] text-on-surface-variant font-mono">
                  Max size 10MB. Formats: JPG, PNG, HEIC
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-2 pt-4">
              <button 
                type="submit"
                className="w-full py-4 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
              >
                SUBMIT REPORT
              </button>
              <p className="text-[10px] text-center text-on-surface-variant">
                We typically respond within 24 business hours.
              </p>
            </div>

          </form>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link to="/help" className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-charcoal transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to help center
          </Link>
        </div>

      </main>

    </div>
  );
};

export default ReportIssue;
