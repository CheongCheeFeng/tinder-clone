import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'tailwind-rn';

const Home = () => {
  return (
    <View style={tw('justify-center flex-1 items-center')}>
      <Text>Hello kids</Text>
      <StatusBar style="auto" />
    </View>
  );
};
export default Home;
