import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Category extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={{height:this.props.style.height,width:this.props.style.width,marginLeft:this.props.style.marginLeft,borderWith:0.5,borderColor:'#dddddd'}}>
              <View style={{flex:2}}>
                <Image source={this.props.imageUri} style={{flex:1,width:null,height:null,resizeMode:'cover'}}/>
              </View>
              <View style={{flex:1,paddingTop:10}}>
                <Text style={{fontSize:14,color:"#1e272e",fontWeight:'800'}}>{this.props.acceptedApplicants}/{this.props.amountOfParticipants} PARTICIPANTS</Text>
              </View>
            </View>
        </TouchableOpacity>
    )
  }
}

export default Category;
