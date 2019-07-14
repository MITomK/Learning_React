import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';

export default class App extends React.Component{
  state = { item: null };
  render() {
    return (
    <View style={styles.container}>
      <Text>{this.state.item || "Keine Einträge im Tagebuch!"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tagebucheintrag erstellen"
        returnKeyType="done"
        onSubmitEditing={ event => {
          console.log("onSubmitEditing: " + event.nativeEvent.text);
          this.setState({item: event.nativeEvent.text});
        }}
        // only tried for test purposes
        // onChangeText={ changedText => {
        //   console.log("onChangeText: " + changedText);
        //   this.setState({item: changedText});
        // }}
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
