import React from 'react';
import Realm from 'realm';
import { View, Text, Platform, StatusBar } from 'react-native';
import { GoalDetailScreenProps } from '../../../App';
import { useObject, useRealm } from '@realm/react';
import { FullyDate, Goal, Todo } from '../../../realm/models';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { shadow } from '../../assets/style/shadow';
import { fontStyle } from '../../assets/style/fontStyle';

const GoalDetail = ({
  route,
  navigation,
}: GoalDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const goal = useObject<Goal>('Goal', id);
  const todos = goal?.todos.sorted('isComplete', false);

  const { top } = useSafeAreaInsets();
  const { theme, currentTheme } = useColors();

  // const deleteGoal = () => {
  //   navigation.goBack();
  //   realm.write(() => {
  //     realm.delete(todos);
  //     realm.delete(Goal);
  //   });
  // };

  const renderItem = ({ item }: { item: Todo }) => {
    const date = item.linkingObjects<FullyDate>('FullyDate', 'todos')[0];
    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'green',
          },
        ]}>
        <View
          style={{
            backgroundColor: 'red',
            flex: ms(0.1, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>hi</Text>
        </View>
        <View
          style={{
            padding: ms(5, 0.3),
            backgroundColor: 'blue',
            flex: ms(0.9, 0.3),
          }}>
          <Text style={[fontStyle.fontSizeMain, { marginBottom: ms(5, 0.3) }]}>
            {item.title}
          </Text>
          <Text>
            {date.dateKey.substring(0, 4)}.{date.dateKey.substring(4, 6)}.
            {date.dateKey.substring(6, 8)}
          </Text>
        </View>
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
            backgroundColor: theme.backgroundColor,
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
      <View style={{ flex: 1, marginTop: ms(10, 0.3) }}>
        <View
          style={[
            currentTheme === 'light'
              ? {
                  borderBottomWidth: 0.5,
                  borderLeftWidth: 0.5,
                  borderRightWidth: 0.5,
                  borderColor: '#ccc',
                  shadowRadius: 1,
                  borderRadius: ms(5, 0.3),
                }
              : {},
            {
              backgroundColor: theme.backgroundColor,
              borderBottomLeftRadius: ms(20, 0.3),
              borderBottomRightRadius: ms(20, 0.3),
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              marginHorizontal: ms(18, 0.3),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name='arrowleft' size={ms(23, 0.3)} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: ms(18, 0.3) }}>
              <Icon name='setting' size={ms(23, 0.3)} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: ms(20, 0.3) }}>
            <Text
              style={[
                {
                  color: theme.textColor,
                  fontSize: ms(25, 0.3),
                  fontFamily: 'Pretendard-Medium',
                  marginBottom: ms(10, 0.3),
                },
              ]}>
              {goal?.title}
            </Text>
            <Text
              style={{
                color: theme.textColor,
                fontSize: ms(15, 0.3),
                lineHeight: ms(20, 0.3),
                fontFamily: 'Pretendard-Medium',
              }}>
              {goal?.description}
            </Text>
            <TouchableOpacity>
              <Text>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.appBackgroundColor,
            flexDirection: 'row',
            margin: ms(20, 0.3),
          }}>
          <FlatList data={todos} renderItem={renderItem} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoalDetail;
