import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import BasicInformation from './BasicInformation';
import AddDescription from './AddDescription';
const localhost = require('../config');

export default class AccountPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    fetch(`http://${localhost}/api/logout`,{method:"GET",credentials:"include"}).then(res => res.json().then(data => {
      console.log(data)
      this.props.isLoggedOut()
    }))
  }
  componentDidMount(){
    console.log("accountpage")
    fetch(`http://${localhost}/api/profile`, {method:"GET",credentials:"include"}).then(res => res.json().then(data =>{
      this.setState({data})
    })).catch(err => console.log(err));
  }

  render() {
    if(this.state.data){
      console.log(this.state.data)
    return (
      <View>
        <HeaderHospeasy />
        <View style={styles.red}>
          <Text style={styles.listHeader}>ACCOUNT</Text>
        <List>
          <ListItem onPress={() => this.props.navigation.navigate('BasicInformation')}>
            <Left>
              <Text>Basic Information</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate('PublicProfile',{profileId:this.state.data._id})}>
            <Left>
              <Text>View Public Profile</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={this.handleLogout}>
            <Left>
              <Text>Logout</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </View>
      <View style={styles.red}>
        <Text style={styles.listHeader}>ADD PERSONAL INFO</Text>
      <List>
        <ListItem onPress={() => this.props.navigation.navigate('AddDescription',{description:this.state.data.description})}>
          <Left>
            <Text>Personal Bio</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </View>
  </View>
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
  listHeader:{
    fontSize:20,
    fontWeight:"bold",
    marginHorizontal:20
  },
  logo:{
  fontWeight:"bold",
  color: "#ff5a5f",
  fontSize: 30
  }
});
