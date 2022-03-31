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

var flower_progress = -999999
const Gardenviews1 = ({navigation}) => {
    var plant_date = new Date()
    var flowerState = flowerStateFunction()
    const [progress, setProgress] = useState(-2)

    async function update() {
        if(flower_progress >= 1) {
            flower_progress = 1
        }
        flower_progress+=0.1
        await storeData("flower", JSON.stringify({progress: String(flower_progress), last_modify: new Date()}))
        console.log("current progress:", flower_progress)
        flowerState = flowerStateFunction()
        console.log(flowerStateFunction())
        setProgress(flowerState)
    }

    useEffect(() => {
        async function getFlower() {
            try {
                getData("flower").then(flower => {
                    flower_progress = Number(JSON.parse(flower).progress)
                    plant_date = new Date(JSON.parse(flower).last_modify)
                })
                .catch(function(error){
                    console.log(error)
                })
            } catch(error) {
                console.log(error)
            }
        }
        getFlower()
        update()
        setInterval(update, 3000)

        return () => {
            console.log("unmount")
        }
    }, [])

    function plant() {
        storeData("flower", JSON.stringify({progress: String(0), last_modify: String(new Date())}))
    }
    
    function flowerStateFunction() {
        if (flower_progress >= 1) {
            return 4
        }else if(flower_progress >= 0.9) {
            return 3
        }else if (flower_progress >= 0.3) {
            return 2
        }else if (flower_progress >= 0.1) {
            return 1
        }else if (flower_progress >= 0) {
            return 0
        }
        return -1
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
                {progress == -1 ? (
                    <TouchableOpacity 
                        style={styles.button_strong}
                        onPress={() => {
                            plant()
                            flower_progress = 0
                            setProgress(0)
                        }}
                        >
                        <Text 
                            style={[styles.font_34, styles.textColor]}>Plant my flower</Text>
                    </TouchableOpacity>
                ) : (
                    <></>
                )}

                {progress == 0 ? (
                    <Image 
                    source={require("../../assets/rose_0.png")}
                    style={[styles.flower, {width: '30%', height: '15%', top: '84%'}]}
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

                {progress == 4 ? (
                    <>
                        <Image 
                            source={require("../../assets/rose_3.png")}
                            style={styles.flower}
                        />
                        <TouchableOpacity 
                            style={[styles.button_strong, {top: '30%'}]}
                            onPress={() => {
                                plant()
                                flower_progress = 0
                                setProgress(0)
                            }}
                            >
                            <Text 
                                style={[styles.font_34, styles.textColor]}>It's grown up</Text>
                        </TouchableOpacity>
                    </>

                ) : (
                    <></>
                )}
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
