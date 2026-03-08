import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.actions}>
          <Pressable style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>{cancelText}</Text>
          </Pressable>

          <Pressable style={styles.deleteBtn} onPress={onConfirm}>
            <Text style={styles.deleteText}>{confirmText}</Text>
          </Pressable>
        </View>
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
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },
  message: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
    gap: 10,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  cancelText: { fontWeight: '800', fontSize: 12 },

  deleteBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EF4444',
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
});