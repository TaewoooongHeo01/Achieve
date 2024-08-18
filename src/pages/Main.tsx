import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DateContextProvider } from '../context/DateContext';
import { initialize } from '../context/test';
import { useColors } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

//pages
import Home from './mainTab/Home';
import Achieve from './mainTab/Achieve';
import Profile from './mainTab/Profile';
import { ms } from 'react-native-size-matters';

const Main = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  const color = useColors();
  initialize();

  return (
    <DateContextProvider>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: color.theme.appBackgroundColor,
                borderTopWidth: 0,
              },
              tabBarShowLabel: false,
            }}>
            <Tab.Screen
              name='Achieve'
              component={Achieve}
              options={{
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Icon
                      name='trophy'
                      color={color.theme.textColor}
                      size={ms(15, 0.3)}
                    />
                  ) : (
                    <Icon name='trophy' color={'grey'} size={ms(15, 0.3)} />
                  ),
              }}
            />
            <Tab.Screen
              name='Home'
              component={Home}
              options={{
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Icon
                      name='home'
                      color={color.theme.textColor}
                      size={ms(15, 0.3)}
                    />
                  ) : (
                    <Icon name='home' color={'grey'} size={ms(15, 0.3)} />
                  ),
              }}
            />
            <Tab.Screen
              name='Profile'
              component={Profile}
              options={{
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Icon
                      name='user-alt'
                      color={color.theme.textColor}
                      size={ms(15, 0.3)}
                    />
                  ) : (
                    <Icon name='user-alt' color={'grey'} size={ms(15, 0.3)} />
                  ),
              }}
            />
          </Tab.Navigator>
        </View>
      </BottomSheetModalProvider>
    </DateContextProvider>
  );
};

export default Main;
