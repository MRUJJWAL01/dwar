import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar,Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { useAppDispatch } from '../../../store/hooks';
import { authActions } from '../../../store/slices/authSlice';
import {
  clearTokens,
  getOnboardingCompleted,
  getStoredTokens,
} from '../../../services/storage/tokenStorage';
import { useLazyMeQuery } from '../../../services/api/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [triggerMe] = useLazyMeQuery();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const onboardingCompleted = await getOnboardingCompleted();

        if (onboardingCompleted) {
          navigation.replace('Onboarding');
          return;
        }

        const tokens = await getStoredTokens();

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

        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } catch (e) {
        await clearTokens();
        dispatch(authActions.signedOut());

        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    bootstrap();
  }, [dispatch, navigation, triggerMe]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F67E8" />

      <Image
        source={require('../../../assets/images/dwaari-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F67E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 158,
    height: 48,
  },
  brand: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', },
});