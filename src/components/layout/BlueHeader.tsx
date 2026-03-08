import React from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, Platform } from 'react-native';

type Props = {
  title: string;

  // optional back
  onBackPress?: () => void;

  // optional subtitle
  subtitle?: string;

  // optional right action
  right?: React.ReactNode;

  // optional: bigger header (default true as per your screenshots)
  large?: boolean;
};

export default function BlueHeader({
  title,
  subtitle,
  onBackPress,
  right,
  large = true,
}: Props) {
  return (
    <View style={[styles.header, large && styles.headerLarge]}>
      {/* match screenshot feel */}
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.row}>
        {onBackPress ? (
          <Pressable onPress={onBackPress} hitSlop={10} style={styles.backBtn}>
            <Text style={styles.backText}>{'‹'}</Text>
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.right}>{right ?? <View style={styles.backSpacer} />}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingTop: Platform.select({ ios: 10, android: 12 }),
    paddingBottom: 12,
  },

  // ✅ Bigger like your real screenshot
  headerLarge: {
    paddingTop: Platform.select({ ios: 16, android: 18 }),
    paddingBottom: 18,
  },

  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },

  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { color: '#FFFFFF', fontSize: 32, lineHeight: 32, fontWeight: '900' },
  backSpacer: { width: 34, height: 34 },

  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' }, // ✅ bigger title like screenshot
  subtitle: { marginTop: 4, color: '#DBEAFE', fontSize: 12, fontWeight: '700' },

  right: { minWidth: 34, alignItems: 'flex-end' },
});