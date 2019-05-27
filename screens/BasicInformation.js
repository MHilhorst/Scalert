import * as React from 'react'
import { StyleSheet, Text, View , TextInput, Picker,TouchableOpacity,Keyboard} from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import HeaderHospeasy from './HeaderHospeasy';
import HandleInstagram from './HandleInstagram.js';

export default class BasicInformation extends React.Component {
  constructor(props){
    super(props);
    this.state = {instagramLinked:false}
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleEmailChange(){
    fetch('http://192.168.1.8:5000/api/profile/update/username',{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({"username":this.state.email})
  }).then(res => res.json().then(data => {
    if(res.status == 200){
      this.setState({data,changeEmailHighlighted:false,usernameAlreadyTaken:false})
      this.refs.handleEmailChange.blur()
    }else{
      this.setState({usernameAlreadyTaken:true})
      this.setState({changeEmailHighlighted:true})
    }
  })).catch(err => console.log(err))
}

  handleUpdate(){
    fetch('http://192.168.1.8:5000/api/profile/update/profile',{
      method:'POST',
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"name":this.state.name})
    }).then(res =>res.json().then(data => this.setState({data}))).catch(err => console.log(err));
  }

  componentDidMount(){
    fetch(`http://192.168.1.8:5000/api/profile`, {method:"GET",credentials:"include",headers:{"Cache-Control":"no-cache"}}).then(res => res.json().then(data =>{
      this.setState({data})
    })).catch(err => console.log(err));
  }

  render() {
    if(this.state.data){
    return (
      <View>
        <HeaderHospeasy />
        <View style={styles.red}>
          <Text style={styles.listHeader}>ACCOUNT</Text>
        <List>
          <ListItem>
            <Left>
             <TextInput
               ref="handleEmailChange"
               value={this.state.email}
               onChangeText={(email) => this.setState({ email })}
               placeholder={this.state.data.username}
               style={styles.input}
             />
           </Left>
          <Right>
            {!this.state.changeEmailHighlighted && <TouchableOpacity onPress={() =>{
              this.refs.handleEmailChange.focus()
              this.setState({changeEmailHighlighted:true})
            }}>
            <Icon name="md-create"/>
            </TouchableOpacity>}
            {this.state.changeEmailHighlighted && <TouchableOpacity onPress={this.handleEmailChange}>
            <Icon name="md-checkmark"/>
            </TouchableOpacity>}
          </Right>
          </ListItem>
          {this.state.usernameAlreadyTaken && <Text style={{marginHorizontal:20,color:"#e74c3c",marginTop:5}}>This E-mail address is already used</Text>}
          <ListItem>
             <Text style={{paddingTop:10,paddingBottom:10}}>{this.state.data.gender || "No gender filled in"}</Text>
          </ListItem>
          <ListItem>
            <Text style={{paddingTop:10,paddingBottom:10}}>{`${this.state.data.age} Years` || "No age filled in"}</Text>
          </ListItem>
        </List>
      </View>
      <View style={styles.red}>
        <Text style={styles.listHeader}>LINK SOCIAL ACCOUNTS</Text>
      <List>
        <ListItem>
          <Left>
            {!this.state.data.instagram && <HandleInstagram />}
            {this.state.data.instagram && <Text>{this.state.data.instagram}</Text>}
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </View>
  </View>
    );
  }
  else{
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
