import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform,StatusBar,Image,ScrollView,TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class InvoiceView extends React.Component{
  constructor(props){
    super(props);
    this.handleInvoice = this.handleInvoice.bind(this);
  }
  handleInvoice(){
    Linking.openURL(this.props.url)
  }

  render(){
    return(
      <TouchableOpacity onPress={this.handleInvoice}>
      <View style={{justifyContent:'center',alignItems:"center",marginBottom:20}}>
          <View style={{width:"80%",height:75,borderWidth:0.8,borderRadius:5,borderColor:"#eee",flex:1,alignItems:'center',flexDirection:'row',justifyContent:'flex-start'}}>
            <View style={{padding:25}}>
            <Text style={{fontSize:15,fontWeight:'800'}}>Commissie Maart</Text>
            <Text>Due date 16/12/2019</Text>
            </View>
            <View style={{padding:25}}>
              <Text style={{fontSize:20,fontWeight:'600'}}>€{this.props.price}</Text>
            </View>
            <View style={{marginLeft:50}}>
              <Icon name="ios-arrow-forward" style={{color:"#bdc3c7"}} color="#bdc3c7" size={20} />
            </View>
          </View>
      </View>
      </TouchableOpacity>
   )
  }
}

export default InvoiceView;
