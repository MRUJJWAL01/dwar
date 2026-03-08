import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppDispatch } from '../store/hooks';
import { authActions } from '../store/slices/authSlice';
import {
  clearTokens,
  getOnboardingCompleted,
  getStoredTokens,
} from '../services/storage/tokenStorage';
import { useLazyMeQuery } from '../services/api/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [triggerMe] = useLazyMeQuery();

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    try {
      const onboardingCompleted = await getOnboardingCompleted();

      // ✅ First time user -> onboarding
      if (!onboardingCompleted) {
        navigation.replace('Onboarding1');
        return;
      }

      const tokens = await getStoredTokens();

      // ✅ Onboarding done but not logged in
      if (!tokens.accessToken) {
        navigation.replace('Login');
        return;
      }

      dispatch(
        authActions.restoredTokens({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      );

      const res = await triggerMe().unwrap();

      dispatch(authActions.userUpdated(res.user));
      dispatch(authActions.bootstrapCompleted());

      // ✅ Logged in
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch {
      await clearTokens();
      dispatch(authActions.signedOut());

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* replace with logo image if available */}
      <Text style={styles.brand}>Dvaari</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
});