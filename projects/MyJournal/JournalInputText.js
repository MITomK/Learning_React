import React, { Component } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";

export default class JournalInputText extends Component {
  render() {
    const {
      style,
      placeholder,
      returnKeyType,
      theRef,
      onSubmitEditing
    } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={style}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          ref={theRef}
          onSubmitEditing={onSubmitEditing}
        />
      </KeyboardAvoidingView>
    );
  }
}
