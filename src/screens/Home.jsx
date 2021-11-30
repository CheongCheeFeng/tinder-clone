import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import useAuth from 'hooks/useAuth';

const Home = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  return (
    <View style={tw('justify-center flex-1 items-center')}>
      <Text>Home</Text>
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
      <Button title="Logout" onPress={logout} />

      <StatusBar style="auto" />
    </View>
  );
};
export default Home;
