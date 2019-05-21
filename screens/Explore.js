import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from './components/Category';
export default class Explore extends React.Component {
  componentWillMount(){
    this.startHeaderHeight = 80
    if(Platform.OS == 'android'){
      this.startHeaderHeight = 80 + StatusBar.currentHeight
    }
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
          <StatusBar hidden={true} />
        <View style={{flex:1}}>
          <View style={{height:this.startHeaderHeight,backgroundColor:'white',borderBottomWidth:1, borderBottomColor:'#dddddd'}}>
            <View style={{flexDirection:'row',padding:10,backgroundColor:'white',marginTop: Platform.OS == 'android' ? 30: null,marginHorizontal:20,elevation:1,shadowColor:'black',shadowOpacity: 0.2}}>
            <Icon name='ios-search' size={20} />
            <TextInput
              placeholder="Try Amsterdam"
              placeholderTextColor="grey"
              style={{flex:1,backgroundColor:'white'}} />
            </View>
          </View>
          <View style={{flex:1,backgroundColor:'white',paddingTop:20}}>
            <Text style={{fontSize:24, fontWeight:'700',paddingHorizontal:20}}>
            What can we help you find?
            </Text>
            <View style={{height:130,marginTop:20}}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Category imageUri={require('../assets/home.jpg')} name="asdsa"></Category>
            <Category imageUri={require('../assets/home.jpg')} name="asdsa"></Category>
            <Category imageUri={require('../assets/home.jpg')} name="asdsa"></Category>
            <Category imageUri={require('../assets/home.jpg')} name="asdsa"></Category>
            <Category imageUri={require('../assets/home.jpg')} name="asdsa"></Category>
            <Category imageUri={require('../assets/home.jpg')} name="asdsa"></Category>
            </ScrollView>
          </View>
        </View>
      </View>
      </SafeAreaView>
    );
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
