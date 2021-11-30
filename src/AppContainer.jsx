import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import MainStackNavigator from 'navigators/MainStackNavigator';
import AuthStackNavigator from 'navigators/AuthStackNavigator';
import useAuth from 'hooks/useAuth';

const AppContainer = () => {
  const { loggedInUser } = useAuth();
  return (
    <NavigationContainer>
      {loggedInUser ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
export default AppContainer;
