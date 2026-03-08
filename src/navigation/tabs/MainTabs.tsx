import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './stacks/HomeStack.tsx';
import MembersStack from './stacks/MembersStack';
import DeliveryStack from './stacks/DeliveryStack';
import AnalyticsStack from './stacks/AnalyticsStack';
import SettingsStack from './stacks/SettingsStack';

export type MainTabsParamList = {
  HomeStack: undefined;
  MembersStack: undefined;
  DeliveryStack: undefined;
  AnalyticsStack: undefined;
  SettingsStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarIcon: ({ color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case 'HomeStack':
                return 'home';
              case 'MembersStack':
                return 'people-outline';
              case 'DeliveryStack':
                return 'cube-outline';
              case 'AnalyticsStack':
                return 'stats-chart-outline';
              case 'SettingsStack':
                return 'settings-outline';
              default:
                return 'ellipse-outline';
            }
          })();

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="MembersStack" component={MembersStack} options={{ title: 'Members' }} />
      <Tab.Screen name="DeliveryStack" component={DeliveryStack} options={{ title: 'Delivery' }} />
      <Tab.Screen name="AnalyticsStack" component={AnalyticsStack} options={{ title: 'Analytics' }} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}