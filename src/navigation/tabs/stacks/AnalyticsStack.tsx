import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';

import { useLazyMeQuery } from '../../../services/api/authApi';
export default function Analytics() {
  const [triggerMe] = useLazyMeQuery();

  const testMe = async () => {
    try {
      const res = await triggerMe().unwrap();
      console.log('/auth/me success:', res);
    } catch (err) {
      console.log('/auth/me error:', JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Pressable onPress={testMe}>
          <Text>Test Me API</Text>
        </Pressable>
        {/* <Text style={styles.title}>Analytics</Text>
        <Text style={styles.sub}>Stats & insights (stub)</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#111827' },
  sub: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
});
