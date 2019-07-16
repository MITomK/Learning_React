import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Picker,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";

// testdaten, die nur temporär zum spielen benötigt werden
const journalItems = [
  {
    data: [
      {
        text: "Umgang mit SectionList gelernt",
        date: 1 // eindeutiger, willkürlicher Wert
      }
    ],
    title: "29.7.2019"
  },
  {
    data: [
      {
        text: "Einkauf im Supermarkt",
        date: 2
      },
      {
        text: "Wochenendausflug geplant",
        date: 3
      }
    ],
    title: "28.7.2019"
  }
];

export default class App extends React.Component {
  state = { items: journalItems };

  // Fügt ein Item der liste im State hinzu
  _addItem(text) {
    // es gibt hier zwei Möglichkeiten
    // A etwas expliziter aber umständlicher
    //    currentItems = this.state.items;
    //    currentItems.push({text: text, date: Date.now()})
    //    this.setState({items: [...currentItems]})
    // B direkt
    // this.setState({ items: [...this.state.items, {text: text, date: Date.now()}] });
    // this.setState({ items: [...this.state.items, { text, date: Date.now() }] });
    // this.inputText.clear();

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
    const TouchableItem =
      Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
    let content = <Text>Keine Einträge im Tagebuch!</Text>;
    console.log("this.state.items: %o", this.state.items);
    if (this.state.items.length > 0) {
      console.log("lenght is " + this.state.items.length);
      content = (
        <SectionList
          style={styles.list}
          sections={this.state.items}
          renderItem={({ item }) => (
            <TouchableItem>
              <View>
                <Text>{item.text}</Text>
              </View>
            </TouchableItem>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.listHeader}>{section.title}</Text>
          )}
          keyExtractor={item => item.date.toString()} // toString hier wichtig da der keyExtractor denselben erwartet
        />
      );
      console.log("content is %o", content);
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
  },
  listHeader: {
    backgroundColor: "darkgray"
  }
});
