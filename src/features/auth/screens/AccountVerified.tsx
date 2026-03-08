import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountVerified'>;

export default function AccountVerified({ navigation }: Props) {
  const nextStep = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'DeviceSetup1' }],
    });
  };
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Green success icon */}
        <View style={styles.outerRing}>
          <View style={styles.innerCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Account Verified!</Text>
        <Text style={styles.subtitle}>
          Your account has been successfully{'\n'}verified.
        </Text>

        <Pressable style={styles.primaryBtn} onPress={() => nextStep()}>
          <Text style={styles.primaryBtnText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  outerRing: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: '#EAF7EE', // light green ring
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  innerCircle: {
    width: 62,
    height: 62,
    borderRadius: 999,
    backgroundColor: '#22C55E', // green
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: -2,
  },

  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
  },

  primaryBtn: {
    marginTop: 28,
    width: '92%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
