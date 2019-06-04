import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView,TextInput } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
const localhost = require('../config');
export default class AddDescription extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      description:this.props.navigation.getParam('description')
    };
    this.addDescription = this.addDescription.bind(this)
  }
  addDescription(){
    fetch(`http://${localhost}/api/profile/update/description`,{method:"POST",credentials:'incluse',headers:{
      'Content-Type':'application/json'
    },body:JSON.stringify({description:this.state.description})}).then(res => res.json().then(data => {
      this.setState({data})
      this.props.navigation.navigate('PublicProfile',{profileId:this.state.data._id})
    })).catch(err => console.log(err))
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <HeaderHospeasy />
        <View style={{flex:1}}>
          <View style={{justifyContent:'center',alignItems:'center',marginHorizontal:40}}>
            <View style={{paddingTop:20}}>
            <Text style={{fontSize:26,fontWeight:'800',textAlign: 'center'}}>Fill in your Personal Bio</Text>
              <View style={{paddingTop:20,}}>
                <Text style={{textAlign:'center',fontSize:15}}>Please tell more about yourself, this way, the host of a session gets a better idea of you. This increases your chance of being chosen.</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop:50,marginHorizontal:40}}>
            <TextInput
            multiline={true}
            onChangeText={(description) => this.setState({ description })}
            placeholder="Type here"
            placeholderTextColor='#C7C7CD'
            style={{fontSize:20}}
            value={this.state.description}
            />
          </View>
        </View>
        <View style={{justifyContent:'flex-end',paddingBottom:40}}>
          <TouchableOpacity onPress={this.addDescription}>
            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:15,paddingHorizontal:30,backgroundColor:"#ff494f",marginHorizontal:40,borderRadius:5}}>
                <Text style={{color:"white"}}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
  )}
}
