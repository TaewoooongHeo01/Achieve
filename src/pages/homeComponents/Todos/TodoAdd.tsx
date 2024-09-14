import { useQuery, useRealm } from '@realm/react';
import React, { SetStateAction, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import { FullyDate, Goal, Todo } from '../../../../realm/models';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';

const TodoAdd = ({
  item,
  // setTodoBottomSheetSnapPoint,
  // completeDelete,
  // itemDelete,
}: {
  item?: Todo;
  setTodoBottomSheetSnapPoint?(
    snapPoint?: SetStateAction<string> | undefined,
  ): void;
  itemDelete?(todo: Todo): void;
}) => {
  const titleContentGap = ms(12, 0.3);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goals = useQuery(Goal).filtered('isComplete == false');
  const { taskDate } = useDateContext();
  const { theme, currentTheme } = useColors();
  const realm = useRealm();
  const { dismiss } = useBottomSheetModal();

  const [todosGoal, setTodosGoal] = useState<Goal | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [weekCycle, setWeekCycle] = useState<number[]>([]);
  const [priority, setPriority] = useState<number>(2);
  const year = String(taskDate.year);
  const month = String(taskDate.month).padStart(2, '0');
  const date = String(taskDate.date).padStart(2, '0');

  const dateKeyFormat = makeDateFormatKey(
    taskDate.year,
    taskDate.month,
    taskDate.date,
  );

  const weekFullyDatesMap: Map<number, Realm.Results<FullyDate>> = new Map();
  for (let i = 0; i < 7; i++) {
    const fullyDates = useQuery<FullyDate>(FullyDate).filtered(
      'dateKey > $0 AND dayIdx == $1',
      dateKeyFormat,
      i,
    );
    weekFullyDatesMap.set(i, fullyDates);
  }

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
    if (todosGoal === undefined) {
      Alert.alert('목표를 선택해주세요');
      return false;
    }
    if (title.trim() === '') {
      Alert.alert('제목을 입력해주세요');
      return false;
    }
    if (title.trim().length > 30) {
      Alert.alert('제목길이는 30자 이하로 설정해주세요');
      return false;
    }
    return true;
  };

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setTodosGoal(item);
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
            opacity:
              item._id.toString() === todosGoal?._id.toString() ? 0.4 : 1,
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
        marginHorizontal: ms(20, 0.3),
        height: 100,
        // backgroundColor: 'red',
      }}>
      <View
        style={{
          // flex: ms(0.1, 0.3),
          flexDirection: 'row',
        }}>
        <Text
          style={[
            {
              fontFamily: 'Pretendard-SemiBold',
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
            fontFamily: 'Pretendard-SemiBold',
            fontSize: ms(20, 0.3),
            color: theme.textColor,
            padding: ms(8, 0.3),
          }}>
          에 할 일 추가하기
        </Text>
      </View>
      <View
        style={
          {
            // flex: ms(0.2, 0.3),
          }
        }>
        <Text
          style={[
            fontStyle.fontSizeSub,
            {
              color: theme.textColor,
            },
          ]}>
          {todosGoal === undefined ? '목표선택' : todosGoal.title}
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('GoalAdd');
            dismiss();
          }}
          style={[
            {
              fontFamily: 'Pretendard-Bold',
              fontSize: ms(15, 0.3),
              marginBottom: titleContentGap,
              color: 'lightgreen',
            },
          ]}>
          또는 목표 만들러가기
        </Text>
        <FlatList
          style={{
            marginHorizontal: ms(10, 0.3),
            marginBottom: titleContentGap,
          }}
          data={goals}
          horizontal={true}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={
          {
            // flex: ms(0.14, 0.3)
          }
        }>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          제목
        </Text>
        <BottomSheetTextInput
          value={title}
          onChangeText={setTitle}
          onEndEditing={e => setTitle(e.nativeEvent.text.trim())}
          placeholder={item ? item.title : ''}
          placeholderTextColor={'grey'}
          style={{
            marginTop: ms(5, 0.3),
            borderWidth: currentTheme === 'light' ? 0.2 : 0,
            borderRadius: Platform.OS === 'android' ? ms(5, 0.3) : ms(7, 0.5),
            padding: Platform.OS === 'android' ? ms(5, 0.3) : ms(10, 0.3),
            paddingLeft: Platform.OS === 'android' ? ms(10, 0.3) : null,
            borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
            backgroundColor:
              currentTheme === 'dark' ? theme.appBackgroundColor : '#F8F8F8',
            color: theme.textColor,
            marginBottom: titleContentGap,
            fontFamily: 'Pretendard-Medium',
          }}
        />
      </View>
      <View
        style={
          {
            // flex: ms(0.15, 0.3)
          }
        }>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          중요도
        </Text>
        <View
          style={{
            marginTop: ms(5, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: titleContentGap,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPriority(1);
            }}
            style={[
              styles.priorityBox,
              {
                borderWidth: currentTheme === 'light' ? 0.2 : 0,
                borderTopLeftRadius: ms(5, 0.3),
                borderBottomLeftRadius: ms(5, 0.3),
                backgroundColor:
                  priority === 1
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
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
                borderWidth: currentTheme === 'light' ? 0.2 : 0,
                backgroundColor:
                  priority === 2
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderRadius: 1,
                borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
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
                borderWidth: currentTheme === 'light' ? 0.2 : 0,
                borderTopRightRadius: ms(5, 0.3),
                borderBottomRightRadius: ms(5, 0.3),
                backgroundColor:
                  priority === 3
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
              },
            ]}>
            <Icon name='exclamationcircle' color='red' size={ms(20, 0.3)} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          {
            // flex: ms(0.12, 0.3)
          }
        }>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          반복일
        </Text>
        <View
          style={{
            marginTop: ms(5, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: ms(30, 0.3),
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
                      borderWidth: currentTheme === 'light' ? 0.2 : 0,
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderTopLeftRadius: ms(5, 0.3),
                      borderBottomLeftRadius: ms(5, 0.3),
                      borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
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
                      borderWidth: currentTheme === 'light' ? 0.2 : 0,
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderTopRightRadius: ms(5, 0.3),
                      borderBottomRightRadius: ms(5, 0.3),
                      borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
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
                      borderWidth: currentTheme === 'light' ? 0.2 : 0,
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
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
      <View>
        <View style={{ width: '100%', height: ms(40, 0.3) }}>
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
                  //Todo 생성
                  const todo = realm.create<Todo>('Todo', {
                    title: title,
                    date: dateKeyFormat,
                    goal: todosGoal,
                    weekCycle: weekCycle,
                    priority: priority,
                    isComplete: false,
                    originDate: Number(dateKeyFormat),
                    isClone: false,
                  });

                  //오늘 날짜를 키로 가진 fullyDate 가 있는 지 탐색
                  const date = realm.objectForPrimaryKey<FullyDate>(
                    'FullyDate',
                    dateKeyFormat,
                  );

                  if (date) {
                    //만약 있다면 기존 FullyDate.todos 에 현재 Todo 추가
                    date.todos.push(todo);
                  } else {
                    //만약 없다면 FullyDate 를 새로 만듦
                    const newDate = realm.create<FullyDate>('FullyDate', {
                      dateKey: dateKeyFormat,
                      fullness: 0.2,
                      dayIdx: taskDate.day,
                      todos: [],
                    });
                    newDate.todos.push(todo);
                  }
                  //목표에 현재 Todo 추가
                  todosGoal?.todos.push(todo);

                  //dayIdx 가 일치하고, dateKey 가 dateKeyFormat 보다 큰 FullyDate 들의 todos 에도 현재 Todo 추가
                  for (let i = 0; i < todo.weekCycle.length; i++) {
                    const key = weekCycle[i];
                    const fullyDates = weekFullyDatesMap.get(key);
                    if (fullyDates) {
                      fullyDates.forEach(element => {
                        const copyTodo = realm.create<Todo>('Todo', {
                          title: title,
                          date: element.dateKey,
                          goal: todosGoal,
                          weekCycle: weekCycle,
                          priority: priority,
                          isComplete: false,
                          originDate: Number(dateKeyFormat),
                          isClone: true,
                        });
                        element.todos.push(copyTodo);
                        todosGoal?.todos.push(copyTodo);
                      });
                    }
                  }
                  dismiss();
                  navigation.navigate('Home');
                });
                // if (item && itemDelete) {
                //   itemDelete(item);
                // }
              }
            }}>
            <Text
              style={[
                {
                  color: theme.backgroundColor,
                },
                fontStyle.BtnFont,
              ]}>
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
    paddingVertical: ms(10, 0.3),
  },
  priorityBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(7, 0.3),
  },
});

export default TodoAdd;
