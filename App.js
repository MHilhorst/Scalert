import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator ,createAppContainer,createStackNavigator} from 'react-navigation';
import Explore from './screens/Explore';
import MySessions from './screens/MySessions';
import Saved from './screens/Saved';
import BasicInformation from './screens/BasicInformation';
import Listing from './screens/Listing';
import Dashboard from './screens/Dashboard';
import ProfileForSession from './screens/ProfileForSession';
import PlaceListing from './screens/PlaceListing';
import Register from './screens/Register';
import Invoices from './screens/Invoices';
import AddDescription from './screens/AddDescription';
import PublicProfile from './screens/PublicProfile';
import SearchListings from './screens/SearchListings';
import Auth from './screens/Auth';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const ExploreStack = createStackNavigator({
  Explore: {
    screen: Explore,
   navigationOptions: {
            header: null,
        },
  },
  Listing:{
    screen:Listing,
    navigationOptions:{
      header:null
    }
  },
  SearchListings:{
    screen:SearchListings,
    navigationOptions:{
      header:null
    }
  },
  ProfileExplore:{
    screen:PublicProfile,
    navigationOptions:{
      header:null
    }
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
     navigationOptions: {
              header: null,
          },
  },
  AddDescription:{
    screen:AddDescription,
    navigationOptions:{
      header:null,
    }
  },
  BasicInformation:{
    screen: BasicInformation,
    navigationOptions:{
      header:null,
    }
  },
  PublicProfile:{
    screen:PublicProfile,
    navigationOptions:{
      header:null
    }
  },
  Invoices:{
    screen:Invoices,
    navigationOptions:{
      header:null
    }
  },
  Register:{
    screen:Register,
    navigationOptions:{
      header:null,
    }
  },
})

const MySessionsStack = createStackNavigator({
  MySessions:{
    screen: Auth(MySessions),
    navigationOptions:{
      header:null,
    }
  },
  Dashboard:{
    screen: Dashboard,
    navigationOptions:{
      header:null
    }
  },
  ProfileForSession:{
    screen:ProfileForSession,
    navigationOptions:{
      header:null
    }
  },
  ProfileViewAccepted:{
    screen:PublicProfile,
    navigationOptions:{
      header:null
    }
  }
})
ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes[navigation.state.index].routeName == "Register") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};



const Navigator = createBottomTabNavigator({
  Explore:{
    screen:ExploreStack,
    navigationOptions:{
      tabBarLabel:"Explore",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-search" size={24} color={tintColor} />
              )
    },
  },
  PlaceListing:{
    screen:Auth(PlaceListing),
    navigationOptions:{
      tabBarLabel:"Place Listing",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" size={24} color={tintColor} />
              )
    }
  },
  MySessions:{
    screen:MySessionsStack,
    navigationOptions:{
      tabBarLabel:"My Sessions",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-chatboxes" size={24} color={tintColor} />
              )
    }
  },
  Profile:{
    screen:ProfileStack,
    navigationOptions:{
      tabBarLabel:"Profile",
      tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" size={24} color={tintColor} />
              ),
    },
  },
},
{
    tabBarOptions:{
      activeTintColor:'red',
      visible:true,
      inactiveTintColor:'grey',
      style:{
        backgroundColor:'white',
        borderTopWidth: 0,
        shadowOffset:{width:5,height:3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation:5
      }
    },
})



export default createAppContainer(Navigator);
