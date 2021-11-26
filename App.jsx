import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-rn';

export default function App() {
  return (
    <View style={tw('justify-center flex-1 items-center')}>
      <Text>Hello roshan</Text>
      <StatusBar style="auto" />
    </View>
  );
}
