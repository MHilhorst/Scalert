import * as React from 'react'
import { StyleSheet, Text, View , TextInput,TouchableOpacity, Picker,ScrollView,Image} from 'react-native';
import HeaderHospeasy from './HeaderHospeasy';
import {ImagePicker} from 'expo';
import DatePicker from 'react-native-datepicker';
import SessionItemsHost from './components/SessionItemsHost';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';


export default class MyHostSessions extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    fetch('http://192.168.1.8:5000/api/listings/mySessionsH',{method:"GET",credentials:'include'}).then(res => res.json().then(
      data => {
        this.setState({data})
        console.log(data)
      }
    ))
  }

  render() {
    if(this.state.data){
    return(
      <View>
        {this.state.data && this.state.data.map(listing =>{return(<SessionItemsHost key={listing._id} navigation={this.props.navigation} informationListing={listing}/>)})}
      </View>
    )
  }else{
    return null
    }
  }
}
