import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import BasicInformation from './BasicInformation';

export default class AccountPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    console.log("accountpage")
    fetch(`http://192.168.1.8:5000/api/profile`, {method:"GET",credentials:"include"}).then(res => res.json().then(data =>{
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
          <ListItem>
           <Left>
              <Text>My Upcoming Sessions</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate('Invoices')}>
            <Left>
              <Text>Invoices</Text>
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
        </List>
      </View>
      <View style={styles.red}>
        <Text style={styles.listHeader}>PREFERENCES</Text>
      <List>
        <ListItem>
          <Left>
            <Text>Fill in your preference list</Text>
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
