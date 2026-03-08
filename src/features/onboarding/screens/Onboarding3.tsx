import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding3'>;

export default function Onboarding3({ navigation }: Props) {
  const goNext = () => navigation.navigate('Onboarding4');
  const skip = () => navigation.replace('Login');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top Logo */}
        <View style={styles.logoRow}>
          {/* If you have real logo icon, replace with Image */}
          <View style={styles.logoIcon} />
          <Text style={styles.logoText}>Dvaari</Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroWrap}>
          <Image
            source={require('../../../assets/images/onboarding3.png')}
            style={styles.hero}
            resizeMode="cover"
          />
        </View>

        {/* Dots (3rd active) */}
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        {/* Title + Subtitle */}
        <Text style={styles.title}>Family Connected</Text>
        <Text style={styles.subtitle}>
          Everyone in your household stays in the loop. Manage access, track
          deliveries, and coordinate seamlessly.
        </Text>

        {/* Buttons */}
        <View style={styles.btnArea}>
          <Pressable style={styles.primaryBtn} onPress={goNext}>
            <Text style={styles.primaryBtnText}>Next</Text>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={skip}>
            <Text style={styles.secondaryBtnText}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 6,
  },

  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 6,
    marginBottom: 12,
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#2563EB', // placeholder
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },

  heroWrap: {
    alignItems: 'center',
    marginTop: 10,
  },
  hero: {
    width: '92%',
    height: 290,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
  },
  dot: {
    width: 22,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#2563EB',
  },

  title: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#4B5563',
    paddingHorizontal: 14,
  },

  btnArea: {
    marginTop: 'auto',
    paddingBottom: 18,
    gap: 12,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
});