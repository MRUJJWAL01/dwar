import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
export default function App() {
  //   const clearStorage = async ()=>{
  // await AsyncStorage.removeItem('app.onboardingCompleted');
  //   }
  //   clearStorage();
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    flexGrow: 1,
  },

  topSection: {
    height: 340,
    backgroundColor: '#0A39C9',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 120 : 140,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
  },

  headerSub: {
    color: '#F3F4F6',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '900',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: 30,
    fontWeight: '400',
    color: '#111111',
    marginBottom: 10,
  },

  formBlock: {
    gap: 6,
  },

  label: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '600',
  },

  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  errorText: {
    marginBottom: 6,
    color: '#EA8080',
    fontSize: 12,
    fontWeight: '600',
  },

  bottomArea: {
    paddingTop: 14,
  },

  primaryBtn: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#2362EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnDisabled: {
    backgroundColor: '#9BB7F0',
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },

  footerRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '400',
  },

  footerLink: {
    color: '#184FBF',
    fontSize: 18,
    fontWeight: '600',
  },
});
