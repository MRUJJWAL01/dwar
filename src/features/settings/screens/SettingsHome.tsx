import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../../navigation/tabs/stacks/SettingsStack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
import BlueHeader from '../../../components/layout/BlueHeader';
import ConfirmModal from '../../../components/modals/ConfirmModal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authActions } from '../../../store/slices/authSlice';
import { clearTokens } from '../../../services/storage/tokenStorage';
import {
  authApi,
  useLogoutMutation,
  useMeQuery,
} from '../../../services/api/authApi';

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsHome'>;

type Row = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  danger?: boolean;
  onPress: () => void;
};

function initials(fullName?: string) {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? '';
  const second = parts.length > 1 ? parts[1]?.charAt(0) ?? '' : '';
  return (first + second).toUpperCase();
}

export default function SettingsHome({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(state => state.auth.user);
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const [logoutVisible, setLogoutVisible] = useState(false);

  const shouldFetchMe = !authUser && !!accessToken;

  const { data: meData } = useMeQuery(undefined, {
    skip: !shouldFetchMe,
  });

  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation();

  useEffect(() => {
    if (meData?.user && !authUser) {
      dispatch(authActions.userUpdated(meData.user));
    }
  }, [meData, authUser, dispatch]);

  const resolvedUser = authUser ?? meData?.user ?? null;

  const user = {
    fullName: resolvedUser?.name ?? 'User',
    email: resolvedUser?.email ?? resolvedUser?.phone ?? 'No contact info',
    role: 'Owner',
  };

  const goToRootLogin = () => {
    const rootNavigation =
      navigation.getParent()?.getParent?.() as
        | {
            reset: (state: {
              index: number;
              routes: Array<{ name: keyof RootStackParamList }>;
            }) => void;
          }
        | undefined;

    rootNavigation?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleLogout = async () => {
  try {
    await logoutUser().unwrap();
  } catch {
    // ignore backend failure
  } finally {
    await clearTokens();
    dispatch(authActions.signedOut());
    dispatch(authApi.util.resetApiState());
    setLogoutVisible(false);
    goToRootLogin();
  }
};

  const rows = useMemo<Row[]>(
    () => [
      {
        id: 'edit',
        title: 'Edit Profile',
        subtitle: 'Update your personal information',
        icon: '👤',
        onPress: () => navigation.navigate('EditProfile'),
      },
      {
        id: 'linked',
        title: 'Linked Devices',
        subtitle: 'Manage connected devices',
        icon: '🔗',
        onPress: () => navigation.navigate('LinkedDevices' as never),
      },
      {
        id: 'device',
        title: 'Device Management',
        subtitle: 'Customize wallpaper & connect\napps',
        icon: '📱',
        onPress: () => {},
      },
      {
        id: 'notif',
        title: 'Notifications',
        subtitle: 'Manage notifications\nperformances',
        icon: '🔔',
        onPress: () => {},
      },
      {
        id: 'nfc',
        title: 'NFC Cards',
        subtitle: 'Manage your access cards',
        icon: '💳',
        onPress: () => {},
      },
      {
        id: 'lang',
        title: 'Language',
        subtitle: 'Change app language',
        icon: '🌐',
        onPress: () => {},
      },
      {
        id: 'help',
        title: 'Help & Support',
        subtitle: 'FAQs and contact support',
        icon: '❓',
        onPress: () => {},
      },
      {
        id: 'signout',
        title: 'Sign Out',
        subtitle: 'Logout of your account',
        icon: '↩',
        danger: true,
        onPress: () => setLogoutVisible(true),
      },
    ],
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <BlueHeader
        title="Profile"
        onBackPress={() => navigation.goBack()}
        large
      />

      <View style={styles.profileStrip}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(user.fullName)}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.rolePill}>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {rows.map(r => (
          <Pressable
            key={r.id}
            onPress={r.onPress}
            style={[styles.card, r.danger && styles.cardDanger]}
          >
            <View style={[styles.iconBox, r.danger && styles.iconBoxDanger]}>
              <Text
                style={[styles.iconText, r.danger && styles.iconTextDanger]}
              >
                {r.icon}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[styles.cardTitle, r.danger && styles.cardTitleDanger]}
              >
                {r.title}
              </Text>
              <Text style={styles.cardSub}>{r.subtitle}</Text>
            </View>

            <Text style={[styles.chev, r.danger && styles.chevDanger]}>
              {'›'}
            </Text>
          </Pressable>
        ))}

        <Text style={styles.footer}>
          Dvaari v1.0.0{'\n'}Smart Doorbell System
        </Text>
        <View style={{ height: 10 }} />
      </ScrollView>

      <ConfirmModal
        visible={logoutVisible}
        title="Sign Out"
        message="Are you sure you want to sign out from this device?"
        confirmText={isLoggingOut ? 'Signing out...' : 'Sign Out'}
        cancelText="Cancel"
        onCancel={() => {
          if (!isLoggingOut) setLogoutVisible(false);
        }}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },

  profileStrip: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },
  userName: { color: '#FFFFFF', fontWeight: '900', fontSize: 18 },
  userEmail: {
    marginTop: 4,
    color: '#DBEAFE',
    fontWeight: '700',
    fontSize: 12,
  },
  rolePill: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  roleText: { color: '#2563EB', fontWeight: '900', fontSize: 12 },

  content: { padding: 16, gap: 14 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 18 },

  cardTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  cardSub: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    lineHeight: 16,
  },

  chev: { fontSize: 22, fontWeight: '900', color: '#9CA3AF' },

  cardDanger: { backgroundColor: '#FFF5F5', borderColor: '#EF4444' },
  iconBoxDanger: { backgroundColor: '#FEE2E2' },
  iconTextDanger: { color: '#EF4444' },
  cardTitleDanger: { color: '#111827' },
  chevDanger: { color: '#EF4444' },

  footer: {
    marginTop: 8,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});