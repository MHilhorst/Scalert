import * as React from 'react'
import { StyleSheet, TouchableOpacity,Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderHospeasy from '../HeaderHospeasy';

class PersonalProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {};
  }

  componentDidMount(){
      fetch('http://192.168.1.8:5000/api/profile',{method:"GET",credentials:"include"}).then(data => data.json().then(data => {
      this.setState({userData:data})
      console.log(this.state.userData)
    })).catch(err => console.log(err))

  }
  render(){
    if(this.state.userData){
      return(
        <View>
          <HeaderHospeasy />
        <View style={styles.container}>
                  <View style={styles.header}></View>
                  <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.name}>{this.state.userData.username}</Text>
                      <Text style={styles.description}>Lorem ipsum dolor sit ameasdt, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                    </View>
                </View>
              </View>
            </View>
      )
    }else{
      return null
    }
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFFFFF",
    height:200,
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
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});



export default PersonalProfile;
