import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from "react-native";

export default class JournalInputText extends Component {
  _submit(text) {
    this.props.onSubmit(text);
    this.inputText.clear();
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            placeholder={"Tagebucheintrag erstellen"}
            returnKeyType="done"
            ref={input => (this.inputText = input)}
            onSubmitEditing={event => this._submit(event.nativeEvent.text)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputText: {
    height: 40
  },
  inputContainer: {
    borderColor: "deepskyblue",
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5
  }
});
