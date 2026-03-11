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

  return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
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
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>{'←'}</Text>
          </Pressable>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Verify Your Account</Text>

          <Text style={styles.subtitle}>
            Enter the code we just sent to{'\n'}
            <Text style={styles.phoneText}>{maskDestination(destination, via)}</Text>
          </Text>

          <View style={styles.otpWrap}>
            <OtpInput
              length={4}
              value={code}
              onChange={v => {
                setCode(v);
                setErr(undefined);
              }}
              errorText={err}
            />
          </View>

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
            <Text style={styles.resendLabel}>Didn’t get OTP </Text>

            {canResend ? (
              <Pressable onPress={onResend}>
                <Text style={styles.resendLink}>
                  {isResending ? 'Sending...' : 'Resend code'}
                </Text>
              </Pressable>
            ) : (
              <Text style={styles.resendTimer}>Resend in {secondsLeft}s</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topBar: {
    paddingHorizontal: 20,
    paddingTop: 50,
    height: 64,
    justifyContent: 'center',
  },

  backBtn: {
    width: 64,
    backgroundColor: '#F1F1F1',
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 40,
    color: '#4B5563',
    marginTop: -14,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 70,
  },

  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 28,
    fontSize: 17,
    lineHeight: 30,
    color: '#4B4B4B',
    textAlign: 'center',
    fontWeight: '400',
  },

  phoneText: {
    fontSize: 18,
    lineHeight: 32,
    color: '#2F2F2F',
    fontWeight: '500',
  },

  otpWrap: {
    marginTop: 62,
    width: '100%',
    alignItems: 'center',
    marginBottom: 54,
  },

  primaryBtn: {
    width: '100%',
    height: 58,
    borderRadius: 14,
    backgroundColor: '#2F67E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnDisabled: {
    backgroundColor: '#9BB6F5',
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },

  resendRow: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  resendLabel: {
    fontSize: 16,
    color: '#2F2F2F',
    fontWeight: '400',
  },

  resendLink: {
    fontSize: 16,
    color: '#3D73E3',
    fontWeight: '500',
  },

  resendTimer: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
});