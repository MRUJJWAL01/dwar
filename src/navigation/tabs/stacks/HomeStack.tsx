import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../../features/home/screens/Home';
import LiveFeed from '../../../features/home/screens/LiveFeed';

export type HomeStackParamList = {
  Home: undefined;
  LiveFeed: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LiveFeed" component={LiveFeed} />
    </Stack.Navigator>
  );
}