import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Permissions'>;

export default function Permissions({ navigation }: Props) {
   const nextStep = ()=>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Permissions</Text>
      <Pressable onPress={() => nextStep()}>
        <Text style={{ color: 'blue' }}>Finish → Home</Text>
      </Pressable>
    </View>
  );
}