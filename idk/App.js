import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import ChordGameScreen from './ChordGameScreen.js';
import {Button,StyleSheet, Text, View,Image,ImageBackground} from 'react-native';
import ChordSelectionScreen from './ChordSelectionScreen.js';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('ChordSelection')}
      />

    );
  }
}
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  ChordSelection:{screen:ChordSelectionScreen},
 Game: {screen: ChordGameScreen },
});
const App = createAppContainer(MainNavigator);
export default App;

/*  <View style={{flex:1, backgroundColor:'powderblue',alignItems: 'center'}}>


    <NotePicker noteList={[[1,2],[3,4],[5,6],[7,8]]} />

  </View>*/
  /*  <View style={styles.alternativeLayoutButtonContainer}>

          <Button
            onPress={this._onPressButton}
            title="This looks great!"
          />
          <Button
            onPress={this._onPressButton}
            title="OK!"
            color="#841584"
          />
        </View>*/
/*
export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', top: 50}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}*/
const styles = StyleSheet.create({
  container: {
 flex: 1,
 justifyContent: 'center',
},
buttonContainer: {
  margin: 20
},
alternativeLayoutButtonContainer: {
  flex:1,
  backgroundColor:'steelblue',
  flexDirection: 'row',
  justifyContent: 'space-between'
},
});
