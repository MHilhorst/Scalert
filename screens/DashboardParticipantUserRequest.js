import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';

export default class DashboardParticipantUserRequest extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onBack = this.onBack.bind(this)
  }

  onBack(){
    console.log("onBack Fired")
     this.props.reRender();
  }

  render() {
    return (
      <View style={{borderWidth:0.5,borderColor:5,paddingTop:10,paddingBottom:10}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri:"https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"}} style={{width:50,height:50,borderRadius:50}}/>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',paddingLeft:15}}>
              <Text style={{fontSize:16,fontWeight:'800'}}>{this.props.user.name || "No Name Given"}</Text>
              </View>
            </View>
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileForSession',{profileId:this.props.user._id,listingId:this.props.listingId,onBack:this.onBack})}>
            <View style={{backgroundColor:'#ff5a5f',paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20,borderRadius:5}}>
              <Text style={{color:"white"}}>View</Text>
            </View>
          </TouchableOpacity>
          </View>
      </View>
      </View>
  )}
}
