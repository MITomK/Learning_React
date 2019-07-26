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

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class JournalInput extends Component {
  state = { photo: null };
  _submit(text) {
    this.inputText.clear();
    this.props.onSubmit(text, this.state.photo);
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
      <KeyboardAvoidingView behavior="padding">
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  photoIcon: {
    alignSelf: "center",
    marginLeft: 5,
    marginRight: 15
  },
  inputContainer: {
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
  imagePreview: {
    width: 24,
    height: 24
  }
});
