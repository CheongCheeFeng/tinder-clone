import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from 'screens/Home';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
