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
        console.log(this.state.data.instagram)
        return(
          <View>
            <HeaderHospeasy />
            <View style={styles.container}>
              {this.state.data.photos && <Image style={styles.avatar} source={{uri:this.state.data.photos[0]}}/>}
              {!this.state.data.photos &&<Image style={styles.avatar} source={{uri:"https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"}}/>}
              <Text style={{fontSize:20,paddingTop:10,fontWeight:'800'}}>{this.state.data.name || "No Game Given"}</Text>
            </View>
          </View>
    )}
    else{
      return null
    }
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFFFFF",
    height:14,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:50
  },
});

export default PublicProfile;
