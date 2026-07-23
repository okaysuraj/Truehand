import api from '../../services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
];

const LanguageSettings = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('en');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('truehand_language', selected);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate(-1); }, 1200);
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/settings" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Settings
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Language Settings</h1>
          <p className="font-body-md text-on-surface-variant">Choose your preferred language for the TrueHand interface.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-forest-green/10 border border-forest-green/30 rounded-lg text-forest-green font-label-md flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            Language updated successfully!
          </div>
        )}

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-outline-variant/20 bg-surface-variant/10">
            <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Select Language</p>
          </div>
          <ul className="divide-y divide-outline-variant/20">
            {LANGUAGES.map(lang => (
              <li key={lang.code}>
                <button
                  onClick={() => setSelected(lang.code)}
                  className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
                    selected === lang.code
                      ? 'bg-forest-green/5'
                      : 'hover:bg-surface-variant/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left">
                      <p className="font-label-md text-on-surface">{lang.name}</p>
                      <p className="font-body-sm text-on-surface-variant">{lang.native}</p>
                    </div>
                  </div>
                  {selected === lang.code && (
                    <span className="material-symbols-outlined text-forest-green">check_circle</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 text-[20px] mt-0.5">info</span>
            <p className="font-body-sm text-amber-800">
              Full multi-language support is coming soon. Currently English is fully supported. Other language selections will be saved for future updates.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-forest-green text-white font-label-md rounded-lg hover:opacity-90 transition-opacity"
        >
          Save Language Preference
        </button>
      </div>
    </div>
  );
};

export default LanguageSettings;
