import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './stacks/HomeStack';
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

const TAB_ICONS = {
  HomeStack: {
    active: require('../../assets/tab-icons/home-active.png'),
    inactive: require('../../assets/tab-icons/home.png'),
  },
  MembersStack: {
    active: require('../../assets/tab-icons/members-active.png'),
    inactive: require('../../assets/tab-icons/members.png'),
  },
  DeliveryStack: {
    active: require('../../assets/tab-icons/delivery-active.png'),
    inactive: require('../../assets/tab-icons/delivery.png'),
  },
  AnalyticsStack: {
    active: require('../../assets/tab-icons/analytics-active.png'),
    inactive: require('../../assets/tab-icons/analytics.png'),
  },
  SettingsStack: {
    active: require('../../assets/tab-icons/settings-active.png'),
    inactive: require('../../assets/tab-icons/settings.png'),
  },
} as const;

const TabIcon = ({
  routeName,
  focused,
}: {
  routeName: keyof typeof TAB_ICONS;
  focused: boolean;
}) => {
  const source = focused
    ? TAB_ICONS[routeName].active
    : TAB_ICONS[routeName].inactive;

  return <Image source={source} style={styles.icon} resizeMode="contain" />;
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            routeName={route.name as keyof typeof TAB_ICONS}
            focused={focused}
          />
        ),
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="MembersStack"
        component={MembersStack}
        options={{ title: 'Members' }}
      />
      <Tab.Screen
        name="DeliveryStack"
        component={DeliveryStack}
        options={{ title: 'Delivery' }}
      />
      <Tab.Screen
        name="AnalyticsStack"
        component={AnalyticsStack}
        options={{ title: 'Analytics' }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
});