import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';
import { Avatar } from 'react-native-elements';

import ContactList from './ContactList';

const LoginScreen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '436124074597-mqrtk24ddr0ap78u3nur7unv6vfp4bfu.apps.googleusercontent.com',
      scopes: [
        'https://www.google.com/m8/feeds/',
        'https://www.googleapis.com/auth/contacts.readonly'
      ],
      offlineAccess: false,
      forceCodeForRefreshToken: true,
      iosClientId:
        '436124074597-8ukt31to3to38fb23vv54o8ll0qe2hoq.apps.googleusercontent.com'
    });
    isSignedIn();
  }, [isSignedIn]);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const loggedInUser = await GoogleSignin.signIn();
      setUser(loggedInUser);
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          return Alert.alert('User cancelled the sign in flow!');
        case statusCodes.IN_PROGRESS:
          return Alert.alert('Sign in in progress!');
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return Alert.alert('Play services aren not available or outdated!');
        default:
          return Alert.alert('Something went wrong!');
      }
    }
  };
  const isSignedIn = useCallback(async () => {
    if (await GoogleSignin.isSignedIn()) {
      getCurrentUserInfo();
    }
  }, [getCurrentUserInfo]);

  const getCurrentUserInfo = useCallback(async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        Alert.alert('User has not signed in yet!');
      } else {
        Alert.alert("Something went wrong. Unable to get user's info.");
      }
    }
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      console.log('Error while logging out: ', error);
      Alert.alert('Oops!', 'Could not log user out!');
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      {user.idToken ? (
        <View>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                size="xlarge"
                rounded
                title={
                  user.user && user.user.name
                    ? user.user.name.match(/\b(\w)/g).join('')
                    : ''
                }
                activeOpacity={0.7}
                titleStyle={styles.avatarTitle}
                avatarStyle={styles.avatarStyle}
              />
            </View>
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={signOut}>
                <Text style={styles.signOutText}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ContactList />
        </View>
      ) : (
        <View style={styles.signInButtonStyles}>
          <GoogleSigninButton
            onPress={signInWithGoogle}
            style={styles.signInButtonPosition}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  signInButtonStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButtonPosition: {
    width: 192,
    height: 48
  },
  signOutText: {
    color: 'red'
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    height: '7%'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30
  },
  profileContainer: {
    padding: 5,
    flexDirection: 'column-reverse'
  },
  avatarStyle: {
    backgroundColor: 'white',
    zIndex: -1
  },
  avatarTitle: {
    color: 'black',
    fontSize: 50
  },
  logoutContainer: {
    alignItems: 'flex-end'
  },
  avatarContainer: {
    alignItems: 'center'
  }
});

export default LoginScreen;
