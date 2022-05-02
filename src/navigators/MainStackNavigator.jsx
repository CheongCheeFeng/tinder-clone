import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Chat from 'screens/Chat';
import Home from 'screens/Home';
import Match from 'screens/Match';
import Message from 'screens/Message';
import Modal from 'screens/Modal';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Message" component={Message} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={Modal} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="Match" component={Match} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
