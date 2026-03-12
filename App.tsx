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


});
