import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCartStore } from '../store/useCartStore';
import { colors } from '../theme/theme';
import { createScreen } from './ScreenAccess';
const HomeScreen = createScreen({ feature: 'catalog' });
const SearchScreen = createScreen({ feature: 'catalog' });
import CartScreen from './../components/CartContents';
import ProfileScreen from './../screens/user/ProfileScreen';
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors['forest-green'],
        tabBarInactiveTintColor: colors.outline,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarBadge: cartCount > 0 ? cartCount : null }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
