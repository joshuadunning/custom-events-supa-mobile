import 'react-native-url-polyfill/auto';
import React from 'react';
import { Navigation } from './router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StateProvider } from '~/contexts/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <StateProvider>
        <Navigation />
      </StateProvider>
    </SafeAreaProvider>
  );
}
