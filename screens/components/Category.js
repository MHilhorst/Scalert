import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Category extends React.Component{
  render(){
    return(
            <View style={{height:130,width:130,marginLeft:20,borderWith:0.5,borderColor:'#dddddd'}}>
              <View style={{flex:2}}>
                <Image source={this.props.imageUri} style={{flex:1,width:null,height:null,resizeMode:'cover'}}/>
              </View>
              <View style={{flex:1,paddingLeft:10,paddingTop:10}}>
                <Text>{this.props.name}</Text>
              </View>
            </View>
    )
  }
}

export default Category;
