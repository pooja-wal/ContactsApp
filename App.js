/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';

import Contacts from 'react-native-contacts';

const App = () => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '436124074597-mqrtk24ddr0ap78u3nur7unv6vfp4bfu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '436124074597-8ukt31to3to38fb23vv54o8ll0qe2hoq.apps.googleusercontent.com' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  // const signInWithGoogle = useCallback(async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true
  //     });
  //     await GoogleSignin.configure({
  //       scopes: [
  //         'https://www.google.com/m8/feeds/',
  //         'https://www.googleapis.com/auth/contacts.readonly'
  //       ],
  //       webClientId:
  //         '436124074597-8ukt31to3to38fb23vv54o8ll0qe2hoq.apps.googleusercontent.com',
  //       offlineAccess: false,
  //       hostedDomain: '',
  //       forceConsentPrompt: true,
  //       accountName: ''
  //     });
  //   } catch (error) {
  //     console.log('Oops!', error);
  //   }
  // }, []);

  // const setAndroidPermissions = useCallback(async () => {
  //   const contactAccess = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //     {
  //       title: 'Contacts',
  //       message: 'ContactsApp needs access to contacts.'
  //     }
  //   );
  //   if (contactAccess === 'denied') {
  //     Alert.alert(
  //       'Grant access!',
  //       'Contact access has been denied. Please go to settings and allow access to view contacts!',
  //       [{ text: 'Okay' }]
  //     );
  //     return;
  //   }
  //   getContactList();
  // }, []);

  // const getContactList = () => {
  //   Contacts.getAll((error, contacts) => {
  //     if (error === 'denied') {
  //       Alert.alert(
  //         'Grant access!',
  //         'Contact access has been denied. Please go to settings and allow access to view contacts!',
  //         [{ text: 'Okay' }]
  //       );
  //       return;
  //     }
  //     contacts = contacts.concat(contacts).concat(contacts).concat(contacts);
  //     setContactList(contacts);
  //     console.log('contacts', contacts);
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.recordID}
        data={contactList}
        renderItem={(itemData) => (
          <TouchableOpacity activeOpacity>
            <View style={styles.contactContainer}>
              <Text style={styles.contactItem}>{itemData.item.givenName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '20%' : '10%'
  },
  contactContainer: {
    backgroundColor: 'black',
    borderBottomColor: 'white',
    borderWidth: 0.5
  },
  contactItem: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default App;
