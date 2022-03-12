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

// For test
const Box = (box_id, width_in, height_in) => {
    const [boxID, setBoxId] = useState(box_id)
    const [width, setWidth] = useState(width_in)
    const [height, setHeight] = useState(height_in)

    console.log(box_id, width_in, height)
    return (
        <>
        {/* <TouchableOpacity 
            style={[styles.square, {width: width, height: height}]}
            onPress={() => console.log(boxID)}
        /> */}
        </>
        
        
    )
}

const styles = StyleSheet.create({
        square: {
        marginTop: 20,
        width: 50,
        height: 50,
        backgroundColor: "red",
        borderRadius: 15,
    },
})

export default Box