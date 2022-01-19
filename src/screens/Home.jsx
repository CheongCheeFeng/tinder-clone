import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import useAuth from 'hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const DUMMY_USER = [
  {
    id: 1,
    firstName: 'Elon',
    lastName: 'Musk',
    occupation: 'Billionaire',
    photoURL:
      'https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg',
    age: 50,
  },
  {
    id: 2,
    firstName: 'Tom',
    lastName: 'Holland',
    occupation: 'Spider Man',
    photoURL:
      'https://www.gannett-cdn.com/presto/2021/12/10/USAT/5566ade2-b43b-4e78-948d-032fe3a1909a-XXX_120921_NYC_TomHolland007.JPG?width=1200&disable=upscale&format=pjpg&auto=webp',
    age: 25,
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Parker',
    occupation: 'Avengers',
    photoURL:
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1e/Spider-Man_%28No_Way_Home%29.jpeg/revision/latest?cb=20211024193518',
    age: 27,
  },
];

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate('Modal');
      }
    });

    return unsubscribe();
  }, []);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <StatusBar style="auto" />

      {/* Header Start */}
      <View style={tw('items-center justify-between flex-row px-5')}>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={[tw('h-14 w-14 rounded-full'), { resizeMode: 'contain' }]}
            source={require('images/tinder-logo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* Header End */}

      {/* Card Start */}
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          animateOverlayLabelsOpacity
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
                wrapper: {
                  elevation: 5,
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4DED30',
                },
                wrapper: {
                  elevation: 5,
                },
              },
            },
          }}
          onSwipedLeft={() => {
            console.log('Swipe Pass');
          }}
          onSwipedRight={() => {
            console.log('Swipe Match');
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={[
                  tw('relative bg-white h-3/4 rounded-xl'),
                  styles.cardShadow,
                ]}
              >
                <Image
                  style={tw('absolute top-0 h-full w-full rounded-xl')}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={tw(
                    'absolute bottom-0 bg-white h-20 w-full flex-row justify-between items-center px-6 py-2 rounded-b-xl',
                  )}
                >
                  <View>
                    <Text style={tw('text-2xl font-bold')}>
                      {card.firstName}
                      {card.lastName}
                    </Text>
                    <Text>{card.occupation}</Text>
                  </View>
                  <Text style={tw('text-2xl font-bold')}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    'relative bg-white h-3/4 rounded-xl justify-center items-center',
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tw('font-bold pb-5')}>No more profiles</Text>

                <Image
                  style={tw('h-20 w-20')}
                  height={100}
                  width={100}
                  source={{ uri: 'https://links.papareact.com/6gb' }}
                />
              </View>
            )
          }
        />
      </View>
      {/* Card End */}

      <View style={tw('flex flex-row justify-evenly pb-8')}>
        <TouchableOpacity
          style={tw(
            'items-center justify-center rounded-full w-16 h-16 bg-red-200',
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={36} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(
            'items-center justify-center rounded-full w-16 h-16 bg-green-200',
          )}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
