import React from 'react';
import { Camera } from 'react-native-vision-camera'
import { View, Text, StyleSheet, Image, SafeAreaView, Alert,  Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
import AppButton from '../../../components/ui/AppButton';
import { } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceSetup'>;

export default function DeviceSetup({ navigation, route }: Props) {
  const { type, from } = route.params;

  const isBox = type === 'box';

  const title = isBox ? 'Connect Dvaari Box' : 'Connect Your Device';

  const subtitle = isBox
    ? 'Scan the QR code displayed on your\nDvaari box to complete the setup'
    : 'Scan the QR code displayed on your\nDvaari tablet to connect your mobile\napp';

  const steps = isBox
    ? [
        'Locate the QR code on your Dvaari box',
        'Point your camera at the QR code on the box',
        'Wait for the connection to establish',
      ]
    : [
        'Open the camera or QR scanner on your phone',
        'Point your camera at the QR code on the tablet',
        'Wait for the connection to establish',
      ];

  const buttonText = isBox ? 'Link Box' : 'Link Device';
const handlePress = async () => {
  try {
    let status = await Camera.getCameraPermissionStatus();

    // Agar permission granted nahi hai to system popup request karo
    if (status !== 'granted') {
      status = await Camera.requestCameraPermission();
    }

    // Agar user allow kar deta hai
    if (status === 'granted') {
      navigation.navigate('QrScanner', {
        type: type,
        from: from,
      });
      return;
    }

    // Agar user deny kar deta hai (ab settings dikhana sahi hai)
    Alert.alert(
      'Camera Permission Required',
      'Please enable camera permission from app settings to scan the QR code.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Go to App Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
    );

  } catch (e) {
    console.log('Camera permission error:', e);
  }
};
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/auth/DeSet.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.steps}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>

              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <AppButton
          title={buttonText}
          onPress={handlePress}
        />

        {isBox && from === 'setup' && (
          <AppButton
            style={styles.skipe}
            title="Skip"
            variant="outline"
            onPress={() => navigation.replace('Permissions')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 70,
  },

  image: {
    width: 200,
    height: 140,
    marginBottom: 27,
  },

  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 17,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 24,
    marginBottom: 48,
  },

  steps: {
    width: '100%',
    gap: 18,
    marginBottom: 40,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },

  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },

  skipe: {
    marginTop: 20,
  }
});