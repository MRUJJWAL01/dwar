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

function maskDestination(destination?: string) {
  if (!destination) return '';

  // EMAIL CASE
  if (destination.includes('@')) {
    const [user, domain] = destination.split('@');
    console.log(destination);
    

    if (!user) return destination;

    const maskedUser =
      user.length <= 2
        ? user[0] + '*'
        : user.slice(0, 2) + '*'.repeat(user.length - 2);

    return `${maskedUser}@${domain}`;
  }

  // PHONE CASE
  const digits = destination.replace(/\D/g, '');

  if (digits.length < 6) return destination;

  const country = digits.slice(0, 2);
  const rest = digits.slice(2);

  return `+${country} ${rest}`;
}

export default function Otp({ navigation, route }: Props) {
  const dispatch = useAppDispatch();

  const destination = route.params?.destination ?? '';
  const flow = route.params?.flow ?? 'login';

  const isSignupFlow = flow === 'signup';

  const [code, setCode] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const [secondsLeft, setSecondsLeft] = useState(30);

  const [verifyLoginOtp, { isLoading: loginLoading }] = useVerifyOtpMutation();

  const [verifySignupOtp, { isLoading: signupLoading }] =
    useDeviceRegistrationVerifyOtpMutation();

  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const verifying = loginLoading || signupLoading;

  useEffect(() => {
    setSecondsLeft(30);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const canSubmit = code.length === 4 && !verifying;

  const onVerify = async () => {
    setErr(undefined);

    try {
      const payload = { identifier: destination, code };
      console.log(payload);
      

      const response =
        flow === 'signup'
          ? await verifySignupOtp(payload).unwrap()
          : await verifyLoginOtp(payload).unwrap();

      await setTokens(response.accessToken, response.refreshToken);

      dispatch(
        authActions.signedIn({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        }),
      );

      navigation.reset({
        index: 0,
        routes: [{ name: flow === 'signup' ? 'AccountVerified' : 'MainTabs' }],
      });
    } catch (e: any) {
      setErr(e?.data?.message || 'Invalid OTP');
    }
  };

  const onResend = async () => {
    try {
      await resendOtp({ identifier: destination }).unwrap();
      setSecondsLeft(30);
      setCode('');
    } catch {
      setErr('Could not resend OTP');
    }
  };

  const title = isSignupFlow ? 'Verify Your Account' : 'verify code';

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
        </View>

        <View style={styles.container}>
          <Text style={[styles.title, isSignupFlow && styles.signupTitle]}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            Enter the code we just sent to{'\n'}
            <Text style={styles.phoneText}>{maskDestination(destination)}</Text>
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
              activeColor={isSignupFlow ? '#2362EB' : '#2362EB'}
            />
          </View>

          <Pressable
            onPress={onVerify}
            disabled={!canSubmit}
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
          >
            <Text style={styles.primaryBtnText}>
              {verifying ? 'Please wait...' : 'Enter Verification Code'}
            </Text>
          </Pressable>

          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>Didn’t get OTP </Text>

            {secondsLeft === 0 ? (
              <Pressable onPress={onResend}>
                <Text style={styles.resendLink}>
                  {resendLoading ? 'Sending...' : 'Resend code'}
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
    paddingTop: 40,
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    //   
  },

  backIcon: {
    fontSize: 24,
    color: '#666666',
    textAlign:'center',
    paddingTop:1/2
  },

  container: {
    flex: 1,
    paddingHorizontal: 67,
    paddingTop: 60,
  },

  title: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
    color: '#111827',
  },

  signupTitle: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
    color: '#111827',
  },

  subtitle: {
    marginTop: 11,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
    textAlign: 'center',
    color: '#333333',
  },

  phoneText: {
    color: '#333333',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
  },

  otpWrap: {
    marginTop: 38,
    marginBottom: 41,

  },
 

  primaryBtn: {
    width: 256,
    height: 44,
    paddingVertical:10,
    paddingHorizontal:12,
    borderRadius: 8,
    backgroundColor: '#2362EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnDisabled: {
    backgroundColor: '#81A5F3',
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight:24,
    letterSpacing:-0.5,
    fontWeight: '500',
  },

  resendRow: {
    marginTop: 12,
    
    flexDirection: 'row',
     alignItems: 'center',
    justifyContent: 'center',
  },

  resendLabel: {
    fontSize: 14,
    
    color: '#1F1F1F',
  },

  resendLink: {
    
    fontSize: 14,
    color: '#2362EB',
    fontWeight: '600',
  },

  resendTimer: {
    fontSize: 14,
    lineHeight:14,
    color: '#9CA3AF',
  },
});
