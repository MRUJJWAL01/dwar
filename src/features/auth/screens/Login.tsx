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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRequestOtpMutation } from '../../../services/api/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const [requestOtp, { isLoading }] = useRequestOtpMutation();

  const isValid = useMemo(() => {
    const v = value.trim();
    if (!v) return false;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isPhone = /^[0-9+\-()\s]{8,}$/.test(v);
    return isEmail || isPhone;
  }, [value]);

  const onSend = async () => {
    setError(undefined);
    if (!isValid || isLoading) return;

    const identifier = value.trim();

    try {
      const response = await requestOtp({ identifier }).unwrap();

      if (!response?.ok) {
        setError('Could not send verification code. Please try again.');
        return;
      }

      navigation.navigate('Otp', {
        destination: identifier,
        via: identifier.includes('@') ? 'email' : 'phone',
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
        <View style={styles.header}>
          <Text style={styles.hello}>Hello!</Text>
          <Text style={styles.subHello}>
            Securely log in with your email{'\n'}or mobile number
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>

          <Text style={styles.label}>Login</Text>

          <TextInput
            value={value}
            onChangeText={text => {
              setValue(text);
              setError(undefined);
            }}
            placeholder="Enter email or phone number"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.hint}>We’ll send you a verification code</Text>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            onPress={onSend}
            disabled={!isValid || isLoading}
            style={({ pressed }) => [
              styles.primaryBtn,
              (!isValid || isLoading) && styles.primaryBtnDisabled,
              pressed && isValid && !isLoading ? styles.primaryBtnPressed : null,
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
    height: 190,
    backgroundColor: '#0B4FB3',
    paddingHorizontal: 18,
    paddingTop: 26,
    justifyContent: 'flex-start',
  },
  hello: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  subHello: {
    color: '#E5E7EB',
    fontSize: 13,
    lineHeight: 18,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -40,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '600',
  },

  input: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  hint: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 10,
  },

  errorText: {
    marginBottom: 10,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },

  primaryBtn: {
    height: 42,
    borderRadius: 10,
    backgroundColor: '#2D6CDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: '#9BB7F0',
  },
  primaryBtnPressed: {
    opacity: 0.9,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  bottomRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#6B7280',
    fontSize: 12,
  },
  signupLink: {
    color: '#2D6CDF',
    fontSize: 12,
    fontWeight: '700',
  },
});