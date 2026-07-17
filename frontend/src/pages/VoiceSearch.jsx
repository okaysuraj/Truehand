import api from '../services/api';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceSearch = () => {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('idle'); // idle | listening | processing | done | error
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => { setStatus('listening'); setListening(true); };
    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('');
      setTranscript(t);
    };
    recognition.onend = () => {
      setListening(false);
      setStatus('done');
    };
    recognition.onerror = () => {
      setListening(false);
      setStatus('error');
    };

    recognitionRef.current = recognition;
  }, []);

  const start = () => {
    setTranscript('');
    setStatus('listening');
    recognitionRef.current?.start();
  };

  const stop = () => {
    recognitionRef.current?.stop();
  };

  const search = () => {
    if (transcript.trim()) {
      navigate(`/search?q=${encodeURIComponent(transcript.trim())}`);
    }
  };

  const suggestions = ['Handmade ceramic vase', 'Woven silk scarf', 'Wooden cutting board', 'Silver ring', 'Leather wallet'];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-4 text-center">

        <h1 className="font-display-md text-display-md text-on-surface mb-3">Voice Search</h1>
        <p className="font-body-md text-on-surface-variant mb-12">
          Speak the name of a craft, material, or artisan style and we'll find it for you.
        </p>

        {!supported ? (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 mb-8">
            <span className="material-symbols-outlined text-3xl block mb-2">mic_off</span>
            <p className="font-label-md">Voice search is not supported in this browser.</p>
            <p className="font-body-sm mt-1">Try Chrome or Edge for voice search support.</p>
          </div>
        ) : (
          <>
            {/* Mic Button */}
            <div className="relative flex items-center justify-center mb-8">
              {listening && (
                <>
                  <div className="absolute w-36 h-36 rounded-full border-2 border-forest-green/30 animate-ping" />
                  <div className="absolute w-28 h-28 rounded-full border-2 border-forest-green/20 animate-ping animation-delay-100" />
                </>
              )}
              <button
                onClick={listening ? stop : start}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  listening
                    ? 'bg-red-500 hover:bg-red-600 scale-110'
                    : 'bg-forest-green hover:bg-forest-green/90'
                }`}
              >
                <span className="material-symbols-outlined text-white text-4xl">
                  {listening ? 'stop' : 'mic'}
                </span>
              </button>
            </div>

            {/* Status */}
            <div className="mb-8 min-h-[60px]">
              {status === 'idle' && (
                <p className="font-body-md text-on-surface-variant">Tap the microphone and speak</p>
              )}
              {status === 'listening' && (
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-1 bg-forest-green rounded-full animate-bounce" style={{ height: `${Math.random() * 20 + 12}px`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="font-label-md text-forest-green ml-2">Listening...</p>
                </div>
              )}
              {status === 'done' && transcript && (
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4">
                  <p className="font-label-sm text-on-surface-variant mb-1">Heard:</p>
                  <p className="font-headline-sm text-on-surface">"{transcript}"</p>
                </div>
              )}
              {status === 'error' && (
                <p className="font-body-md text-red-600">Could not capture audio. Please try again.</p>
              )}
            </div>

            {/* Actions */}
            {transcript && (
              <div className="flex gap-3 justify-center mb-8">
                <button
                  onClick={search}
                  className="px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  Search
                </button>
                <button
                  onClick={start}
                  className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}

        {/* Suggestions */}
        <div className="text-left">
          <p className="font-label-sm text-on-surface-variant mb-3 uppercase tracking-wider">Try saying</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}
                className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full font-body-sm text-on-surface hover:border-forest-green hover:text-forest-green transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;
