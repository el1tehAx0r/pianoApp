import {createAppContainer} from 'react-navigation';
import {createStackNavigator,HeaderBackButton} from 'react-navigation-stack';
import React, { Component } from 'react';
import {ScrollView,StyleSheet,Picker, Text, View,Image,ImageBackground,TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { Ionicons } from '@expo/vector-icons';
import ChordGameScreen from './ChordGameScreen.js';
import ChordSelectionScreen from './ChordSelectionScreen.js';

export default class ChordGameSettingScreen extends Component {
   static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerRight: <Button
                             title="Refresh"
                             onPress={() => {console.log(navigation.state.params.timePerChord);navigation.navigate('ChordSelection', {totalTime: navigation.state.params.totalTime,timePerChord:navigation.state.params.timePerChord
              });
          }} />
        };
    };



    selectTotalTime = () => {
      var listOfPickerItem = []
      for (let i = 0; i < 12; i++) {
        var j = (30 + (i * 10)).toString();
       listOfPickerItem.push( {key:j, label:j, value:j  })
}
return listOfPickerItem;
}
selectTimePerChord = () => {
    var listOfPickerItem = []
    var tempList = []
    for (let i = 1; i < 10; i++) {
      var j = (Math.floor((i * 0.2) * 100) / 100).toString();
       listOfPickerItem.push( {key:j, label:j, value:j  })
}
return listOfPickerItem
}
  render() {
      const { navigate} = this.props.navigation;

    return (
      <View style={{flexDirection:'column',flex:1}}>

      <View style= {{flexDirection:'row', alignItems:'stretch',flex:1}} >
<View style ={{flex:1,flexDirection:'column', alignItems:'stretch'}}>
<Text>seconds per chord</Text>
<RNPickerSelect
placeholder={
    {label: 'a',
    value: this.props.timePerChord}
}
  selectedValue={this.props.timePerChord}
  onValueChange={(changedValue) =>
    this.props.navigation.setParams({timePerChord:changedValue})
  }
items={this.selectTimePerChord()}
  />
  </View>
<View style ={{flex:1,flexDirection:'column', alignItems:'stretch'}}>
<Text>TotalTime</Text>
<RNPickerSelect
placeholder={{
    label: 'aa',
    value: this.props.totalTime
}}
  selectedValue={this.props.totalTime}
  onValueChange={(changedValue) =>
    this.props.navigation.setParams({totalTime:changedValue})
  }
items={this.selectTotalTime()}
  />
</View>
</View>
</View>


    );
  }
}
