import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Image,
} from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  right?: React.ReactNode;

  // existing behavior
  large?: boolean;

  // new: use for detail screens like recordings/security
  compact?: boolean;
};

export default function BlueHeader({
  title,
  subtitle,
  onBackPress,
  right,
  large = true,
  compact = false,
}: Props) {
  const useLarge = large && !compact;

  return (
    <View
      style={[
        styles.header,
        useLarge ? styles.headerLarge : styles.headerCompact,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.row}>
        {onBackPress ? (
          <Pressable onPress={onBackPress} hitSlop={10} style={styles.backBtn}>
            <Image
              source={require('../../assets/icons/recordings/backButton.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}

        <View style={styles.center}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              compact ? styles.titleCompact : styles.titleLarge,
            ]}
          >
            {title}
          </Text>

          {!!subtitle && (
            <Text
              numberOfLines={2}
              style={[styles.subtitle, compact && styles.subtitleCompact]}
            >
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.right}>
          {right ?? <View style={styles.backSpacer} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
  },

  // existing big header screens
  headerLarge: {
    paddingTop: Platform.select({ ios: 78, android: 80 }),
    paddingBottom: 18,
  },

  // detail screens with back button
  headerCompact: {
    paddingTop: Platform.select({ ios: 52, android: 50 }),
    paddingBottom: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  backTextCompact: {
    fontSize: 26,
    lineHeight: 26,
  },

  backSpacer: {
    width: 45,
    height: 45,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  titleLarge: {
    fontSize: 32,
  },

  titleCompact: {
    fontSize: 18,
    lineHeight: 22,
  },

  subtitle: {
    marginTop: 4,
    color: '#DBEAFE',
    fontWeight: '700',
  },

  subtitleCompact: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },

  right: {
    minWidth: 45,
    alignItems: 'flex-end',
    marginLeft: 10,
  },
});
