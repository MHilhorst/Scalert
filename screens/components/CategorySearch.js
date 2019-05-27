import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class CategorySearch extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={{height:350,width:'100%',borderWith:0.5,borderColor:'#dddddd',paddingBottom:35}}>
              <View style={{flex:4}}>
                <Image source={this.props.imageUri} style={{flex:1,width:"100%",resizeMode:'cover'}}/>
              </View>
              <View style={{flex:1,paddingTop:10}}>
                <View>
                  <Text style={{fontSize:12,fontWeight:'800',color:"#ff5a5f"}}>{this.props.acceptedApplicants}/{this.props.amountOfParticipants} GUESTS - {this.props.hospiDate}</Text>
                </View>
                <Text style={{fontSize:27,fontWeight:'800'}}>{this.props.name}</Text>
                <View style={{marginTop:5}}>
                  <Text style={{fontSize:12,fontWeight:'400',color:"#d2dae2"}}>SAMPLE TEXT</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>
    )
  }
}

export default CategorySearch;
