import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator ,createAppContainer } from 'react-navigation';
import Explore from './screens/Explore';
import Inbox from './screens/Inbox';
import Saved from './screens/Saved';
import Trips from './screens/Trips';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const navigator = createBottomTabNavigator({
  Explore:{
    screen:Explore,
    navigationOptions:{
      tabBarLabel:"Explore",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-search" size={24} color={tintColor} />
              )
    }
  },
  Saved:{
    screen:Saved,
    navigationOptions:{
      tabBarLabel:"Saved",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-heart" size={24} color={tintColor} />
              )
    }
  },
  Trips:{
    screen:Trips,
    navigationOptions:{
      tabBarLabel:"Trips",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" size={24} color={tintColor} />
              )
    }
  },
  Inbox:{
    screen:Inbox,
    navigationOptions:{
      tabBarLabel:"Inbox",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-chatboxes" size={24} color={tintColor} />
              )
    }
  },
  Profile:{
    screen:Profile,
    navigationOptions:{
      tabBarLabel:"Profile",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" size={24} color={tintColor} />
              )
    },
  }
},{
    tabBarOptions:{
      activeTintColor:'red',
      inactiveTintColor:'grey',
      style:{
        backgroundColor:'white',
        borderTopWidth: 0,
        shadowOffset:{width:5,height:3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation:5
      }
    }
})

export default createAppContainer(navigator);
