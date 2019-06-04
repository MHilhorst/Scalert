import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView,TextInput } from 'react-native';
import { Container, Content, List, ListItem, Left, Right } from 'native-base';
import DashboardParticipantUserRequest from './DashboardParticipantUserRequest';
import DashboardParticipantAccepted from './DashboardParticipantAccepted';
import Slider from 'react-native-slide-to-unlock';
import Icon from 'react-native-vector-icons/Ionicons';
const localhost = require('../config');


export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showConfirmation:false,
      ended:false
    }
    this.reRender = this.reRender.bind(this)
    this.closeSession = this.closeSession.bind(this)
  }

  closeSession(){
      fetch(`http://${localhost}/api/submit/session/${this.props.navigation.getParam('listingId','NO-ID')}`,{
        method:"POST",
        credentials:'include',
        header:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({message:this.state.emailMessage})
      }).then(res => res.json().then(data => {
        console.log(data)
        if(data.success){
          this.setState({ended:true,showConfirmation:false})
        }
      })).catch(err => console.log(err))
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
        <ScrollView>
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
              <View style={{marginTop:20,marginHorizontal:20}}>
                <View style={{marginHorizontal:40}}>
                <Slider
    childrenContainer={{ }}
    onEndReached={() => {
      this.setState({showConfirmation:true,listing:false})
    }}
    containerStyle={{
      margin: 8,
      backgroundColor: "#ff5a5f",
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    sliderElement={
      <View
        style={{
          width: 50,
          margin: 4,
          borderRadius: 5,
          height: 50,
          backgroundColor: "#ff494f",
          justifyContent:'center',
          alignItems:'center'
        }}>
        <Icon name="ios-arrow-forward" color="white" size={40} />
      </View>
    }
  >
    <Text style={{color:"white"}}>{'SLIDE TO CONFIRM SESSION'}</Text>
  </Slider>
    </View>
    </View>
  </ScrollView>
        </SafeAreaView>
    )
  }if(this.state.showConfirmation){
    return(
      <SafeAreaView style={{flex:1}}>
        <HeaderHospeasy />
        <View style={{flex:1}}>
          <View style={{justifyContent:'center',alignItems:'center',marginHorizontal:40}}>
            <View style={{paddingTop:20}}>
            <Text style={{fontSize:26,fontWeight:'800',textAlign: 'center'}}>Congratulations, you succesfully started your session</Text>
              <View style={{paddingTop:20,}}>
                <Text style={{textAlign:'center',fontSize:15}}>Please type a message that we will send to your participants about the evening. Include information such as the time it takes place.</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop:50,marginHorizontal:40}}>
            <TextInput
            multiline={true}
            onChangeText={(emailMessage) => this.setState({ emailMessage })}
            placeholder="Type here"
            placeholderTextColor='#C7C7CD'
            style={{fontSize:20}}
            value={this.state.emailMessage}
            />
          </View>
        </View>
        <View style={{justifyContent:'flex-end',paddingBottom:40}}>
          <TouchableOpacity onPress={this.closeSession}>
            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:15,paddingHorizontal:30,backgroundColor:"#ff494f",marginHorizontal:40,borderRadius:5}}>
                <Text style={{color:"white"}}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
  }if(this.state.ended){
    return(
      <SafeAreaView style={{flex:1}}>
        <HeaderHospeasy />
        <View style={{flex:1}}>
          <View style={{justifyContent:'center',alignItems:'center',marginHorizontal:40}}>
            <View style={{paddingTop:20}}>
            <Text style={{fontSize:26,fontWeight:'800',textAlign: 'center'}}>Congratulations, you succesfully started your session</Text>
              <View style={{paddingTop:20,}}>
                <Text style={{textAlign:'center',fontSize:15}}>Please type a message that we will send to your participants about the evening. Include information such as the time it takes place.</Text>
              </View>
            </View>
          </View>
        </View>
        </SafeAreaView>

    )
  }
    else{
    return null
  }
  }
}
