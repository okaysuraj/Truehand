import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
export async function choosePhotograph(camera = false) {
  const permission = camera
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted)
    throw new Error('Photograph access was not granted. Enable it in device settings to continue.');
  const options = {
    mediaTypes: ['images'],
    quality: 0.9,
  };
  const picked = camera
    ? await ImagePicker.launchCameraAsync(options)
    : await ImagePicker.launchImageLibraryAsync(options);
  if (picked.canceled) return null;
  const asset = picked.assets[0];
  const context = ImageManipulator.manipulate(asset.uri);
  if (Math.max(asset.width, asset.height) > 2048)
    context.resize(
      asset.width >= asset.height
        ? {
            width: 2048,
          }
        : {
            height: 2048,
          },
    );
  const image = await context.renderAsync();
  const saved = await image.saveAsync({
    format: SaveFormat.JPEG,
    compress: 0.85,
  });
  return {
    uri: saved.uri,
    type: 'image/jpeg',
    name: 'photograph.jpg',
  };
}
