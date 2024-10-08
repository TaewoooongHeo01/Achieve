import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColors } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

//pages
import Home from './mainTab/Home';
import Achieve from './mainTab/Achieve';
import Profile from './mainTab/Profile';
import { ms } from 'react-native-size-matters';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRealm, useQuery } from '@realm/react';
import { Todo } from '../../realm/models.tsx';

const Main = (): React.JSX.Element => {
  const { top } = useSafeAreaInsets();
  const Tab = createBottomTabNavigator();
  const { theme, currentTheme } = useColors();
  // const realm = useRealm();
  // const todos = useQuery(Todo);
  // useEffect(() => {
  //   realm.write(() => {
  //     realm.delete(todos);
  //   });
  // }, []);

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            backgroundColor: theme.appBackgroundColor,
            height: top,
          }}>
          <StatusBar
            barStyle={
              currentTheme === 'dark' ? 'light-content' : 'dark-content'
            }
          />
        </View>
      ) : (
        <StatusBar
          barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.appBackgroundColor}
        />
      )}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <View style={[{ flex: 1, marginTop: ms(5, 0.3) }]}>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: theme.appBackgroundColor,
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
                      name='th'
                      color={theme.textColor}
                      size={ms(17, 0.3)}
                    />
                  ) : (
                    <Icon name='th' color={'grey'} size={ms(17, 0.3)} />
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
                      color={theme.textColor}
                      size={ms(17, 0.3)}
                    />
                  ) : (
                    <Icon name='home' color={'grey'} size={ms(17, 0.3)} />
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
                      color={theme.textColor}
                      size={ms(17, 0.3)}
                    />
                  ) : (
                    <Icon name='user-alt' color={'grey'} size={ms(17, 0.3)} />
                  ),
              }}
            />
          </Tab.Navigator>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Main;
