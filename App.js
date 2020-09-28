import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import ContactList from './components/ContactList';
import LoginScreen from './components/LoginScreen';
import ContactCard from './components/ContactCard';

const Stack = createStackNavigator();
const App = () => {
  const [icon, setIcon] = useState('ios-star');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts" component={LoginScreen} />
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen
          name="Contact Details"
          component={ContactCard}
          options={{
            headerRight: () => (
              <Icon
                style={styles.iconStyles}
                onPress={() => {
                  icon === 'ios-star'
                    ? setIcon('ios-star-outline')
                    : setIcon('ios-star');
                }}
                type="ionicon"
                name={icon}
              />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconStyles: {
    padding: 10
  }
});

export default App;
