import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsHome from '../../../features/settings/screens/SettingsHome';
import EditProfile from '../../../features/settings/screens/EditProfile';
import LinkedDevices from '../../../features/settings/screens/LinkedDevices';
import DeviceSetup1 from '../../../features/setup/screens/DeviceSetup1';
import DeviceSetup3 from '../../../features/setup/screens/DeviceSetup3';

export type SettingsStackParamList = {
  SettingsHome: undefined;
  EditProfile: undefined;
  LinkedDevices: undefined;
  DeviceSetup1: undefined;
  DeviceSetup3: undefined;
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
      <Stack.Screen name="DeviceSetup1" component={DeviceSetup1} />
      <Stack.Screen name="DeviceSetup3" component={DeviceSetup3} />
    </Stack.Navigator>
  );
}
