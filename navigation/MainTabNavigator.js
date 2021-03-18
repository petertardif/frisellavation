import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {	
  tabBarLabel: 'Motivate',	
  tabBarIcon: ({ focused }) => (	
    <TabBarIcon	
      focused={focused}	
      name={	
        Platform.OS === 'ios'	
          ? `ios-megaphone`	
          : 'md-megaphone'	
      }	
    />	
  ),	
};	

HomeStack.path = '';

const Hard75Stack = createStackNavigator(
  {	
    Links: LinksScreen,	
  },	
  config	
);	

Hard75Stack.navigationOptions = {	
  tabBarLabel: '75 Hard',	
  tabBarIcon: ({ focused }) => (	
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />	
  ),	
};	

Hard75Stack.path = '';


const tabNavigator = createBottomTabNavigator({	
  HomeStack,	
  Hard75Stack,	
});	

tabNavigator.path = '';	

export default tabNavigator;
