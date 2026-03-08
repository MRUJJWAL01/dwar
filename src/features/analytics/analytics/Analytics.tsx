import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLazyMeQuery } from '../../../services/api/authApi';

const [triggerMe] = useLazyMeQuery();

export default function Analytics() {
  const testMe = async () => {
    try {
      const res = await triggerMe().unwrap();
      console.log('/auth/me success:', res);
    } catch (err) {
      console.log('/auth/me error:', JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Analytics</Text> */}
      <Pressable onPress={testMe}>
        <Text>Test Me API</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
});
