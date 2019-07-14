import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';

export default class App extends React.Component{
  state = { language: "java" };
  render() {
    return (
    <View style={styles.container}>
      <Text>Keine Einträge im Tagebuch!</Text>
      <TextInput
        style={styles.input}
        placeholder="Tagebucheintrag erstellen"
        returnKeyType="done"
      />
    </View>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40
  }
});
