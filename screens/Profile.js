import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Button} from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import AccountPage from './AccountPage';
const localhost = require('../config');
export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isLoggedOut = this.isLoggedOut.bind(this)
  }

  componentDidMount(){
    fetch(`http://${localhost}/api/checkLoggedIn`,{method:"GET",credentials:"include"}).then(res => res.json().then(data => {
      if(data.userLoggedIn){
        this.setState({loggedIn:true})
      }else{
        this.setState({loggedIn:false})
      }
    })).catch(err => console.log(err))
  }

  isLoggedOut(){
    this.setState({loggedIn:false,username:"",password:""})
  }
  handleSubmit(event){
    event.preventDefault();
    console.log("gang")
    fetch(`http://${localhost}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
        "Content-Type": "application/json",
        "Cache-Control":"no-cache"
        },
        body: JSON.stringify({"username":this.state.username,"password":this.state.password})
      }).then(response => {
        if(response.status === 200){
          this.setState({
            invalid:false,
            loggedIn:true
          });
        }else{
          this.setState({
            invalid:true
          });
        }
      }).catch(
        (error) => console.log(error)
      );
    }

  render() {
    const BLUE = "#428AF8";
    const LIGHT_GRAY = "#D3D3D3";

    if(!this.state.loggedIn){
    return (
      <View>
      <HeaderHospeasy />
      <View style={styles.container}>
        <Text style={{fontSize:30,fontWeight:'800'}}>
          Login
        </Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          autoCapitalize = 'none'
          selectionColor={BLUE}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          autoCapitalize = 'none'
          selectionColor={BLUE}
          style={styles.input}
        />
      {this.state.invalid && <Text style={{marginTop:10,color:"#e74c3c"}}>Wrong Password!</Text>}
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
        <View style={[styles.countContainer]}>
          <Text style={[styles.loginText]}>
            Login
           </Text>
         </View>
        </TouchableOpacity>
        <Text style={{justifyContent: 'center',marginTop:30}} onPress={() => this.props.navigation.navigate('Register')}>
          Register
         </Text>
       </View>
      </View>
    </View>
    );
  }if(this.state.loggedIn){
      return(
        <AccountPage navigation={this.props.navigation} isLoggedOut={this.isLoggedOut}/>
      )
  }else{
    return null
  }
}
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    backgroundColor: '#fff',
    marginHorizontal:40
  },
    input: {
      fontSize: 15,
      height: 60,
      width: "100%",
      marginTop: 30,
      borderBottomColor: '#ebebeb',
      color:"#484848",
      borderBottomWidth: 1,
  },
  loginText:{
    fontSize: 15,
    color:"#FFFFFF",
  },
  button:{
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#ff5a5f',
    width:"80%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 55,
    paddingLeft: 55,
    borderRadius: 10,
  }
});
