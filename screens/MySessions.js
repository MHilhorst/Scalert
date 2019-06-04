import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import BasicInformation from './BasicInformation';
import SessionItems from './components/SessionItems';
import MyHostSessions from './MyHostSessions';
const localhost = require('../config');

export default class MySessions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      participantUnderline:true,
      hostUnderline:false,
      }
      this.getSessions = this.getSessions.bind(this)
  }
  getSessions(){
    fetch(`http://${localhost}/api/listings/mySessionsP`,{method:"GET",credentials:"include"}).then(res => res.json().then(
      data => {
        this.setState({waiting:data.resultsWaiting,accepted:data.resultsAccepted,declined:data.resultsDeclined,show:true})
      }
    ))
  }
  componentDidMount(){
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.getSessions
    );
    fetch(`http://${localhost}/api/listings/mySessionsP`,{method:"GET",credentials:"include"}).then(res => res.json().then(
      data => {
        this.setState({waiting:data.resultsWaiting,accepted:data.resultsAccepted,declined:data.resultsDeclined,show:true})
      }
    ))
  }

  render() {
    if(this.state.waiting){
    return (
      <SafeAreaView style={{flex:1}}>
        <HeaderHospeasy />
        <View style={{height:50,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0.5,borderColor:"#ddd"}}>
          <View style={{width:"50%",alignItems:'center',justifyContent:'center',borderRightWidth:0.5,borderColor:"#ddd"}}>
          <TouchableOpacity onPress={()=>{this.setState({participantUnderline:true,hostUnderline:false})}}>
          {this.state.participantUnderline && <Text style={{paddingBottom:3,borderBottomWidth:2.5,borderColor:"#ff5a5f"}}>Requested Sessions</Text>}
          {!this.state.participantUnderline && <Text>Requested Sessions</Text>}
          </TouchableOpacity>
          </View>
          <View style={{width:"50%",alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{this.setState({participantUnderline:false,hostUnderline:true})}}>
          {this.state.hostUnderline && <Text style={{paddingBottom:3,borderBottomWidth:2.5,borderColor:"#ff5a5f"}}>Hosting Sessions</Text>}
          {!this.state.hostUnderline && <Text> Hosting Sessions</Text>}
          </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {this.state.participantUnderline && this.state.waiting.map(listing =>{
            return(<SessionItems key={listing._id} progress="In Request" informationListing={listing}  backgroundColor="#f1c40f"/>)
          })}
          {this.state.participantUnderline && this.state.accepted.map(listing =>{
            return(<SessionItems key={listing._id} progress="Accepted" informationListing={listing}  backgroundColor="#2ecc71"/>)
          })}
          {this.state.participantUnderline && this.state.declined.map(listing =>{
            return(<SessionItems key={listing._id} progress="Declined" informationListing={listing} backgroundColor="#ff5a5f"/>)
          })}
          {!this.state.participantUnderline && <MyHostSessions navigation={this.props.navigation}/>}
        </ScrollView>
        </SafeAreaView>
    );
  }else{
    return null
  }
}
}


const styles = StyleSheet.create({
  red: {
    padding: 25,
  },
});
