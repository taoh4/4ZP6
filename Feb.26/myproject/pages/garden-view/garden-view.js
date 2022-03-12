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

// Drag to walk
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log("\nPhone dimension get:\nWidth:",windowWidth,"Height:",windowHeight)
const Gardenviews1 = ({navigation}) => {
    const [pageX, setPageX] = useState(windowWidth-40)
    const [pageY, setPageY] = useState(windowHeight-60)
    const [rowCol, setRowCol] = useState(2)
    const MAX_ROW_COL = 5
    var box_id = []

    return (
        <View
            style={styles.backgound}
            onTouchStart={(e) => {
            }}
            onTouchMove={(e) => {
            }}
            onTouchEnd={() => {
                
            }}
        >
            <ImageBackground
                source={require("../../assets/garden.jpeg")}
                style={[styles.image]}
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

    flex: {
        top: '20%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    square: {
        marginTop: 20,
        width: 50,
        height: 50,
        backgroundColor: "red",
        borderRadius: 15,
    },

    row: {
        flexDirection: "row",
        flexWrap: "wrap",
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
