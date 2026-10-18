import React, { useEffect, useRef } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { watchPush } from '../services/pushRegistration';
import { useAuthStore } from '../store/useAuthStore';
import screens from './screens';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const navigationRef = useRef(createNavigationContainerRef());
  const pendingNotification = useRef(false);
  const userId = useAuthStore((state) => state.user?.id);

  function openNotifications() {
    if (!navigationRef.current.isReady()) {
      pendingNotification.current = true;
      return;
    }
    pendingNotification.current = false;
    navigationRef.current.navigate('Feature', { feature: 'notifications' });
  }

  useEffect(() => {
    let active = true;
    let dispose;
    pendingNotification.current = false;

    // Registration can finish after a sign-out; release that late subscription too.
    watchPush(userId, openNotifications)
      .then((cleanup) => {
        if (active) dispose = cleanup;
        else cleanup();
      })
      .catch(() => {});

    return () => {
      active = false;
      dispose?.();
    };
  }, [userId]);

  return (
    <NavigationContainer
      ref={navigationRef.current}
      onReady={() => {
        if (pendingNotification.current) openNotifications();
      }}
    >
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
        {screens.map((screen) => (
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
