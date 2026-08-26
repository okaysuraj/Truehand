import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_RECENT_PHOTOS = [
  {
    id: 1,
    title: 'Ceramic Texture',
    time: '2 hours ago',
    category: 'Ceramics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU3axd5TNKWbDggUjoQeoijB7EDxlLzImlNuyvsZUcAXopSlykakLO2s0dMeQvM9QtR6hEAnMG52LNgYj25XeEWvZ-fUjAQLErr7l53-vmuLk_BiGEACUdNJPwcv2umq1hYeh9PUigntvbVp6VvUD4QL_JxXNbXVnXrZfQXVzvkILGjYPtrzPM4Ui9txZ0pIbcINaZIgPjn-Bg-VH2RKzWoBj0I2T1xVNtNalxaH0mB7fDHK14Cq_KYQ',
  },
  {
    id: 2,
    title: 'Natural Weave',
    time: 'Yesterday',
    category: 'Textiles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTDFg9FY8GVf0x7vTerX2CVqgMwz2iU4QUlBXxW7L0-eeOnV24J4k3Nzz7u9331oXb4W-ShV6jeLOioP45yhU5CfCuda01PeAzikgf1kOCuQlVIc0P9_JDPTDP1Ud2tPwTEq6MfGUqVKYK9-0dcU5BZlS5OUIoYVqSYGB6XbM_BicgBWwrUHU0jWYdJc1NQkyKjBZI0zz90naoORAK4MgZ5REWMwnSuFAeypgq52sXpDt9M1J097c3iQ',
  },
  {
    id: 3,
    title: 'Carved Walnut',
    time: '3 days ago',
    category: 'Woodwork',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDamBk9kor4btVSoSZrl0w7Mkjk4Gqe5E3xPSbAV9apY0Q2MzRJ_Bpixap3bKNsjA4Bz3_Qx5WifxjHB4WMWyT-w95erCUMoORECKsxPqw3UGKOQgSZeAFst-lkZ7PT_clCeEgSOOLXMVazYg70-DIkN67FD3Fj3ZL43UWhGkk_aLB6pigp8OnZ6R-NzAs7lmR0E9yNlZsqK1XT5fkAlMd-y6LluGnjuyKxrGHf7lqqnoDttDVM6__xGg',
  },
  {
    id: 4,
    title: 'Patinated Copper',
    time: 'Oct 24',
    category: 'Metalwork',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0bdyL8g96m7pJ1pGM3jKsrj3Il6KadgIGdrWHarlAVUHTypjGZcWvyoM57QaZEAC3V6g07e0zVXC82A5LuRoCvIFnNLpccCi5gAkTUyoPSTlg1HuwVZdynkDhnwTE5f5nr0DQ0asvVdtS8sW7y-Jb4vNZCRnGvi5b4V4IqnidkjoamukJ3YzH7XpHVFykgBG6noBjlIhQauR4qfYr7AqouAm-Bp8Jct45zL-f8ihUriB1h3zrI9TwuQ',
  },
  {
    id: 5,
    title: 'Blown Glass',
    time: 'Oct 20',
    category: 'Glassware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzTZOjBEyNtKVVCFT6eLFRRLpfG2VcdK2P_NuifgeBIQ2toaEK0CbFi1fe5Wb7MpDgJg-P7cGcRQF6u0UdBa6Bu2Dtt45fkqTyMCUthb4E2P5dnzWocyaPz0OGsaJOGYuJ4bWGNNvW7HMgG9UjYIURdsKgMpU2xcjmWX0R9icbIWYVeGG-PbsAYkomY8Gf7PGgtA56zEeB6uo72hc8bsVlXNMySpUhaoOfwWVdwdwIge3vLnxF1xh--Q',
  },
  {
    id: 6,
    title: 'Saddle Leather',
    time: 'Oct 18',
    category: 'Leather',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgl5mwH_oxgDcRiUKqDwcyHcXaVbKx1ANMFVzDiTF9rxQ0UNqxptwf_cF8whBs_kWwhC0NbCu7IK1DgcPd-OwzwpQKRempCPXtoIInTxY2TDoe3C2to7YufRPeub7QuMnXHscEsTrJLSAs66mZzeWOqmmDjtnXtAhdJdvveRfBjgMr72Uhu-_S-cnShPEoBoYi88rR7I60h5sxHLvK4lFo51rYXye-TMxIbCncs50F7JC_cD_CiLnBpg',
  },
];

const ImageSearch = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [recentPhotos, setRecentPhotos] = useState(DEFAULT_RECENT_PHOTOS);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setTimeout(() => {
        navigate('/search?q=Visual%20Match');
      }, 800);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearHistory = () => {
    setRecentPhotos([]);
  };

  return (
    <main className="pt-28 pb-20 min-h-screen bg-surface font-body-md text-on-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Hero Header */}
        <section className="mb-12 max-w-3xl">
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-forest-green mb-3 leading-tight">
            Find similar craftsmanship by uploading an image
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Upload a photo of an heirloom, a texture, or a found object to discover artisans who share that aesthetic language.
          </p>
        </section>

        {/* Upload Zone */}
        <section className="mb-16">
          <div 
            id="drop-zone"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative group border-2 border-dashed rounded-xl min-h-[380px] md:min-h-[420px] flex flex-col items-center justify-center transition-all duration-500 cursor-pointer p-8 ${
              isDragging
                ? 'border-forest-green bg-forest-green/5'
                : 'border-outline-variant bg-surface-container-low hover:border-forest-green'
            }`}
          >
            <div className="relative z-10 flex flex-col items-center text-center max-w-md">
              <div className="w-20 h-20 mb-6 bg-surface-container-highest rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-forest-green">photo_camera</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
                {selectedImage ? 'Analyzing Craft Features...' : 'Drag and drop your image'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                Support for high-resolution JPG, PNG, and HEIC files up to 20MB.
              </p>
              
              <div className="flex gap-4 flex-wrap justify-center" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-forest-green text-white px-8 py-3 rounded font-label-md text-sm hover:opacity-90 transition-all flex items-center gap-2 font-semibold shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">upload</span>
                  Select File
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-charcoal text-on-surface px-8 py-3 rounded font-label-md text-sm hover:bg-surface-container transition-all font-semibold"
                >
                  Use Camera
                </button>
              </div>
            </div>

            <input 
              ref={fileInputRef}
              accept="image/*" 
              className="hidden" 
              type="file"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        </section>

        {/* Recent Photos Gallery */}
        <section className="pb-12">
          <div className="flex justify-between items-end mb-8 border-b border-outline-variant/20 pb-4">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Recent Photos</h3>
              <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">Your search history</p>
            </div>
            {recentPhotos.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-on-surface-variant hover:text-forest-green transition-colors font-label-md text-xs flex items-center gap-1 font-semibold"
              >
                Clear History <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            )}
          </div>

          {recentPhotos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recentPhotos.map(photo => (
                <div 
                  key={photo.id}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(photo.title)}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-surface-container-high overflow-hidden rounded-lg mb-2 relative shadow-sm hover:shadow-lg transition-all duration-500">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={photo.title} 
                      src={photo.image} 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <p className="font-label-sm text-xs text-on-surface-variant font-medium group-hover:text-forest-green transition-colors">{photo.title}</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant/60 italic">{photo.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant italic">No search history.</p>
          )}
        </section>

      </div>
    </main>
  );
};

export default ImageSearch;
