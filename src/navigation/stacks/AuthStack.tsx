import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../features/auth/screens/Login';
import Signup from '../../features/auth/screens/Signup';
import Otp from '../../features/auth/screens/Otp';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: { phoneOrEmail?: string } | undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
}