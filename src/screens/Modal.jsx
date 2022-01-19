import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';

const Modal = () => {
  const { user } = useAuth();
  const [picture, setPicture] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [age, setAge] = useState(null);

  return (
    <SafeAreaView style={tw('flex-1 items-center pt-1')}>
      <Image
        style={tw('h-20 w-full')}
        resizeMode="contain"
        source={{ uri: 'https://links.papareact.com/2pf' }}
      />

      <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw('text-center p-4 font-bold text-red-500')}>
        Step 1: The Profile Picture
      </Text>

      <TextInput
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter a Profile Pic Url"
        textAlign="left"
        value={picture}
        onChangeText={(value) => setPicture(value)}
      />

      <Text style={tw('text-center p-4 font-bold text-red-500')}>
        Step 2: Your Occupation
      </Text>

      <TextInput
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your occupation"
        textAlign="left"
        value={occupation}
        onChangeText={(value) => setOccupation(value)}
      />

      <Text style={tw('text-center p-4 font-bold text-red-500')}>
        Step 3: Your Age
      </Text>

      <TextInput
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your age"
        textAlign="left"
        value={age}
        onChangeText={(value) => setAge(value)}
      />

      <TouchableOpacity
        style={tw('w-64 p-3 rounded-xl absolute bottom-10 bg-red-400')}
      >
        <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Modal;
