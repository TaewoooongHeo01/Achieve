/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StatusBar, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//pages
import Home from './Home';
import History from './History';
import Profile from './Profile';

const Main = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }}>
            <Tab.Screen name="History" component={History} />       
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </View>
  );
};

export default Main;
