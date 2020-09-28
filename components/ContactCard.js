import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const ContactCard = (props) => {
  const contact = props.route.params.contact || {};
  return (
    <View>
      <View style={styles.avatarContainer}>
        <Avatar
          size="xlarge"
          rounded
          title={
            contact.title ? contact.title.$t.match(/\b(\w)/g).join('') : ''
          }
          activeOpacity={0.7}
          titleStyle={styles.avatarTitle}
          avatarStyle={styles.avatarStyle}
        />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNameStyles}>{contact.title.$t}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.labelStyle}>Mobile:</Text>
        <Text style={styles.answerStyle}>
          {contact.gd$phoneNumber ? contact.gd$phoneNumber[0].$t : 'NA'}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.labelStyle}>Address:</Text>
        <Text style={styles.answerStyle}>
          {contact.gd$postalAddress ? contact.gd$postalAddress[0].$t : 'NA'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    padding: 10
  },
  labelStyle: {
    width: '40%',
    fontWeight: 'bold'
  },
  answerStyle: {
    width: '60%'
  },
  userNameContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userNameStyles: {
    fontWeight: 'bold',
    fontSize: 30
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120
  },
  avatarStyle: {
    backgroundColor: 'white',
    zIndex: -1
  },
  avatarTitle: {
    color: 'black',
    fontSize: 50
  },
  avatarContainer: {
    alignItems: 'center'
  },
  contactCardStyle: {
    flex: 1,
    backgroundColor: 'lightgrey'
  }
});

export default ContactCard;
