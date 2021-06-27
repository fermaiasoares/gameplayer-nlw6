import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])

import Background from './src/components/Background';

import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if(!fontsLoaded) {
    <AppLoading />
  }

  return (
    <Background>
      <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent 
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </Background>
  )
}