import * as React from 'react'
import PersonalProfile from './components/PersonalProfile';
import HeaderHospeasy from './HeaderHospeasy';
import { StyleSheet, Text, View,Platform,ScrollView} from 'react-native';
import InvoiceView from './components/InvoiceView';
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base';
import BasicInformation from './BasicInformation';
const localhost = require('../config');

export default class Invoices extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    fetch(`http://${localhost}/api/tikkie/new`,{method:"GET",credentials:"include"}).then(response => response.json().then(data => {
      console.log(data)
      this.setState({data})
    }))
  }

  render() {
    if(this.state.data){
    return (
      <View>
        <HeaderHospeasy />
        <View style={styles.red}>
          <Text style={styles.listHeader}>Invoices</Text>
        </View>
        <ScrollView>
          <InvoiceView price={30} url={this.state.data.checkoutUrl}/>
        </ScrollView>
      </View>
    );
  }else{
    return null
  }
}
}
const styles = StyleSheet.create({
  red: {
    padding: 25,
  },
  listHeader:{
    fontSize:20,
    fontWeight:"bold",
    marginHorizontal:20
  },
  logo:{
  fontWeight:"bold",
  color: "#ff5a5f",
  fontSize: 30
  }
});
