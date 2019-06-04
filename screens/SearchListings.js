import * as React from 'react';
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,Form,TouchableOpacity,ImageBackground } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import Category from './components/Category';
import CategorySearch from './components/CategorySearch';
import CategoryHighlight from './components/CategoryHighlight';
const localhost = require('../config');

export default class SearchListings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location:this.props.navigation.getParam('location')
    }
    this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(){
      fetch(`http://${localhost}/api/listings/${this.state.location}`).then(
        response => response.json().then(data => {
          console.log(data)
          if(data.error){
          }else{
          this.setState({
            listings:data,
            listingsFound:data.length,
          })
        }
      })
      ).catch(err => console.log(err))
    }
    componentDidMount(){
      fetch(`http://${localhost}/api/listings/${this.props.navigation.getParam('location','Amsterdam')}`).then(
        response => response.json().then(data => {
          console.log(data)
          if(data.error){
          }else{
          this.setState({
            listings:data,
            listingsFound:data.length,
          })
        }
      })
      ).catch(err => console.log(err))
    }


  render() {
    if(this.state.listings){
    return(
      <SafeAreaView style={{flex:1}}>
          <StatusBar hidden={true} />
        <View style={{flex:1}}>
          <View style={{height:this.startHeaderHeight,backgroundColor:'white',borderBottomWidth:1,borderBottomColor:"#eee"}}>
            <View style={{flexDirection:'row',padding:13,backgroundColor:'white',marginTop: Platform.OS == 'android' ? 10: null,marginHorizontal:20,}}>
            <Icon name='ios-search' size={24} style={{padding:3}}color="#747d8c"/>
            <TextInput
              placeholder="Try Amsterdam"
              underlineColorAndroid="transparent"
              placeholderTextColor="#ddd"
              style={{flex:1,backgroundColor:'white',fontSize:20,marginHorizontal:10,borderWidth:0}}
              onSubmitEditing={this.onSubmit}
              onChangeText={text=>this.setState({location:text})} />
            </View>
          </View>
          <View style={{flex:1,backgroundColor:'white'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontSize:24, fontWeight:'700',paddingHorizontal:20,marginTop:20}}>
            {this.state.listingsFound} Hospiteer avonden gevonden in {this.state.location}
            </Text>
            <View style={{marginTop:20,marginHorizontal:20}}>
                {this.state.listings.map(item => {
                    itemDate = item.hospiDate.toString().substring(0,10)
                    return <CategorySearch key={item._id} hospiDate={itemDate} amountOfParticipants={item.amountOfParticipants || dateToday} acceptedApplicants={item.acceptedApplicants.length}imageUri={{uri:item.images[0].url}} name={item.name} onPress={() => {
                        this.props.navigation.navigate('Listing',{listingId:item._id,listingName:item.name})
                    }} >
                </CategorySearch>
                })}
          </View>
        </ScrollView>
        </View>
      </View>
      </SafeAreaView>
  )}else{
    return null
  }
  }
}
