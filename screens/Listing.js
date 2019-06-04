import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Button,ScrollView, Image,Dimensions} from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import HeaderHospeasy from './HeaderHospeasy';
const localhost = require('../config');
const { width } = Dimensions.get('window');

export default class Listing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      requested:false,
      requestText:"Request Hospiteeravond"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
      if(!this.state.requested){
      fetch(`http://${localhost}/api/listings/join/id/${this.props.navigation.getParam('listingId','NO-ID')}`,{
        method:"POST",
        credentials:"include"
      }).then(data => data.json().then(res => {
        if(res.succesful == "added"){
          this.setState({requestText:"Succesfully Requested"})
          this.setState({requested:true})
        }if(res.error){
          this.setState({requestText:"Can't join your own listing"})
        }
      }
    )).catch(err=>console.log(err))
  }else{
  this.setState({requestText:"Already Requested"})
  }
  }


  componentDidMount(){
    fetch(`http://${localhost}/api/listings/${this.props.navigation.getParam('listingName','NO-NAME')}/${this.props.navigation.getParam('listingId','NO-ID')}`, {
      method:"GET"
    }).then(response => response.json()).then(data => {
      this.setState({listing: data.listing.map(item => ({
        id:item._id,
        name:item.name,
        monthly:item.monthly,
        location:item.location,
        description:item.description,
        matchType:item.matchType,
        userId:item.userId,
        image: item.images
      })),userOfListing:data.userOfListing}
    )
    }
    ).catch(err => {
      console.log(err);
    })
  }


  render() {
    if(this.state.listing){
      console.log(this.state.listing[0].image)
      return(
        <View>
          <HeaderHospeasy />
            <View style={{height:400}}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.listing[0].image.map(img => {return(
                  <Image key={img.url} source={{uri: img.url}} style={{width,height:400}} />
                )})}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('ProfileExplore',{profileId:this.state.userOfListing[0]._id})}}>
          <Text style={{marginHorizontal:40,marginTop:20,fontSize:15,fontWeight:'600'}}>Posted By {this.state.userOfListing[0].name}</Text>
          </TouchableOpacity>
            <Text style={styles.listHeader}>{this.state.listing[0].name}</Text>
            <Text style={styles.description}>{this.state.listing[0].description}</Text>
              <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                <View style={[styles.countContainer]}>
                  <Text style={[styles.loginText]}>
                    {this.state.requestText}
                   </Text>
                 </View>
                </TouchableOpacity>
          </View>
      )
    }else{
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description:{
    marginHorizontal:40,
    marginTop:20,
    fontSize: 16
  },
  listHeader:{
    fontSize:35,
    fontWeight:"bold",
    marginTop: 20,
    marginHorizontal:40,
  },
  red:{
      padding: 25,
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
    marginHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#ff5a5f',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 55,
    paddingLeft: 55,
    borderRadius: 5,
  }
});
