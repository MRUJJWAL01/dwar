import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/RootNavigator';
import OtpInput from '../../../components/ui/OtpInput';
import {
  useDeviceRegistrationVerifyOtpMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '../../../services/api/authApi';
import { useAppDispatch } from '../../../store/hooks';
import { authActions } from '../../../store/slices/authSlice';
import { setTokens } from '../../../services/storage/tokenStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

function maskDestination(destination?: string, via?: 'phone' | 'email') {
  if (!destination) return '';

  if (via === 'email' || destination.includes('@')) {
    const [u, d] = destination.split('@');
    const maskedU = u.length <= 2 ? `${u[0]}*` : `${u.slice(0, 2)}***`;
    return `${maskedU}@${d}`;
  }

  const digits = destination.replace(/\D/g, '');
  if (digits.length <= 4) return destination;

  return `+${digits.slice(0, 2)} ${'*'.repeat(
    Math.max(0, digits.length - 6),
  )}${digits.slice(-4)}`;
}

export default function Otp({ navigation, route }: Props) {
  const dispatch = useAppDispatch();

  const destination = route.params?.destination ?? '';
  const via =
    route.params?.via ?? (destination.includes('@') ? 'email' : 'phone');
  const flow = route.params?.flow ?? 'login';

  const [code, setCode] = useState('');
  const [err, setErr] = useState<string | undefined>(undefined);
  const [secondsLeft, setSecondsLeft] = useState(30);

  const [verifyLoginOtp, { isLoading: isLoginVerifying }] =
    useVerifyOtpMutation();
  const [verifySignupOtp, { isLoading: isSignupVerifying }] =
    useDeviceRegistrationVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const verifying = isLoginVerifying || isSignupVerifying;
  const loading = verifying || isResending;

  useEffect(() => {
    setSecondsLeft(30);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const canSubmit = useMemo(
    () => code.length === 4 && !verifying,
    [code, verifying],
  );

  const canResend = useMemo(
    () => secondsLeft <= 0 && !loading,
    [secondsLeft, loading],
  );

  const onVerify = async () => {
    setErr(undefined);

    if (!canSubmit) return;
    if (!destination) {
      setErr('Missing identifier. Please try again.');
      return;
    }

    try {
      const payload = {
        identifier: destination,
        code,
      };

      const response =
        flow === 'signup'
          ? await verifySignupOtp(payload).unwrap()
          : await verifyLoginOtp(payload).unwrap();

      if (
        !response?.ok ||
        !response.accessToken ||
        !response.refreshToken ||
        !response.user
      ) {
        setErr('Verification failed. Please try again.');
        return;
      }

      await setTokens(response.accessToken, response.refreshToken);

      dispatch(
        authActions.signedIn({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        }),
      );

      if (flow === 'signup') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AccountVerified' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    } catch (e: any) {
      const apiMessage =
        e?.data?.message || e?.error || 'Invalid OTP. Please try again.';
      setErr(apiMessage);
    }
  };

  const onResend = async () => {
    if (!canResend) return;
    if (!destination) {
      setErr('Missing identifier. Please try again.');
      return;
    }

    setErr(undefined);

    try {
      const response = await resendOtp({ identifier: destination }).unwrap();

      if (!response?.ok) {
        setErr('Could not resend OTP. Please try again.');
        return;
      }

      setCode('');
      setSecondsLeft(30);
    } catch (e: any) {
      const apiMessage =
        e?.data?.message ||
        e?.error ||
        'Could not resend OTP. Please try again.';
      setErr(apiMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.back}>{'‹'}</Text>
          </Pressable>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Verify Code</Text>

          <Text style={styles.subtitle}>
            Enter the code we just sent to{'\n'}
            <Text style={styles.dest}>{maskDestination(destination, via)}</Text>
          </Text>

          <View style={{ height: 18 }} />

          <OtpInput
            length={4}
            value={code}
            onChange={v => {
              setCode(v);
              setErr(undefined);
            }}
            errorText={err}
          />

          <View style={{ height: 18 }} />

          <Pressable
            onPress={onVerify}
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            disabled={!canSubmit}
          >
            <Text style={styles.primaryBtnText}>
              {verifying ? 'Please wait...' : 'Enter Verification Code'}
            </Text>
          </Pressable>

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn’t get OTP </Text>

            {canResend ? (
              <Pressable onPress={onResend}>
                <Text style={styles.resendLink}>
                  {isResending ? 'Sending...' : 'Resend code'}
                </Text>
              </Pressable>
            ) : (
              <Text style={styles.timerText}>Resend in {secondsLeft}s</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  topBar: {
    height: 44,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  back: {
    fontSize: 28,
    color: '#111827',
    lineHeight: 28,
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
    alignItems: 'center',
    paddingTop: 10,
  },

  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  dest: { fontWeight: '700', color: '#111827' },

  primaryBtn: {
    width: '86%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: '#9BB7F0',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  resendRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: { fontSize: 12, color: '#6B7280' },
  resendLink: { fontSize: 12, color: '#2563EB', fontWeight: '700' },
  timerText: { fontSize: 12, color: '#6B7280', fontWeight: '700' },
});
