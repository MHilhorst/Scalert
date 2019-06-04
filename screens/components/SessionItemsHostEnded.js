import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SessionItems extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={{width:'100%',marginTop:20}}>
        <View style={{flex:4,marginHorizontal:20,}}>
          <Image source={{uri:this.props.informationListing.images[0].url}} style={{flex:1,width:"100%",height:200,resizeMode:'cover',borderTopLeftRadius:5,borderTopRightRadius:5}}/>
        </View>
        <View style={{flex:1,padding:13,marginHorizontal:20,borderWidth:0.5,borderColor:'#ddd',borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopWidth:0}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View>
                <Text style={{fontSize:12,fontWeight:'800',color:"#ff5a5f"}}>{this.props.informationListing.acceptedApplicants.length} PARTICIPANTS</Text>
                  <Text style={{fontSize:27,fontWeight:'800'}}>{this.props.informationListing.name}</Text>
                <Text style={{fontSize:12,fontWeight:'400',color:"#d2dae2",marginTop:5}}>{this.props.informationListing.hospiDate.toString().substring(0,10)}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <View style={{backgroundColor:'#ff5a5f',paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20,borderRadius:5}}>
                <Text style={{color:"white"}}>{this.props.ended}</Text>
              </View>
            </View>
        </View>
            </View>
        </View>
    )
  }
}

export default SessionItems;
