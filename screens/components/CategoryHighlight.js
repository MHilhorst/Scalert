import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class CategoryHighlight extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={{height:"100%",width:"100%",borderWith:0.5,borderColor:'#dddddd',borderRadius:5}}>
              <View style={{flex:2}}>
                <Image source={this.props.imageUri} style={{flex:1,width:null,height:null,resizeMode:'cover'}}/>
              </View>
              <View style={{flex:1,paddingTop:10}}>
                <Text style={{fontSize:14,color:"#1e272e",fontWeight:'800'}}>asd</Text>
              </View>
            </View>
        </TouchableOpacity>
    )
  }
}

export default CategoryHighlight;
