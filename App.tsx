import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

//   const clearStorage = async ()=>{
// await AsyncStorage.removeItem('app.onboardingCompleted');
//   }
//   clearStorage();
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}