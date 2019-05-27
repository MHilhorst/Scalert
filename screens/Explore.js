import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,Form,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import Category from './components/Category';
import CategorySearch from './components/CategorySearch';


export default class Explore extends React.Component {
  constructor(props){
    super(props);
    this.state = {showLocation:false};
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount(){
    this.startHeaderHeight = 70
    if(Platform.OS == 'android'){
      this.startHeaderHeight = 70 + StatusBar.currentHeight
    }
  }

  onSubmit(event){
    event.preventDefault();
    fetch(`http://192.168.1.8:5000/api/listings/${this.state.location}`).then(
      response => response.json().then(data => {
        console.log(data)
        if(data.error){
        }else{
        this.setState({
          showLocation:true,
          listings:data,
          listingsFound:data.length,
        })
      }
    })
    ).catch(err => console.log(err))
  }
  componentDidMount(){
    fetch("http://192.168.1.8:5000/api/listings/Amsterdam",{method:"GET"}).then(result => result.json()).then(data => {
      this.setState({data})
      console.log(data)
    }).catch(err => console.log(err))
  }
  render() {
    if(this.state.showLocation){
      return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar hidden={true} />
          <View style={{flex:1}}>
            <View style={{height:this.startHeaderHeight,backgroundColor:'white',borderBottomWidth:1, borderBottomColor:'#dddddd'}}>
              <View style={{flexDirection:'row',padding:13,backgroundColor:'white',marginTop: Platform.OS == 'android' ? 20: null,marginHorizontal:20,elevation:1,shadowColor:'black',shadowOpacity: 0.2}}>
              <Icon name='ios-search' size={24} color="#747d8c"/>
              <TextInput
                placeholder="Try Amsterdam"
                placeholderTextColor="#ddd"
                style={{flex:1,backgroundColor:'white',fontSize:20,marginHorizontal:10}}
                onSubmitEditing={(event)=>this.onSubmit(event)}
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
      )
    }
    if(this.state.data){
      return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar hidden={true} />
          <View style={{flex:1}}>
            <View style={{height:this.startHeaderHeight,backgroundColor:'white',borderBottomWidth:1, borderBottomColor:'#dddddd'}}>
              <View style={{flexDirection:'row',padding:13,backgroundColor:'white',marginTop: Platform.OS == 'android' ? 20: null,marginHorizontal:20,elevation:1,shadowColor:'black',shadowOpacity: 0.2}}>
              <Icon name='ios-search' size={24} style={{padding:3}}color="#747d8c"/>
              <TextInput
                placeholder="Try Amsterdam"
                placeholderTextColor="#ddd"
                style={{flex:1,backgroundColor:'white',fontSize:20,marginHorizontal:10}}
                onSubmitEditing={(event)=>this.onSubmit(event)}
                onChangeText={text=>this.setState({location:text})} />
              </View>
            </View>
            <View style={{flex:1,backgroundColor:'white',paddingTop:20}}>
              <Text style={{fontSize:24, fontWeight:'700',paddingHorizontal:20}}>
              Hospiteer avonden in Amsterdam
              </Text>
              <View style={{height:130,marginTop:20}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.state.data.map(item => {

                    itemDate = item.hospiDate.toString().substring(0,10)
                    console.log(itemDate)
                    return(
                        <Category key={item._id} hospiDate={itemDate} amountOfParticipants={item.amountOfParticipants || dateToday} acceptedApplicants={item.acceptedApplicants.length} imageUri={{uri:item.images[0].url}} onPress={() => {
                            this.props.navigation.navigate('Listing',{listingId:item._id,listingName:item.name})
                        }} style={{width:400,height:400}} name={item.location}></Category>)})}
              </ScrollView>
            </View>
          </View>
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
