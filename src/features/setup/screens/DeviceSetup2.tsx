import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceSetup2'>;

export default function DeviceSetup2({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Device Setup 2</Text>
      <Pressable onPress={() => navigation.navigate('DeviceSetup3')}>
        <Text style={{ color: 'blue' }}>Next</Text>
      </Pressable>
    </View>
  );
}