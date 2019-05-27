import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import { StyleSheet, Text, View,Platform } from 'react-native';

class HeaderHospeasy extends React.Component {
  render(){
    return(
      <View style={{flexDirection:'row',backgroundColor:'white',paddingTop: 17,paddingBottom:17,elevation:1,shadowColor:'black',shadowOpacity: 0.2,alignItems: 'center',justifyContent: 'center',}}>
        <Text style={{
        fontWeight:"bold",
        color: "#ff5a5f",
        fontSize: 30
        }}>HospEasy</Text>
      </View>
    )
  }
}

export default HeaderHospeasy
