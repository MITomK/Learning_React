import React, { Component } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import TouchableItem from "../components/TouchableItem";

export default class PhotosFlatListScreen extends Component {
  _getPhoto(photoItem) {
    const { item } = photoItem;
    return (
      <TouchableItem
        key={item.date}
        onPress={() => this.props.navigation.navigate("Item", { item: item })}
      >
        <View>
          <Image
            style={styles.photo}
            source={{ uri: item.photo }}
            resizeMode="cover"
            key={item.date}
          />
        </View>
      </TouchableItem>
    );
  }

  render() {
    const items = this.props.screenProps.items
      .filter(item => item.photo !== null)
      .map(item => {
        return { key: item.photo, item };
      });

    if (items.length === 0)
      return (
        <View style={styles.noItems}>
          <Text style={styles.infoText}>Keine Fotos im Tagebuch.</Text>
        </View>
      );

    return (
      <FlatList data={items} renderItem={({ item }) => this._getPhoto(item)} />
    );
  }
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  noItems: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    color: "darkslategray",
    fontSize: 22,
    fontWeight: "300"
  },
  photo: {
    width: width,
    height: width,
    marginBottom: 2
  }
});
