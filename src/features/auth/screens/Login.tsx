import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRequestOtpMutation } from '../../../services/api/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// Strict validators
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Exact format: +91 followed by 10 digits
// Example valid: +919826594326
const PHONE_REGEX = /^\+91[6-9]\d{9}$/;

export default function Login({ navigation }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const [requestOtp, { isLoading }] = useRequestOtpMutation();

  const trimmedValue = useMemo(() => value.trim(), [value]);

  const isEmail = useMemo(() => EMAIL_REGEX.test(trimmedValue), [trimmedValue]);
  const isPhone = useMemo(() => PHONE_REGEX.test(trimmedValue), [trimmedValue]);

  const isValid = isEmail || isPhone;

  const validationMessage = useMemo(() => {
    if (!trimmedValue) return '';

    if (trimmedValue.includes('@')) {
      return isEmail ? '' : 'Please enter a valid email address.';
    }

    if (trimmedValue.startsWith('+91') || trimmedValue.startsWith('+')) {
      return isPhone ? '' : 'Phone number must have 10 digits.';
    }

    return 'Enter a valid email or phone number';
  }, [trimmedValue, isEmail, isPhone]);

  const onChangeValue = (text: string) => {
    setError(undefined);

    // Prevent spaces at start and remove internal spaces for phone-like input
    let next = text.replace(/\s/g, '');

    // If user is typing phone, allow only + and digits
    const looksLikePhone = next.startsWith('+') || /^\d+$/.test(next);

    if (looksLikePhone) {
      next = next.replace(/[^+\d]/g, '');

      // // only one + allowed and only at first position
      if (next.includes('+')) {
        next = '+' + next.replace(/\+/g, '').replace(/^\+/, '');
      }

      // force +91 prefix if user starts typing number
      if (/^\d/.test(next)) {
        next = `+91${next}`;
      }

      // //if starts with + but not +91, keep only +91

      // if (next.startsWith('+') && !next.startsWith('+91')) {
      //   const digitsOnly = next.replace(/[^\d]/g, '');
      //   if (digitsOnly.startsWith('91')) {
      //     next = `+${digitsOnly}`;
      //   } else {
      //     next = `+91${digitsOnly}`;
      //   }
      // }

      // max length of +91 + 10 digits = 13 chars
      next = next.slice(0, 14);
    }

    setValue(next);
  };

  const onSend = async () => {
    setError(undefined);

    if (!trimmedValue) {
      setError('Please enter email or phone number.');
      return;
    }

    if (!isValid || isLoading) {
      setError(
        trimmedValue.includes('@')
          ? 'Please enter a valid email address.'
          : 'Phone number must have 10 digits.',
      );
      return;
    }

    try {
      const response = await requestOtp({ identifier: trimmedValue }).unwrap();

      if (!response?.ok) {
        setError('Could not send verification code. Please try again.');
        return;
      }

      navigation.navigate('Otp', {
        destination: trimmedValue,
        via: isEmail ? 'email' : 'phone',
        flow: 'login',
      });
    } catch (err: any) {
      const apiMessage =
        err?.data?.message ||
        err?.error ||
        'Something went wrong. Please try again.';
      setError(apiMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
    
        <ImageBackground
          source={require('../../../assets/images/auth/bg.png')}
          style={styles.header}
        
        >
          
            <Text style={styles.hello}>Hello!</Text>
            <Text style={styles.subHello}>
              Securely log in with your email{'\n'}or mobile number
            </Text>
        </ImageBackground>
      

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>

          <Text style={styles.label}>Login</Text>

          <TextInput
            value={value}
            onChangeText={onChangeValue}
            placeholder="Enter email or phone number"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.hint}>We'll send you a verification code</Text>

          {!!validationMessage && !error && (
            <Text style={styles.errorText}>{validationMessage}</Text>
          )}

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            onPress={onSend}
            disabled={!isValid || isLoading}
            style={({ pressed }) => [
              styles.primaryBtn,
              (!isValid || isLoading) && styles.primaryBtnDisabled,
              pressed && isValid && !isLoading
                ? styles.primaryBtnPressed
                : null,
            ]}
          >
            <Text style={styles.primaryBtnText}>
              {isLoading ? 'Please wait...' : 'Send Verification Code'}
            </Text>
          </Pressable>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Don’t have account?</Text>
            <Pressable onPress={() => navigation.replace('Signup')}>
              <Text style={styles.signupLink}> Sign up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  

  header: {
    height: 286,
    backgroundColor: '#0B4FB3',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 120 : 133,
    justifyContent: 'flex-start',
  },
  hello: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 26,
    fontWeight: '600',
    marginBottom: 14,
  },
  subHello: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 18,
    paddingTop: 40,
  },

  cardTitle: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '500',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 32,
  },

  label: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
    color: '#111111',
    marginBottom: 8,
    fontWeight: '500',
  },

  input: {
    height: 44,
    width: 350,
    paddingVertical: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '500',
    borderColor: '#E6E6E6',
    paddingHorizontal: 12,
    color: '#1F1F1F',

    backgroundColor: '#FFFFFF',
  },

  hint: {
    fontSize: 16,
    lineHeight: 16,
    color: '#666666',
    letterSpacing: -0.5,
    marginTop: 8,
    fontWeight: '400',
    marginBottom: 0,
  },

  errorText: {
    marginTop: 5,
    color: '#EA8080',
    fontSize: 12,
    fontWeight: '600',
  },

  primaryBtn: {
    marginTop: 40,
    height: 48,
    width: 350,
    borderRadius: 8,
    backgroundColor: '#2362EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: '#81A5F3',
  },
  primaryBtnPressed: {
    opacity: 0.9,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: -0.5,
  },

  bottomRow: {
    marginTop: 163,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#6B7280',
    fontSize: 16,
    lineHeight: 16,
  },
  signupLink: {
    color: '#1146BB',
    fontSize: 16,
    fontWeight: '500',
  },
});
