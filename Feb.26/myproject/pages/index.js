import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Button,
    TouchableWithoutFeedback
} from 'react-native';

const TestPage = () => {
    //const isDarkMode = useColorScheme() === 'dark';

    // const backgroundStyle = {
    //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // };
    let x = "test string"
    console.log("App executed "+x)

    return (
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={() => console.log("touched")}>
            <View>
                <Text style={[styles.title, styles.center]}>
                    Note
                </Text>
                <Text style={[styles.description, styles.center]}>
                    This application may collect information of your voice
                </Text>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: '600',
    color: 'red',
  },

  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },

  description: {
    fontSize: 34,
  }
});

export default TestPage;
