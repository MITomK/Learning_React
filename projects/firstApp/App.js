import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// state = {counter: 0};

// export default function App() {
//    return (
//      <View style={styles.container}>
//        <Text style={styles.counter}>{state.counter}</Text>
//        <Button
//            title="Drück mich"
//           //  onPress={() => state = ({counter: this.state.counter + 1})}>
//           onPress={() => alert('Gedrückt')}>
//         </Button>
//      </View>
//    );
//  }

export default class App extends React.Component {
  state = {counter: 0};
  render() {
    const currentCounter = this.state.counter;
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{currentCounter}</Text>
        <Button
            title="Drück mich"
            // color='black'
            style={styles.buttonStyle}  // das ist doch Scheisse; style geht by buttons nicht
            onPress={() => this.setState({counter: currentCounter + 1})}>
              // onPress={() => alert('Gedrückt')}>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    color: 'black',
    fontSize: 180,
  },
  buttonStyle: {
    color: 'red',
    fontSize: 180,
  },
});
