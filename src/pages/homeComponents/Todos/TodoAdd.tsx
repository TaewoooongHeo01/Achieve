import { useQuery, useRealm } from '@realm/react';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import { FullyDate, Goal } from '../../../../realm/models';
import { ms } from 'react-native-size-matters';
import { days, useDateContext } from '../../../context/DateContext';
import { useColors } from '../../../context/ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { fontStyle } from '../../../assets/style/fontStyle';
import {
  BottomSheetTextInput,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import GoalIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { makeDateFormatKey } from '../../../utils/makeDateFormatKey';

const TodoAdd = () => {
  const goals = useQuery(Goal);
  const { taskDate } = useDateContext();
  const { theme, currentTheme } = useColors();
  const realm = useRealm();
  const { dismiss } = useBottomSheetModal();

  const [goal, setGoal] = useState<Goal | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [weekCycle, setWeekCycle] = useState<number[]>([]);
  const [priority, setPriority] = useState<number>(2);

  const year = String(taskDate.year);
  const month = String(taskDate.month).padStart(2, '0');
  const date = String(taskDate.date).padStart(2, '0');

  const updateWeekCycle = (day: number) => {
    const newWeek = [...weekCycle];
    if (!newWeek.includes(day)) {
      newWeek.push(day);
    } else {
      const removeItemIdx = newWeek.indexOf(day);
      newWeek.splice(removeItemIdx, 1);
    }
    newWeek.sort();
    setWeekCycle(newWeek);
  };

  const inputValid = (): boolean => {
    if (goal === undefined) {
      Alert.alert('목표를 선택해주세요');
      return false;
    }
    if (title.trim() === '') {
      Alert.alert('제목을 입력해주세요');
      return false;
    }
    if (title.trim().length > 20) {
      Alert.alert('제목길이는 20자 이하로 설정해주세요');
      return false;
    }
    return true;
  };

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setGoal(item);
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: ms(10, 0.3),
        }}>
        <LinearGradient
          style={{
            padding: ms(10, 0.3),
            borderRadius: ms(7, 0.3),
            opacity: item._id.toString() === goal?._id.toString() ? 0.4 : 1,
          }}
          colors={theme.gradientColor[item.color]}>
          <GoalIcon name={item.icon} size={ms(18, 0.3)} />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{
        flex: 1,
        flexDirection: 'column',
        marginTop: ms(7, 0.3),
        marginBottom: ms(-40, 0.3),
        marginHorizontal: ms(5, 0.3),
        height: 100,
      }}>
      <View
        style={{
          flex: ms(0.1, 0.3),
          flexDirection: 'row',
        }}>
        <Text
          style={[
            {
              fontFamily: 'Pretendard-Medium',
              fontSize: ms(20, 0.3),
              color: theme.textColor,
              paddingTop: ms(8, 0.3),
              marginRight: ms(-3, 0.3),
            },
          ]}>
          {year}.{month}.{date}
        </Text>
        <Text
          style={{
            fontFamily: 'Pretendard-Medium',
            fontSize: ms(20, 0.3),
            color: theme.textColor,
            padding: ms(8, 0.3),
          }}>
          에 할 일 추가하기
        </Text>
      </View>
      <View style={{ flex: ms(0.17, 0.3) }}>
        <Text
          style={[
            fontStyle.fontSizeSub,
            {
              marginBottom: ms(2, 0.3),
              color: theme.textColor,
            },
          ]}>
          {goal === undefined ? '목표선택' : goal.title}
        </Text>
        <FlatList
          style={{ marginVertical: ms(5, 0.3), marginHorizontal: ms(10, 0.3) }}
          data={goals}
          horizontal={true}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ flex: ms(0.15, 0.3) }}>
        <Text
          style={[
            fontStyle.fontSizeSub,
            { marginBottom: ms(2, 0.3), color: theme.textColor },
          ]}>
          제목
        </Text>
        <BottomSheetTextInput
          value={title}
          onChangeText={setTitle}
          onEndEditing={e => setTitle(e.nativeEvent.text.trim())}
          style={{
            marginHorizontal: ms(10, 0.3),
            marginVertical: ms(5, 0.3),
            borderWidth: 0.2,
            borderRadius: ms(7, 0.3),
            padding: ms(10, 0.3),
            borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
            backgroundColor:
              currentTheme === 'dark' ? theme.appBackgroundColor : '#F8F8F8',
            color: theme.textColor,
          }}
        />
      </View>
      <View style={{ flex: ms(0.15, 0.3) }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          중요도
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: ms(10, 0.3),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPriority(1);
            }}
            style={[
              styles.priorityBox,
              {
                borderTopLeftRadius: ms(5, 0.3),
                borderBottomLeftRadius: ms(5, 0.3),
                backgroundColor:
                  priority === 1
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
              },
            ]}>
            <Icon name='exclamationcircle' color='green' size={ms(20, 0.3)} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPriority(2);
            }}
            activeOpacity={0.8}
            style={[
              styles.priorityBox,
              {
                backgroundColor:
                  priority === 2
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderRadius: 1,
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                marginLeft: ms(-0.1, 0.3),
                marginRight: ms(-0.1, 0.3),
              },
            ]}>
            <Icon name='exclamationcircle' color='orange' size={ms(20, 0.3)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPriority(3);
            }}
            style={[
              styles.priorityBox,
              {
                borderTopRightRadius: ms(5, 0.3),
                borderBottomRightRadius: ms(5, 0.3),
                backgroundColor:
                  priority === 3
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
              },
            ]}>
            <Icon name='exclamationcircle' color='red' size={ms(20, 0.3)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: ms(0.15, 0.3) }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          반복일
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: ms(10, 0.3),
          }}>
          {days.map((value, index) => {
            if (index === 0) {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateWeekCycle(index);
                  }}
                  key={index.toString()}
                  style={[
                    styles.dayBox,
                    {
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderTopLeftRadius: ms(5, 0.3),
                      borderBottomLeftRadius: ms(5, 0.3),
                      borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      color: weekCycle.includes(index)
                        ? theme.appBackgroundColor
                        : theme.textColor,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            } else if (index === 6) {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateWeekCycle(index);
                  }}
                  key={index.toString()}
                  style={[
                    styles.dayBox,
                    {
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderTopRightRadius: ms(5, 0.3),
                      borderBottomRightRadius: ms(5, 0.3),
                      borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      color: weekCycle.includes(index)
                        ? theme.appBackgroundColor
                        : theme.textColor,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateWeekCycle(index);
                  }}
                  key={index.toString()}
                  style={[
                    styles.dayBox,
                    {
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                      borderRadius: Platform.OS === 'ios' ? 0 : ms(0.01, 0.1),
                      marginLeft: ms(-1, 0.3),
                      marginRight: ms(-1, 0.3),
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      color: weekCycle.includes(index)
                        ? theme.appBackgroundColor
                        : theme.textColor,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
      <View style={{ flex: ms(0.13, 0.3), marginBottom: ms(0, 0.3) }}>
        <View
          style={{
            paddingHorizontal: ms(10, 0.3),
            paddingVertical: ms(15, 0.3),
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: theme.textColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: ms(7, 0.3),
            }}
            onPress={() => {
              if (inputValid()) {
                realm.write(() => {
                  const todo = realm.create('Todo', {
                    title: title,
                    date: makeDateFormatKey(
                      taskDate.year,
                      taskDate.month,
                      taskDate.date,
                    ),
                    goal: goal,
                    weekCycle: weekCycle,
                    priority: priority,
                    isComplete: false,
                  });
                  const date = realm.objectForPrimaryKey<FullyDate>(
                    'FullyDate',
                    todo.date,
                  );
                  if (date) {
                    date.todos.push(todo);
                  } else {
                    const newDate = realm.create('FullyDate', {
                      dateKey: todo.date,
                      fullness: 0.2,
                      todos: [],
                    });
                    newDate.todos.push(todo);
                  }
                  goal?.todos.push(todo);
                  dismiss();
                });
              }
            }}>
            <Text
              style={{
                color: theme.backgroundColor,
                fontFamily: 'Pretendard-Regular',
              }}>
              완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    paddingVertical: ms(10, 0.3),
  },
  priorityBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    paddingVertical: ms(10, 0.3),
  },
});

export default TodoAdd;
