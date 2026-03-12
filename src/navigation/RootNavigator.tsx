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

import DeviceSetup from '../features/setup/screens/DeviceSetup';
import QrScannerScreen from '../features/setup/screens/QrScannerScreen';
import Permissions from '../features/setup/screens/Permissions';

import MainTabs from './tabs/MainTabs';
import Onboarding from '../features/onboarding/screens/Onboarding';

import LiveFeed from '../features/home/screens/LiveFeed';
import SecurityAccessControl from '../features/security/screens/SecurityAccessControl';
import DeliveryRecordings from '../features/recordings/screens/DeliveryRecordings';
import RecordingDetails from '../features/recordings/screens/RecordingDetails';

export type RootStackParamList = {
  Splash: undefined;

  Onboarding: undefined;

  Login: undefined;
  Signup: undefined;

  Otp:
    | {
        destination?: string;
        via?: 'phone' | 'email';
        flow?: 'login' | 'signup';
      }
    | undefined;

  AccountVerified: undefined;

  DeviceSetup: {
    type: 'device' | 'box';
    from: 'setup' | 'settings';
  };

  QrScanner: {
    type: 'device' | 'box';
    from: 'setup' | 'settings';
  };
  Permissions: undefined;

  MainTabs: undefined;
  LiveFeed: undefined;
  SecurityAccessControl: undefined;
  DeliveryRecordings: undefined;
  RecordingDetails: { recordingId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={SplashScreen} />

          <Stack.Screen name="Onboarding" component={Onboarding} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="AccountVerified" component={AccountVerified} />

          <Stack.Screen name="DeviceSetup" component={DeviceSetup} />
          <Stack.Screen name="QrScanner" component={QrScannerScreen} />
          <Stack.Screen name="Permissions" component={Permissions} />

          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="LiveFeed" component={LiveFeed} />
          <Stack.Screen
            name="SecurityAccessControl"
            component={SecurityAccessControl}
          />
          <Stack.Screen
            name="DeliveryRecordings"
            component={DeliveryRecordings}
          />
          <Stack.Screen name="RecordingDetails" component={RecordingDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
