import React, { useState } from 'react';
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
import { onboardingData } from './onboardingData';
import { setOnboardingCompleted } from '../../../services/storage/tokenStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function Onboarding({ navigation }: Props) {

  const [index, setIndex] = useState(0);

  const slide = onboardingData[index];
  const isLast = index === onboardingData.length - 1;

  const goNext = () => {
    if (!isLast) {
      setIndex(prev => prev + 1);
    }
  };

  const skip = async () => {
    await setOnboardingCompleted(true);
    navigation.replace('Signup');
  };

  const goLogin = async () => {
    await setOnboardingCompleted(true);
    navigation.replace('Login');
  };

  const goSignup = async () => {
    await setOnboardingCompleted(true);
    navigation.replace('Signup');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.logoRow}>
          <Image
            style={styles.logoIcon}
            source={require('../../../assets/images/logo2.png')}
            resizeMode="contain"
          />
        </View>

        {/* Hero Image */}
        <View style={styles.heroWrap}>
          <Image source={slide.image} style={styles.hero} resizeMode="cover" />
        </View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {onboardingData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Title */}
        <Text style={styles.title}>{slide.title}</Text>

        {/* Description */}
        <Text style={styles.subtitle}>{slide.description}</Text>

        {/* Buttons */}
        <View style={styles.btnArea}>

          {!isLast ? (
            <>
              <Pressable style={styles.primaryBtn} onPress={goNext}>
                <Text style={styles.primaryBtnText}>Next</Text>
              </Pressable>

              <Pressable style={styles.secondaryBtn} onPress={skip}>
                <Text style={styles.secondaryBtnText}>Skip</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={styles.primaryBtn} onPress={goLogin}>
                <Text style={styles.primaryBtnText}>Log In</Text>
              </Pressable>

              <Pressable style={styles.secondaryBtn} onPress={goSignup}>
                <Text style={styles.secondaryBtnText}>Sign Up</Text>
              </Pressable>
            </>
          )}

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 77,
  },

  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  logoIcon: {
    width: 132,
    height: 40,
  },
  heroWrap: {
    alignItems: 'center',
    marginTop: 18,
  },

  hero: {
    width: 320,
    height: 320,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 48,
  },

  dot: {
    width: 12,
    height: 3,
    borderRadius: 999,
    backgroundColor: '#B3B3B3',
  },

  dotActive: {
    backgroundColor: '#2362Eb',
  },

  title: {
    textAlign: 'center',
    marginTop: 21,
    fontSize: 24,
    fontWeight: '700',
    lineHeight:24,
    color: '#111111',
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
    paddingHorizontal:5,
  },

  btnArea: {
    marginTop: 31,
    paddingBottom: 68,
    gap: 12,
  },

  primaryBtn: {
    height: 44,
    width:350,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:12,
    borderRadius:8,
    paddingRight:12,
    backgroundColor: '#2362Eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    
    fontWeight: '700',
  },

  secondaryBtn: {
    height: 44,
    width:350,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:12,
    borderRadius:8,
    paddingRight:12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryBtnText: {
    color: '#111827',
    fontSize: 16,
    lineHeight:24,
    letterSpacing:-0.5,
    fontWeight: '700',
  },

});