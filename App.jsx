import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import MainStackNavigator from './src/MainNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
export default App;
