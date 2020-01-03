import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import ChordGameScreen from './ChordGameScreen.js';
import {Button,StyleSheet, Text, View,Image,ImageBackground} from 'react-native';
import ChordSelectionScreen from './ChordSelectionScreen.js';
import ChordGameSettingScreen from'./ChordGameSettingScreen.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {
      navigate
    } = this.props.navigation;
    return ( <
      Button title = "Go to Jane's profile"
      onPress = {
        () => navigate('ChordSelection')
      }
      />

    );
  }
}
const MainNavigator = createStackNavigator({
  ChordSelection: {
    screen: ChordSelectionScreen
  },
  Game: {
    screen: ChordGameScreen
  },
  Home: {
    screen: HomeScreen
  },
  Setting:{
    screen:ChordGameSettingScreen
  }
});
const App = createAppContainer(MainNavigator);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    flex: 1,
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
