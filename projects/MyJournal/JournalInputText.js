import React, { Component } from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";

export default class JournalInputText extends Component {
  render() {
    const {
      styleContainer,
      styleText,
      placeholder,
      returnKeyType,
      theRef,
      onSubmitEditing
    } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styleContainer}>
          <TextInput
            style={styleText}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            ref={theRef}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </KeyboardAvoidingView>
    );
    123;
  }
}
