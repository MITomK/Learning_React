import React, { Component } from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";

export default class JournalInputText extends Component {
  render() {
    const {
      styleContainer,
      style,
      placeholder,
      returnKeyType,
      theRef,
      onSubmitEditing
    } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styleContainer}>
          <TextInput
            style={style}
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
