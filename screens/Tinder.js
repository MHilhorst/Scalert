import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView,Dimensions,Animated,PanResponder } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';

const SCREEN_HEIHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const PERSONS = [
  {id:"1",uri:"https://images.unsplash.com/photo-1558755151-b931c19f89d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
  {id:"2",uri:"https://images.unsplash.com/photo-1558755151-b931c19f89d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}
]

export default class Tinder extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentIndex:0}
    this.position = new Animated.ValueXY()
  }

  componentWillMount(){
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt,gestureState)=>true,
      onPanREsponderMove:(evt,gestureState) =>{
        this.position.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanRelease:(evt,gestureState) =>{

      }
    })
  }

  renderUsers = () =>{
    return PERSONS.map((item,i) => {
      return(
        <Animated.View {...this.PanResponder.panHandlers} key={item.id} style={[{transform:this.position.getTranslateTransform()},{height:SCREEN_HEIHT-120,width:SCREEN_WIDTH,padding:10,position:'absolute'}]}>
        <Image source={{uri:item.uri}} style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20}}/>
        </Animated.View>
      )
    }).reverse()
  }

  render() {
    return(
      <View style={{flex:1}}>
          <View style={{height:60}}>


          </View>
          <View style={{flex:1}}>
            {this.renderUsers()}
          </View>
          <View style={{height:60}}>


          </View>
      </View>

  )
  }
}
