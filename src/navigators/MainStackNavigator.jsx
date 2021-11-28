import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Chat from 'screens/Chat';
import Home from 'screens/Home';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
