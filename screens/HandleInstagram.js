import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class HandleInstagram extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
    this.handleInstagramLink = this.handleInstagramLink.bind(this);
  }

  handleInstagramLink = () => {
  Linking.openURL(this.state.data.url);
  this.props.onPress && this.props.onPress();
    };

  componentDidMount(){
    fetch('http://192.168.1.8:5000/api/instagram/authorize_user', {
          method: 'POST',
          credentials: 'include',
          headers: {
          "Content-Type": "application/json"
          }
        }).then(response => response.json().then(data => {
          this.setState({data})}
        )).catch(err => console.log(err))
  }
  render(){
    if(this.state.data){
    return   <Text {...this.props} onPress={this.handleInstagramLink}>Link Instagram</Text>
    }else {
      return null
    }
  }
}

export default HandleInstagram;
