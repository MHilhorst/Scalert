import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,TouchableOpacity,ImageBackground,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const SCREEN_WIDTH = Dimensions.get('window').width

class CategoryHighlight extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={{height:300,width:SCREEN_WIDTH-40,borderWith:0.5,borderColor:'#dddddd',borderRadius:5}}>
                <ImageBackground source={this.props.imageUri} style={{flex:1,width:null,height:null,resizeMode:'cover',justifyContent:'flex-end'}}>
                  <View style={{padding:20}}>
                  <Text style={{color:"#fff",fontSize:24,fontWeight:'800'}}>{this.props.listingName}</Text>
                  <Text style={{color:"#fff",marginTop:5}}>There are {this.props.availableSpots} spots left!</Text>
                  <Text style={{color:"#fff",marginTop:5,fontWeight:'800'}}>{this.props.hospiDate}</Text>
                  </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
  }
}

export default CategoryHighlight;
