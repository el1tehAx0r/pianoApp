import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import {Button,StyleSheet, Text, View,Image,ImageBackground} from 'react-native';

notelist=[1,2,3,4,5]
class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}
class Switch extends Component{
  constructor(props) {
    super(props)
    this.chords=props.chords
    console.log(this.chords)
    console.log('henry')
  }
  componentDidMount(){
    setInterval(()=>(
      this.setState(previousState=> (
        {number:notelist[0],isShowingText:!previousState.isShowingText}
      ))
    ),300000000);
  }
  notelist=[1,2,3]
  state={number:0,isShowingText:true};
spaceMapping=()=>{
}


createNote=(currentChord)=>{
  var chordPositions=[]
  var notePositions=[]
  var noteOperator=[]
  var actualSpacing={}
  console.log("stupdi")
  console.log(currentChord)

  var letterToPos={
  "F":0,
  "G":1,
  "A":2,
  "B":3,
  "C":4,
  "D":5,
  "E":6}
  if (currentChord[0]=="Maj triad")
  {
    var firstNote= currentChord[1]
    var firstNotePos=letterToPos[currentChord[1].substring(0,1)]
    console.log(firstNotePos)
    notePositions.unshift(firstNotePos)
    var firstNoteBassPos=this.posToBassPos(firstNotePos)
    var secondNotePos=firstNotePos+2
    var secondNoteBassPos=this.posToBassPos(secondNotePos)
    notePositions.unshift(secondNotePos)
    var thirdNotePos=firstNotePos+4
    var thirdNoteBassPos=this.posToBassPos(thirdNotePos)
    notePositions.unshift(thirdNotePos)
    noteOperator.unshift(this.addFlatorSharp(firstNote,firstNotePos,"unison"))
    noteOperator.unshift(this.addFlatorSharp(firstNote,secondNotePos,"majorThird"))
    noteOperator.unshift(this.addFlatorSharp(firstNote,thirdNotePos,"majorFifth"))
      }
      return [notePositions,noteOperator]
}
higher=(first,second)=>
{
  if (first>second){
    return first
  }
  else if (second>first) {
    return second
  }
  else{
    return first
  }
}
addFlatorSharp=(bassLetter,comparePosition,whatSpacing)=>
{
    var chromLetterToPos={
    "Fb":0.5,
    "F":1,
    "F#":1.5,
    "Gb":1.5,
    "G":2,
    "G#":2.5,
    "Ab":2.5,
    "A":3,
    "A#":3.5,
    "Bb":3.5,
    "B":4,
    "B#":4.5,
    "Cb":4,
    "C":4.5,
    "C#":5.0,
    "Db":5.0,
    "D":5.5,
    "D#":6.0,
    "Eb":6.0,
    "E":6.5,
    "E#":7.0,
      }
  var mapDiaToChrom={
    //F
    0:1,
    1:2,
    2:3,
    3:4,
    4:4.5,
    5:5.5,
    6:6.5,
  7:7,
8:8,
9:9,
10:10,
11:10.5,
    12:11.5,
    13:12.5,
    14:13,
    15:14,
    16:15,
}

  if (whatSpacing=="unison")
  {
    if(bassLetter.length>1)
    {
      return bassLetter.substring(1,2)
    }
    else{
      return ""
    }
  }
  if (whatSpacing=="majorThird")
  {
      if(Math.abs(chromLetterToPos[bassLetter]-mapDiaToChrom[comparePosition])>2)
      {
        return "b"
      }
      else if (Math.abs(chromLetterToPos[bassLetter]-mapDiaToChrom[comparePosition])<2)
      {
        return "#"
      }
      else{
      return ""
      }
  }
  else if (whatSpacing=="majorFifth")
  {

console.log("frog")
    console.log(mapDiaToChrom[comparePosition])
    console.log(chromLetterToPos[bassLetter]-mapDiaToChrom[comparePosition])
    if(Math.abs(chromLetterToPos[bassLetter]-mapDiaToChrom[comparePosition])>3.5)
      {
        return "b"
      }
      else if (Math.abs(chromLetterToPos[bassLetter]-mapDiaToChrom[comparePosition])<3.5)
      {
        return "#"
      }
      else{
        console.log("llolol")
      return ""
      }
  }

}

posToBassPos=(note)=>{
    return note%7
}
 placeChords = () => {
  var positionXString=5+'%'
   var chords=[];
   console.log("trial")
   console.log(this.props.chords)
  {/* for (var chord in this.props.chords){

  } */}

  for (var chording in this.chords)
  {
    var notesInChord=[];
    var positions= this.createNote(this.chords[chording])[0];
    var operators=this.createNote(this.chords[chording])[1];
    console.log(positions)
    console.log(operators)
    console.log("shildj")
    for (i in positions)
    {
     var positionY=82.33-positions[i]*(5.03)/2;
     var positionX=45;
     var positionYString=positionY+'%'
     var positionXString=positionX+'%'
   notesInChord.push(<Image
  style={{
    position:'absolute',
    top:positionYString,
    left:positionXString,
    width: '8%',
    height:'8%'
  }}
  key={i}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>)
    }
chords.push(notesInChord);
  }

  {/*for (i=0;i<5;i++)
  {
    var positionY=34.7-i*5.03;
    var positionYString=positionY+'%'
    var positionX=i*5+35;
    var positionXString=positionX+'%'
    notes.push(<Image
  style={{
    position:'absolute',
    top:positionYString,
    left:positionXString,
    width: '8%',
    height:'8%'
  }}
  key={i}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>)
}*/}
return chords
   }
  render(){
    //console.log(this.placeChords())
    const images=this.placeChords()
    if(!this.state.isShowingText)
    {
      return null;
    }
    return (

      <ImageBackground
  style={{
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }}
  source={require('./assets/chordGameStaff.jpg')} resizeMode="cover">
{images}
  <Image
  style={{
    position:'absolute',
    top:'34.5%',
    left:'50%',
    width: '8%',
    height:'8%'
  }}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>
  {/*  <Image
  style={{
    position:'absolute',
    top:'34.5%',
    left:'50%',
    width: '8%',
    height:'8%'
  }}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>
  <Image
  style={{
    position:'absolute',
    top:'57.18%',
    left:'50%',
    width: '8%',
    height:'8%'
  }}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>
<Image
  style={{
    position:'absolute',
    top:'17.2%',
    left:'50%',
    width: '8%',
    height:'8%'
  }}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>
  <Image
  style={{
    position:'absolute',
    top:'82.33%',
    left:'50%',
    width: '8%',
    height:'8%'
  }}
  resizeMode='cover'
  source={require('./assets/wholeNote.png')} resizeMode="cover">
  </Image>*/}
  </ImageBackground>

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
class ChordGamePositionPicker extends Component{

}
class ChordGameBackground extends Component{

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

export default class ChordGameScreen extends Component {
  constructor(props) {
    super(props)
    //this.state = {}
  }
  render() {
//console.log(this.props.navigation.getParam('chords', 'default value'));
var chordList=this.props.navigation.getParam('chords','default value');

    return (
     <View style={{
       margin:20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
  <View style={{flex:1, backgroundColor:'steelblue',alignItems: 'center'}}>



      </View>
      <View style={{flex:3, backgroundColor:'powderblue',alignItems: 'center'}}>

        <Switch text='Yes blinking is so great' chords={chordList} />


      </View>

  <View style={{flex:1, backgroundColor:'steelblue',alignItems: 'center'}}>



      </View>

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
