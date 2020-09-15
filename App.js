/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
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

import Contacts from 'react-native-contacts';

const App = () => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setAndroidPermissions();
    } else {
      getContactList();
    }
  }, [setAndroidPermissions]);

  const setAndroidPermissions = useCallback(async () => {
    const contactAccess = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'ContactsApp needs access to contacts.'
      }
    );
    // Take use to settings if access is denied?
    if (contactAccess === 'denied') {
      Alert.alert(
        'Grant access!',
        'Contact access has been denied. Please go to settings and allow access to view contacts!',
        [{ text: 'Okay' }]
      );
      return;
    }
    getContactList();
  }, []);

  const getContactList = () => {
    Contacts.getAll((error, contacts) => {
      if (error === 'denied') {
        Alert.alert(
          'Grant access!',
          'Contact access has been denied. Please go to settings and allow access to view contacts!',
          [{ text: 'Okay' }]
        );
        return;
      }
      contacts = contacts.concat(contacts).concat(contacts).concat(contacts);
      contacts = contacts.concat(contacts).concat(contacts).concat(contacts);
      contacts = contacts.concat(contacts).concat(contacts).concat(contacts);
      setContactList(contacts);
      console.log('contacts', contacts);
    });
  };

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
