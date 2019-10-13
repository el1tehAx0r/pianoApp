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

export default class BlinkApp extends Component {
  render() {
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

        <Switch text='Yes blinking is so great' />


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
