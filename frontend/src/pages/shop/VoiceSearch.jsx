import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const UNDERLAY_ITEMS = [
  {
    id: 1,
    name: 'Hand-thrown Stoneware',
    price: '$120.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCAqNifEclnbMe22FGUts9heg37g4GHLKFR7Phqxg2PXwcp4YWUjGvoLavluOLBebW9k2Zap1QJbKpaCbmmosc2p_Uag6VsrE_bStFiw_TEVcxOxL9S3wVuLgxXUK90G1oQTrYoNch8G_0GmzxWdpDtoaziqM1czygRJMTayo1xrA5x9QopBuC5l7FJQLasRCV-owNE3bDDloACtkLwTcMSQexA1GNoFC9xjKdRpqPn5Fy8gjM7LAo3g',
  },
  {
    id: 2,
    name: 'Oak Trestle Table',
    price: '$2,400.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2-dGxZ0c96QpfuZLfAmV_OR8kdv137aRqZvtlgGTjpirT0PlhCJ2tyheRmXVvIJXW1b7lgU0UFHI8TQyYZac-KwleZrMWazCHYjWsOZdeA4Yb5xLMhN-dUG3Zi2F0EMyOVxiGA6SAwkfX_sW6WkDSD51sSJ0oKQI8gzEaH6JiFLDvtZjCEczVk_M8zd6-agubCU-CJADbqN71b4DmXoAN-HK4TPGUedCmptjzw6YKm1hu8YeTyN8BsA',
  },
  {
    id: 3,
    name: 'Hand-loomed Throw',
    price: '$380.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC12mrDGp9PQkpW62DxiOBu8QvOgGPkQKhIKCZewCitCkvL3UqceCFamNLDeSXcoqFHdc9j8Ke6S22qLV07TvHdLJ3VaVKvGfxSREiAGoWhAecl6rb6SHdCcJrsifSqeiNqGOAPMcX27STXj1_EhUFMVgGUPk4EqQ7gVm7ScK_7NioAXhyIMBvms7X012gPZsKfJVejh-PoZYMTcHywxo8ZDYwfs-hDjiEiugEUazaVEh8KeOvv5TZZw',
  },
];

const VoiceSearch = () => {
  const navigate = useNavigate();
  const [listening, setListening] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setListening(true);
      recognition.onresult = (e) => {
        const text = Array.from(e.results).map(r => r[0].transcript).join('');
        setTranscript(text);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onerror = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (err) {
        console.warn('SpeechRecognition start failed', err);
      }
    }
  }, []);

  const handlePromptClick = (prompt) => {
    navigate(`/search?q=${encodeURIComponent(prompt)}`);
  };

  const handleMicClick = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      if (transcript.trim()) {
        navigate(`/search?q=${encodeURIComponent(transcript.trim())}`);
      }
    } else {
      setTranscript('');
      setListening(true);
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-surface font-body-md text-on-surface">
      
      {/* Background Underlay (Simulated Page) */}
      <main className="pt-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto filter blur-[2px] opacity-40">
        <header className="mb-12">
          <h1 className="font-display-lg text-display-lg mb-2 text-forest-green">Curated Craft</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Discover objects of permanence. Our collective bridges the gap between master artisans and discerning patrons through a medium of shared tactility.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
          {UNDERLAY_ITEMS.map(item => (
            <div key={item.id} className="group">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-lg mb-3">
                <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
              </div>
              <h3 className="font-body-md text-body-md text-center">{item.name}</h3>
              <p className="font-label-md text-label-md text-center text-on-surface-variant">{item.price}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Voice Search Fullscreen Overlay */}
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-linen/90 backdrop-blur-md transition-opacity duration-500">
        
        {/* Close Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 right-8 p-3 hover:bg-surface-container transition-colors rounded-full text-on-surface-variant cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        {/* Main Content Wrapper */}
        <div className="w-full max-w-4xl text-center flex flex-col items-center gap-8 px-6 animate-in fade-in zoom-in duration-500">
          
          {/* Headline */}
          <div className="space-y-2">
            <h2 className="font-headline-lg text-4xl md:text-[48px] text-forest-green italic font-normal tracking-tight">
              {listening ? 'Listening...' : transcript ? `"${transcript}"` : 'Tap to speak'}
            </h2>
            <p className="font-label-md text-xs text-on-surface-variant tracking-[0.2em] uppercase font-semibold">
              Speak now to discover
            </p>
          </div>

          {/* Microphone & Wave Animation */}
          <div className="relative flex items-center justify-center w-64 h-64">
            {listening && (
              <>
                <div className="absolute w-48 h-48 rounded-full border border-forest-green/20 animate-ping duration-1000" />
                <div className="absolute w-36 h-36 rounded-full bg-forest-green/10 animate-pulse duration-700" />
              </>
            )}

            {/* Mic Icon Button */}
            <button 
              onClick={handleMicClick}
              className="relative z-10 w-24 h-24 bg-forest-green text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[40px]">mic</span>
            </button>
          </div>

          {transcript && (
            <button
              onClick={() => navigate(`/search?q=${encodeURIComponent(transcript.trim())}`)}
              className="px-8 py-2.5 bg-forest-green text-white rounded-full font-label-md text-xs uppercase tracking-widest font-semibold shadow hover:opacity-90 transition-opacity"
            >
              Search for "{transcript}"
            </button>
          )}

          {/* Example Prompts */}
          <div className="mt-8 w-full flex flex-col items-center gap-4">
            <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
              Try saying
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['handmade ceramics', 'wood dining table', 'linen bedding'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-6 py-2 border border-outline-variant/40 rounded-full font-body-md text-sm text-on-surface-variant hover:border-forest-green hover:text-forest-green transition-all bg-white shadow-sm font-medium"
                >
                  “{prompt}”
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VoiceSearch;
