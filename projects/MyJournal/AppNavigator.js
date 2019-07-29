import React from "react";

import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import JournalScreen from "./screens/JournalScreen";
import PhotosScreen from "./screens/PhotosScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { SimpleLineIcons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator({
  // const Tabs = new TabNavigator({
  Journal: {
    screen: JournalScreen,
    navigationOptions: {
      title: "Tagebuch",
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name="book-open" size={24} color={tintColor} />
      )
    }
  },
  Photo: {
    screen: PhotosScreen,
    navigationOptions: {
      title: "Fotos",
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name="picture" size={24} color={tintColor} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: "Einstellungen",
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name="settings" size={24} color={tintColor} />
      )
    }
  }
});

export default createAppContainer(Tabs);
