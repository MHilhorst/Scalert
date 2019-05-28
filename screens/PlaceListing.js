import * as React from 'react'
import { StyleSheet, Text, View , TextInput,TouchableOpacity, Picker,ScrollView,Image} from 'react-native';
import HeaderHospeasy from './HeaderHospeasy';
import {ImagePicker} from 'expo';
import DatePicker from 'react-native-datepicker';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
const localhost = require('../config');

export default class PlaceListing extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.handleUploadSubmit = this.handleUploadSubmit.bind(this)
  }

  handleUploadSubmit(){
    fetch(`http://${localhost}/api/listings/addMobile`,{
      method:"POST",
      credentials:'include',
      headers:{
          'accept':'application/json',
          'content-type':'application/json'
      },
      body:JSON.stringify({"upload":this.state.image,"name":this.state.listingName,"id":this.state.data._id,"description":this.state.description,"location":this.state.location,"monthly":this.state.monthly,"amountOfParticipants":this.state.amountOfParticipants,"hospiDate":this.state.date})
    }).then(response => response.json().then(data => this.setState({data}))).catch(err => console.log(err))
  }

  _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    base64:true,
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    this.setState({ image: result.base64 });
  }
};
  componentDidMount(){
    fetch(`http://${localhost}/api/profile`, {
      credentials:'include',
      method:"GET"
    }).then(res=>res.json().then(data => {
      if(data.error){
        this.setState({authenticated:false})
      }if(data.username){
        this.props.handleAuthentication()
        this.setState({authenticated:true})
      }
    })).catch(err => console.log(err))
  }

  render() {

    const AmountHolders = ["1","2","3","4","5","6","7","8"]
    const Amount = AmountHolders.map((s,i)=> {
      return <Picker.Item key={i} value={s} label={s} />
    })
    const dateToday = new Date().toLocaleDateString();
      return(
        <View style={{flex:1}}>
        <HeaderHospeasy />
        <ScrollView>
        <View>
          <View style={styles.red}>
            <Text style={styles.listHeader}>Basic Information</Text>
          <List style={{marginRight:20}}>
            <ListItem>
            <TextInput
              value={this.state.listingName}
              onChangeText={(listingName) => this.setState({ listingName })}
              placeholder="Give your name a Listing"
              style={styles.input}
            />
            </ListItem>
            <Text style={styles.listHeader}>Location</Text>
            <ListItem>
            <TextInput
              value={this.state.location}
              onChangeText={(location) => this.setState({ location })}
              placeholder="Location of your available room"
              style={styles.input}
            />
            </ListItem>
            <Text style={styles.listHeader}>Monthly Fee</Text>
            <ListItem>
            <TextInput
              value={this.state.price}
              onChangeText={(price) => this.setState({ price })}
              placeholder="Price of the room monthly all included"
              style={styles.input}
            />
            </ListItem>
            <Text style={styles.listHeader}>Description</Text>
            <ListItem>
            <TextInput
              value={this.state.description}
              onChangeText={(description) => this.setState({ description })}
              placeholder="Give a brief description of the room and the sfeer"
              multiline={true}
              style={styles.input}
            />
            </ListItem>
            <Text style={styles.listHeader}>Amount of participants</Text>
            <ListItem>
            <Picker
              style={{height:30, width: 120}}
              selectedValue={this.state.amountOfParticipants}
              onValueChange={ (amountSelected) => ( this.setState({amountOfParticipants:amountSelected}) ) } >
              {Amount}
            </Picker>
            </ListItem>
            <Text style={styles.listHeader}>Hospiteer session date</Text>
            <ListItem>
              <DatePicker
                 style={{width: 100}}
                 mode="date"
                 date={this.state.date}
                 placeholder="select date"
                 customStyles={{dateIcon:{opacity:0},dateTouchBody:{borderWidth:0,padding:0,margin:0,marginHorizontal:0,paddingHorizontal:0},dateText:{padding:0,marginHorizontal:0},dateInput:{borderWidth:0,margin:0,padding:0,paddingHorizontal:0,marginHorizontal:0}}}
                 format="DD-MM-YYYY"
                 minDate={dateToday}
                 maxDate="31-12-2019"
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 onDateChange={(date) => {this.setState({date})}}
               />
            </ListItem>
            <Text style={styles.listHeader}>Upload pictures of room</Text>
            <ListItem>
              <TouchableOpacity onPress={this._pickImage}>
                <View>
                  <Text> Upload Image </Text>
                </View>
              </TouchableOpacity>
            </ListItem>
          </List>
        </View>
        <TouchableOpacity onPress={this.handleUploadSubmit}>
          <View style={{marginTop:20,marginBottom:30,marginHorizontal:40,backgroundColor:"#ff5a5f",borderRadius:5,paddingVertical:15,paddingHorizontal:30,alignItems:'center',justifyContent:'center'}}>
            <Text style={[styles.loginText]}>
              Request Hospiteeravond
             </Text>
           </View>
         </TouchableOpacity>
    </View>
    </ScrollView>
    </View>

      )
    }
  }
const styles = StyleSheet.create({
  red: {
    padding: 25,
  },
  listHeader:{
    fontSize:20,
    fontWeight:"bold",
    marginHorizontal:20,
    marginTop:20
  },
  logo:{
  fontWeight:"bold",
  color: "#ff5a5f",
  fontSize: 30
},  loginText:{
    fontSize: 15,
    color:"#FFFFFF",
  },
  button:{
      marginTop: 10,
      alignItems: 'center',
      backgroundColor: '#ff5a5f',
      paddingTop: 25,
      paddingBottom: 25,
      paddingRight: 55,
      paddingLeft: 55,
    }
});
