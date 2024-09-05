import React from 'react';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from '@realm/react';
import { Todo } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import LateTodoBSContainer from './LateTodoBSContainer';

const LateTodo = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();

  const todos = useQuery(Todo).filtered('date == "none"');

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View style={{ marginVertical: ms(5, 0.3) }}>
        <LateTodoBSContainer item={item} />
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: ms(20, 0.3),
          marginTop: ms(10, 0.3),
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackgroundColor,
          paddingTop: Platform.OS === 'android' ? ms(10, 0.3) : 0,
          paddingHorizontal: ms(20, 0.3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={[
                fontStyle.fontSizeMain,
                {
                  color: theme.textColor,
                  marginTop: ms(15, 0.3),
                },
              ]}>
              나중에 할 일
            </Text>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                  marginVertical: ms(5, 0.3),
                },
              ]}>
              언젠가 해야 할 일들을 간단하게 기록해보세요
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log('click');
            }}>
            <Icon name='plus' color={theme.textColor} size={ms(23, 0.3)} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={value => value._id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default LateTodo;
