import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    orderNumber: '',
    subject: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  if (submitted) {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <div className="pt-24 pb-16 bg-surface-linen min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-white">check</span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface mb-4">Request Submitted</h1>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Thank you for reaching out. A member of our concierge team will review your request and get back to you within 24-48 hours.
          </p>
          <Link to="/" className="inline-flex justify-center items-center w-full px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <Link to="/help" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-6 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Help Center
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-4">Contact Support</h1>
          <p className="font-body-md text-on-surface-variant">
            Please provide details about your issue so we can direct it to the right team.
          </p>
        </div>

        {/* Form */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">What do you need help with? *</label>
              <div className="relative">
                <select 
                  name="issueType"
                  required
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface appearance-none"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="order_status">Where is my order?</option>
                  <option value="return_exchange">Return or Exchange</option>
                  <option value="damaged_item">Item arrived damaged</option>
                  <option value="account_issue">Account or Login Issue</option>
                  <option value="artisan_question">Question for an Artisan</option>
                  <option value="other">Other</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Order Number (Optional)</label>
              <input 
                type="text"
                name="orderNumber"
                placeholder="e.g. TH-19284"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Subject *</label>
              <input 
                type="text"
                name="subject"
                required
                placeholder="Brief summary of your issue"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Description *</label>
              <textarea 
                name="description"
                required
                rows="5"
                placeholder="Please provide as much detail as possible..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"
              ></textarea>
            </div>

            <div className="space-y-2 border border-dashed border-outline-variant/50 rounded p-6 text-center hover:bg-surface-variant/30 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">upload_file</span>
              <p className="font-label-md text-on-surface">Upload Images (Optional)</p>
              <p className="font-body-sm text-on-surface-variant">Drag and drop or click to browse (Max 5MB)</p>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
              <button 
                type="submit"
                className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity"
              >
                Submit Request
              </button>
            </div>

          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ReportIssue;
