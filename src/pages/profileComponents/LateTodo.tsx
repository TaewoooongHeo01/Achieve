import React from 'react';
import { Platform, StatusBar, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';

const LateTodo = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
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
      {/* <ScrollView style={{ flex: 1, paddingHorizontal: ms(18, 0.3) }}> */}
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginBottom: ms(7, 0.3) }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackgroundColor,
          paddingTop: Platform.OS === 'android' ? ms(10, 0.3) : 0,
        }}></View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default LateTodo;
