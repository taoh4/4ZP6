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
import { Dimensions } from 'react-native';

// Drag to walk
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log("\nPhone dimension get:\nWidth:",windowWidth,"Height:",windowHeight)
const Gardenviews1 = ({navigation}) => {
    // Timestamp is required for data collection
    // But not for now.
    const [pageX, setPageX] = useState(windowWidth-40)
    const [pageY, setPageY] = useState(windowHeight-60)
    
    const [startPointValid, setStartPointValid] = useState(false)
    const [goal, setGoal] = useState(false)
    const [hideInstruction, setHideInstruction] = useState(0.5)

    const goalConstant = windowHeight/2.1
    const validStartY = windowHeight*0.76
    const validStartX = windowWidth*0.6
    

    const validateStartPos = (e) => {
        if(e.nativeEvent.pageY >= validStartY && e.nativeEvent.pageX >= validStartX){
            setStartPointValid(true)
            setHideInstruction(0)
        } else {
            console.log("Invalid start point.",e.nativeEvent.pageX, e.nativeEvent.pageY, validStartX, validStartY)
        }
    }

    const validateEndPos = () => {
        if (pageY <= goalConstant){
            setGoal(true)
            setStartPointValid(false)
            console.log("Goal Complete! Display button...")
        }
    }

    const updatePos = (e) => {
        setPageX(e.nativeEvent.pageX)
        setPageY(e.nativeEvent.pageY)
        console.log('touchMove',e.nativeEvent)
        updateIconSize()
        validateEndPos()
    }

    const updateIconSize = () => {
        setWidthHeight(100 * (pageY-goalConstant+50)/goalConstant)
        console.log("X:", pageX, "Y:", pageY)
    }

    return (
        <View
            style={styles.backgound}
            onTouchStart={(e) => {
                !goal? validateStartPos(e) : {}
            }}
            onTouchMove={(e) => {
                startPointValid? updatePos(e) : {}
            }}
            onTouchEnd={() => {
                setStartPointValid(false)
                setHideInstruction(0.5)
            }}
        >
            <ImageBackground
                source={require("../../assets/garden.jpeg")}
                style={styles.image}
            >
            </ImageBackground>
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

    circle: {
        width: 0,
        height: 0,
        borderRadius: 100 / 2,
        backgroundColor: "red",
    },

    square: {
        width: 0,
        height: 0,
        backgroundColor: "#FAF9F9",
        opacity: 0.5,
    },

    button_strong: {
        backgroundColor: '#BC412B',
        borderRadius: 15,
        position: 'absolute',
        top: '40%',
        left: '20%',
    },

    textColor: {
        color: "#FAF9F9",
        padding: 15,
    },

    font_34: {
        fontSize: 34,
    },
});

export {Gardenviews1};
