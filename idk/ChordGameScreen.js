import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import {Button,StyleSheet, Text, View,Image,ImageBackground} from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
notelist=[1,2,3,4,5]
class Switch extends Component{
  constructor(props) {
    super(props)
    var secondTimer
    var firstTimer
    this.chords=props.chords
    this.chordlen=this.chords.length
    console.log(this.chords)
    console.log('henry')
  }
selectRandomChord=()=>{
    var chordNum=this.state.chordNumber;
    while(chordNum==this.state.chordNumber){
  chordNum=(Math.floor(Math.random()*this.chordlen));
    }
  this.setState(previousState=> (
        {chordNumber:chordNum,}
      ))
}
componentWillUnmount()
{
  clearInterval(firstTimer)
}
  componentDidMount(){
    firstTimer=  setInterval(()=>(this.selectRandomChord()
),parseFloat(this.props.timePerChord*1000));
  }
  notelist=[1,2,3]
  state={chordNumber:0,number:0,isShowingText:true};
createNote=(currentChord)=>{
  var chordPositions=[]
  var notePositions=[]
  var noteOperator=[]
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

  if (currentChord[0]=="Min triad")
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
posToBassPos=(note)=>{
    return note%7
}
 placeChords = () => {
  var positionXString=5+'%'
   var chords=[];
   console.log("printing the chords getting passed int")
   console.log(this.props.chords)
  for (var chording in this.chords)
  {
    var notesInChord=[];
    var positions= this.createNote(this.chords[chording])[0];
    var operators=this.createNote(this.chords[chording])[1];
    console.log("printing the positions of notes in a chord and operators")
    console.log(positions)
    console.log(operators)
    for (i in positions)
    {
     var positionY=82.33-positions[i]*(5.03)/2;
     var positionX=45;
     var positionXOperator=38
     var positionYString=positionY+'%'
     var positionXString=positionX+'%'
    var positionXStringOperator=positionXOperator+'%'
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
  if (operators[i]=="#")
  {
   notesInChord.push(<Image
  style={{
    position:'absolute',
    top:positionYString,
    left:positionXStringOperator,
    width: '8%',
    height:'8%'
  }}
  key={i+"sharp"}
  resizeMode='cover'
  source={require('./assets/sharp.png')} resizeMode="cover">
  </Image>)
}
if (operators[i]=="b")
  {
   notesInChord.push(<Image
  style={{
    position:'absolute',
    top:positionYString,
    left:positionXStringOperator,
    width: '8%',
    height:'8%'
  }}
  key={i+"flat"}
  resizeMode='cover'
  source={require('./assets/flat.png')} resizeMode="cover">
  </Image>)
}
    }
chords.push(notesInChord);
  }
return chords[this.state.chordNumber]
   }
  render(){
    const images=this.placeChords()
  // this may be used in ear training excercises
    if(!this.state.isShowingText)
    {
      return (
    <ImageBackground
  style={{
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }}
  source={require('./assets/chordGameStaff.jpg')} resizeMode="cover">
  </ImageBackground>)

    }
    else{
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
  </ImageBackground>
);}
  }
}
export default class ChordGameScreen extends Component {
  render() {
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
        <Switch text='Yes blinking is so great' chords={chordList} totalTime={this.props.navigation.getParam('totalTime','default value')}
        timePerChord={this.props.navigation.getParam('timePerChord','default value')} />
      </View>
  <View style={{flex:1, backgroundColor:'steelblue',alignItems: 'center', justifyContent:'center'}}>
<CountdownCircle
            seconds={parseInt(this.props.navigation.getParam('totalTime','default value'))}
            radius={30}
            borderWidth={8}
            color="#ff003f"
            bgColor="#fff"
            textStyle={{ fontSize: 20 }}
            onTimeElapsed={() => clearInterval(firstTimer)}
        />
      </View>
      </View>
    );
  }
}
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
