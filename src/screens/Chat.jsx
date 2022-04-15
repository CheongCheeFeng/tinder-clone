import ChatList from 'components/ChatList';
import Header from 'components/Header';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default Chat;
