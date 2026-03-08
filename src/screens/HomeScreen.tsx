import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Home</Text>
      <Button title="Logout (Go Login)" onPress={() => navigation.replace("Login")} />
    </View>
  );
}