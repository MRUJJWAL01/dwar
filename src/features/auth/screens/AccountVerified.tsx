import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountVerified'>;

export default function AccountVerified({ navigation }: Props) {
  const nextStep = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'DeviceSetup',
          params: { type: 'device' },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.outerRing}>
          <View>
            <Image
              source={require('../../../assets/images/auth/verified.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.title}>Account Verified!</Text>

        <Text style={styles.subtitle}>
          Your account has been successfully verified.
        </Text>

        <Pressable style={styles.primaryBtn} onPress={nextStep}>
          <Text style={styles.primaryBtnText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F4F6', // screenshot jaisa light grey
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 144,
  },

  outerRing: {
    width: 103,
    height: 103,
    borderRadius: 999,
    backgroundColor: '#E6F6EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  icon: {
    width: 103,
    height: 103,
  },
  // innerCircle: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 999,
  //   backgroundColor: '#22C55E',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  check: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
  },

  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 60,
  },

  primaryBtn: {
    width: 308,
    height: 44,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2362EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '500',
  },
});
