module.exports = ({ config: base }) => {
  const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
  if (
    projectId &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId)
  )
    throw new Error('EXPO_PUBLIC_EAS_PROJECT_ID must be your actual EAS project UUID');
  const mapKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY;
  return {
    ...base,
    ios: {
      ...base.ios,
      bundleIdentifier: process.env.TRUEHAND_IOS_BUNDLE_ID || 'com.truehand.app',
    },
    android: {
      ...base.android,
      package: process.env.TRUEHAND_ANDROID_PACKAGE || 'com.truehand.app',
    },
    extra: { ...base.extra, ...(projectId ? { eas: { projectId } } : {}) },
    plugins: [
      ...base.plugins,
      ...(mapKey ? [['react-native-maps', { androidGoogleMapsApiKey: mapKey }]] : []),
    ],
  };
};
