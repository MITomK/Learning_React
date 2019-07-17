import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import JournalItems from "./JournalItems";
import JournalInputText from "./JournalInputText";

// testdaten, die nur temporär zum spielen benötigt werden
// const journalItems = [
//   {
//     data: [
//       {
//         text: "Umgang mit SectionList gelernt",
//         date: 1 // eindeutiger, willkürlicher Wert
//       }
//     ],
//     title: "29.7.2019"
//   },
//   {
//     data: [
//       {
//         text: "Einkauf im Supermarkt",
//         date: 2
//       },
//       {
//         text: "Wochenendausflug geplant",
//         date: 3
//       }
//     ],
//     title: "28.7.2019"
//   }
// ];

const journalItems = [];

export default class App extends Component {
  state = { items: journalItems };

  // Fügt ein Item der liste im State hinzu
  _addItem(text) {
    let { items } = this.state;
    let [head, ...tail] = items;

    // Datum bearbeiten und im Format DD.M.YYYY aufbauen
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const today = `${day}.${month}.${year}`;

    if (head === undefined || head.title !== today) {
      // => entweder es ist der erste eintrag oder
      // für heute gab es noch keinen
      head = { data: [], title: today };
      tail = items;
    }

    const newItem = { text: text, date: now.getTime() };
    head.data = [newItem, ...head.data];
    items = [head, ...tail];
    this.setState({ items });
    this.inputText.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <JournalItems items={this.state.items} />
        <JournalInputText
          styleContainer={styles.inputContainer}
          style={styles.input}
          placeholder="Tagebucheintrag erstellen"
          returnKeyType="done"
          theRef={input => (this.inputText = input)}
          onSubmitEditing={event => {
            this._addItem(event.nativeEvent.text);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: "center"
  },
  input: {
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
