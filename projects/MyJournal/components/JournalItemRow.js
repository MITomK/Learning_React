import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";

const TouchableItem =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export default class JournalItemRow extends Component {
  render() {
    const { item } = this.props;
    const date = new Date(item.date);
    const hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    return (
      <TouchableItem>
        <View>
          <Text numberOfLines={3}>{item.text}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  time: {
    color: "gray",
    fontSize: 11,
    fontWeight: "100",
    alignSelf: "flex-end"
  }
});
