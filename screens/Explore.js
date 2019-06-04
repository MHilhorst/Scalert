import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,Form,TouchableOpacity,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import Category from './components/Category';
import CategorySearch from './components/CategorySearch';
import CategoryHighlight from './components/CategoryHighlight';
const localhost = require('../config');


export default class Explore extends React.Component {
  constructor(props){
    super(props);
    this.state = {showLocation:false};
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount(){
    this.startHeaderHeight = 50
    if(Platform.OS == 'android'){
      this.startHeaderHeight = 50 + StatusBar.currentHeight
    }
  }

  onSubmit(){
    this.props.navigation.navigate('SearchListings',{location:this.state.location})
  }
  componentDidMount(){
    fetch(`http://${localhost}/api/homepage/locations/highlighted`,{method:"GET"}).then(result => result.json()).then(data => {
      this.setState({amsterdam:data.amsterdam,utrecht:data.utrecht})
    }).catch(err => console.log(err))
  }
  render() {
    if(this.state.amsterdam){
      return (
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
            <ScrollView>
            <View style={{flex:1,backgroundColor:'white',marginTop:20,paddingBottom:20}}>
              <Text style={{fontSize:24, fontWeight:'700',paddingHorizontal:20}}>
              Hospiteer avonden in Amsterdam
              </Text>
              <View style={{height:130,marginTop:20,marginRight:20}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.state.amsterdam.map(item => {
                    itemDate = item.hospiDate.toString().substring(0,10)
                    console.log(itemDate)
                    return(
                        <Category key={item._id} hospiDate={itemDate} amountOfParticipants={item.amountOfParticipants || dateToday} acceptedApplicants={item.acceptedApplicants.length} imageUri={{uri:item.images[0].url}} onPress={() => {
                            this.props.navigation.navigate('Listing',{listingId:item._id,listingName:item.name})
                        }} style={{width:150,height:150,marginLeft:20}} name={item.location}></Category>)})}
              </ScrollView>
            </View>
            <View style={{flex:1,marginHorizontal:20,marginTop:20}}>
              <Text style={{fontSize:24, fontWeight:'700'}}>Op Zoek naar een kamer in Utrecht?</Text>
              <View style={{marginTop:15,flex:1,width:"100%"}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>
                  {this.state.amsterdam.map(listing => {return(
                    <CategoryHighlight key={listing._id} listingName={listing.name} hospiDate={listing.hospiDate.toString().substring(0,10)} availableSpots={Number(listing.amountOfParticipants)-Number(listing.acceptedApplicants)} amountOfParticipants={listing.amountOfParticipants} acceptedApplicants={listing.acceptedApplicants} imageUri={{uri:listing.images[0].url}}  onPress={() => {
                        this.props.navigation.navigate('Listing',{listingId:listing._id,listingName:listing.name})
                    }}  />
                  )})}
              </ScrollView>
              </View>
            </View>
            <View style={{flex:1,marginTop:30,marginHorizontal:20}}>
              <Text style={{fontSize:24, fontWeight:'700'}}>Andere steden</Text>
              <View style={{flex:1,marginTop:10}}>
                <TouchableOpacity onPress={()=>{
                    this.setState({location:"Amsterdam"},()=>{
                    this.onSubmit()
                    })
                  }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                  <View style={{height:50,width:"100%"}}>
                    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1988&q=80"}} style={{flex:1,width:null,height:null,resizeMode:'cover',justifyContent:'center',paddingHorizontal:20,borderRadius:5}}>
                      <Text style={{color:"#fff",fontSize:24,fontWeight:"800"}}>Amsterdam</Text>
                    </ImageBackground>
                  </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    this.setState({location:"Utrecht"},()=>{
                    this.onSubmit()
                    })
                  }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                  <View style={{height:50,width:"100%"}}>
                    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1519662647148-fff8e00fe4ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"}} style={{flex:1,width:null,height:null,resizeMode:'cover',justifyContent:'center',paddingHorizontal:20,borderRadius:5}}>
                      <Text style={{color:"#fff",fontSize:24,fontWeight:"800"}}>Utrecht</Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                  this.setState({location:"Groningen"},()=>{
                  this.onSubmit()
                  })
                }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                  <View style={{height:50,width:"100%"}}>
                    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1556819793-5acee9fb0a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"}} style={{flex:1,width:null,height:null,resizeMode:'cover',justifyContent:'center',paddingHorizontal:20,borderRadius:5}}>
                      <Text style={{color:"#fff",fontSize:24,fontWeight:"800"}}>Groningen</Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                  this.setState({location:"Leiden"},()=>{
                  this.onSubmit()
                  })
                }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                  <View style={{height:50,width:"100%"}}>
                    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1543169964-aee4453d2140?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}} style={{flex:1,width:null,height:null,resizeMode:'cover',justifyContent:'center',paddingHorizontal:20,borderRadius:5}}>
                      <Text style={{color:"#fff",fontSize:24,fontWeight:"800"}}>Leiden</Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                  this.setState({location:"Nijmegen"},()=>{
                  this.onSubmit()
                  })
                }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                  <View style={{height:50,width:"100%"}}>
                    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1532937660911-9565a830fa0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"}} style={{flex:1,width:null,height:null,resizeMode:'cover',justifyContent:'center',paddingHorizontal:20,borderRadius:5}}>
                      <Text style={{color:"#fff",fontSize:24,fontWeight:"800"}}>Nijmegen</Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </View>
                  </ScrollView>
        </View>
        </SafeAreaView>
      );
    }else{
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
