import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MembersStackParamList } from '../../../navigation/tabs/stacks/MembersStack';
import ConfirmModal from '../../../components/modals/ConfirmModal';
import SuccessModal from '../../../components/modals/SuccessModal';

type Props = NativeStackScreenProps<MembersStackParamList, 'MembersList'>;

type AccessLevel = 'full' | 'simple' | 'none';

type Member = {
  id: string;
  name: string;
  email?: string;
  accessLabel?: string;
  badge?: string;
  accessLevel: AccessLevel;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? '';
  const b = parts[1]?.[0] ?? '';
  return (a + b).toUpperCase();
}

export default function MembersList({ navigation }: Props) {
  // ✅ Initial mock list (later API se replace)
  const initialMembers = useMemo<Member[]>(
    () => [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@gmail.com',
        badge: 'Admin',
        accessLabel: 'Full access',
        accessLevel: 'full',
      },
      {
        id: '2',
        name: 'Arjun Kumar',
        email: 'arjun.kumar@gmail.com',
        accessLevel: 'none',
      },
      {
        id: '3',
        name: 'Priya Kumar',
        email: 'priya.kumar@gmail.com',
        accessLevel: 'none',
      },
      {
        id: '4',
        name: 'Meena (Mother)',
        email: 'No email. NFC Card Only',
        accessLabel: 'Simple Mode',
        accessLevel: 'simple',
      },
    ],
    [],
  );

  // ✅ UI state
  const [membersData, setMembersData] = useState<Member[]>(initialMembers);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  // ✅ Actions (later API integration)
  const onAddMember = () => navigation.navigate('AddMember');

  const onEditMember = (id: string) => {
    // later: navigation.navigate('EditMember', { id })
  };

  const onDeleteMember = (id: string) => {
    setSelectedMemberId(id);
    setDeleteVisible(true);
  };

  const confirmDelete = () => {
    if (!selectedMemberId) return;

    setMembersData(prev => prev.filter(m => m.id !== selectedMemberId));

    setDeleteVisible(false);
    setSelectedMemberId(null);

    // ✅ show success popup
    setSuccessVisible(true);
  };

  const renderItem = ({ item }: { item: Member }) => {
    const initials = getInitials(item.name);

    return (
      <View style={styles.memberRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            {!!item.badge && (
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>

          {!!item.email && <Text style={styles.email}>{item.email}</Text>}

          {!!item.accessLabel && (
            <View style={styles.accessPillWrap}>
              <View style={styles.accessPill}>
                <Text style={styles.accessPillText}>{item.accessLabel}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.iconsCol}>
          <Pressable
            onPress={() => onEditMember(item.id)}
            hitSlop={10}
            style={styles.iconBtn}
          >
            <Text style={styles.iconBlue}>✎</Text>
          </Pressable>

          <Pressable
            onPress={() => onDeleteMember(item.id)}
            hitSlop={10}
            style={styles.iconBtn}
          >
            <Text style={styles.iconRed}>🗑</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ Big Blue Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Family Members</Text>
        <Text style={styles.headerSub}>Generate visitor access</Text>
      </View>

      <View style={styles.body}>
        {/* Add Button */}
        <Pressable style={styles.addBtn} onPress={onAddMember}>
          <Text style={styles.addPlus}>＋</Text>
          <Text style={styles.addText}>Add Family Member</Text>
        </Pressable>

        {/* Members Card */}
        <View style={styles.card}>
          <FlatList
            data={membersData} // ✅ IMPORTANT FIX
            keyExtractor={m => m.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            contentContainerStyle={{ paddingVertical: 6 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Access Levels Card */}
        <View style={styles.accessCard}>
          <Text style={styles.accessTitle}>Access Levels</Text>

          <Text style={styles.accessLine}>
            <Text style={styles.bold}>Full Access:</Text> Can receive any
            delivery, manage settings
          </Text>

          <Text style={[styles.accessLine, { marginTop: 8 }]}>
            <Text style={styles.bold}>Simple Mode:</Text> NFC card only, no app
            required
          </Text>
        </View>
      </View>

      {/* Delete Modal */}
      <ConfirmModal
        visible={deleteVisible}
        title="Delete Member"
        message="Are you sure you want to remove this family member?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setDeleteVisible(false);
          setSelectedMemberId(null);
        }}
        onConfirm={confirmDelete}
      />
      <SuccessModal
        visible={successVisible}
        title="Member Removed"
        message="Family member has been removed successfully."
        buttonText="OK"
        onClose={() => setSuccessVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },

  header: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  headerSub: {
    marginTop: 4,
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '700',
  },

  body: { flex: 1, padding: 16 },

  addBtn: {
    height: 44,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  addPlus: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  addText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },

  card: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
  },

  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#2563EB', fontWeight: '900' },

  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 12, fontWeight: '900', color: '#111827' },

  badgePill: {
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#2563EB', fontSize: 10, fontWeight: '900' },

  email: { marginTop: 2, fontSize: 10, color: '#6B7280', fontWeight: '700' },

  accessPillWrap: { marginTop: 6 },
  accessPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF3',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  accessPillText: { color: '#16A34A', fontSize: 10, fontWeight: '900' },

  iconsCol: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBlue: { color: '#2563EB', fontSize: 14, fontWeight: '900' },
  iconRed: { color: '#EF4444', fontSize: 14, fontWeight: '900' },

  sep: { height: 1, backgroundColor: '#E5E7EB' },

  accessCard: {
    marginTop: 14,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#93C5FD',
    padding: 12,
  },
  accessTitle: {
    color: '#1D4ED8',
    fontWeight: '900',
    fontSize: 12,
    marginBottom: 8,
  },
  accessLine: {
    color: '#111827',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
  },
  bold: { fontWeight: '900' },
});
