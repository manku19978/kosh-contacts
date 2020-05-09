import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main'
import ContactScreen from './components/ContactList'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;