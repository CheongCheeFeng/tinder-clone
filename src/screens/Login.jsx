import useAuth from 'hooks/useAuth';
import React from 'react';
import { View, Text, Button } from 'react-native';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <View>
      <Text>Login</Text>
      <Button title="Login" onPress={signInWithGoogle} />
    </View>
  );
};

export default Login;
