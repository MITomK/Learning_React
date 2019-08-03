import React from "react";
import { Platform, StatusBar, View } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { SimpleLineIcons } from "@expo/vector-icons";

import JournalScreen from "../screens/JournalScreen";
import PhotosScrollScreen from "../screens/PhotosScrollScreen";
import PhotosFlatListScreen from "../screens/PhotosFlatListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ItemScreen from "../screens/ItemScreen";
import EditScreen from "../screens/EditScreen";
import TouchableItem from "../components/TouchableItem";

const Tabs = createBottomTabNavigator(
  {
    Journal: {
      screen: JournalScreen,
      navigationOptions: {
        title: "Tagebuch",
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="book-open" size={24} color={tintColor} />
        )
      }
    },
    PhotosScroll: {
      screen: PhotosScrollScreen,
      navigationOptions: {
        title: "Fotos(Scroll)",
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="picture" size={24} color={tintColor} />
        )
      }
    },
    PhotosList: {
      screen: PhotosFlatListScreen,
      navigationOptions: {
        title: "Fotos(FlatList)",
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
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "deepskyblue",
      inactiveTintColor: "#929292",
      style: {
        backgroundColor: "#f4f4f4" // Hintergrundfarbe der Tableiste
      },
      indicatorStyle: {
        height: 0 // Kein Strich am unteren Rand in Android
      },
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        // nur Android: kein Abstand nach unten
        ...Platform.select({ android: { marginBottom: 0 } })
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    root: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <TouchableItem
            onPress={() => {
              const newItem = { text: null, photo: null, date: null };
              navigation.navigate("Edit", { item: newItem });
            }}
          >
            <View>
              <SimpleLineIcons
                style={{ padding: 10 }}
                name="plus"
                size={24}
                color="deepskyblue"
              />
            </View>
          </TouchableItem>
        )
      })
    },
    Item: {
      screen: ItemScreen
    },
    Edit: {
      screen: EditScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "deepskyblue",
      headerStyle: {
        ...Platform.select(
          { android: { marginTop: StatusBar.currentHeight } },
          { ios: { backgroundColor: "white" } }
        )
      }
    },
    cardStyle: {
      backgroundColor: "white"
    }
  }
);

export default createAppContainer(AppNavigator);
