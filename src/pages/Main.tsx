import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initialize } from '../context/test';
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
import { useRealm } from '@realm/react';

const Main = (): React.JSX.Element => {
  const { top } = useSafeAreaInsets();
  const Tab = createBottomTabNavigator();
  const { theme, currentTheme } = useColors();

  //test code
  // initialize();
  const realm = useRealm();
  console.log(realm.path);

  //"오늘" 이전에 있었던 "복제", "오리지널", "사이클이 없는" 투두들이 완료되었을 때 정상적으로 weekCycle 에 표시되는지, 그리고 삭제 시 삭제되지 않는지 확인

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
        <View style={{ flex: 1 }}>
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
