import React from 'react';
import { Platform, StatusBar, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from '@realm/react';
import { Goal } from '../../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import GoalComponentDetail from '../commonComponents/GoalComponentDetail';

const Cards = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();
  const goals = useQuery(Goal).filtered('isComplete == true');

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
          margin: ms(8, 0.3),
          padding: ms(10, 0.3),
          borderRadius: ms(5, 0.3),
        }}>
        <GoalComponentDetail
          item={item}
          theme={theme}
          navigation={navigation}
        />
      </View>
    );
  };

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
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginBottom: ms(7, 0.3), paddingHorizontal: ms(18, 0.3) }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: theme.appBackgroundColor,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? ms(10, 0.3) : 0,
          marginHorizontal: ms(5, 0.3),
          marginTop: ms(30, 0.3),
        }}>
        <View>
          <FlatList
            data={goals}
            renderItem={renderItem}
            keyExtractor={value => value._id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cards;
