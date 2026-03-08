import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import AlertsStack from './AlertsStack';
import HistoryStack from './HistoryStack';
import AnalyticsStack from './AnalyticsStack';
import SettingsStack from './SettingsStack';

export type MainTabsParamList = {
  HomeStack: undefined;
  AlertsStack: undefined;
  HistoryStack: undefined;
  AnalyticsStack: undefined;
  SettingsStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="AlertsStack" component={AlertsStack} />
      <Tab.Screen name="HistoryStack" component={HistoryStack} />
      <Tab.Screen name="AnalyticsStack" component={AnalyticsStack} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} />
    </Tab.Navigator>
  );
}