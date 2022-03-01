import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value){
    try {
      await AsyncStorage.setItem(key, value)
      console.log("save operation completed: {" + key + ": " + value + "}")
    } catch (e) {
      console.log(e)
    }
  }

  export async function getData(key){
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
      }
        console.log("Retrieved value of " + key + " is: "+value)
        return value
    } catch(e) {
      console.log(e)
    }
}