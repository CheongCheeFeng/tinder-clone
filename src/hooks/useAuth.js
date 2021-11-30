import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../../firebase';

const AuthContext = createContext({});
const config = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in
          setLoggedInUser(user);
        } else {
          // Not logged in
          setLoggedInUser(null);
        }

        setLoadingInitial(false);
      }),
    [],
  );

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === 'success') {
          // login
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };
  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loading,
        error,
        signInWithGoogle,
        logout,
      }}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
