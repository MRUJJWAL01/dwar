import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../../navigation/tabs/stacks/SettingsStack';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Profile'>;

export default function Profile({ navigation }: Props) {
  // later: fetch from API/store
  const user = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 98xxxxxx12',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <Text style={styles.backText}>{'‹'}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()}</Text>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.meta}>{user.email}</Text>
          <Text style={styles.meta}>{user.phone}</Text>

          <Pressable style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Edit Profile (later)</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },

  header: {
    height: 52,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#FFFFFF', fontSize: 28, lineHeight: 28, fontWeight: '900' },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },

  body: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  avatar: { width: 72, height: 72, borderRadius: 999, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#2563EB', fontWeight: '900', fontSize: 18 },
  name: { marginTop: 10, fontSize: 14, fontWeight: '900', color: '#111827' },
  meta: { marginTop: 4, fontSize: 11, fontWeight: '700', color: '#6B7280' },

  btn: { marginTop: 14, height: 44, borderRadius: 10, backgroundColor: '#2563EB', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 12 },
});