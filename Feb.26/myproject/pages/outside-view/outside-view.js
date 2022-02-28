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

const Outsideviews1 = ({navigation}) => {
    return (
        <View
            style={styles.backgound}
            onTouchStart={(e) => {console.log('touchMove',e.nativeEvent)}}
            onTouchMove={(e) => {console.log('touchMove',e.nativeEvent)}}
        >
            <Image
                source={require("../../assets/welcome.jpeg")}
                style={styles.image}
            >
            </Image>
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
    }
});

export {Outsideviews1};
