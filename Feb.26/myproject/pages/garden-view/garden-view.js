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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import * as Progress from 'react-native-progress';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

// Drag to walk
var elementPos = {};
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log(
  '\nPhone dimension get:\nWidth:',
  windowWidth,
  'Height:',
  windowHeight,
);

function onLayout(event, id) {
  const pos = event.nativeEvent.layout;
  elementPos[id] = {
    width: 100,
    height: 100,
    'top-left-corner': {x: pos['x'], y: windowHeight - 50 - 100},
  };
  elementPos[id]['center'] = {
    x: elementPos[id]['top-left-corner']['x'] + elementPos[id]['width'] / 2,
    y: elementPos[id]['top-left-corner']['y'] + elementPos[id]['height'] / 2,
  };
}

var flower_progress = -999999;
var protectedState = false;
var processLock = false;
var multiTouch = [false, true, false, false]
function Gardenviews1({navigation}) {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  var last_modify = new Date();
  var flowerState = flowerStateFunction();
  const [multiTouchInProgress, setMultiTouchInProgress] = useState(false)
  const [progress, setProgress] = useState(-2);
  const [misfortune, setMisfortune] = useState(0);
  const [pullLock, setPullLock] = useState(true);
  const [wateringProcess, setWateringProcess] = useState(0)
  const [pressLock, setPressLock] = useState(false)
  const [progressBar, setProgressBar] = useState(0)
  const WATER_CAN_DEFAULT_ANGLE = 45
  const MAX_MISFORTUNE = 2

  onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      // setState({
      //     recordSecs: e.currentPosition,
      //     recordTime: audioRecorderPlayer.mmssss(
      //         Math.floor(e.currentPosition),
      //     ),
      // });
      // return;
    });
    console.log('Saving at location ===>', result);
  };

  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setState({
    //     recordSecs: 0,
    // });
    console.log(result, 'is saved.');
  };

  async function update() {
    if (flower_progress >= 1) {
      flower_progress = 1;
    }
    if (processLock == true) {
      return;
    }
    flower_progress += 0.1;
    await storeData(
      'flower',
      JSON.stringify({
        progress: String(flower_progress),
        last_modify: new Date(),
        misfortune: misfortune
      }),
    );
    flowerState = flowerStateFunction();
    console.log(flowerStateFunction());
    setProgress(flowerState);
    setProgressBar(flower_progress)
  }

  useEffect(() => {
    var temp = ""
    async function getFlower() {
      try {
        getData('flower')
          .then(flower => {
            flower_progress = Number(JSON.parse(flower).progress);
            last_modify = new Date(JSON.parse(flower).last_modify);
            temp = JSON.parse(flower).misfortune
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getFlower();
    update();
    setInterval(update, 3000);

    if(temp != 0) {
        setMisfortune(temp);
    }else {
        //setMisfortune(Math.floor(Math.random() * 1 + 1))
        setMisfortune(0)
    }

    return () => {
      console.log('unmount');
    };
  }, []);

  useEffect(() => {
    if(wateringProcess >= 1) {
        setWateringProcess(0)
        setMisfortune(0)
        processLock = false
    }
  }, [wateringProcess])
  
  function plant() {
    storeData(
      'flower',
      JSON.stringify({progress: String(0), last_modify: String(new Date()), misfortune: misfortune}),
    );
  }

  function flowerStateFunction() {
    if (protectedState) {
      return 5;
    }
    if (flower_progress >= 1) {
      return 4;
    } else if (flower_progress >= 0.9) {
      return 3;
    } else if (flower_progress >= 0.6) {
      return 2;
    } else if (flower_progress >= 0.3) {
      return 1;
    } else if (flower_progress >= 0) {
      return 0;
    }
    return -1;
  }

  async function removeFlower() {
    flower_progress = NaN;
    setProgress(-1);
    setProgressBar(0)
    setMisfortune(-1)
    await storeData(
      'flower',
      JSON.stringify({
        progress: String(flower_progress),
        last_modify: new Date(),
        misfortune: misfortune
      }),
    );
  }

  function checkMultiTouch() {
      if(multiTouch, multiTouch[0] && multiTouch[1] && multiTouch[2] && multiTouch[3]){
        setMultiTouchInProgress(true)
      }
      console.log(multiTouch, multiTouchInProgress)
      return multiTouchInProgress
  }

  return (
    <View onTouchStart={e => {}} onTouchMove={e => {}} onTouchEnd={() => {}}>
      <ImageBackground
        source={require('../../assets/garden.jpeg')}
        style={[styles.image]}>
        {progress == -1 ? (
          <TouchableOpacity
            style={[
              styles.button_strong,
              {top: '30%', width: '80%'},
              styles.center,
            ]}
            onPress={() => {
              plant();
              flower_progress = 0;
              setProgress(0);
            }}>
            <Text style={[styles.font_34, styles.textColor, styles.center]}>
              Plant my flower
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {progress == 0 ? (
          <Image
            source={require('../../assets/rose_0_e.png')}
            style={[styles.flower]}
          />
        ) : (
          <></>
        )}

        {progress == 1 ? (
          <Image
            source={require('../../assets/rose_1.png')}
            style={[styles.flower, {top: '50%'}]}
          />
        ) : (
          <></>
        )}

        {progress == 2 ? (
          <Image
            source={require('../../assets/rose_2.png')}
            style={styles.flower}
          />
        ) : (
          <></>
        )}

        {progress == 3 ? (
          <Image
            source={require('../../assets/rose_3.png')}
            style={styles.flower}
          />
        ) : (
          <></>
        )}

        {progress == 4 ? (
          <>
            <Image
              source={require('../../assets/rose_3.png')}
              style={styles.flower}
            />
            <TouchableOpacity
              style={[styles.button_strong, styles.center]}
              onPress={() => {
                //setProgress(5);
                //protectedState = true;
                removeFlower();
              }}>
              <Text style={[styles.font_34, styles.textColor, styles.center]}>
                It's grown up
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}

        {progress == 5 ? (
          <>
            <Image
              source={require('../../assets/rose_3.png')}
              style={styles.flower}
              onTouchStart={console.log(114514)}
              onTouchMove={console.log(1919810)}
            />
          </>
        ) : (
          <></>
        )}

        {misfortune == 0 ? (
          <Progress.Bar 
            progress={progressBar} width={200} 
            style={[styles.center, {top: -300}]}
          />
        ) : (
          <></>
        )}

        {/* Mouse: voice collection */}
        {misfortune == 1 && progress != -1 && progress != 4 ? (
            <>
                {pressLock ? 
                    <View
                        style = {{
                            top: -400,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                      <CountdownCircleTimer
                        isPlaying
                        duration={7}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        size={200}
                        onComplete={() => {
                            setMisfortune(0)
                            processLock = false
                            setPressLock(false)
                        }}
                    >
                        {({ remainingTime }) => <><Text style={[styles.center, styles.font_34]}>{remainingTime}</Text></>}
                        </CountdownCircleTimer>  
                    </View>
                     : 
                    <></>
                }
                
  
                <Image
                    onTouchStart={() => {
                    this.onStartRecord().catch(function (error) {
                        console.log(error);
                    });
                    setPressLock(true)
                    processLock = true
                    }}
                    onTouchEnd={() => {
                    this.onStopRecord().catch(function (error) {
                        console.log(error);
                    });
                    setPressLock(false)
                    processLock = false
                    }}
                    source={require('../../assets/mouse.png')}
                    style={{
                        position: 'absolute',
                        width: 120,
                        height: 170,
                        top: windowHeight - 170,
                        left: 5
                    }}
                />
          </>
          
        ) : (
          <></>
        )}

        {/* Watering: two fingers rapid click */}
        {misfortune == 2 && progress != -1 && progress != 4 ? (
          <>
            <Animated.Image
                source={require('../../assets/watering_can.png')}
                style={{ height: 140, width: 140, marginLeft: 'auto', marginRight: 'auto', marginTop: -300, transform: [{rotate: WATER_CAN_DEFAULT_ANGLE-wateringProcess/2*100+'deg'}]}}
            />
            <Progress.Pie
                progress={wateringProcess} size={100}
                style={{marginLeft: 'auto', marginRight: 'auto', marginTop: -250}}
            />
            <View style={styles.flex}>
              <View
                onLayout={e => onLayout(e, 0)}
                style={[
                  styles.button_multi,
                  {
                    position: 'absolute',
                    bottom: 50,
                    left: 5,
                    width: 100,
                    height: 100,
                  },
                ]}
                onTouchStart={e => {
                  console.log(
                    'Button 1 pressed',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                  );
                  setWateringProcess(wateringProcess+0.02);
                  processLock = true
                }}
                onTouchEnd={e =>
                  console.log(
                    'Button 1 released',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                  )
                }></View>

              <View
                onLayout={e => onLayout(e, 1)}
                style={[
                  styles.button_strong,
                  {
                    position: 'absolute',
                    bottom: 50,
                    right: 5,
                    width: 100,
                    height: 100,
                  },
                ]}
                onTouchStart={e => {
                  console.log(
                    'Button 2 pressed',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                  );
                  setWateringProcess(wateringProcess+0.02);
                  processLock = true
                }}
                onTouchEnd={e =>
                  console.log(
                    'Button 2 released',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                  )
                }></View>
            </View>
          </>
        ) : (
          <></>
        )}

        {misfortune == 3 && progress != -1 && progress != 4 ? (
            <>
            {multiTouchInProgress ? 
                <View
                    style = {{
                        top: -400,
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    <CountdownCircleTimer
                    isPlaying
                    duration={7}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    size={200}
                    onComplete={() => {
                        setMisfortune(0)
                        processLock = false
                        setMultiTouchInProgress(false)
                        multiTouch[0] = false
                        multiTouch[1] = false
                        multiTouch[2] = false
                        multiTouch[3] = false
                    }}
                >
                    {({ remainingTime }) => <><Text style={[styles.center, styles.font_34]}>{remainingTime}</Text></>}
                    </CountdownCircleTimer>  
                </View>
                    : 
                <></>
            }
            <View style={styles.flex}>
            <Image
                source={require("../../assets/hole.png")}
                onLayout={e => onLayout(e, 1)}
                style={[
                    {
                        position: 'absolute',
                        bottom: 50,
                        left: 5,
                        width: 130,
                        height: 130,
                    },
                    ]}
                onTouchStart={e => {
                multiTouch[0] = true
                checkMultiTouch()
                processLock = true
                console.log(
                    'Hole 1 pressed',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                );
                }}
                onTouchEnd={e => {
                multiTouch[0] = false
                setMultiTouchInProgress(false)
                checkMultiTouch()
                processLock = false
                console.log(
                    'Hole 1 released',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                )}
                }
            />

            <Image
                source={require("../../assets/hole.png")}
                onLayout={e => onLayout(e, 1)}
                style={[
                    {
                        position: 'absolute',
                        bottom: 50,
                        right: 10,
                        width: 130,
                        height: 130,
                    },
                    ]}
                onTouchStart={e => {
                multiTouch[1] = true
                checkMultiTouch()
                processLock = true
                console.log(
                    'Hole 2 pressed',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                );
                }}
                onTouchEnd={e => {
                multiTouch[1] = false
                setMultiTouchInProgress(false)
                checkMultiTouch()
                processLock = false
                console.log(
                    'Hole 2 released',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                )}
                }
            />
            
            <Image
                source={require("../../assets/hole.png")}
                onLayout={e => onLayout(e, 1)}
                style={[
                    {
                        position: 'absolute',
                        bottom: 200,
                        left: 10,
                        width: 90,
                        height: 90,
                    },
                    ]}
                onTouchStart={e => {
                multiTouch[2] = true
                checkMultiTouch()
                processLock = true
                console.log(
                    'Hole 3 pressed',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                );
                }}
                onTouchEnd={e => {
                multiTouch[2] = false
                setMultiTouchInProgress(false)
                checkMultiTouch()
                processLock = false
                console.log(
                    'Hole 3 released',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                )}
                }
            />

            <Image
                source={require("../../assets/hole.png")}
                onLayout={e => onLayout(e, 1)}
                style={[
                {
                    position: 'absolute',
                    bottom: 170,
                    right: 5,
                    width: 70,
                    height: 70,
                },
                ]}
                onTouchStart={e => {
                multiTouch[3] = true
                checkMultiTouch()
                processLock = true
                console.log(
                    'Hole 4 pressed',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                );
                }}
                onTouchEnd={e => {
                multiTouch[3] = false
                setMultiTouchInProgress(false)
                checkMultiTouch()
                processLock = false
                console.log(
                    'Hole 4 released',
                    'x',
                    e.nativeEvent.pageX,
                    'y',
                    e.nativeEvent.pageY,
                    'timestamp:',
                    e.timeStamp,
                )}}
            />

            </View>
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
    top: '40%',
  },

  circle: {
    width: 0,
    height: 0,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
  },

  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  flex: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  square: {
    marginTop: 20,
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 15,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  button_strong: {
    backgroundColor: '#BC412B',
    borderRadius: 15,
  },

  button_multi: {
    backgroundColor: '#f5dfbb',
    borderRadius: 15,
  },

  textColor: {
    color: '#FAF9F9',
    padding: 15,
  },

  font_34: {
    fontSize: 34,
  },
});

export {Gardenviews1};
