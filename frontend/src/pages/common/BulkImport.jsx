import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const BulkImport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = React.useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.endsWith('.csv')) { setError('Only CSV files are supported.'); return; }
    setFile(f);
    setError('');
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/products/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please check your CSV format and try again.');
    }
    setLoading(false);
  };

  const csvTemplate = `name,category,price,description,stockQuantity,imageUrl
Hand-Thrown Bowl,Ceramics,85.00,A beautiful hand-thrown ceramic bowl,10,https://example.com/bowl.jpg
Silk Scarf,Textiles,120.00,Hand-dyed silk scarf in natural dyes,5,https://example.com/scarf.jpg`;

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'truehand_products_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/seller/inventory" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Inventory
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Bulk Import Products</h1>
          <p className="font-body-md text-on-surface-variant">Upload a CSV file to add multiple products at once. All uploaded products will be submitted for review.</p>
        </div>

        {/* Template download */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="font-headline-sm text-on-surface mb-3">Step 1: Download Template</h2>
          <p className="font-body-sm text-on-surface-variant mb-4">Use our CSV template to ensure your data is formatted correctly. Required columns: <code className="bg-surface-variant px-1 rounded text-sm">name, category, price, description, stockQuantity, imageUrl</code>.</p>
          <button
            onClick={downloadTemplate}
            className="px-5 py-2.5 border border-forest-green text-forest-green font-label-md rounded hover:bg-forest-green/5 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download CSV Template
          </button>
        </div>

        {/* Upload Zone */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="font-headline-sm text-on-surface mb-4">Step 2: Upload Your CSV</h2>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
              isDragging ? 'border-forest-green bg-forest-green/5' : 'border-outline-variant/50 hover:border-forest-green hover:bg-surface-container'
            }`}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-forest-green text-3xl">description</span>
                <div className="text-left">
                  <p className="font-label-md text-on-surface">{file.name}</p>
                  <p className="font-body-sm text-on-surface-variant">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-4 text-red-500 hover:text-red-700">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-3 block">upload_file</span>
                <p className="font-label-md text-on-surface mb-1">Drop your CSV file here</p>
                <p className="font-body-sm text-on-surface-variant">or click to browse</p>
              </>
            )}
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm mb-6">{error}</div>}

        {result && (
          <div className="p-5 bg-forest-green/10 border border-forest-green/30 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-forest-green text-xl mt-0.5">check_circle</span>
              <div>
                <p className="font-label-md text-on-surface">Upload complete!</p>
                <p className="font-body-sm text-on-surface-variant mt-1">{result.message || 'Your products have been submitted for admin review and will be visible once approved.'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {result ? (
            <button onClick={() => navigate('/seller/inventory')} className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
              View Inventory
            </button>
          ) : (
            <>
              <Link to="/seller/inventory" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
                Cancel
              </Link>
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
                {loading ? 'Uploading...' : 'Upload & Submit'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkImport;
