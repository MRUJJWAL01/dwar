import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from '../features/onboarding/screens/SplashScreen';
import Onboarding1 from '../features/onboarding/screens/Onboarding';


import Login from '../features/auth/screens/Login';
import Signup from '../features/auth/screens/Signup';
import Otp from '../features/auth/screens/Otp';
import AccountVerified from '../features/auth/screens/AccountVerified';

import DeviceSetup1 from '../features/setup/screens/DeviceSetup1';
import DeviceSetup2 from '../features/setup/screens/DeviceSetup2';
import DeviceSetup3 from '../features/setup/screens/DeviceSetup3';
import DeviceSetup4 from '../features/setup/screens/DeviceSetup4';
import Permissions from '../features/setup/screens/Permissions';

import MainTabs from './tabs/MainTabs';
import Onboarding from '../features/onboarding/screens/Onboarding';

export type RootStackParamList = {
  Splash: undefined;

  Onboarding: undefined;
 

  Login: undefined;
  Signup: undefined;

  Otp:
    | { destination?: string; via?: 'phone' | 'email'; flow?: 'login' | 'signup' }
    | undefined;

  AccountVerified: undefined;

  DeviceSetup1: undefined;
  DeviceSetup2: undefined;
  DeviceSetup3: undefined;
  DeviceSetup4: undefined;
  Permissions: undefined;

  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />

          <Stack.Screen name="Onboarding" component={Onboarding} />
       

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="AccountVerified" component={AccountVerified} />

          <Stack.Screen name="DeviceSetup1" component={DeviceSetup1} />
          <Stack.Screen name="DeviceSetup2" component={DeviceSetup2} />
          <Stack.Screen name="DeviceSetup3" component={DeviceSetup3} />
          <Stack.Screen name="DeviceSetup4" component={DeviceSetup4} />
          <Stack.Screen name="Permissions" component={Permissions} />

          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}