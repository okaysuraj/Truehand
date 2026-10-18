export function nativeVoiceRecognition(events) {
  let module;
  try {
    module = require('expo-speech-recognition').ExpoSpeechRecognitionModule;
  } catch (failure) {
    throw new Error(
      'Speech recognition requires a TrueHand app build with microphone support. You can type your search below.',
    );
  }
  if (!module.isRecognitionAvailable())
    throw new Error('Enable speech recognition in device settings or type your search below.');
  let disposed = false;
  const subscriptions = [
    module.addListener('start', events.start),
    module.addListener('end', events.end),
    module.addListener('result', (event) => events.result(event.results[0]?.transcript || '')),
    module.addListener('error', (event) => {
      if (event.error !== 'aborted')
        events.error(event.message || 'Speech recognition failed. You can type your search.');
    }),
  ];
  return {
    start: async () => {
      const permission = await module.requestPermissionsAsync();
      if (disposed) return;
      if (!permission.granted)
        throw new Error(
          'Microphone or speech access was not granted. Enable it in device settings or type your search.',
        );
      module.start({
        lang: 'en-IN',
        interimResults: true,
        continuous: false,
        requiresOnDeviceRecognition: module.supportsOnDeviceRecognition(),
      });
    },
    stop: () => module.stop(),
    dispose: () => {
      disposed = true;
      subscriptions.forEach((subscription) => subscription.remove());
      module.abort();
    },
  };
}
