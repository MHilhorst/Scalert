import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,TouchableOpacity,Image,ScrollView,SafeAreaView } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import BasicInformation from './BasicInformation';
import SessionItems from './components/SessionItems';
import MyHostSessions from './MyHostSessions';
export default class MySessions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      participantUnderline:true,
      hostUnderline:false,
      }
  }
  componentDidMount(){
    fetch('http://192.168.1.8:5000/api/listings/mySessionsP',{method:"GET",credentials:"include"}).then(res => res.json().then(
      data => {
        this.setState({mySessionsP:data})
        console.log(this.state.mySessionsP)
      }
    ))
  }

  render() {
    if(this.state.mySessionsP){
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
          {this.state.participantUnderline && this.state.mySessionsP.map(listing =>{
            return(<SessionItems key={listing._id} informationListing={listing}/>)
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
