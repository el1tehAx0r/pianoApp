import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import {ScrollView,Button,StyleSheet,Picker, Text, View,Image,ImageBackground,TouchableHighlight} from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import ChordGameScreen from './ChordGameScreen.js'
flatNoteList=['Ab','Bb','Cb','Db','Eb','Fb','Gb'];
naturalNoteList=['A','B','C','D','E','F','G'];
sharpNoteList=['A#','B#','C#','D#','E#','F#','G#'];
bassNoteRange=['1,2,3,4,5,6']
intervals=[[4,3],[6,4],[4,6]]
clickedNotes=[]
class NoteButton extends Component {
  constructor(props) {
    super(props)
    this.state = {backgroundColor:'#DDDDDD', isPressed:false}
    this.variable=props.chordType
    this.title=props.title
    this.bassNumber=props.bassNumber
  }
  isItemInArray=(array,item)=> {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return i;   // Found it
        }
    }
    return -1;   // Not found
 }
  onPress = () => {
    if (this.state.isPressed==false){
    this.setState({
      isPressed:true,
    backgroundColor:'powderblue',
      //count: this.state.count+1
    },()=>{clickedNotes.push([this.variable,this.title,this.bassNumber]);   console.log(clickedNotes)})
  }
  else{
    this.setState({
      isPressed:false,
    backgroundColor:'#DDDDDD',
  },()=>{
    var index=this.isItemInArray(clickedNotes,[this.variable,this.title])
    if (index>-1){
    clickedNotes.splice(index,1);
console.log(clickedNotes);}
  })
  }
  }
 render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
         style={styles.button,{backgroundColor:this.state.backgroundColor,margin:3,marginVertical:-6}}
         onPress={this.onPress}
        >
         <Text>{this.props.title} </Text>
        </TouchableHighlight>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
            { this.state.count !== 0 ? this.state.count: null}
          </Text>
        </View>
      </View>
    )
  }
}
function Separator() {
  return <View style={styles.separator} />;
}
class NoteButtons extends Component{
  render(){
  	var selectedNotes = [];
	for(let i = 0; i < 3; i++){
		selectedNotes.push(
     <View key={i.toString()} style={styles.fixToText} >
  <NoteButton
            chordType={this.props.chordType}
            title={flatNoteList[2*i]}
            bassNumber={4}
          />
          <NoteButton
            chordType={this.props.chordType}
            title={naturalNoteList[2*i]}
            bassNumber={4}
          />
          <NoteButton
            chordType={this.props.chordType}
            title={sharpNoteList[2*i]}
            bassNumber={4}
          />
  <NoteButton
    chordType={this.props.chordType}
            title={flatNoteList[2*i+1]}
            bassNumber={4}
          />
          <NoteButton
            chordType={this.props.chordType}
            title={naturalNoteList[2*i+1]}
            bassNumber={4}
          />
          <NoteButton
            chordType={this.props.chordType}
            bassNumber={4}
            title={sharpNoteList[2*i+1]}
          />
				</View>
		)
	}
	return (
			selectedNotes
	)
}
}
export default class ChordSelectionScreen extends Component {
  state = {
    isClicked: false,
    timePerChord: 0.2,
    totalTime: 30,
  };
  selectTotalTime = () => {
      var listOfPickerItem = []
      for (let i = 0; i < 12; i++) {
        var j = (30 + (i * 10)).toString(); listOfPickerItem.push(<Picker.Item key={j} label={j} value={j} />);
}
return listOfPickerItem;
}
selectTimePerChord = () => {
    var listOfPickerItem = []
    var tempList = []
    for (let i = 1; i < 10; i++) {
      var j = (Math.floor((i * 0.2) * 100) / 100).toString(); listOfPickerItem.push(<Picker.Item key={j} label={j} value={j}  />)
}
return listOfPickerItem
}
render() {
    const { navigate} = this.props.navigation;
    return (
     <View style={{flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'}}>
  <View style={{flex:5, alignItems: 'stretch',flexDirection:'row'}}>
  <View style={{flex:3, backgroundColor:'aliceblue',flexDirection:'row'}}>
  <View style={{flexDirection:"Column",flex:1}}>
  <Button
          title="Play"
          color="#f194ff"
onPress={() => {navigate('Game', {
              timePerChord:this.state.timePerChord,
              totalTime:this.state.totalTime,
              chords: clickedNotes,
            });
          }}
        />
             <Separator />
<View style={{flex:2}}>
<Text style={{marginTop:60}}>seconds per note</Text>
<Picker
  selectedValue={this.state.timePerChord}
  style={{marginTop:-80, flex: 1}}
  onValueChange={(changedValue) =>
    this.setState({timePerChord:changedValue})
  }>
{this.selectTimePerChord()}
</Picker>
</View>
<View style={{flex:2}}>
<Text style={{marginTop:60}}>total secs</Text>
<Picker
  selectedValue={this.state.totalTime}
  style={{marginTop:-80, flex: 1}}
  onValueChange={(changedValue) =>
    this.setState({totalTime: changedValue})
  }>
  {this.selectTotalTime()}
</Picker>
</View>
                   </View>
      </View>
  <View style={{flex:7, alignItems: 'stretch',flexDirection:'column'}}>
<ScrollView>
  <Text>Major Triad</Text>
  <Separator/>
  <NoteButtons chordType="Maj triad"/>
  <Text>Major Triad First Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
  <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
<Text>In Progress</Text>
</ScrollView>

      </View>
      </View>
 <ScrollView horizontal={true} style={{flex:2,  height: undefined, width: undefined}}>
 </ScrollView>
                  </View>
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
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 2,
  },
  alternativeLayoutButtonContainer: {
    flex: 1,
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fixToText: {
    flexDirection: 'row'
  },
});
