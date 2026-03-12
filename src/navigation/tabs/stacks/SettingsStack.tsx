import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsHome from '../../../features/settings/screens/SettingsHome';
import EditProfile from '../../../features/settings/screens/EditProfile';
import LinkedDevices from '../../../features/settings/screens/LinkedDevices';
import DeviceSetup from '../../../features/setup/screens/DeviceSetup';

export type SettingsStackParamList = {
  SettingsHome: undefined;
  EditProfile: undefined;
  LinkedDevices: undefined;
  DeviceSetup: {
    type: 'device' | 'box';
  };
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="LinkedDevices" component={LinkedDevices} />
      {/* ✅ linking flows */}
      <Stack.Screen name="DeviceSetup" component={DeviceSetup} />
    </Stack.Navigator>
  );
}
