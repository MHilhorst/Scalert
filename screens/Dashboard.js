import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import DashboardParticipantUserRequest from './DashboardParticipantUserRequest';
import DashboardParticipantAccepted from './DashboardParticipantAccepted';
const localhost = require('../config');


export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
    this.reRender = this.reRender.bind(this)
  }

  reRender(){
  this.forceUpdate()
  }

  componentDidMount(){
    fetch(`http://${localhost}/api/dashboard/overview/${this.props.navigation.getParam('listingId','NO-ID')}`,{method:"GET",credentials:"include"}).then(res => res.json().then(
      data =>{
        this.setState({listing:data.listing,hospiteerSession:data.hospiteerSession,usersWaitingReview:data.usersWaitingReview})
      }
    ))
  }
  componentWillUnmount() {
    this.setState( { isMounted: false } )
  }
  render() {
    const { params } = this.props.navigation.state;
    if(this.state.listing){
    const listingItem = this.state.listing[0]
    return (
      <SafeAreaView style={{flex:1}}>
        <HeaderHospeasy />
              <Image source={{uri:listingItem.images[0].url}} style={{width:"100%",height:250,resizeMode:'cover',borderTopLeftRadius:5,borderTopRightRadius:5}} />
              <View style={{marginTop:10,marginHorizontal:20}}>
              <Text style={{fontSize:30,color:"black",fontWeight:"800"}}>{listingItem.name}</Text>
              <Text style={{fontSize:15,color:"black",fontWeight:"400"}}>AHSDui</Text>
              </View>
              <View style={{marginTop:20,marginHorizontal:20}}>
                {this.state.usersWaitingReview.map(user => {
                  return(<DashboardParticipantUserRequest reRender={this.reRender} navigation={this.props.navigation} key={user._id} listingId={this.state.listing[0]._id} user={user}/>)
                })}
              </View>
              <View style={{marginTop:20,marginHorizontal:20}}>
                <View style={{marginBottom:20}}>
                <Text style={{fontSize:24,fontWeight:'800'}}>Participants acepted {this.state.hospiteerSession.AcceptedApplicants.length}/{this.state.listing[0].amountOfParticipants}</Text>
                </View>
                {this.state.hospiteerSession.AcceptedApplicants.map(user => {
                  return(<DashboardParticipantAccepted navigation={this.props.navigation} key={user} user={user}/>)})
                }
              </View>
        </SafeAreaView>
    )
  }else{
    return null
  }
  }
}
