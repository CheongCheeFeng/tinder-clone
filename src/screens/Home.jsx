import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import useAuth from 'hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      {/* Header Start */}
      <View style={tw('items-center justify-between flex-row px-5')}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={[tw('h-14 w-14 rounded-full'), { resizeMode: 'contain' }]}
            source={require('images/tinder-logo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* Header End */}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
export default Home;
