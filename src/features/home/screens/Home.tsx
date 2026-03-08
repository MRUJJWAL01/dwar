import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../../../navigation/tabs/stacks/HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

type Activity = {
  id: string;
  title: string;
  meta: string;
  time: string;
  image?: any;
};

export default function Home({ navigation }: Props) {
  const [mode, setMode] = useState<'active' | 'away'>('active');
  const [visitorPending, setVisitorPending] = useState(true);

  const activity = useMemo<Activity[]>(
    () => [
      {
        id: '1',
        title: 'Dell Laptop Delivered',
        meta: 'Accepted by priya • Order #FK-2891',
        time: 'Today, 2:34 PM',
        // Optional: if you want real thumbnails, put them in assets & require()
        // image: require('../../../assets/images/thumb1.png'),
      },
      {
        id: '2',
        title: 'Nike Shoes Delivered',
        meta: 'Accepted by Arjun • COD ₹ 2,499',
        time: 'Yesterday, 4:12 PM',
      },
    ],
    []
  );

  const onPressLiveFeed = () => navigation.navigate('LiveFeed');

  const onApprove = () => {
    // mock action: mark pending false
    setVisitorPending(false);
    // later: call API approve
  };

  const onDeny = () => {
    setVisitorPending(false);
    // later: call API deny
  };

  const goManageFamily = () => {
    // This is a Tab screen (Members tab). From HomeStack we can jump to tab via parent navigator.
    navigation.getParent()?.navigate('MembersStack' as never);
  };

  const goDeliveryAccess = () => {
    navigation.getParent()?.navigate('DeliveryStack' as never);
  };

  const goSecurity = () => {
    // later: security stack screen
    navigation.getParent()?.navigate('HomeStack' as never);
  };

  const goRecordings = () => {
    // later: recordings screen inside HomeStack or another tab
    navigation.getParent()?.navigate('HomeStack' as never);
  };

  return (
    <SafeAreaView style={styles.safe}>
        {/* Blue header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSub}>Your home is secured</Text>
          </View>

          <Pressable style={styles.bellBtn} onPress={() => {}}>
            <Text style={styles.bellIcon}>🔔</Text>
          </Pressable>
        </View>

       
      </View>

      {/* Scroll content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
       {/* Segmented control */}
        <View style={styles.segmentWrap}>
          <Pressable
            onPress={() => setMode('active')}
            style={[styles.segmentBtn, mode === 'active' && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, mode === 'active' && styles.segmentTextActive]}>
              Active
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setMode('away')}
            style={[styles.segmentBtn, mode === 'away' && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, mode === 'away' && styles.segmentTextActive]}>
              Away
            </Text>
          </Pressable>
        </View>
        {/* Live Feed */}

        <Text style={styles.sectionTitle}>Live Feed</Text>

        <Pressable style={styles.liveRow} onPress={onPressLiveFeed}>
          <View style={styles.liveIcon} />
          <Text style={styles.liveText}>Live Feed</Text>
          <Text style={styles.chev}>{'›'}</Text>
        </Pressable>

        {/* Visitor card */}
        <View style={styles.visitorCard}>
          <View style={styles.visitorTop}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.visitorTitle}>Visitor at Door</Text>
              <Text style={styles.visitorSub}>Click to view details</Text>
            </View>

            <View style={styles.pendingPill}>
              <Text style={styles.pendingText}>{visitorPending ? 'Pending' : 'Done'}</Text>
            </View>
          </View>

          <View style={styles.visitorBtns}>
            <Pressable
              onPress={onApprove}
              style={[styles.visitorBtn, styles.approveBtn]}
              disabled={!visitorPending}
            >
              <Text style={[styles.visitorBtnText, styles.approveText]}>Approve</Text>
            </Pressable>

            <Pressable
              onPress={onDeny}
              style={[styles.visitorBtn, styles.denyBtn]}
              disabled={!visitorPending}
            >
              <Text style={[styles.visitorBtnText, styles.denyText]}>Deny</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Quick Actions</Text>

        <View style={styles.grid}>
          <QuickAction title="Manage Family" icon="👥" onPress={goManageFamily} />
          <QuickAction title="Delivery Access" icon="📦" onPress={goDeliveryAccess} />
          <QuickAction title="Security" icon="🛡️" onPress={goSecurity} />
          <QuickAction title="View Recordings" icon="🎥" onPress={goRecordings} />
        </View>

        {/* Recent Activity */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable onPress={() => navigation.getParent()?.navigate('DeliveryStack' as never)}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.activityList}>
          {activity.map((a, idx) => (
            <View key={a.id} style={[styles.activityItem, idx !== activity.length - 1 && styles.activityBorder]}>
              <View style={styles.thumb}>
                {a.image ? (
                  <Image source={a.image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                ) : (
                  <View style={styles.thumbPlaceholder} />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.actTitle}>{a.title}</Text>
                <Text style={styles.actMeta}>{a.meta}</Text>
                <Text style={styles.actTime}>{a.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 14 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quickCard} onPress={onPress}>
      <View style={styles.quickIconWrap}>
        <Text style={styles.quickIcon}>{icon}</Text>
      </View>
      <Text style={styles.quickTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },

  header: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '900' },
  headerSub: { marginTop: 2, color: '#DBEAFE', fontSize: 13, fontWeight: '700' },

  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: { fontSize: 16 },

  segmentWrap: {
    marginTop: 12,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    gap: 6,
  },
  segmentBtn: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(109, 106, 106, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: { color: '#888a8e', fontSize: 12, fontWeight: '800' },
  segmentTextActive: { color: '#2563EB' },

  content: { padding: 16 },

  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#111827', marginBottom: 10 },

  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  liveIcon: { width: 26, height: 26, borderRadius: 8, backgroundColor: '#EEF2FF' },
  liveText: { flex: 1, fontSize: 12, fontWeight: '900', color: '#111827' },
  chev: { fontSize: 18, fontWeight: '900', color: '#9CA3AF' },

  visitorCard: {
    marginTop: 12,
    backgroundColor: '#ECFDF3',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  visitorTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 999, backgroundColor: '#D1D5DB' },
  visitorTitle: { fontSize: 12, fontWeight: '900', color: '#111827' },
  visitorSub: { marginTop: 2, fontSize: 10, fontWeight: '700', color: '#6B7280' },

  pendingPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#FEF3C7',
  },
  pendingText: { fontSize: 10, fontWeight: '900', color: '#92400E' },

  visitorBtns: { flexDirection: 'row', gap: 10, marginTop: 12 },
  visitorBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  approveBtn: { borderColor: '#22C55E', backgroundColor: '#FFFFFF' },
  denyBtn: { borderColor: '#EF4444', backgroundColor: '#FFFFFF' },
  visitorBtnText: { fontSize: 12, fontWeight: '900' },
  approveText: { color: '#16A34A' },
  denyText: { color: '#EF4444' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 4,
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickIcon: { fontSize: 18 },
  quickTitle: { fontSize: 11, fontWeight: '900', color: '#111827', textAlign: 'center' },

  recentHeader: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAll: { fontSize: 12, fontWeight: '900', color: '#111827' },

  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    alignItems: 'center',
  },
  activityBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  thumb: { width: 46, height: 46, borderRadius: 10, overflow: 'hidden' },
  thumbPlaceholder: { flex: 1, backgroundColor: '#D1D5DB' },

  actTitle: { fontSize: 12, fontWeight: '900', color: '#111827' },
  actMeta: { marginTop: 2, fontSize: 10, fontWeight: '700', color: '#6B7280' },
  actTime: { marginTop: 6, fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
});