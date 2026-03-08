import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
};

export default function SuccessModal({
  visible,
  title = 'Success',
  message,
  buttonText = 'OK',
  onClose,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* icon */}
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>✓</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <Pressable style={styles.btn} onPress={onClose}>
          <Text style={styles.btnText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: { color: '#22C55E', fontSize: 28, fontWeight: '900' },

  title: { fontSize: 14, fontWeight: '900', color: '#111827' },
  message: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },

  btn: {
    marginTop: 16,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    alignSelf: 'stretch',
  },
  btnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 12, textAlign: 'center' },
});