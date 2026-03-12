import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { useDeviceRegistrationRequestOtpMutation } from '../../../services/api/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^\+91[6-9]\d{9}$/;
const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

export default function Signup({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91');
  const [error, setError] = useState<string | undefined>(undefined);

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [requestSignupOtp, { isLoading }] =
    useDeviceRegistrationRequestOtpMutation();

  const cleanedName = useMemo(() => name.trim(), [name]);
  const cleanedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  // API ke liye no-space phone
  const cleanedPhone = useMemo(() => phone.replace(/\s/g, '').trim(), [phone]);

  const nameOk = useMemo(() => {
    if (!cleanedName) return false;
    if (cleanedName.length < 2) return false;
    return NAME_REGEX.test(cleanedName);
  }, [cleanedName]);

  const emailOk = useMemo(() => {
    if (!cleanedEmail) return false;
    return EMAIL_REGEX.test(cleanedEmail);
  }, [cleanedEmail]);

  const phoneOk = useMemo(() => {
    if (!cleanedPhone) return false;
    return PHONE_REGEX.test(cleanedPhone);
  }, [cleanedPhone]);

  const canSubmit = useMemo(
    () => nameOk && emailOk && phoneOk && !isLoading,
    [nameOk, emailOk, phoneOk, isLoading],
  );

  const handleNameChange = (text: string) => {
    setError(undefined);

    let next = text.replace(/[^A-Za-z ]/g, '');
    next = next.replace(/\s{2,}/g, ' ');
    next = next.replace(/^\s+/, '');

    setName(next);
  };

  const handleEmailChange = (text: string) => {
    setError(undefined);
    const next = text.replace(/\s/g, '');
    setEmail(next);
  };

  const handlePhoneChange = (text: string) => {
    setError(undefined);

    // only digits
    let digits = text.replace(/\D/g, '');

    // remove country code if user typed it
    if (digits.startsWith('91')) {
      digits = digits.slice(2);
    }

    digits = digits.slice(0, 10);

    // UI me +91 aur digits ke beech space
    setPhone(digits.length > 0 ? `+91 ${digits}` : '+91 ');
  };

  const onSubmit = async () => {
    setError(undefined);

    setNameTouched(true);
    setEmailTouched(true);
    setPhoneTouched(true);

    if (!nameOk) {
      setError(
        'Name should contain only letters and spaces. Numbers or special characters are not allowed.',
      );
      return;
    }

    if (!emailOk) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!phoneOk) {
      setError('Phone number must be in +91XXXXXXXXXX format.');
      return;
    }

    if (isLoading) return;

    try {
      const payload = {
        name: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone, // +91XXXXXXXXXX
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
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0A39C9" />
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={require('../../../assets/images/auth/bg.png')}
            style={styles.topSection}
          >
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSub}>
              Register your account today using a{'\n'}valid email or mobile
            </Text>
          </ImageBackground>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Device Registration</Text>

            <View style={styles.formBlock}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={handleNameChange}
                onFocus={() => setNameTouched(true)}
                onBlur={() => setNameTouched(true)}
                placeholder="Enter your name"
                placeholderTextColor="#666666"
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                maxLength={50}
              />
              {nameTouched && !!name && !nameOk && (
                <Text style={styles.errorText}>
                  Name can contain only letters and single spaces.
                </Text>
              )}

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                onFocus={() => setEmailTouched(true)}
                onBlur={() => setEmailTouched(true)}
                placeholder="Enter your email address"
                placeholderTextColor="#666666"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
              />
              {emailTouched && !!email && !emailOk && (
                <Text style={styles.errorText}>
                  Please enter a valid email address.
                </Text>
              )}

              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                value={phone}
                onChangeText={handlePhoneChange}
                onFocus={() => {
                  setPhoneTouched(true);
                  if (phone === '+91') {
                    setPhone('+91');
                  }
                }}
                onBlur={() => setPhoneTouched(true)}
                placeholder="+91 9876543210"
                placeholderTextColor="#666666"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={Platform.select({
                  ios: 'phone-pad',
                  android: 'phone-pad',
                })}
                returnKeyType="done"
                maxLength={14}
              />
              {phoneTouched && cleanedPhone.length > 3 && !phoneOk && (
                <Text style={styles.errorText}>
                  Phone number must have 10 digits.
                </Text>
              )}

              {!!error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <View
              style={[
                styles.bottomArea,
                { paddingBottom: Math.max(insets.bottom, 12) },
              ]}
            >
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
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    flexGrow: 1,
  },

  topSection: {
    height: 220,
    backgroundColor: '#0A39C9',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 76 : 89,
    justifyContent: 'flex-start',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 26,
    fontWeight: '600',
    marginBottom: 14,
  },

  headerSub: {
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'flex-start',
  },

  cardTitle: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '500',
    color: '#111111',
    marginBottom: 32,
  },

  formBlock: {
    gap: 6,
  },

  label: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
    color: '#111111',
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 44,
    width: 350,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#1F1F1F',
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
  },

  errorText: {
    marginBottom: 6,
    color: '#EA8080',
    fontSize: 12,
    fontWeight: '600',
  },

  bottomArea: {
    paddingTop: 14,
  },

  primaryBtn: {
    marginTop: 40,
    width: 350,
    height: 48,
    padding: 12,
    borderRadius:8,
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
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '500',
  },

  footerRow: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },

  footerLink: {
    color: '#184FBF',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
  },
});
