import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default class App extends React.Component {
  state = { items: [] };

  // Fügt ein Item der liste im State hinzu
  _addItem(text) {
    // es gibt hier zwei Möglichkeiten
    // A etwas expliziter aber umständlicher
    //    currentItems = this.state.items;
    //    currentItems.push({text: text, date: Date.now()})
    //    this.setState({items: [...currentItems]})
    // B direkt
    // this.setState({ items: [...this.state.items, {text: text, date: Date.now()}] });
    this.setState({ items: [...this.state.items, { text, date: Date.now() }] });
    this.inputText.clear();
  }

  render() {
    let content = <Text>Keine Einträge im Tagebuch!</Text>;
    if (this.state.items.length > 0) {
      content = (
        <FlatList
          style={styles.list}
          data={this.state.items}
          renderItem={({ item }) => <Text>{item.text}</Text>}
          keyExtractor={item => item.date.toString()} // toString hier wichtig da der keyExtractor denselben erwartet
        />
      );
    }
    // console.log("CONTENT IS %o",content);
    return (
      <View style={styles.container}>
        {content}
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="Tagebucheintrag erstellen"
            returnKeyType="done"
            ref={input => (this.inputText = input)}
            onSubmitEditing={event => {
              this._addItem(event.nativeEvent.text);
            }}
            // only tried for test purposes
            // onChangeText={ changedText => {
            //   console.log("onChangeText: " + changedText);
            //   this.setState({item: changedText});
            // }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: "center"
  },
  input: {
    height: 40
  },
  list: {
    marginTop: 24
  }
});
