import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,Form,TouchableOpacity } from 'react-native';
const localhost = require('../config');
import HeaderHospeasy from './HeaderHospeasy';
function Auth(ComponentToProtect) {
  return class extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: true,
        authenticated: false
      }
    }

    componentDidMount(){
      fetch(`http://${localhost}/api/profile`, {
        credentials:'include',
        method:"GET"
      }).then(res=>res.json().then(data => {
        if(data.error){
          this.setState({authenticated:false})
        }if(data.username){
          this.setState({authenticated:true})
        }
      })).catch(err => console.log(err))
    }

  render(){
    if(!this.state.authenticated){
      return(        <View style={{flex:1}}>
              <HeaderHospeasy />
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <View>
                    <Text>You must be Logged in to place a listing</Text>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Profile',{handleAuthentication:this.handleAuthentication})
                      }}>
                    <View style={{marginTop:20,paddingVertical:15,paddingHorizontal:30,backgroundColor:"#ff5a5f",borderRadius:5,justifyContent:"center",alignItems:"center"}}>
                      <Text style={{color:"#fff"}}>Log in</Text>
                    </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>)
    }if(this.state.authenticated){
    console.log("yes")
    return (
        <ComponentToProtect navigation={this.props.navigation} authentication={this.handleAuthentication}/>
    );
  }else{
    return null
  }
  }
  }
}
export default Auth;
