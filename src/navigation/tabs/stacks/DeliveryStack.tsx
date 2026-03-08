 import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function Delivery() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Delivery</Text>
        <Text style={styles.sub}>Delivery access & history (stub)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 20, fontWeight: '800', color: '#111827' },
  sub: { marginTop: 6, fontSize: 12, fontWeight: '600', color: '#6B7280', textAlign: 'center' },
});