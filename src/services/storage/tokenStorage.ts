import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_KEY = 'auth.accessToken';
const REFRESH_KEY = 'auth.refreshToken';
const ONBOARDING_KEY = 'app.onboardingCompleted';

export async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_KEY);
}

export async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_KEY);
}

export async function getStoredTokens() {
  const values = await AsyncStorage.multiGet([ACCESS_KEY, REFRESH_KEY]);

  return {
    accessToken: values[0][1],
    refreshToken: values[1][1],
  };
}

export async function setTokens(accessToken: string, refreshToken: string) {
  await AsyncStorage.multiSet([
    [ACCESS_KEY, accessToken],
    [REFRESH_KEY, refreshToken],
  ]);
}

export async function clearTokens() {
  // ✅ sirf auth keys clear hongi
  await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
}

export async function getOnboardingCompleted() {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === 'true';
}

export async function setOnboardingCompleted(value: boolean) {
  await AsyncStorage.setItem(ONBOARDING_KEY, value ? 'true' : 'false');
}