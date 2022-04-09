import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
} from 'react-native';

import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


//{setTimeout(() => {{/*start record data*/}}, 5000)}

//{setTimeout(() => {navigation.navigate("Gardenviews1"),subscription.unsubscribe();}, 15000)}

const Pocket = ({navigation}) => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms

    var subscription = accelerometer.subscribe(
      ({ x, y, z, timestamp }) => console.log({ x, y, z, timestamp }),

      // You have to add this to prevent error in virtual environment
      error => {
        console.log("The sensor is not available");
      }
    );

    {setTimeout(() => {{/*start record data*/}}, 5000)}

    {setTimeout(() => {navigation.navigate("Gardenviews1"),subscription.unsubscribe();}, 15000)}
    return (
      <SafeAreaView>
          <View style={styles.sectionContainer}>
          <Image
                source={require("../../assets/pocket.jpg")}
                style={[styles.image]}
          >
          </Image>
          <Text style={[styles.description_34_center]}>Please put your phone in your Pocket and start walking in 5 seconds</Text>

          </View>
          
      </SafeAreaView>
    );
  };


  

  const styles = StyleSheet.create({

    sectionContainer: {
      marginTop: 24,
      paddingHorizontal: 24,
    },

    image: {
        height: '70%',
        width: '100%',
    },
  
    description_34_center: {
      top: 30,
      fontSize: 34,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

  export {Pocket};