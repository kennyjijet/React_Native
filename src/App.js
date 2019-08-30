import React, { Component } from 'react';
import { View,
  StyleSheet,
  Text,
  Platform,
  TouchableHighlight,
  Animated,
  Easing,
  ImageBackground
 } from 'react-native';
 import Styles from './Style.js'



export default class App extends Component {

  onClick = (data) => {
    alert("Test d")
  }

  render() {
      const rows = [
      [{ numSeats: 1, display: true }, {numSeats: 2, display: false },{ numSeats: 3, display: true}, {numSeats: 4, display: true },{ numSeats: 5, display: true }, {numSeats: 6, display: true },{ numSeats: 7, display: true}, {numSeats: 8, display: true }],
      [{ numSeats: 1, display: true }, {numSeats: 2, display: true },{ numSeats: 3, display: false}, {numSeats: 4, display: true },{ numSeats: 5, display: true }, {numSeats: 6, display: true },{ numSeats: 7, display: true}, {numSeats: 8, display: true }],



    ];

    var items = []
    var blockStyle = []
    /*
    const db = {
      "1": {
        "1": "aaa",
        "2": "bbb",
        "3": "ccc"
      },
      two: {
        "1": "ddd",
        "2": "eee"
      }
    };
  */
    return (
      <ImageBackground source={require('./assets/bg_general.png')} style={{ padding: 50}}>
          {
            rows.map((row) => {
              return (
                <View style={Styles.block}>
                    {
                      Array(row.length).fill(null).map((currElement, index) => {
                        return (
                          <TouchableHighlight
                            onPress={() => this.onClick(row[index].numSeats)}
                          >
                            <View style={{ visibility: row[index].display ? 'visible' : 'hidden', width: 50, height: 50, backgroundColor: 'orange', margin: 5 }} />
                          </TouchableHighlight>
                      );
                    }
                )}
            </View>
         );
          })
         }
      </ImageBackground>
      );
    }
  }