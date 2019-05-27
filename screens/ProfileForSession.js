import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import { StyleSheet, Text, View,Platform , Image,BackHandler,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import HeaderHospeasy from './HeaderHospeasy';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width
class ProfileForSession extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.handleAcceptUser = this.handleAcceptUser.bind(this)
    this.handleDeclineUser = this.handleDeclineUser.bind(this)
  }

  componentWillUnmount() {
    this.props.navigation.state.params.onBack();
  }

  componentDidMount(){
    fetch(`http://192.168.1.8:5000/api/profile/public/${this.props.navigation.getParam('profileId','NO-NAME')}`,{method:"GET",credentials:"include",header:{"Cache-Control":"no-cache"}}).then(res => res.json().then(data => this.setState({data}))).catch(err => console.log(err))
  }

  handleAcceptUser(){
    fetch(`http://192.168.1.8:5000/api/dashboard/accept/${this.props.navigation.getParam('listingId','NO-ID')}/${this.props.navigation.getParam('profileId',"NO-NAME")}`,{method:"POST",credentials:"include"}).then(res => res.json().then(data => {
        if(data.ok){
          this.props.navigation.state.params.onBack();
        }
    })).catch(err => console.log(err))
  }

  handleDeclineUser(){
    fetch(`http://192.168.1.8:5000/api/dashboard/decline/${this.props.navigation.getParam('listingId','NO-ID')}/${this.props.navigation.getParam('profileId',"NO-NAME")}`,{method:"POST",credentials:"include"}).then(res => res.json().then(data => {
        if(data.ok){
          console.log("succesfully declined user")
          this.props.navigation.goBack()
        }
    })).catch(err => console.log(err))
  }

  render(){
      if(this.state.data){
        return(
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <HeaderHospeasy />
          <View style={{flex:1}}>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
              <Image source={{uri:"https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"}} style={{width:140,height:140,borderRadius:140}} />
              <View style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:27,fontWeight:'800'}}>{this.state.data.name || "No Name Given"}</Text>
                <Text style={{fontSize:14,marginTop:10}}>{this.state.data.age || "0 Years"}</Text>
              </View>
            </View>
            </View>
            <View style={{position:'absolute',bottom:15,left:(SCREEN_WIDTH-220)/2,shadow:0.2}}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={this.handleAcceptUser}>
                <View style={{justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,paddingHorizontal:50,backgroundColor:"#2ecc71",}}>
                  <Icon name="ios-checkmark" size={30} color="white"/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleDeclineUser}>
                <View style={{justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,paddingHorizontal:50,backgroundColor:"#ff5a5f",}}>
                  <Icon name="ios-close" size={30}color="white"/>
                </View>
              </TouchableOpacity>

              </View>
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

export default ProfileForSession;
