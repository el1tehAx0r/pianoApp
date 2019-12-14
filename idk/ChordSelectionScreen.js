import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import {ScrollView,Button,StyleSheet,Picker, Text, View,Image,ImageBackground,TouchableHighlight} from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import ChordGameScreen from './ChordGameScreen.js'
class NoteButton extends Component {
  constructor(props) {
    super(props)
    this.state = {backgroundColor:'#DDDDDD', isPressed:false,makeComponent:false }
    this.variable=props.chordType
    this.title=props.title
    this.bassNumber=props.bassNumber
  }
 getChordType=()=> {
   return this.variable
 }
  isItemInArray=(array,item)=> {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return i;   // Found it
        }
    }
    return -1;   // Not found
 }

printTitle=()=>{console.log(this.title)}
  onPress = () => {
  this.setState({makeComponent:true})
    if (this.state.isPressed==false){
    this.setState({
      isPressed:true,
    backgroundColor:'powderblue',
      //count: this.state.count+1
    },()=>{clickedNotes.push([this.variable,this.title,this.bassNumber]); console.log(clickedNotes);this.props.handleClick()})

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
flatNoteList=['Ab','Bb','Cb','Db','Eb','Fb','Gb'];
naturalNoteList=['A','B','C','D','E','F','G'];
sharpNoteList=['A#','B#','C#','D#','E#','F#','G#'];
noteList=['Ab','A','A#','Bb','B','B#','Cb','C','C#','Db','D','D#','Eb','E','E#','Fb','F','F#','Gb','G','G#'];
bassNoteRange=['1,2,3,4,5,6']
chordTypes=['Major Triad','Major Triad First Inversion','Major Triad Second Inversion'];
intervals=[[4,3],[6,4],[4,6]]
clickedNotes=[]



class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

function Separator() {
  return <View style={styles.separator} />;
}

class Switch extends Component{
  componentDidMount(){
    setInterval(()=>(
      this.setState(previousState=> (
        {number:notelist[0],isShowingText:!previousState.isShowingText}
      ))
    ),1000);
  }
  notelist=[1,2,3]
  state={number:0,isShowingText:true};
  render(){

    if(!this.state.isShowingText)
    {
      return null;
    }
    return (

      <Image
  style={{
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }}
  source={require('./assets/chordGameStaff.jpg')} resizeMode="cover"/>

    );
  }
}
class NotePicker extends Component{
  componentDidMount(){
    setInterval(()=>(
      this.setState(previousState=> (
        {}
      ))
    ),1000);
        setInterval(()=>(
      this.setState(previousState=> (
        {note:this.returnNoteIndex(previousState.noteList,previousState.noteIndex),isShowingText:!previousState.isShowingText}
      ))
    ),1000);

  }

  state={note:0,noteList:this.props.noteList,noteIndex:0,isShowingText:true,continue:true};
  returnNoteIndex=(array1,index)=>{
    if (index+1<array1.length)
    {
      this.setState(previousState=> (
        {noteIndex:previousState.noteIndex+1}
      ))
        return this.state.noteList[index+1]
    }
    else{

  this.setState(previousState=> (
        {noteIndex:-1}
      ))
      return this.state.noteList[0]
    }
  };
  render(){

  /*  if(!this.state.isShowingText)
    {
      return null;
    }*/
    return (

      <Text> {this.state.note}</Text>
    );
  }
}
class ButtonBasics extends Component {
  _onPressButton() {
    alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
            color="#841584"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="This looks great!"
          />
          <Button
            onPress={this._onPressButton}
            title="OK!"
            color="#841584"
          />
        </View>

      </View>
    );

}}
class NoteButtoan extends Button{
  changeSelectionState(){
   this.setstate(previousstate => (
        { ispressed: !previousstate.ispressed }
      ))
  }
  onPress = () => {
     this.setState({
       isPressed: !this.state.isPressed,
        backgroundColor: 'steelblue',

     })
   }

  state={isPressed:false};
    render() {
    return (<Button style= {{backgroundColor: this.state.backgroundColor}} onPress={this.onPress} title={this.props.title}></Button>);
}
}
class NoteButtons extends Component{
  render(){
  	var payments = [];
	for(let i = 0; i < 3; i++){

		payments.push(

     <View key={i.toString()} style={styles.fixToText} >

  <NoteButton
            handleClick={this.props.handleClick}
            chordType={this.props.chordType}
            title={flatNoteList[2*i]}
            bassNumber={4}
          />
          <NoteButton
  handleClick={this.props.handleClick}
            chordType={this.props.chordType}
            title={naturalNoteList[2*i]}
            bassNumber={4}
          />
          <NoteButton
  handleClick={this.props.handleClick}
            chordType={this.props.chordType}
            title={sharpNoteList[2*i]}
            bassNumber={4}
          />
  <NoteButton
handleClick={this.props.handleClick}
    chordType={this.props.chordType}
            title={flatNoteList[2*i+1]}
            bassNumber={4}
          />
          <NoteButton
handleClick={this.props.handleClick}
            chordType={this.props.chordType}
            title={naturalNoteList[2*i+1]}
            bassNumber={4}
            onPress={() => Alert.alert('Left button pressed')}
          />
          <NoteButton
handleClick={this.props.handleClick}
            chordType={this.props.chordType}
            bassNumber={4}
            title={sharpNoteList[2*i+1]}
            onPress={() => Alert.alert('Right button pressed')}
          />
				</View>
		)
	}

	return (
			 payments
	)
}
}
/* <View style={styles.fixToText} >

  <Button
            title="Cb"
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="C"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="C#"
            onPress={() => Alert.alert('Right button pressed')}
          />
          </View>*/
export default class ChordSelectionScreen extends Component {
  state={isClicked:false, timePerChord:0, totalTime:0,};
  butters=true;
  handleClick = () => {
   butters=false;
 console.log(butters)}
selectTotalTime=()=>{
  var listOfPickerItem=[]
for(let i=0; i<12;i++)
{
var j=(30+(i*10)).toString();
 listOfPickerItem.push(<Picker.Item key={j} label={j} value={j} />);
}
return listOfPickerItem;
}
selectTimePerChord=()=>
{
  var listOfPickerItem=[]
  var tempList=[]
for(let i=0; i<10;i++)
{var j=(Math.floor((i*0.2)*100)/100).toString();
 listOfPickerItem.push(<Picker.Item key={j} label={j} value={j}  />)
}
return listOfPickerItem
}
  render() {

  const {navigate} = this.props.navigation;
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
              //timePerChord:this.state.timePerChord,
              timePerChord:this.state.timePerChord,
              totalTime:this.state.totalTime,
            //  totalTime:this.state.totalTime,
              chords: clickedNotes,
            });
          }}
          //onPress={() => Alert.alert('Button with adjusted color pressed')}
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
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad"/>
  <Text>Major Triad First Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick}  chordType="Maj Triad"/>
  <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad" />
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad"/>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad"/>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad"/>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad"/>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons  handleClick={this.handleClick} chordType="Maj triad"/>
    <Text>Major Triad Second Inversion</Text>
  <Separator/>
  <NoteButtons handleClick={this.handleClick} chordType="Maj triad"/>
</ScrollView>

      </View>
      </View>
          {/*<Text style={{flex:1,alignItems:'center',flexDirection:'row'}}>
Hellow
</Text>*/}
 <ScrollView horizontal={true} style={{flex:2,  height: undefined, width: undefined}}>
 </ScrollView>
      {/*   <Image style={{flex:2, height: undefined, width: undefined}}
 resizeMode='contain' source={require('./assets/blanksheet.jpg')}/>*/}
                  </View>
    );
  }
}
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

const MainNavigator = createStackNavigator({
  ChordSelection:{screen:ChordSelectionScreen},
 Game: {screen: ChordGameScreen },
});
const styles = StyleSheet.create({
  container: {
 flex: 1,
 justifyContent: 'center',
},
buttonContainer: {
  alignItems:'center',
},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin:2,
  },
alternativeLayoutButtonContainer: {
  flex:1,
  backgroundColor:'steelblue',
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
