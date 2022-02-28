import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    button_strong,
    TouchableWithoutFeedback,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Sit = ({navigation}) => {

  return (
    <SafeAreaView>
        <View style={styles.sectionContainer}>
            <Text style={[styles.title, styles.center]}>
                Note
            </Text>
            <Text style={[styles.description, styles.center, styles.font_34]}>
                Please sit down and find yourself comfortable.
            </Text>
        </View>
        <TouchableOpacity 
          style={[styles.button_normal, styles.center, styles.mt_100]}
          onPress={() => navigation.navigate("LastMedication")}
        >
          <Text style={[styles.font_34, styles.textColor]}>I have sat down</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const SoundCollection = ({navigation}) => {

  return (
    <SafeAreaView>
        <View style={styles.sectionContainer}>
            <Text style={[styles.title, styles.center]}>
                Note
            </Text>
            <Text style={[styles.description, styles.center, styles.font_34]}>
                This application may collect information of your voice!
            </Text>
        </View>
        <TouchableOpacity 
          style={[styles.button_strong, styles.center, styles.mt_100]}
          onPress={() => navigation.navigate("Sit")}
        >
          <Text style={[styles.font_34, styles.textColor]}>I Understand</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const LastMedication = ({navigation}) => {
  const [time, setTime] = useState(new Date())
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTime(currentDateTime);
    console.log("time set as: "+time)
  };

  return (
    <SafeAreaView>
        <View style={styles.sectionContainer}>
            <Text style={[styles.description, styles.center, styles.font_34]}>
                When was the last time you took medicine?
            </Text>
        </View>
        <DateTimePicker
          style={styles.mt_100}
          testID="dateTimePicker"
          value={time}
          mode={mode}
          display="spinner"
          onChange={onChange}
        />
        <TouchableOpacity 
          style={[styles.button_normal, styles.center, styles.mt_50]}
          onPress={() => {navigation.navigate("MedicationEffect")}}
        >
          <Text style={[styles.font_34, styles.textColor]}>Looks good</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button_strong, styles.center, styles.mt_50]}
          onPress={() => {navigation.navigate("NextMedication")}}
        >
          <Text style={[styles.font_34, styles.textColor]}>Not yet</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};


const NextMedication = ({navigation}) => {
  const [time, setTime] = useState(new Date())
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTime(currentDateTime);
    console.log("time set as: "+time)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <SafeAreaView>
        <View style={styles.sectionContainer}>
            <Text style={[styles.description, styles.center, styles.font_34]}>
                When will be the
            </Text>
            <Text style={[styles.description, styles.center, styles.font_34, styles.strong]}>
                next time
            </Text>
            <Text style={[styles.description, styles.center, styles.font_34]}>
                you plan to take medicine?
            </Text>
        </View>
        <DateTimePicker
          style={styles.mt_100}
          testID="dateTimePicker"
          value={time}
          mode={mode}
          display="spinner"
          onChange={onChange}
        />
        <TouchableOpacity 
          style={[styles.button_normal, styles.center]}
          onPress={() => {navigation.navigate("Outsideviews1")}}
        >
          <Text style={[styles.font_34, styles.textColor]}>Looks good</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const MedicationEffect = ({navigation}) => {
  const [time, setTime] = useState(new Date())
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTime(currentDateTime);
    console.log("time set as: "+time)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <SafeAreaView>
        <View style={styles.sectionContainer}>
            <Text style={[styles.description, styles.center, styles.font_34]}>
                Can you feel the medicine is working?
            </Text>
        </View>
        <TouchableOpacity 
          style={[styles.button_normal, styles.center, styles.mt_100]}
          onPress={() => {navigation.navigate("NextMedication")}}
        >
          <Text style={[styles.font_34, styles.textColor]}>I can feel it!</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button_strong, styles.center, styles.mt_50]}
          onPress={() => {navigation.navigate("NextMedication")}}
        >
          <Text style={[styles.font_34, styles.textColor]}>I don't think so</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 70,
    paddingHorizontal: 24,
  },

  background: {
    flex:1,
    width:'100%', 
    height:'100%',
  },

  title: {
    fontSize: 64,
    fontWeight: '600',
    color: 'red',
  },

  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },

  description: {
    top: 50,
  },

  font_34: {
    fontSize: 34,
  },

  button_strong: {
    backgroundColor: '#BC412B',
    borderRadius: 15,
  },

  button_normal: {
    backgroundColor: '#B8D5B8',
    borderRadius: 15,
  },

  textColor: {
    color: "#FAF9F9",
    padding: 15,
  },

  strong: {
    color: "red",
    fontSize: 40,
    fontWeight: 'bold',
  },

  mt_50: {
    marginTop:50
  },

  mt_100: {
    marginTop:100
  }
});

export { Sit, SoundCollection, LastMedication, NextMedication, MedicationEffect };