import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import TouchableItem from "./TouchableItem";

export default class JournalInput extends Component {
  _submit(text) {
    this.props.onSubmit(text);
    this.inputText.clear();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <View style={styles.photoIcon}>
            <TouchableItem>
              <SimpleLineIcons name="camera" size={24} color="deepskyblue" />
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
  }
});
