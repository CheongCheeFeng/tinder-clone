import React from 'react';
import { AuthProvider } from 'hooks/useAuth';
import AppContainer from 'AppContainer';

const App = () => {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
};
export default App;
