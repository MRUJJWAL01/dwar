import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MembersStackParamList } from '../../../navigation/tabs/stacks/MembersStack';
import SuccessModal from '../../../components/modals/SuccessModal';

// MOCK (later API)
async function mockSendInvite(payload: { fullName: string; phone: string }) {
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}

type Props = NativeStackScreenProps<MembersStackParamList, 'AddMember'>;

export default function AddMember({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [successVisible, setSuccessVisible] = useState(false);

  const canSubmit = useMemo(() => {
    const n = fullName.trim().length >= 2;
    const digits = phone.replace(/\D/g, '');
    const p = digits.length >= 10;
    return n && p && !loading;
  }, [fullName, phone, loading]);

  const onClose = () => navigation.goBack();

  const onSubmit = async () => {
    setError(undefined);
    if (!canSubmit) return;

    try {
      setLoading(true);
      await mockSendInvite({ fullName: fullName.trim(), phone: phone.trim() });

      // ✅ show success
      setSuccessVisible(true);
    } catch (e) {
      setError('Could not send invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSuccessClose = () => {
    setSuccessVisible(false);
    navigation.goBack(); // close modal after success
  };

  return (
    <View style={styles.overlay}>
      {/* Tap outside to close */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centerWrap}
      >
        <View style={styles.card}>
          {/* Header row */}
          <View style={styles.cardHeader}>
            <Text style={styles.title}>Invite Family Member</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          {/* Full name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={(t) => {
              setFullName(t);
              setError(undefined);
            }}
            placeholder="Manasvi Rastogi"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />

          {/* Phone */}
          <Text style={[styles.label, { marginTop: 12 }]}>Phone number</Text>
          <TextInput
            value={phone}
            onChangeText={(t) => {
              setPhone(t);
              setError(undefined);
            }}
            placeholder="+91 xxxxxxxxxx"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            keyboardType={Platform.select({ ios: 'phone-pad', android: 'phone-pad' })}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />

          <Text style={styles.hint}>
            They&apos;ll receive an invite to download and{'\n'}register
          </Text>

          {!!error && <Text style={styles.error}>{error}</Text>}

          {/* CTA */}
          <Pressable
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            onPress={onSubmit}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? 'Sending...' : 'Send Invitation'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* ✅ Success popup */}
      <SuccessModal
        visible={successVisible}
        title="Invitation Sent"
        message="Invitation has been sent successfully."
        buttonText="OK"
        onClose={onSuccessClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  centerWrap: { justifyContent: 'center' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { fontSize: 14, fontWeight: '900', color: '#111827' },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 22, fontWeight: '900', color: '#111827', marginTop: -2 },

  label: { fontSize: 11, fontWeight: '800', color: '#111827', marginBottom: 6 },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  hint: {
    marginTop: 10,
    fontSize: 10,
    lineHeight: 16,
    color: '#6B7280',
    fontWeight: '600',
  },

  error: { marginTop: 10, color: '#DC2626', fontSize: 12, fontWeight: '700' },

  primaryBtn: {
    marginTop: 14,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: { backgroundColor: '#9BB7F0' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
});