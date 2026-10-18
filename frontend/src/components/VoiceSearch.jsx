import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { browserVoiceRecognition } from '../services/voice-recognition';
import { createVoiceSearchHook } from '../../../shared/voice-search';
const useVoiceSearch = createVoiceSearchHook(React, browserVoiceRecognition);
export default function VoiceSearch() {
  const [foreground, setForeground] = useState(!document.hidden);
  const navigate = useNavigate();
  const voice = useVoiceSearch(foreground);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return (
    <main className="pt-28 pb-20 px-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg">Voice search</h1>
      <p>
        Speak a product name or description, then review your search text. Speech recognition uses
        your device’s configured recognition service.
      </p>
      <button className="border p-3" disabled={voice.busy} onClick={voice.toggle}>
        {voice.busy
          ? 'Preparing microphone...'
          : voice.listening
            ? 'Stop listening'
            : 'Start voice input'}
      </button>
      {voice.listening && <p role="status">Listening...</p>}
      {voice.error && <p role="alert">{voice.error}</p>}
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`/products?search=${encodeURIComponent(voice.query.trim())}`);
        }}
      >
        <label className="block">
          Search text
          <input
            className="block border p-3 w-full"
            required
            maxLength={200}
            value={voice.query}
            onChange={(event) => voice.setQuery(event.target.value)}
          />
        </label>
        <button className="border p-3" disabled={!voice.query.trim()}>
          Search catalog
        </button>
      </form>
    </main>
  );
}
