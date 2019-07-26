import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import JournalItems from "./components/JournalItems";
import JournalItemInput from "./components/JournalItemInput";

// testdaten, die nur temporär zum spielen benötigt werden
// const journalItems = [
//   {
//     data: [
//       {
//         text: "TESTDATA: Umgang mit SectionList gelernt",
//         date: 1 // eindeutiger, willkürlicher Wert
//       }
//     ],
//     title: "29.7.2019"
//   },
//   {
//     data: [
//       {
//         text: "TESTDATA: Einkauf im Supermarkt",
//         date: 2
//       },
//       {
//         text: "TESTDATA: Wochenendausflug geplant",
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
  _addItem(text, photo) {
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

    const newItem = { text: text, photo: photo, date: now.getTime() };
    head.data = [newItem, ...head.data];
    items = [head, ...tail];
    this.setState({ items });
  }

  render() {
    return (
      <View style={styles.container}>
        <JournalItems items={this.state.items} />
        <JournalItemInput
          onSubmit={(text, photo) => {
            this._addItem(text, photo);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
