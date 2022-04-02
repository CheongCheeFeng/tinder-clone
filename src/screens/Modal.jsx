import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import tw from 'tailwind-rn';
import { doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';

const Modal = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !picture || !occupation || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: name,
      photoURL: picture,
      occupation,
      age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={tw('flex-1 items-center pt-1')}>
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
        textAlign="center"
        value={picture}
        onChangeText={(value) => setPicture(value)}
      />

      <Text style={tw('text-center p-4 font-bold text-red-500')}>
        Step 2: Your Name
      </Text>

      <TextInput
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter a your name"
        textAlign="center"
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <Text style={tw('text-center p-4 font-bold text-red-500')}>
        Step 3: Your Occupation
      </Text>

      <TextInput
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your occupation"
        textAlign="center"
        value={occupation}
        onChangeText={(value) => setOccupation(value)}
      />

      <Text style={tw('text-center p-4 font-bold text-red-500')}>
        Step 4: Your Age
      </Text>

      <TextInput
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your age"
        textAlign="center"
        value={age}
        onChangeText={(value) => setAge(value)}
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        style={[
          tw('w-64 p-3 rounded-xl absolute bottom-5'),
          incompleteForm ? tw('bg-gray-400') : tw(' bg-red-400'),
        ]}
        disabled={incompleteForm}
        onPress={updateUserProfile}
      >
        <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Modal;
