// Coordinates speech input, cancellation, and editable search text.
export function createVoiceSearchHook(React, adapter) {
  return function useVoiceSearch(foreground = true) {
    const [query, setQuery] = React.useState('');
    const [listening, setListening] = React.useState(false);
    const [busy, setBusy] = React.useState(false);
    const [error, setError] = React.useState('');
    const recognition = React.useRef(null);
    React.useEffect(() => {
      let active = true;
      setListening(false);
      setBusy(false);
      if (!foreground) return;
      try {
        recognition.current = adapter({
          start: () => {
            if (active) {
              setListening(true);
              setBusy(false);
            }
          },
          end: () => {
            if (active) {
              setListening(false);
              setBusy(false);
            }
          },
          result: (value) => {
            if (active) setQuery(value);
          },
          error: (message) => {
            if (active) {
              setError(message);
              setListening(false);
              setBusy(false);
            }
          },
        });
      } catch (failure) {
        setError(failure.message);
      }
      return () => {
        active = false;
        recognition.current?.dispose();
        recognition.current = null;
      };
    }, [foreground]);
    async function toggle() {
      setError('');
      if (listening) {
        recognition.current?.stop();
        return;
      }
      if (!recognition.current) {
        setError('Speech recognition is unavailable. You can type your search below.');
        return;
      }
      setBusy(true);
      try {
        await recognition.current.start();
      } catch (failure) {
        setError(failure.message || 'Unable to start speech recognition.');
        setBusy(false);
      }
    }
    return {
      query,
      setQuery,
      listening,
      busy,
      error,
      toggle,
    };
  };
}
