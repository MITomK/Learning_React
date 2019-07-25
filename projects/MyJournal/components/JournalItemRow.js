import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import TouchableItem from "./TouchableItem";

export default class JournalItemRow extends Component {
  render() {
    const { item } = this.props;
    const date = new Date(item.date);
    const hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    return (
      <TouchableItem
        onPress={() =>
          alert(
            "FAQ_01:  TODO: clarify how to access the children from here to get specific text"
          )
        }
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("./../assets/foto.png")}
          />
          <View style={styles.itemText}>
            <Text numberOfLines={3}>{item.text}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 5
  },
  itemText: {
    flex: 1,
    justifyContent: "space-between"
  },
  time: {
    color: "gray",
    fontSize: 11,
    fontWeight: "100",
    alignSelf: "flex-end"
  }
});
