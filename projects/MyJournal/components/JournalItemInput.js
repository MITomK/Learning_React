import React, { Component } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import TouchableItem from "./TouchableItem";
import Store from "../services/Store";

// use these imports instead from 'expo'
// => Behrendt
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class JournalInput extends Component {
  state = { photo: null };

  _getWeatherBehrends = async () => {
    let result = { location: null, weather: null };
    const location = "Freiburg";
    const url =
      "https://www.behrends.io/react-native-buch/Kapitel7/weather.json";
    try {
      const response = await fetch(url);
      const weatherJSON = await response.json();
      const { weather, main } = weatherJSON[location];
      result = {
        location: location,
        weather: `${Math.floor(main.temp)}°C ${weather[0].description}`
      };
    } catch (error) {
      console.log("Error fetching weather data", error);
    }
    return result;
  };

  // http://api.openweathermap.org/data/2.5/weather?q=Freiburg&APPID=ff03cf2ca01a42602a83f04e74466106&units=metric&lang=de

  _getWeatherOpenWeatherMap = async () => {
    let result = { location: null, weather: null };
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.log("Permission to access location was denied!!!");
        return result;
      }

      const position = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = position.coords;
      const location = `lon=${longitude}&lat=${latitude}`;
      const apiKey = "APPID=ff03cf2ca01a42602a83f04e74466106";
      const url =
        "http://api.openweathermap.org/data/2.5/weather?" +
        location +
        "&" +
        apiKey +
        "&units=metric&lang=de";

      const response = await fetch(url);
      const weatherJSON = await response.json();
      const { weather, main, name } = weatherJSON;
      result = {
        location: name,
        weather: `${Math.floor(main.temp)}°C ${weather[0].description}`
      };
    } catch (error) {
      console.log("Error fetching weather data", error);
    }
    return result;
  };

  _submitWithWeather = async (text, photo) => {
    const { location, weather } = await this._getWeatherOpenWeatherMap();
    this.props.onSubmit({ text, photo, location, weather });
  };

  _submit(text) {
    this.inputText.clear();
    this._submitWithWeather(text, this.state.photo);
    this.setState({ photo: null });
  }

  _hasCameraPermissions = async () => {
    let permission = await Permissions.askAsync(Permissions.CAMERA);
    if (permission.status !== "granted") {
      console.log("Permission to camera was denied!!!");
      return false;
    }
    permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      console.log("Permission to camera roll was denied!!!");
      return false;
    }

    return true;
  };

  _launchCamera = async () => {
    if (this._hasCameraPermissions()) {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        this.setState({ photo: result.uri });
        this.inputText.focus();
      }
    }
  };

  render() {
    const photoIcon = this.state.photo ? (
      <Image style={styles.imagePreview} source={{ uri: this.state.photo }} />
    ) : (
      <SimpleLineIcons name="camera" size={24} color="deepskyblue" />
    );

    return (
      <KeyboardAvoidingView keyboardVerticalOffset={120} behavior="padding">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.photoIcon}>
              <TouchableItem onPress={() => this._launchCamera()}>
                {photoIcon}
              </TouchableItem>
            </View>
            <TextInput
              style={styles.input}
              ref={input => (this.inputText = input)}
              placeholder={"Tagebucheintrag erstellen"}
              returnKeyType="done"
              underlineColorAndroid="transparent"
              onSubmitEditing={event => this._submit(event.nativeEvent.text)}
            />
          </View>
          {/* <TouchableItem onPress={() => this._deleteItems()}>
            <View>
              <SimpleLineIcons name="trash" size={24} color="deepskyblue" />
            </View>
          </TouchableItem> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderColor: "deepskyblue",
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5
  },
  input: {
    flex: 1,
    height: 40
  },
  photoIcon: {
    alignSelf: "center",
    marginLeft: 5,
    marginRight: 15
  },
  imagePreview: {
    width: 24,
    height: 24
  }
});
