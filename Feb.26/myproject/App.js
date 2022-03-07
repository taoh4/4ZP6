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
import { Outsideviews1, Outsideviews2 } from './pages/outside-view/outside-view'
import { Gardenviews1 } from './pages/garden-view/garden-view'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Sound" component={SoundCollection} />
      <Stack.Screen name="Posture" component={Sit} />
      <Stack.Screen name="Last Time Took Medicine" component={LastMedication}/>
      <Stack.Screen name="Next Time Taking Medicine" component={NextMedication} />
      <Stack.Screen name="Medicine Effectiveness" component={MedicationEffect}/>
      <Stack.Screen name="Outsideviews1" component={Outsideviews1} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Outsideviews2" component={Outsideviews2} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Gardenviews1" component={Gardenviews1} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;