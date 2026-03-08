import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../../navigation/tabs/stacks/SettingsStack';
import BlueHeader from '../../../components/layout/BlueHeader';

type Props = NativeStackScreenProps<SettingsStackParamList, 'EditProfile'>;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? '';
  const b = parts[1]?.[0] ?? '';
  return (a + b).toUpperCase();
}

// mock submit (later API)
async function mockUpdateProfile(_: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}) {
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}

export default function EditProfile({ navigation }: Props) {
  // later: load from API/store
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState(
    'Flat 301, Green Valley Apartments,\nWhitefield, Bangalore - 560066',
  );

  const [loading, setLoading] = useState(false);

  const initials = useMemo(() => getInitials(fullName), [fullName]);

  const onChangePhoto = () => {
    // later: image picker + upload
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await mockUpdateProfile({ fullName, email, phone, address });
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BlueHeader title="Edit profile" onBackPress={() => navigation.goBack()} large={false} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>

              {/* camera badge */}
              <Pressable onPress={onChangePhoto} hitSlop={10} style={styles.cameraBadge}>
                <Text style={styles.cameraText}>📷</Text>
              </Pressable>
            </View>

            <Pressable onPress={onChangePhoto}>
              <Text style={styles.changePhoto}>Change Photo</Text>
            </Pressable>
          </View>

          {/* Form */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            returnKeyType="next"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            returnKeyType="next"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[styles.input, styles.inputMultiline]}
            placeholder="Address"
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />

          <View style={{ height: 90 }} />
        </ScrollView>

        {/* Bottom Confirm button */}
        <View style={styles.bottomBar}>
          <Pressable
            style={[styles.confirmBtn, loading && styles.confirmDisabled]}
            onPress={onSubmit}
            disabled={loading}
          >
            <Text style={styles.confirmText}>{loading ? 'Saving...' : 'Confirm'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
  },

  avatarWrap: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 18,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: '#4F7DF0', // close to screenshot blue circle
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: { color: '#FFFFFF', fontSize: 34, fontWeight: '900' },

  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: 8,
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#2563EB',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: { color: '#FFFFFF', fontSize: 14 },

  changePhoto: {
    marginTop: 12,
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '800',
  },

  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  input: {
    height: 62,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  inputMultiline: {
    height: 120,
    paddingTop: 16,
    paddingBottom: 16,
  },

  bottomBar: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  confirmBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDisabled: { backgroundColor: '#9BB7F0' },
  confirmText: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
});