import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { CommonStyles } from '../../theme/commonStyles';

type Props = {
  headerTitle: string;
  headerSubtitle: string;
  cardTitle: string;
  children: React.ReactNode;
};

export default function AuthScreenLayout({
  headerTitle,
  headerSubtitle,
  cardTitle,
  children,
}: Props) {
  return (
    <SafeAreaView style={CommonStyles.screen}>
      <KeyboardAvoidingView
        style={CommonStyles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={CommonStyles.authHeader}>
          <Text style={CommonStyles.authHeaderTitle}>{headerTitle}</Text>
          <Text style={CommonStyles.authHeaderSubtitle}>{headerSubtitle}</Text>
        </View>

        <View style={CommonStyles.authCard}>
          <ScrollView
            contentContainerStyle={CommonStyles.authCardContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={CommonStyles.sectionTitle}>{cardTitle}</Text>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}