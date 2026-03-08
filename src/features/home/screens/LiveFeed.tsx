import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../navigation/tabs/stacks/HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'LiveFeed'>;

/**
 * Future backend integration notes:
 * - Replace ImageBackground with real player component (WebRTC/HLS/RTSP).
 * - Keep controls (mic/speaker/end) as they are; just wire to API/device SDK.
 */
export default function LiveFeed({ navigation }: Props) {
  const [micMuted, setMicMuted] = useState(true);
  const [speakerMuted, setSpeakerMuted] = useState(true);

  // placeholder image for now (use a local asset later if you want)
  const bg = useMemo(
    () => ({
      uri: 'https://www.istockphoto.com/photo/little-boy-in-autumn-land-scape-gm147039975-12117205?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_zsr&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fland-scap-boy-image&utm_term=land+scap+boy+image%3A%3Aaffiliate-signature-content%3Acontrol%3Adfdc59e0-deda-454d-b7a0-514c3bec2648',
    }),
    []
  );

  const onEndLive = () => {
    // later: call API end stream
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top blue header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <Text style={styles.backText}>{'‹'}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Live Feed</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Video Area */}
      <View style={styles.body}>
        <ImageBackground source={bg} style={styles.video} resizeMode="cover">
          {/* timestamp */}
          <Text style={styles.timestamp}>12 : 20:11 AM</Text>

          {/* End Live */}
          <Pressable style={styles.endBtn} onPress={onEndLive}>
            <View style={styles.endIconDot} />
            <Text style={styles.endText}>End Live</Text>
          </Pressable>

          {/* Bottom Right Controls */}
          <View style={styles.controls}>
            <RoundControl
              label={micMuted ? 'Mic Off' : 'Mic On'}
              icon={micMuted ? '🎙️' : '🎙️'}
              active={!micMuted}
              onPress={() => setMicMuted((v) => !v)}
            />
            <RoundControl
              label={speakerMuted ? 'Speaker Off' : 'Speaker On'}
              icon={speakerMuted ? '🔇' : '🔊'}
              active={!speakerMuted}
              onPress={() => setSpeakerMuted((v) => !v)}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

function RoundControl({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.roundBtn}>
      <Text style={styles.roundIcon}>{icon}</Text>
      {/* label intentionally not shown to match screenshot */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B4FB3' },

  header: {
    height: 52,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  backBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#FFFFFF', fontSize: 28, lineHeight: 28, fontWeight: '900' },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },

  body: { flex: 1, backgroundColor: '#000000' },
  video: { flex: 1, justifyContent: 'flex-end' },

  timestamp: {
    position: 'absolute',
    bottom: 140,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    opacity: 0.9,
  },

  endBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 12,
    marginBottom: 18,
  },
  endIconDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#EF4444', // red dot like end icon
  },
  endText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },

  controls: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    flexDirection: 'row',
    gap: 12,
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundIcon: { color: '#FFFFFF', fontSize: 16 },
});