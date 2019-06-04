import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import { StyleSheet, Text, View,Platform , Image,BackHandler} from 'react-native';
import HeaderHospeasy from './HeaderHospeasy';
const localhost = require('../config');


class PublicProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

componentDidMount(){
    fetch(`http://${localhost}/api/profile/userInformation/${this.props.navigation.getParam('profileId','NO-NAME')}`,{method:"GET",credentials:"include",header:{"Cache-Control":"no-cache"}}).then(res => res.json().then(data => this.setState({data}))).catch(err => console.log(err))
  }
  render(){
      if(this.state.data){
        return(
          <View>
            <HeaderHospeasy />
            <View style={{justifyContent:'center',alignItems:'center',marginVertical:40,marginHorizontal:40}}>
              <Image style={styles.avatar} source={{uri:this.state.data[0].photos[1]}}/>
              <Text style={{fontSize:20,paddingTop:10,fontWeight:'800'}}>{this.state.data.name || "No Game Given"}</Text>
              <Text style={{fontSize:17,textAlign:'center',marginTop:10}}>{this.state.data[0].description}</Text>
            </View>
          </View>
    )}
    else{
      return null
    }
  }
}
const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
});

export default PublicProfile;
