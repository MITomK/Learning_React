import { AsyncStorage } from "react-native";

const ITEMS_KEY = "MY_JOURNAL_ITEMS";

export default class Store {
  static loadItems = async () => {
    let items = null;
    try {
      const jsonItem = await AsyncStorage.getItem(ITEMS_KEY);
      item = await JSON.parse(jsonItem);
    } catch (error) {
      console.error("Error loading journal items.", error.message);
    }
    return items || [];
  };

  static saveItems = async items => {
    try {
      await AsyncStorage.saveItem(ITEMS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving journal items.", error.message);
    }
  };

  static deleteItems = async () => {
    try {
      await AsyncStorage.removeItem(ITEMS_KEY);
    } catch (error) {
      console.error("Error deleting journal items.", error.message);
    }
  };
}
