import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import useAuth from 'hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import generateID from 'lib/generateId';
import { db } from '../../firebase';

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

    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribe;

    const fetchProfiles = async () => {
      const passed = await getDocs(
        collection(db, 'users', user.uid, 'passed'),
      ).then((snapshot) => snapshot.docs.map((docData) => docData.id));

      const liked = await getDocs(
        collection(db, 'users', user.uid, 'liked'),
      ).then((snapshot) => snapshot.docs.map((docData) => docData.id));

      const passedUid = passed.length > 0 ? passed : [user.uid];

      const likedUid = liked.length > 0 ? liked : [user.uid];

      unsubscribe = onSnapshot(
        query(
          collection(db, 'users'),
          where('id', 'not-in', [...passedUid, ...likedUid]),
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((docData) => docData.id !== user.uid)
              .map((docData) => ({
                id: docData.id,
                ...docData.data(),
              })),
          );
        },
      );
    };

    fetchProfiles();
    return unsubscribe;
  }, []);

  const onSwipedLeft = async (index) => {
    if (!profiles[index]) return;

    const userSwiped = profiles[index];
    setDoc(doc(db, 'users', user.uid, 'passed', userSwiped.id), userSwiped);
    console.log('Swipe Pass');
  };

  const onSwipedRight = async (index) => {
    if (!profiles[index]) return;

    const userSwiped = profiles[index];
    const loggedInProfile = await (
      await getDoc(doc(db, 'users', user.uid))
    ).data();

    // Check if the user swiped on you
    getDoc(doc(db, 'users', userSwiped.id, 'liked', user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you mathced with them
          console.log(`You mathced with ${userSwiped.displayName}`);

          setDoc(
            doc(db, 'users', user.uid, 'liked', userSwiped.id),
            userSwiped,
          );

          // Create a MATCH
          setDoc(doc(db, 'matches', generateID(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate('Match', {
            loggedInProfile,
            userSwiped,
          });
        } else {
          // user has not matched with you before
          console.log(`You liked on ${userSwiped.displayName}`);

          setDoc(
            doc(db, 'users', user.uid, 'liked', userSwiped.id),
            userSwiped,
          );
        }
      },
    );

    setDoc(doc(db, 'users', user.uid, 'liked', userSwiped.id), userSwiped);
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      <StatusBar style="auto" />
      {/* Header Start */}
      <View
        style={[
          tw('items-center justify-between flex-row px-5 py-1'),
          styles.headerShadow,
        ]}
      >
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
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
          onSwipedLeft={(cardIndex) => {
            onSwipedLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            onSwipedRight(cardIndex);
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
                      {card.displayName}
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
  headerShadow: {
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});
