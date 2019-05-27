import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
const localhost = require('../config');

export default class DashboardParticipantAccepted extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    console.log(this.props.user)
    fetch(`http://${localhost}/api/profile/userInformation/${this.props.user}`,{method:"GET",credentials:'include'}).then(res => res.json().then(data => {
      console.log(data)
      this.setState({user:data})
    })).catch(err => console.log(err))
  }

  render() {
    if(this.state.user){
    return (
      <View style={{borderWidth:0.5,borderColor:5,paddingTop:10,paddingBottom:10}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri:"https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"}} style={{width:50,height:50,borderRadius:50}}/>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',paddingLeft:15}}>
              <Text style={{fontSize:16,fontWeight:'800'}}>{this.state.user[0].name || "No Name Given"}</Text>
              </View>
            </View>
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileViewAccepted',{profileId:this.state.user._id})}>
            <View style={{backgroundColor:'#ff5a5f',paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20,borderRadius:5}}>
              <Text style={{color:"white"}}>View</Text>
            </View>
          </TouchableOpacity>
          </View>
      </View>
      </View>
  )}else{
    return null
  }

}
}
