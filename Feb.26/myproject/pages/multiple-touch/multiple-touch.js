import React, { useState } from 'react';
import {
    Animated,
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
import { Dimensions } from 'react-native';

const TouchView = ({navigation}) => {
    const [countL, setCountL] = useState(0);
    const [countR, setCountR] = useState(0);

    {setTimeout(() => {navigation.navigate("Gardenviews1");}, 20000)}

    return (
        <View
            style={{flex:1, flexDirection: 'column', justifyContent: 'space-between'}}
        >
            <ImageBackground
                source={require("../../assets/garden.jpeg")}
                style={[styles.image]}
            >
            </ImageBackground>
            <View style = {{flex:1}}>
                <Text style = {[styles.text]}>Left: {countL}, Right: {countR}</Text>
            </View>
            <View style = {{flexDirection: 'row',  flex:1, justifyContent: 'space-between'}}>
                <TouchableOpacity
                    style={[styles.button1]}
                    onPress={(e) => {setCountL(countL+1), console.log("Left pressed at ",e.timeStamp)}}
                >
                    <Text style={[styles.text, styles.center]}>Tap</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button2]}
                    onPress={(e) => {setCountR(countR+1), console.log("Right clicked at", e.timeStamp)}}
                >
                    <Text style={[styles.text, styles.center]}>Tap</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgound: {
        flex: 1,
        height: '100%',
    },

    image: {
        height: '100%',
        width: '100%',
    },

    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: "#FAF9F9",
        padding: 15,
        fontSize: 20,
        textAlign: 'center'
    },

    button1: {
        flex: 1,
        backgroundColor: '#B8D5B8',
        borderRadius: 15,
        margin: 5,
        padding: 50,
        width: '45%',
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 35,
        left: 10
    },

    button2: {
        flex: 1,
        backgroundColor: '#B8D5B8',
        borderRadius: 15,
        margin: 5,
        padding: 50,
        width: "45%",
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 35,
        left: 190
    },

    mt_100: {
        marginTop:100
    }


});

export {TouchView};
