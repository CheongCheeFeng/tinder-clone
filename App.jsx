import React from 'react';
import { AuthProvider } from 'hooks/useAuth';
import AppContainer from 'AppContainer';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
};
export default App;
