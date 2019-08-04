import React, { Component } from "react";
import Store from "./services/Store";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  state = { items: [] };

  // componentWillMount is deprecated
  // => Behrendt
  componentDidMount() {
    this._refreshItems();
  }

  _refreshItems = async () => {
    const items = await Store.loadItems();
    this.setState({ items });
  };

  _addItem(item) {
    let { items } = this.state;
    if (item.date === null) {
      // Neuer Eintrag am Anfang der Liste eintragen und speichern
      item.date = Date.now();
      items = [item, ...items];
    } else {
      // Bestehenden Eintrag in Liste aktualisieren
      const index = items.findIndex(i => i.date === item.date);
      items[index] = item;
    }
    this.setState({ items: items });
    Store.saveItems(items);
  }

  _deleteItem(item) {
    let { items } = this.state;
    const index = items.findIndex(i => i.date === item.date);
    // Eintrag aus Liste entfernen
    items.splice(index, 1);
    this.setState({ items: items });
    Store.saveItems(items);
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          items: this.state.items,
          refresh: this._refreshItems,
          onSubmit: item => this._addItem(item),
          deleteItem: item => this._deleteItem(item)
        }}
      />
    );
  }
}
