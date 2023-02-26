import 'react-native-url-polyfill/auto';
import React from 'react';
import { Navigation } from './router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StateProvider } from '~/contexts/store';
import * as Notifications from 'expo-notifications';
import Snack from '~/components/Snack.tsx';
import { Snackbar } from 'react-native-paper';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function App() {
  return (
    <SafeAreaProvider>
      <StateProvider>
        <Navigation />
        <Snack />
      </StateProvider>
    </SafeAreaProvider>
  );
}
