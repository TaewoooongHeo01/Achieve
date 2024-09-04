import React, { memo, useEffect } from 'react';
import Realm from 'realm';
import { View, Platform, StatusBar, Text } from 'react-native';
import { GoalDetailScreenProps } from '../../../App';
import { useObject } from '@realm/react';
import { Goal, Todo } from '../../../realm/models';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import GoalDetailTodo from '../homeComponents/GoalDetailTodo';
import { fontStyle } from '../../assets/style/fontStyle';
import { showAlert } from 'react-native-customisable-alert';
import DeleteGoalAlert from '../Alert/DeleteGoalAlert';
import LinearGradient from 'react-native-linear-gradient';
import GoalIcon from 'react-native-vector-icons/Ionicons';

const MemorizedGoalDetailTodo = memo(GoalDetailTodo);

const GoalDetail = ({
  route,
  navigation,
}: GoalDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const goal = useObject<Goal>('Goal', id);
  const todos = goal?.todos.sorted([
    ['date', true],
    ['isComplete', true],
  ]);

  const { top } = useSafeAreaInsets();
  const { theme, currentTheme } = useColors();

  const map = new Map<string, Todo[]>();
  const dateArr: string[] = [];
  useEffect(() => {
    if (todos?.length) {
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.date !== undefined) {
          if (map.has(todo.date)) {
            map.get(todo.date)?.push(todo);
          } else {
            dateArr.push(todo.date);
            map.set(todo.date, [todo]);
          }
        }
      }
    }
  }, [todos]);

  const renderItem = ({ item }: { item: string }) => {
    const todos = map.get(item);
    return <MemorizedGoalDetailTodo theme={theme} todos={todos} item={item} />;
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
      <View style={{ flex: 1, paddingTop: ms(10, 0.3) }}>
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
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name='arrowleft'
                size={ms(23, 0.3)}
                color={theme.textColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Main');
                showAlert({
                  alertType: 'custom',
                  dismissable: true,
                  customAlert: <DeleteGoalAlert goal={goal} todos={todos} />,
                });
              }}
              style={{
                marginLeft: ms(18, 0.3),
                backgroundColor: 'red',
                padding: ms(5, 0.3),
                borderRadius: ms(5, 0.3),
              }}>
              <Text style={[{ color: theme.textColor }, fontStyle.fontSizeSub]}>
                목표 삭제
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: ms(20, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {goal ? (
              <LinearGradient
                colors={theme.gradientColor[goal?.color]}
                style={{
                  width: ms(300, 0.3),
                  height: ms(189, 0.3),
                  borderRadius: ms(5, 0.3),
                  justifyContent: 'space-between',
                  padding: ms(30, 0.3),
                }}>
                <Text
                  style={{
                    fontSize: ms(20, 0.3),
                    fontFamily: 'Pretendard-SemiBold',
                  }}>
                  {goal.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={fontStyle.fontSizeSub}> {goal.startDate}-</Text>
                  <GoalIcon name={goal.icon} size={ms(18, 0.3)} />
                </View>
              </LinearGradient>
            ) : null}
          </View>
          {/* <Text
            style={[
              {
                fontFamily: 'Pretendard-SemiBold',
                fontSize: ms(16, 0.3),
                color: theme.textColor,
                marginLeft: ms(15, 0.3),
              },
            ]}>
            기록들
          </Text> */}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.appBackgroundColor,
            flexDirection: 'row',
            margin: ms(10, 0.3),
          }}>
          <FlatList
            data={dateArr}
            renderItem={renderItem}
            keyExtractor={value => value.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoalDetail;
