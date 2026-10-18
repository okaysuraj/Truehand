export function browserVoiceRecognition(events) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition)
    throw new Error(
      'Speech recognition is unavailable in this browser. You can type your search below.',
    );
  const recognition = new Recognition();
  recognition.lang = 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onstart = events.start;
  recognition.onend = events.end;
  recognition.onresult = (event) =>
    events.result(
      Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' '),
    );
  recognition.onerror = (event) =>
    events.error(
      event.error === 'not-allowed'
        ? 'Microphone access was not granted.'
        : 'Speech recognition failed: ' + event.error + '. You can type your search.',
    );
  return {
    start: () => recognition.start(),
    stop: () => recognition.stop(),
    dispose: () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.abort();
    },
  };
}
