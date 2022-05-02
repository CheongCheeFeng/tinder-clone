import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import getMatchedUserInfo from 'lib/getMatchedUserInfo';
import useAuth from 'hooks/useAuth';
import tw from 'tailwind-rn';
import SenderMessage from 'components/SenderMessage';
import ReceiverMessage from 'components/ReceiverMessage';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';

const Message = ({ route }) => {
  const { user } = useAuth();
  const { matchDetails } = route.params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'desc'),
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        },
      ),
    [matchDetails, db],
  );

  const sendMessage = () => {
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput('');
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Header
        callEnabled
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw('pl-4')}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View
        style={tw(
          'flex-row justify-between items-center border-t border-gray-200 px-3 py-2',
        )}
      >
        <TextInput
          style={tw('h-10 text-lg w-4/5 bg-gray-200 px-4 rounded-full')}
          placeholder="Send Message"
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />
        <Button onPress={sendMessage} title="Send" color="#FF5864" />
      </View>
    </SafeAreaView>
  );
};

export default Message;
