import React, { useMemo, useState } from 'react';
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
import BlueHeader from '../../../components/layout/BlueHeader';

type Props = NativeStackScreenProps<SettingsStackParamList, 'LinkedDevices'>;

type Device = {
  id: string;
  name: string;
  status?: string;
  linkedDate?: string;
  type: 'mobile' | 'display' | 'box';
};

export default function LinkedDevices({ navigation }: Props) {
  // Later → API fetch
  const [devices] = useState<Device[]>([
    {
      id: '1',
      name: "Ananya's Phone",
      status: 'This device\nAdmin',
      type: 'mobile',
    },
    {
      id: '2',
      name: 'Drawing Room Display',
      status: 'Active now\nLinked on 15 Jan 2026',
      type: 'display',
    },
    {
      id: '3',
      name: 'Main Entrance Box',
      status: 'Front Door\nActive • Linked on 10 Jan 2026',
      type: 'box',
    },
  ]);

  const thisDevice = devices.find(d => d.type === 'mobile');
  const linkedDevices = devices.filter(d => d.type === 'display');
  const boxes = devices.filter(d => d.type === 'box');

  return (
    <SafeAreaView style={styles.safe}>
      <BlueHeader
        title="Linked Devices"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔗 Link Your Devices</Text>
          <Text style={styles.infoText}>
            Use Dvaari on tablets and computers by linking them with your phone.
          </Text>
        </View>

        {/* THIS DEVICE */}
        <Text style={styles.sectionTitle}>THIS DEVICE</Text>
        {thisDevice && (
          <View style={styles.card}>
            <View style={styles.iconGreen}>
              <Text style={styles.iconText}>📱</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{thisDevice.name}</Text>
              <Text style={styles.cardSub}>{thisDevice.status}</Text>
            </View>
          </View>
        )}

        {/* LINKED DEVICES */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>LINKED DEVICES</Text>
          <Text style={styles.sectionCount}>{linkedDevices.length} device</Text>
        </View>

        {linkedDevices.map(d => (
          <View key={d.id} style={styles.card}>
            <View style={styles.iconBlue}>
              <Text style={styles.iconText}>🖥</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{d.name}</Text>
              <Text style={styles.activeText}>Active now</Text>
              <Text style={styles.cardSub}>Linked on 15 Jan 2026</Text>
            </View>
            <Text style={styles.menuDots}>⋮</Text>
          </View>
        ))}

        <Pressable
          style={styles.primaryBtn}
          onPress={() =>
            navigation.navigate('DeviceSetup', {
              type: 'device',
              from: 'settings',
            })
          }
        >
          <Text style={styles.primaryText}>＋ Link Device</Text>
        </Pressable>

        {/* BOXES */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>DVAARI BOXES</Text>
          <Text style={styles.sectionCount}>{boxes.length} box</Text>
        </View>

        {boxes.map(d => (
          <View key={d.id} style={styles.card}>
            <View style={styles.iconGreenLight}>
              <Text style={styles.iconText}>📦</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{d.name}</Text>
              <Text style={styles.cardSub}>Front Door</Text>
              <Text style={styles.cardSub}>Active • Linked on 10 Jan 2026</Text>
            </View>
            <Text style={styles.menuDots}>⋮</Text>
          </View>
        ))}

        <Pressable
          style={styles.successBtn}
          onPress={() =>
            navigation.navigate('DeviceSetup', {
              type: 'box',
              from: 'settings',
            })
          }
        >
          <Text style={styles.successText}>＋ Link Dvaari Box</Text>
        </Pressable>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { padding: 16, gap: 16 },

  infoCard: {
    backgroundColor: '#E8F0FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C7DAFF',
  },
  infoTitle: { fontWeight: '900', fontSize: 16, color: '#2563EB' },
  infoText: { marginTop: 6, fontSize: 14, color: '#1E293B' },

  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#6B7280' },
  sectionCount: { fontSize: 12, color: '#6B7280' },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },

  iconGreen: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBlue: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreenLight: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 20 },

  cardTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  cardSub: { marginTop: 4, fontSize: 12, color: '#6B7280' },
  activeText: {
    marginTop: 4,
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '800',
  },

  menuDots: { fontSize: 18, color: '#9CA3AF' },

  primaryBtn: {
    marginTop: 8,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },

  successBtn: {
    marginTop: 8,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
});
