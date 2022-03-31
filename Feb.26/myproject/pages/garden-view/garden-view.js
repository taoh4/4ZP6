import React, { useState, useEffect } from 'react';
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
import { getData, storeData } from '../api/file-storage';

// Drag to walk
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log("\nPhone dimension get:\nWidth:",windowWidth,"Height:",windowHeight)
const Gardenviews1 = ({navigation}) => {
    var flower_progress = 0
    var plant_date = Date()
    var flowerState = flowerStateFunction()
    const [progress, setProgress] = useState(0)


    storeData("flower", String(0))

    useEffect(() => {
        async function getFlower() {
            try {
                getData("flower").then(flower => flower_progress = Number(flower))
                .catch(function(error){
                    console.log(error)
            })
            } catch(error) {
                console.log(error)
            }

            console.log("progress:", flower_progress)

            if(flower_progress == null || isNaN(flower_progress)) {
                flower_progress = 0
            }

        }

            setInterval(async function() {
                if(flower_progress >= 1) {
                    flower_progress = 1
                }
                flower_progress+=0.1
                await storeData("flower", String(flower_progress))
                console.log("current progress:", flower_progress)
                flowerState = flowerStateFunction()
                console.log(flowerStateFunction())
                setProgress(flowerState)
            }, 3000)
        getFlower()

        return () => {
            console.log("unmount")
        }
    }, [])
    
    function flowerStateFunction() {
        if(flower_progress >= 0.9) {
            return 3
        }else if (flower_progress >= 0.3) {
            return 2
        }else if (flower_progress >= 0.1) {
            return 1
        }
        return 0
    }
    //var flowerState = flowerStateFunction()
    //const flowerState = 1
    //console.log("Flower State:", flowerState)

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
                {progress == 0 ? (
                    <Image 
                    source={require("../../assets/rose_0.png")}
                    style={[styles.flower]}
                    />
                    ) : (
                        <></>
                    )
                }

                {progress == 1 ? (
                    <Image 
                    source={require("../../assets/rose_1.png")}
                    style={[styles.flower, {marginTop: 50}]}
                    />
                    ) : (
                        <></>
                    )
                }

                {progress == 2 ? (
                    <Image 
                    source={require("../../assets/rose_2.png")}
                    style={styles.flower}
                    />
                    ) : (
                        <></>
                    )
                }

                {progress == 3 ? (
                    <Image 
                    source={require("../../assets/rose_3.png")}
                    style={styles.flower}
                    />
                    ) : (
                        <></>
                    )
                }
                
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

    flower: {
        height: '60%',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '40%'
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
