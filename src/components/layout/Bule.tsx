import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  large?: boolean;
  right?: React.ReactNode;
};

export default function BlueHeader({
  title,
  subtitle,
  onBackPress,
  large = true,
  right,
}: Props) {
  return (
    <View style={[styles.header, large && styles.headerLarge]}>
      <View style={styles.row}>
        {onBackPress ? (
          <Pressable onPress={onBackPress} hitSlop={10} style={styles.backBtn}>
            <Text style={styles.backText}>{'←'}</Text>
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}

        <View style={styles.center}>
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
    backgroundColor: '#2362EB',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 12,
    paddingBottom: 12,
  },

  headerLarge: {
    paddingTop: Platform.OS === 'ios' ? 16 : 18,
    paddingBottom: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  backSpacer: {
    width: 34,
    height: 34,
  },

  center: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: 4,
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },

  right: {
    minWidth: 34,
    alignItems: 'flex-end',
  },
});