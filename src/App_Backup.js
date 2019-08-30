/*import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  Animated,
  Easing,
} from 'react-native';
import logo from './logo.png';

class App extends Component {
  state = {
    spinValue: new Animated.Value(0),
  }

  onClick = () => {
    const wasRotated = this.state.spinValue._value === 1;
    Animated.timing(
      this.state.spinValue,
      {
        toValue: wasRotated ? 0 : 1,
        duration: 250,
        easing: Easing.linear
      }
    ).start()
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    var payments = [];

  for(let i = 0; i < noGuest; i++){

    payments.push(
      <View key = {i}>
        <View>
          <TextInput />
        </View>
        <View>
          <TextInput />
        </View>
        <View>
          <TextInput />
        </View>
      </View>
    )
  }
  

    return (
      <View style={styles.container}>
        <Animated.Image source={logo} style={[styles.logo, { transform: [{rotate: spin}] }]}/>
        <Text style={styles.title}>Create React Native Web App</Text>
        <Text>Open up src/App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        {Platform.OS !== 'web' && <Text>Shake your phone to open the developer menu.</Text>}
        <TouchableHighlight
          onPress={this.onClick}
          style={styles.button}
          underlayColor={'#0A84D0'}
        >
        <Text style={styles.buttonText}>Rotate Logo</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);

*/

import React, { Component } from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
const { width, height } = Dimensions.get('window');

const ROWS = 6;
const COLS = 5;
const TIMING = 600;
const TEXT_HEIGHT = 20;
let seats = [];
let seatsAnimation = [];

for (var i = 0; i < ROWS + COLS - 1; i++) {
  seatsAnimation.push(i);
}

Array(ROWS * COLS).join(' ').split(' ').map((_, i) => {
  const currentIndex = i % COLS + Math.floor(i / COLS) % ROWS;
  const currentItem = {
    label: i + 1 < 10 ? '0' + (i + 1) : i + 1,
    s: currentIndex,
    key: i,
    animated: new Animated.Value(1)
  };
  seats.push(currentItem);
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      selectedItems: []
    };

    this.selectionAnimation = new Animated.Value(0);

    this.animatedValue = [];
    seatsAnimation.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  animate = () => {
    const animations = seatsAnimation.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: this.state.finished ? 0 : 1,
        duration: TIMING
      });
    });
    Animated.sequence([
      Animated.stagger(TIMING * 0.15, animations)
    ]).start(() => {
      this.setState({
        finished: !this.state.finished,
        selectedItems: []
      });

      // this.selectionAnimation.setValue(0);
      Animated.timing(this.selectionAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(1.3)
      }).start();
    });
  };

  renderItem = ({ item }) => {
    const i = item.key;
    const scale = this.animatedValue[item.s].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });
    const { selectedItems } = this.state;
    const isSelected = selectedItems.includes(item.key);
    const itemPressScale = item.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          const selected = isSelected
            ? selectedItems.filter(i => i !== item.key)
            : [...selectedItems, item.key];

          item.animated.setValue(0);
          this.setState(
            {
              selectedItems: selected
            },
            () => {
              Animated.parallel([
                Animated.timing(this.selectionAnimation, {
                  toValue: -TEXT_HEIGHT * selected.length,
                  duration: 500,
                  easing: Easing.elastic(1.3)
                }),
                Animated.timing(item.animated, {
                  toValue: 1,
                  duration: 200
                })
              ]).start();
            }
          );
        }}
        style={{
          opacity: 1 - parseInt(item.s) / 15
        }}>
        <Animated.View
          style={{
            transform: [
              {
                scale: item.animated
              }
            ]
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: isSelected ? '#8EF0E7' : '#3493FF'
              },
              styles.item,
              {
                transform: [
                  {
                    scale
                  }
                ]
              }
            ]}>
            <Animated.Text style={[styles.itemText]}>
              {item.label}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: height * 0.1,
            width: width,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
          <SimpleLineIcons
            name="menu"
            size={22}
            color="#666"
            style={{ paddingLeft: 12 }}
          />
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>
            Select Seats
          </Text>
          <SimpleLineIcons.Button
            name="refresh"
            size={22}
            color="#666"
            backgroundColor="transparent"
            onPress={this.animate}
          />
        </View>
        <FlatList
          numColumns={COLS}
          extraData={this.state.selectedItems}
          data={seats}
          style={{ flex: 0.8 }}
          renderItem={this.renderItem}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 0.2
          }}>
          <View
            style={{
              height: TEXT_HEIGHT,
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}>
            <Animated.View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transform: [
                  {
                    translateY: this.selectionAnimation
                  }
                ]
              }}>
              {Array(ROWS * COLS + 1).join(' ').split(' ').map((_, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height: TEXT_HEIGHT,
                      width: TEXT_HEIGHT * 1.4,
                      marginRight: 4,
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                    }}>
                    <Text style={[styles.text]}>
                      {i}
                    </Text>
                  </View>
                );
              })}
            </Animated.View>
          </View>
          <Text style={styles.text}>
            locations Selected
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  item: {
    width: width / COLS,
    height: width / COLS,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: 'white',
    fontWeight: '700'
  },
  text: { fontSize: 15, fontWeight: '500' }
});




    /*
      <View style={{ padding: 50 }}>
          {rows.map((row) => {
              return (
                <TouchableHighlight
                  onPress={this.onClick}
                >
                <View style={Styles.block}>
                    {
                      items
                      /*
                      Array(row.numSeats).fill(null).map(() => {
                        return <View style={{ width: 50, height: 50, backgroundColor: 'orange', margin: 5 }} />;
                      */

                    }
                )}
            </View>
          </TouchableHighlight>
         );
          })
         }
      </View>
      */


