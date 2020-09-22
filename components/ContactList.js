import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { GoogleSignin } from '@react-native-community/google-signin';

const defaultheader = () => {
  return {
    method: null,
    body: null,
    crossDomain: true,
    cache: false,
    async: false,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
      Accept: '*/*',
      'Access-Control-Allow-Headers': '*',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
};

const ContactList = (props) => {
  const [accessToken, setAccessToken] = useState();
  const [contactList, setContactList] = useState();
  useEffect(() => {
    getContacts();
  }, [getContacts, props.user]);

  const transformRequest = (obj) => {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  };

  const getContacts = useCallback(async () => {
    const header = defaultheader();
    let params = {
      alt: 'json',
      'max-results': 100
    };
    header.method = 'GET';
    let url =
      'https://www.google.com/m8/feeds/contacts/default/full?' +
      transformRequest(params);
    // await getAccessToken();
    let tokenResponse = await GoogleSignin.getTokens();
    // eslint-disable-next-line no-undef
    header.headers.Authorization = 'Bearer ' + tokenResponse.accessToken;
    const response = await fetch(url, header);
    let contactResponse = await response.json();
    if (contactResponse && contactResponse.feed && contactResponse.feed.entry) {
      contactResponse = contactResponse.feed.entry.filter(
        (contact) => contact.title && contact.title.$t
      );
      setContactList(contactResponse);
    }
  }, []);

  return (
    <View>
      {contactList ? (
        <FlatList
          keyExtractor={(item) => item.id.$t}
          data={contactList.sort((a, b) =>
            a.title.$t.localeCompare(b.title.$t)
          )}
          renderItem={(itemData) => (
            <TouchableOpacity activeOpacity>
              <View style={styles.contactContainer}>
                <Text style={styles.contactItem}>{itemData.item.title.$t}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    backgroundColor: 'black',
    borderBottomColor: 'white',
    borderWidth: 0.5
  },
  contactItem: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10
  }
});

export default ContactList;
