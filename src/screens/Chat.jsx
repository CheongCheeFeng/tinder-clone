import ChatList from 'components/ChatList';
import Header from 'components/Header';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default Chat;
