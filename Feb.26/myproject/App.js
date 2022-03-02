/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import { Sit, SoundCollection, LastMedication, NextMedication, MedicationEffect } from './pages/welcome-screen/welcome';
import { Outsideviews1 } from './pages/outside-view/outside-view'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Sound" component={SoundCollection} options={{ headerShown: false }} />
      <Stack.Screen name="Sit" component={Sit} options={{ headerShown: false }} />
      <Stack.Screen name="LastMedication" component={LastMedication} options={{ headerShown: false }} />
      <Stack.Screen name="NextMedication" component={NextMedication} options={{ headerShown: false }} />
      <Stack.Screen name="MedicationEffect" component={MedicationEffect} options={{ headerShown: false }} />
      <Stack.Screen name="Outsideviews1" component={Outsideviews1} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;