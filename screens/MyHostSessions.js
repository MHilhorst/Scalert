import * as React from 'react'
import { StyleSheet, Text, View , TextInput,TouchableOpacity, Picker,ScrollView,Image} from 'react-native';
import HeaderHospeasy from './HeaderHospeasy';
import {ImagePicker} from 'expo';
import DatePicker from 'react-native-datepicker';
import SessionItemsHost from './components/SessionItemsHost';
import SessionItemsHostEnded from './components/SessionItemsHostEnded';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
const localhost = require('../config');

export default class MyHostSessions extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    fetch(`http://${localhost}/api/listings/mySessionsH`,{method:"GET",credentials:'include'}).then(res => res.json().then(
      data => {
        this.setState({data:data.available,ended:data.ended})
      }
    ))
  }

  render() {
    if(this.state.data){
    return(
      <View>
        {this.state.data && this.state.data.map(listing =>{return(<SessionItemsHost key={listing._id} navigation={this.props.navigation} informationListing={listing} ended="view"/>)})}
        {this.state.ended && this.state.ended.map(listing =>{return(<SessionItemsHostEnded key={listing._id} navigation={this.props.navigation} informationListing={listing} ended="ended"/>)})}
      </View>
    )
  }else{
    return null
    }
  }
}
