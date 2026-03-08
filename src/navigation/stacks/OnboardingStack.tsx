import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding1 from '../../features/onboarding/screens/Onboarding1.tsx';
import Onboarding2 from '../../features/onboarding/screens/Onboarding2';
import Onboarding3 from '../../features/onboarding/screens/Onboarding3';
import Onboarding4 from '../../features/onboarding/screens/Onboarding4';

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Onboarding4" component={Onboarding4} />
    </Stack.Navigator>
  );
}