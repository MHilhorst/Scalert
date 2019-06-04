import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Button,ImageBackground,Animated,Dimensions,Keyboard} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Radio,ListItem,Left,Right} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Profile from './Profile';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/Ionicons';
import HandleInstagram from './HandleInstagram';
const localhost = require('../config');

const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      placeholderText:"Enter your Name",
      showName:true,
      name:"",
      email:"",
      showEmpty:false,
      displayText:"Welcome, Please fill in your Name!",
      showKeyBoardInitialize:true,
      data: [
        {
          label: 'I dont want to say',
        },
        {
          label: 'Men',
        },
        {
          label: 'Woman',
        },
      ],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.email = this.email.bind(this)
    this.password = this.password.bind(this)
    this.gender = this.gender.bind(this)
    this.onPress = this.onPress.bind(this)
  }

  componentWillMount(){
    this.loginHeight = new Animated.Value(150)

}
  increaseHeightOfLogin = () => {
    this.setState({placeholderText:'Jan Klaassen'})
    Animated.timing(this.loginHeight,{
      toValue:SCREEN_HEIGHT,
      duration:500
    }).start(()=>{if(this.state.showKeyBoardInitialize){
          this.refs.textInputMobile.focus()
    }
    })
  }

  email(){
    if(this.state.name.length > 0){
      this.setState({showEmpty:false,showName:false,showEmail:true,placeholderText:"Enter your email",displayText:"What is your E-mail?",showKeyBoardInitialize:false},()=>{
      this.refs.textInputMobile1.focus()
      })
    }else{
      this.setState({showEmpty:true})
    }
  }
  password(){
    if(this.state.email.length > 0){
    fetch(`http://${localhost}/api/duplicateUsername/${this.state.email}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    }).then(res => res.json().then(data => {
      if(data.error){
        this.setState({showInvalid:true,showEmpty:false})
      }else{
        this.setState({showInvalid:false,showEmpty:false,showEmail:false,showPassword:true,placeholderText:"Enter a secure password!",displayText:"Don't tell your password to anyone"},()=>{
        this.refs.textInputMobile2.focus()
        })
      }
    })).catch(err => console.log(err))
  }else{
    this.setState({showEmpty:true})
  }
}
  gender(){
    this.setState({showGender:true,showPassword:false,displayText:"What's your Gender?"})
  }

  onPress = data => {
    this.setState({ data:data, gender:this.state.data.find(e => e.selected == true).value,showGender:false,showAge:true,displayText:"Last thing, what's your age?",placeholderText:"Enter what your age is right now"},()=>{
      this.refs.textInputMobile3.focus()
    });

  }


  decreaseHeightOfLogin(){
    Keyboard.dismiss()
    Animated.timing(this.loginHeight,{
      toValue:150,
      duration:500
    }).start()
  }
  handleSubmit(event) {
    console.log(this.state)
  fetch(`http://${localhost}/api/register`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"username":this.state.email,"password":this.state.password,"age":this.state.age,"gender":this.state.gender,"name":this.state.name})
  }).then(response => response.json().then(data => {
    if(response.status ===200){
      console.log(data)
      this.props.navigation.navigate('Profile')
    }
  }
  ));
  }

  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[1,0]
    })

    const marginTop = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[25,100]
    })
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[0,1]
    })
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[100,60]
    })
    const titleTextBottom = this.loginHeight.interpolate({
      inputRange:[150,400,SCREEN_HEIGHT],
      outputRange:[0,0,100]
    })
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[0,1]
    })

    let selectedButton = this.state.data.find(e => e.selected == true);

    return (
      <View style={{flex:1}}>

          <Animated.View style={{position:'absolute',height:60,width:60,top:60,left:25,zIndex:100,opacity:headerBackArrowOpacity}}>
          <TouchableOpacity onPress={()=>this.decreaseHeightOfLogin()}>
            <Icon name="ios-arrow-back" color="black" size={30}/>
          </TouchableOpacity>
          </Animated.View>

        <ImageBackground
          source={require('../assets/background.jpg')}
          style={{flex:1}}
          >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Animatable.View animation="zoomIn" iterationCount={1} style={{backgroundColor:'white',height:120,width:120,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontWeight:'700',fontSize:27, fontWeight:"bold",color:"#ff5a5f"}}>HosPeasy</Text>
          </Animatable.View>
        </View>

        <Animatable.View animation="slideInUp" iterationCount={1}>
          <Animated.View style={{height:this.loginHeight,backgroundColor:'white'}}>
            <Animated.View style={{alignItems:'flex-start',paddingHorizontal:25,marginTop:marginTop,opacity:headerTextOpacity}}>
              <Text style={{fontSize:25}}>
              Get Ready with HeaderHospeasy
            </Text>
          </Animated.View>
            <TouchableOpacity
              onPress={()=>this.increaseHeightOfLogin()}>
              <Animated.View style={{marginTop:25,paddingHorizontal:25,flexDirection:'row',}}>
                <Animated.Text style={{fontSize:24,color:'gray',position:'absolute',bottom:titleTextBottom,left:titleTextLeft,opacity:titleTextOpacity}}>{this.state.displayText}
                </Animated.Text>
                <Icon name="ios-contact" size={30} color="#e8e8ec"/>
                <Animated.View style={{flexDirection:'row',flex:1,borderBottomWidth:this.borderBottomWidth}}>
                  {this.state.showName && <TextInput
                    ref="textInputMobile"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    placeholder={this.state.placeholderText}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.email}
                    style={{borderBottomColor: '#ebebeb',color:"#484848",marginHorizontal:15,fontSize:20}}
                  />}

                  {this.state.showEmail && <TextInput
                    ref="textInputMobile1"
                    value={this.state.email}
                    autoCapitalize = 'none'
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={this.state.placeholderText}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.password}
                    style={{borderBottomColor: '#ebebeb',color:"#484848",marginHorizontal:15,fontSize:20}}
                  />}

                  {this.state.showPassword && <TextInput
                    ref="textInputMobile2"
                    value={this.state.password}
                    autoCapitalize = 'none'
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={this.state.placeholderText}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.gender}
                    secureTextEntry={true}
                    style={{borderBottomColor: '#ebebeb',color:"#484848",marginHorizontal:15,fontSize:20}}
                  />}

                  {this.state.showGender &&
                      <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />

                  }

                  {this.state.showAge && <TextInput
                    ref="textInputMobile3"
                    value={this.state.age}
                    onChangeText={(age) => this.setState({ age })}
                    placeholder={this.state.placeholderText}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.handleSubmit}
                    style={{borderBottomColor: '#ebebeb',color:"#484848",marginHorizontal:15,fontSize:20}}
                  />}

              </Animated.View>
            </Animated.View>
              {this.state.showInvalid && <Text style={{marginHorizontal:70,color:'red'}}>This email address is already taken</Text>}
              {this.state.showEmpty && <Text style={{marginHorizontal:70,color:'red'}}>Field can't be empty</Text>}
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>

        <View>
          <View style={{height:70,backgroundColor:'white',alignItems:'flex-start',justifyContent:'center',borderTopColor:'#e8e8ec',borderTopWidth:1,paddingHorizontal:25}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
            <Text>
              Already Account? Log in.
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
  fontWeight:"bold",
  color: "#ff5a5f",
  fontSize: 30
},
    input: {
      fontSize: 15,
      height: 40,
      width: 250,
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 55,
    paddingLeft: 55,
    borderRadius: 5,
  }
});
