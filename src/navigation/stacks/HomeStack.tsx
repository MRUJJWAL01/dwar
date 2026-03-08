import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../features/home/screens/Home.tsx';

export type HomeStackParamList = { Home: undefined };

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}