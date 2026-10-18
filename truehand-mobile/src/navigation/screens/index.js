import systemScreens from './system';
import deliveryScreens from './delivery';
import accountScreens from './account';
import adminScreens from './admin';
import sellerScreens from './seller';
import shopScreens from './shop';
import { createScreen } from '../ScreenAccess';

// Create component identities once; recreating them during render resets screen state.
const definitions = [
  ...systemScreens,
  ...deliveryScreens,
  ...accountScreens,
  ...adminScreens,
  ...sellerScreens,
  ...shopScreens,
];
export default definitions.flatMap((definition) => {
  const component = createScreen(definition);
  return definition.names.map((name) => ({ name, component, options: definition.options }));
});
