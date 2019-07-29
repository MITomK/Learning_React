import React, { Component } from "react";
import Store from "./services/Store";
import AppNavigator from "./AppNavigator";

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

  _addItem(newItem) {
    let { items } = this.state;
    newItem.date = Date.now();
    items = [newItem, ...items];
    this.setState({ items: items });
    Store.saveItems(items);
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          items: this.state.items,
          refresh: this._refreshItems,
          onSubmit: item => this._addItem(item)
        }}
      />
    );
  }
}
