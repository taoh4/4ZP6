import React, { useState, useRef, useEffect } from 'react';
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
import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";
import { shuffle } from '../api/util'; 

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log("\nPhone dimension get:\nWidth:",windowWidth,"Height:",windowHeight)

setUpdateIntervalForType(SensorTypes.accelerometer, 400)
const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
        console.log({ x, y, z, timestamp }),
        error => {
            console.log("The sensor is not available");
        }
    );
// Drag to walk
const Outsideviews1 = ({navigation}) => {
    // Timestamp is required for data collection
    // But not for now.
    const [pageX, setPageX] = useState(windowWidth-40)
    const [pageY, setPageY] = useState(windowHeight-60)
    
    const [startPointValid, setStartPointValid] = useState(false)
    const [goal, setGoal] = useState(false)
    const [widthHeight, setWidthHeight] = useState(100)
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
                source={require("../../assets/welcome.jpeg")}
                style={styles.image}
            >
                {!goal? 
                    <>
                        <View style={[styles.circle, {position: 'absolute', top: pageY-widthHeight/2, left: pageX-widthHeight/2, width: widthHeight, height: widthHeight}]} />
                        <Text style={[styles.font_34, styles.textColor, {position:'absolute', right:0, bottom:windowHeight-validStartY, opacity: hideInstruction*2}]}>Start From Here!</Text>
                        <View 
                            style={[styles.square1, {position: 'absolute', top: validStartY, left: validStartX, width: validStartY, height: validStartY, opacity: hideInstruction}]}

                            onTouchEnd={() => setStartPointValid(false)}
                        />
                    </>
                : (
                    <>
                        <TouchableOpacity 
                            style={styles.button_strong}
                            onPress={() => {
                                navigation.navigate("Gardenviews1")
                            }}
                            >
                            <Text 
                                style={[styles.font_34, styles.textColor]}>I'm Here!</Text>
                        </TouchableOpacity>
                    </>
                )} 
            </ImageBackground>
        </View>
    );
};

var viewPos = {}
const Outsideviews2 = ({navigation}) => {
    const [rowCol, setRowCol] = useState(2)
    const MAX_ROW_COL = 5
    var box_id = []
    var correct_seq = []
    var correct_seq_queue = []
    var click_seq = []
    // const fadeAnim = useRef([])
    const fadeAnim = useRef([])
    const blockClick = useRef(true)
    const elementPos = {}
    const boxPos = {}
    initRef()

    useEffect(() => {
        blockClick.current=true
        setTimeout(seq_blink, 1000)
        setTimeout(function() {
            elementPos[-1] = viewPos[-1]
            for(let i = 0; i < rowCol*rowCol; i++) {
                boxInfo = {}
                boxInfo["boxID"] = i
                boxInfo["top-left-corner"] = {"x": elementPos[-1]["x"] + elementPos[i]["x"], "y": elementPos[-1]["y"]  + elementPos[i]["y"]}
                boxInfo["height"] = elementPos[i]["height"]
                boxInfo["width"] = elementPos[i]["width"]
                boxInfo["center"] = {"x": boxInfo["top-left-corner"]["x"] + boxInfo["width"]/2, "y": boxInfo["top-left-corner"]["y"] + boxInfo["height"]/2}
                boxPos[i] = boxInfo
            }
        }, 1000)
        setTimeout(function(){
            blockClick.current=false
            console.log("======= Animation Finished =======")
            for(let i = 0; i < rowCol*rowCol; i++){
                console.log(boxPos[i])
            }
        }, 1000+700*rowCol)
    })
    

    const seq_blink = () => {
        var animateSequence = []
        for(let i = 0; i < rowCol; i++) {
            const box_id = correct_seq_queue.shift()
            console.log("box id:", box_id)
            animateSequence.push(
                Animated.sequence(
                    [
                        Animated.timing(fadeAnim.current[box_id], {
                            toValue: 0.3,
                            duration: 200,
                            delay: 200,
                            useNativeDriver: true
                        }),
                        Animated.timing(fadeAnim.current[box_id], {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true
                        })
                    ]
                )
            )
        }
        Animated.sequence(animateSequence).start()
    }

    function calc_center(boxID, touchPos)  {
        const center = boxPos[boxID]["center"]
        return Math.sqrt((touchPos["x"]-center["x"])*(touchPos["x"]-center["x"]) + (touchPos["y"]-center["y"])*(touchPos["y"]-center["y"]))
    }

    function initRef() {
        const animateInitialValue = []
        for(let i = 0; i < rowCol*rowCol; i++) {
            animateInitialValue.push(new Animated.Value(1))
        }
        fadeAnim.current = animateInitialValue
    }

    const boxes = () => {
        click_seq = []
        box_id = []
        // set id of the boxes
        for(let i = 0; i < rowCol*rowCol; i++){
            box_id.push(i)
        }

        // initialize correct sequence for clicking
        for(let i = 0; i < rowCol; i++) {
            correct_seq = box_id.slice()
            shuffle(correct_seq)
            correct_seq = correct_seq.slice(0, rowCol)
            correct_seq_queue = correct_seq.slice()
        }
    }
    boxes()


    const ifNextLevel = () => {
        if(click_seq.length < correct_seq.length) {
            return
        }
        // data
        // check array equality
        if(JSON.stringify(click_seq) === JSON.stringify(correct_seq)) {
            console.log("great! going to next level.")
            click_seq=[]
            setTimeout(nextLevelInit, 300)
            return
        }
        console.log("level failed")
        click_seq=[]
        endLevel()
    }

    const nextLevelInit = () => {
        click_seq = []
        if(rowCol<MAX_ROW_COL){
            setRowCol(rowCol+1)
        }else{
            endLevel()
        }
    }

    const endLevel = () => {
        console.log("=== end level recieved, next scene to be implemented ===")
    }

    function onLayout(event, boxID){
        elementPos[boxID] = event.nativeEvent.layout
        if(boxID == -1){
            viewPos[boxID] = event.nativeEvent.layout
        }
    }

    return (
        <View
            style={styles.backgound}
            onTouchStart={(e) => {
                console.log("\nx:", e.nativeEvent.pageX, "\ny:", e.nativeEvent.pageY, "\ntimestamp:", e.nativeEvent.timestamp)
            }}
            onTouchMove={() => {
            }}
            onTouchEnd={() => {
            }}
        >
            <ImageBackground
                source={require("../../assets/welcome.jpeg")}
                style={[styles.image]}
            >
                <View style={[styles.flex, styles.row, {top: '50%'}]}                
                    onLayout = {(e) => onLayout(e, -1)}
                >
                    {box_id.map((boxID) => { 
                        return(
                            <TouchableOpacity 
                                onLayout = {(e) => onLayout(e, boxID)}
                                style={[{width: String(90/rowCol)+'%', height: (42/rowCol)+'%', marginTop: 10}]}
                                key={boxID}
                                onPress={(e) => {
                                    if(!blockClick.current){
                                        click_seq.push(boxID)
                                        console.log("\nclick sequence:", click_seq, "\ndistance to box center:", calc_center(boxID, {"x": e.nativeEvent.pageX, "y": e.nativeEvent.pageY}))
                                        ifNextLevel()
                                    }
                                }
                            }
                            > 
                                <Animated.View
                                    style={[styles.square2, {opacity: fadeAnim.current[boxID], width: '100%', height: '100%', marginRight: 'auto', marginLeft: 'auto'}]}
                                />
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
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

    square1: {
        width: 0,
        height: 0,
        backgroundColor: "#FAF9F9",
        opacity: 0.5,
    },

    square2: {
        width: 50,
        height: 50,
        backgroundColor: "red",
        borderRadius: 15,
    },

    flex: {
        top: '20%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
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

export { Outsideviews1, Outsideviews2 };
