import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,Form } from 'react-native';

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
      fetch('http://192.168.1.8:5000/api/profile', {
        credentials:'include',
        method:"GET"
      }).then(data => {
        if(data.status == 200){
          data.json().then(res => {
          this.setState({authenticated:true,loading:false})
        })}else{
          this.setState({authenticated:false,loading:false})
        }
      }).catch(err => console.log(err))
    }

  render(){
    if(!this.state.authenticated){
      return null
    }
    if (this.state.loading) {
      return null;
    }else{
    console.log("yes")
    return (
        <ComponentToProtect/>
    );
  }
  }
  }
}
export default Auth;
