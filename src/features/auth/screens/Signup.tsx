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
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { useDeviceRegistrationRequestOtpMutation } from '../../../services/api/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function Signup({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const [requestSignupOtp, { isLoading }] =
    useDeviceRegistrationRequestOtpMutation();

  const emailOk = useMemo(() => {
    const v = email.trim();
    if (!v) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const phoneOk = useMemo(() => {
    const v = phone.trim();
    if (!v) return false;
    const digits = v.replace(/\D/g, '');
    return digits.length >= 10;
  }, [phone]);

  const nameOk = useMemo(() => name.trim().length >= 2, [name]);

  const canSubmit = useMemo(
    () => nameOk && emailOk && phoneOk && !isLoading,
    [nameOk, emailOk, phoneOk, isLoading],
  );

  const onSubmit = async () => {
    setError(undefined);
    if (!canSubmit) return;

    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      };

      const response = await requestSignupOtp(payload).unwrap();

      if (!response?.ok) {
        setError('Could not send verification code. Please try again.');
        return;
      }

      navigation.navigate('Otp', {
        destination: payload.phone,
        via: 'phone',
        flow: 'signup',
      });
    } catch (err: any) {
      const apiMessage =
        err?.data?.message ||
        err?.error ||
        'Something went wrong. Please try again.';
        console.log(apiMessage);
        
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
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSub}>
            Register your account today a using a{'\n'}valid email or mobile
          </Text>
        </View>

        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.cardContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.cardTitle}>Device Registration</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={t => {
                setName(t);
                setError(undefined);
              }}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={t => {
                setEmail(t);
                setError(undefined);
              }}
              placeholder="Enter email address"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Mobile Number</Text>
            <TextInput
              value={phone}
              onChangeText={t => {
                setPhone(t);
                setError(undefined);
              }}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={Platform.select({
                ios: 'phone-pad',
                android: 'phone-pad',
              })}
              returnKeyType="done"
            />

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <Pressable
              onPress={onSubmit}
              style={[
                styles.primaryBtn,
                !canSubmit && styles.primaryBtnDisabled,
              ]}
              disabled={!canSubmit}
            >
              <Text style={styles.primaryBtnText}>
                {isLoading ? 'Please wait...' : 'Send Verification Code'}
              </Text>
            </Pressable>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Pressable onPress={() => navigation.replace('Login')}>
                <Text style={styles.footerLink}> Sign In</Text>
              </Pressable>
            </View>
          </ScrollView>
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
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  headerSub: {
    color: '#E5E7EB',
    fontSize: 12,
    lineHeight: 18,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -40,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: 'hidden',
  },
  cardContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
  },

  cardTitle: {
    fontSize: 16,
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

  errorText: {
    marginTop: 10,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },

  primaryBtn: {
    marginTop: 14,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#2D6CDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: '#9BB7F0',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  footerRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 12,
  },
  footerLink: {
    color: '#2D6CDF',
    fontSize: 12,
    fontWeight: '800',
  },
});