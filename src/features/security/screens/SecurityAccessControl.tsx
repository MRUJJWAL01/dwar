import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../../../navigation/tabs/stacks/HomeStack';
import BlueHeader from '../../../components/layout/BlueHeader';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'SecurityAccessControl'
>;

type SecurityTab = 'nfc' | 'access';

type SummaryCard = {
  id: string;
  icon: string;
  value: string;
  title: string;
};

type RegisteredCard = {
  id: string;
  title: string;
  subtitle: string;
  access: string;
  role: string;
  lastUsed: string;
  totalUses: string;
};

type AccessLevelCard = {
  id: string;
  title: string;
  subtitle: string;
  permissions: string[];
  assignedUsers: { id: string; name: string; initials: string; tone: 'blue' | 'green' }[];
  bulletColor: string;
};

export default function SecurityAccessControl({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;

  const [activeTab, setActiveTab] = useState<SecurityTab>('nfc');

  const summaryCards = useMemo<SummaryCard[]>(
    () => [
      {
        id: 'activeCards',
        icon: '💳',
        value: '6',
        title: 'Active Card',
      },
      {
        id: 'users',
        icon: '👜',
        value: '4',
        title: 'Users',
      },
      {
        id: 'security',
        icon: '🛡️',
        value: 'High',
        title: 'Security Level',
      },
    ],
    [],
  );

  const registeredCards = useMemo<RegisteredCard[]>(
    () => [
      {
        id: '1',
        title: 'NFC - 001',
        subtitle: 'Rajesh',
        access: 'Active',
        role: 'Admin',
        lastUsed: '1 day ago',
        totalUses: '189',
      },
    ],
    [],
  );

  const accessLevelCards = useMemo<AccessLevelCard[]>(
    () => [
      {
        id: 'admin',
        title: 'Admin',
        subtitle: 'Full access to all features and settings',
        permissions: [
          'Accept any delivery',
          'Authorize COD payments',
          'Manage family members',
          'Access recordings',
          'Change settings',
        ],
        assignedUsers: [
          { id: '1', name: 'Rajesh', initials: 'R', tone: 'blue' },
        ],
        bulletColor: '#2563EB',
      },
      {
        id: 'simple',
        title: 'Simple Mode',
        subtitle: 'Simplified interface for elderly users',
        permissions: [
          'Accept deliveries with voice guidance',
          'Hindi language support',
          'Large font elements',
          'Auto-notifications to family',
        ],
        assignedUsers: [
          {
            id: '2',
            name: 'Kavita (Grandmother)',
            initials: 'K',
            tone: 'green',
          },
        ],
        bulletColor: '#16A34A',
      },
    ],
    [],
  );

  const onEditCard = (id: string) => {
    // later
  };

  const onDeactivateCard = (id: string) => {
    // later
  };

  const onEditPermissions = (id: string) => {
    // later
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BlueHeader
        title="Security & Access Control"
        subtitle="Manage NFC cards and access permissions"
        onBackPress={() => navigation.goBack()}
        large
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          isCompact && styles.contentCompact,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary cards */}
        <View style={styles.summaryRow}>
          {summaryCards.map(card => (
            <View key={card.id} style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>{card.icon}</Text>
              <Text style={styles.summaryValue}>{card.value}</Text>
              <Text style={styles.summaryTitle}>{card.title}</Text>
            </View>
          ))}
        </View>

        {/* Tab switch */}
        <View style={styles.tabSwitchWrap}>
          <Pressable
            style={[
              styles.tabBtn,
              activeTab === 'nfc' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('nfc')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'nfc' && styles.tabTextActive,
              ]}
            >
              💳 NFC Cards
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabBtn,
              activeTab === 'access' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('access')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'access' && styles.tabTextActive,
              ]}
            >
              🔐 Access Levels
            </Text>
          </Pressable>
        </View>

        {activeTab === 'nfc' ? (
          <>
            <Text style={styles.sectionTitle}>Registered NFC Card</Text>

            {registeredCards.map(item => (
              <View key={item.id} style={styles.registeredCard}>
                <View style={styles.cardTopRow}>
                  <View style={styles.cardTopLeft}>
                    <View style={styles.nfcIconBox}>
                      <Text style={styles.nfcIcon}>💳</Text>
                    </View>

                    <View style={styles.cardInfoWrap}>
                      <Text style={styles.cardName}>{item.title}</Text>
                      <Text style={styles.cardSub}>{item.subtitle}</Text>
                    </View>
                  </View>

                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>{item.access}</Text>
                  </View>
                </View>

                <View style={styles.metaSection}>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>Access Level:</Text>
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleBadgeText}>{item.role}</Text>
                    </View>
                  </View>

                  <View style={styles.metaLineRow}>
                    <Text style={styles.metaLineLabel}>Last Used</Text>
                    <Text style={styles.metaLineValue}>{item.lastUsed}</Text>
                  </View>

                  <View style={styles.metaLineRow}>
                    <Text style={styles.metaLineLabel}>Total Uses:</Text>
                    <Text style={styles.metaLineValue}>{item.totalUses}</Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <Pressable
                    style={[styles.actionBtn, styles.editBtn]}
                    onPress={() => onEditCard(item.id)}
                  >
                    <Text style={styles.editBtnText}>✎ Edit</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.actionBtn, styles.deactivateBtn]}
                    onPress={() => onDeactivateCard(item.id)}
                  >
                    <Text style={styles.deactivateBtnText}>🗑 Deactivate</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            <View>
              <Text style={styles.sectionTitle}>Access Levels & Permissions</Text>
              <Text style={styles.sectionSub}>
                Define what admin can do in the system
              </Text>
            </View>

            {accessLevelCards.map(item => (
              <View key={item.id} style={styles.levelCard}>
                <Text style={styles.levelTitle}>{item.title}</Text>
                <Text style={styles.levelSubtitle}>{item.subtitle}</Text>

                <Pressable
                  style={styles.editPermissionBtn}
                  onPress={() => onEditPermissions(item.id)}
                >
                  <Text style={styles.editPermissionBtnText}>Edit Permissions</Text>
                </Pressable>

                <View style={styles.divider} />

                <Text style={styles.levelSectionHeading}>Access Level:</Text>

                <View style={styles.permissionList}>
                  {item.permissions.map(permission => (
                    <View key={permission} style={styles.permissionRow}>
                      <View
                        style={[
                          styles.permissionDot,
                          { backgroundColor: item.bulletColor },
                        ]}
                      />
                      <Text style={styles.permissionText}>{permission}</Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.levelSectionHeading, { marginTop: 14 }]}>
                  Assigned User{item.assignedUsers.length > 1 ? 's' : ''}{' '}
                  {item.id === 'simple' ? `(${item.assignedUsers.length})` : ''}
                </Text>

                <View style={styles.userChipWrap}>
                  {item.assignedUsers.map(user => (
                    <View key={user.id} style={styles.userChip}>
                      <View
                        style={[
                          styles.userChipAvatar,
                          user.tone === 'blue'
                            ? styles.userChipAvatarBlue
                            : styles.userChipAvatarGreen,
                        ]}
                      >
                        <Text style={styles.userChipAvatarText}>
                          {user.initials}
                        </Text>
                      </View>

                      <Text style={styles.userChipText}>{user.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 14 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  content: {
    padding: 16,
    gap: 14,
  },

  contentCompact: {
    padding: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    minHeight: 112,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryIcon: {
    fontSize: 18,
    marginBottom: 8,
  },

  summaryValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    textAlign: 'center',
  },

  summaryTitle: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#6B7280',
  },

  tabSwitchWrap: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 4,
    gap: 6,
  },

  tabBtn: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
  },

  tabBtnActive: {
    backgroundColor: '#FFFFFF',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2F2F2F',
  },

  tabTextActive: {
    color: '#2362EB',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },

  sectionSub: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  registeredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: 16,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },

  cardTopLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },

  nfcIconBox: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nfcIcon: {
    fontSize: 22,
  },

  cardInfoWrap: {
    flex: 1,
    justifyContent: 'center',
  },

  cardName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },

  cardSub: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },

  activeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  activeBadgeText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '900',
  },

  metaSection: {
    marginTop: 18,
    gap: 10,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  metaLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  roleBadgeText: {
    color: '#2362EB',
    fontSize: 12,
    fontWeight: '900',
  },

  metaLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  metaLineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },

  metaLineValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  actionRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },

  actionBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  editBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },

  deactivateBtn: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FCA5A5',
  },

  editBtnText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '800',
  },

  deactivateBtnText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '800',
  },

  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 14,
  },

  levelTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },

  levelSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#6B7280',
  },

  editPermissionBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
  },

  editPermissionBtnText: {
    color: '#2362EB',
    fontSize: 11,
    fontWeight: '800',
  },

  divider: {
    marginTop: 14,
    marginBottom: 14,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  levelSectionHeading: {
    fontSize: 14,
    fontWeight: '900',
    color: '#374151',
  },

  permissionList: {
    marginTop: 10,
    gap: 8,
  },

  permissionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  permissionDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginTop: 6,
  },

  permissionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#374151',
  },

  userChipWrap: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingRight: 10,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },

  userChipAvatar: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  userChipAvatarBlue: {
    backgroundColor: '#2563EB',
  },

  userChipAvatarGreen: {
    backgroundColor: '#16A34A',
  },

  userChipAvatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  userChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
});