import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
  Dimensions,
  Vibration
} from 'react-native'

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera'

import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../../navigation/RootNavigator'

const { width } = Dimensions.get('window')
const FRAME_SIZE = Math.min(width * 0.7, 300)

type Props = NativeStackScreenProps<RootStackParamList, 'QrScanner'>

export default function QrScannerScreen({ navigation, route }: Props) {

  const { type = 'device', from = 'setup' } = route.params || {}

  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()

  const [state, setState] = useState<'scanning' | 'processing' | 'success'>('scanning')
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    requestPermission()
  }, [])

  const handleNavigation = () => {

    if (from === 'setup') {

      if (type === 'device') {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'DeviceSetup',
            params: { type: 'box', from: 'setup' },
          }],
        })
      }

      if (type === 'box') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Permissions' }],
        })
      }
    }

    if (from === 'settings') {
      navigation.reset({
        index: 0,
        routes: [{
          name: 'MainTabs',
          params: {
            screen: 'SettingsStack',
            params: { screen: 'DeviceManagement' },
          },
        }],
      })
    }
  }

  const onQrDetected = (value: string) => {

    if (scanned) return

    setScanned(true)
    setState('processing')

    console.log('QR VALUE:', value)

    setTimeout(() => {

      Vibration.vibrate(150)

      setState('success')

      setTimeout(() => {
        handleNavigation()
      }, 1200)

    }, 1500)

  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {

      if (!codes.length) return

      const value = codes[0].value

      if (value) {
        onQrDetected(value)
      }

    },
  })

  if (!device || !hasPermission) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="#fff" />
      </View>
    )
  }

  const title =
    state === 'success'
      ? `${type === 'device' ? 'Device' : 'Box'} Linked!`
      : 'Scan QR Code'

  const subtitle =
    state === 'success'
      ? 'Successfully connected to your device'
      : `Point your camera at the QR code on your Dvaari ${type}`

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

      <View style={styles.container}>

        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={state === 'scanning'}
          codeScanner={codeScanner}
        />

        {/* Top bar */}

        <View style={styles.topBar}>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.icon}>←</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.icon}>✕</Text>
          </Pressable>

        </View>


        {/* Scanner Area */}

        <View style={styles.centerArea}>

          <View style={[styles.scanFrame, { width: FRAME_SIZE, height: FRAME_SIZE }]}>

            {/* top line */}
            <View style={styles.topLine} />

            {/* corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

          </View>

          {state === 'processing' && (
            <ActivityIndicator size="large" color="#fff" />
          )}

          {state === 'success' && (
            <View style={styles.successCircle}>
              <Image
                source={require('../../../assets/images/auth/DeSet2.png')}
                style={styles.successIcon}
              />
            </View>
          )}

        </View>


        {/* Bottom Text */}

        <View style={styles.bottom}>

          <Text style={state === 'success' ? styles.successTitle : styles.title}>
            {title}
          </Text>

          <Text style={state === 'success' ? styles.successSubtitle : styles.subtitle}>
            {subtitle}
          </Text>

          {state === 'scanning' && (
            <Pressable style={styles.flashBtn}>
              <Text style={styles.flashText}>⚡ Tap for flash</Text>
            </Pressable>
          )}

          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              💡 Make sure the QR code is clearly visible and well-lit
            </Text>
          </View>

        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: '#000',
  },

  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBar: {
    position: 'absolute',
    top: 10,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },

  icon: {
    color: '#fff',
    fontSize: 26,
  },

  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanFrame: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  topLine: {
    position: 'absolute',
    top: 0,
    width: '60%',
    height: 1,
    backgroundColor: '#fff',
  },

  corner: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderColor: '#fff',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },

  successCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successIcon: {
    width: 70,
    height: 70,
  },

  bottom: {
    paddingBottom: 40,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },

  subtitle: {
    paddingHorizontal: 55,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },

  flashBtn: {
    width: 140,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#36363A',
    paddingVertical: 12,
    borderRadius: 40,
  },

  flashText: {
    color: '#fff',
    textAlign: 'center',
  },

  tipBox: {
    marginTop: 16,
    marginHorizontal: 40,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#00000099',
    borderColor: '#FFFFFF33',
  },

  tipText: {
    color: '#FFFFFFE5',
    fontSize: 13,
    textAlign: 'center',
  },

  successTitle: {
    color: '#22C55E',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },

  successSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 8,
  },
})