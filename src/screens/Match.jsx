import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';

const Match = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { loggedInProfile, userSwiped } = params;
  return (
    <SafeAreaView style={[tw('h-full bg-red-500 pt-20'), { opacity: 0.89 }]}>
      <View style={tw('justify-center px-10 pt-20')}>
        <Image
          style={tw('h-20 w-full rounded-full')}
          source={require('images/its-a-match.png')}
        />
      </View>

      <Text style={tw('text-white text-center mt-5')}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tw('flex-row justify-evenly mt-5')}>
        <Image
          style={tw('h-32 w-32 rounded-full')}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tw('h-32 w-32 rounded-full')}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <View style={tw('items-center')}>
        <TouchableOpacity
          style={tw('bg-white m-5 px-8 py-5 rounded-full mt-20 w-1/2')}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('Chat');
          }}
        >
          <Text style={tw('text-center')}>Send a message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Match;
