import React, { useEffect, useState } from 'react';
import { FullyDate, Goal, Todo } from '../../../../realm/models';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ColorSet } from '../../../assets/style/ThemeColor';
import { ms } from 'react-native-size-matters';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MediumTextMemoization } from '../../../utils/CustomText';
import { days, TaskDate, useDateContext } from '../../../context/DateContext';
import {
  BottomSheetScrollView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { fontStyle } from '../../../assets/style/fontStyle';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColors } from '../../../context/ThemeContext';
import { shadow } from '../../../assets/style/shadow';
import { useRealm } from '@realm/react';
import { calculateStartAndEndDayOfMonth } from '../../../utils/calStartEndWeek';
import Icon from 'react-native-vector-icons/AntDesign';

type dateUI = {
  taskDate: TaskDate;
  contain: boolean;
  leftOn: boolean;
  rightOn: boolean;
};

const TodoInfo = ({
  item,
  dateFormatKey,
  theme,
  goal,
  todoCompleteAnimation,
  setChanged,
  taskDateFormat,
  todayFormat,
}: {
  item: Todo;
  dateFormatKey: string;
  theme: ColorSet;
  goal: Goal;
  todoCompleteAnimation(isRemove: boolean): void;
  setChanged(changed: boolean | ((changed: boolean) => boolean)): void;
  taskDateFormat: number;
  todayFormat: number;
}) => {
  const realm = useRealm();
  const { currentTheme } = useColors();
  const { taskDate } = useDateContext();
  const weekCycle: number[] = item.weekCycle;
  const { dismiss } = useBottomSheetModal();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [weekCycleUI, setWeekCycleUI] = useState<dateUI[]>([]);
  const weekUI: dateUI[] = [];
  const date =
    dateFormatKey.substring(0, 4) +
    '.' +
    dateFormatKey.substring(4, 6) +
    '.' +
    dateFormatKey.substring(6, 8);

  useEffect(() => {
    const week = [];
    const curYear = taskDate.year;
    const curMonth = taskDate.month;
    const curDate = taskDate.date;
    const curDay = taskDate.day;
    const [
      startWeekDateOfMonth,
      lastWeekDateOfMonth,
      lastDayOfMonth,
      lastDayOfPrevMonth,
    ] = calculateStartAndEndDayOfMonth(curYear, curMonth);

    let dateOfWeek;
    let yearOfWeek = curYear;
    let monthOfWeek = curMonth;
    //저번 달 남은 일수
    let leftDayCntOfPrevMonth = lastDayOfPrevMonth - startWeekDateOfMonth + 1;
    leftDayCntOfPrevMonth =
      leftDayCntOfPrevMonth == lastDayOfPrevMonth ? 0 : leftDayCntOfPrevMonth;

    if (7 - leftDayCntOfPrevMonth >= curDate) {
      //선택된 날짜가 첫번째 주에 포함
      dateOfWeek = startWeekDateOfMonth;
      if (leftDayCntOfPrevMonth != 0) {
        monthOfWeek = curMonth - 1 == 0 ? 12 : curMonth - 1;
      }
      if (curMonth - 1 == 0) {
        yearOfWeek -= 1;
      }
      for (let i = 0; i < 7; i++) {
        if (dateOfWeek > lastDayOfPrevMonth) {
          dateOfWeek = 1;
          monthOfWeek = monthOfWeek + 1 > 12 ? 1 : monthOfWeek + 1;
          yearOfWeek = monthOfWeek == 1 ? (yearOfWeek += 1) : yearOfWeek;
        }
        const dateData: TaskDate = {
          year: yearOfWeek,
          month: monthOfWeek,
          date: dateOfWeek,
          day: i,
        };

        week[i] = dateData;
        dateOfWeek += 1;
      }
    } else if (lastWeekDateOfMonth <= curDate) {
      //선택된 날짜가 마지막 주에 포함
      dateOfWeek = lastWeekDateOfMonth;
      for (let i = 0; i < 7; i++) {
        if (dateOfWeek > lastDayOfMonth) {
          dateOfWeek = 1;
          monthOfWeek = monthOfWeek + 1 > 12 ? 1 : monthOfWeek + 1;
          yearOfWeek = monthOfWeek == 1 ? (yearOfWeek += 1) : yearOfWeek;
        }
        const dateData: TaskDate = {
          year: yearOfWeek,
          month: monthOfWeek,
          date: dateOfWeek,
          day: i,
        };
        week[i] = dateData;
        dateOfWeek += 1;
      }
    } else {
      if (curDay !== undefined) {
        dateOfWeek = curDate - curDay;
        for (let i = 0; i < 7; i++) {
          const dateData: TaskDate = {
            year: yearOfWeek,
            month: monthOfWeek,
            date: dateOfWeek,
            day: i,
          };
          week[i] = dateData;
          dateOfWeek += 1;
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      const taskDate = week[i];
      let contain = false;
      let leftOn = false;
      let rightOn = false;
      let result;
      if (i == 0) {
        result = weekCycle?.includes(i + 1);
        rightOn = result != undefined ? result : false;
      } else if (i == 6) {
        result = weekCycle?.includes(i - 1);
        leftOn = result != undefined ? result : false;
      } else {
        result = weekCycle?.includes(i + 1);
        rightOn = result != undefined ? result : false;
        result = weekCycle?.includes(i - 1);
        leftOn = result != undefined ? result : false;
      }
      if (weekCycle?.includes(i)) {
        contain = true;
      }
      const dateUI: dateUI = {
        taskDate: taskDate,
        contain: contain,
        leftOn: leftOn,
        rightOn: rightOn,
      };
      weekUI.push(dateUI);
      setWeekCycleUI(weekUI);
    }
  }, []);

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: ms(12, 0.3) }}>
      <View
        style={{
          flex: 1,
          marginVertical: ms(10, 0.3),
        }}>
        <View style={{ flex: ms(0.3, 0.3), flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{ flex: 0.7 }}>
              <Text
                style={[
                  {
                    fontSize: ms(21, 0.3),
                    color: theme.textColor,
                    fontFamily: 'Pretendard-Medium',
                    paddingBottom: ms(4, 0.3),
                  },
                ]}>
                {item.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name='exclamationcircle'
                  color={
                    item.priority === 2
                      ? 'orange'
                      : item.priority === 1
                        ? 'green'
                        : 'red'
                  }
                  size={ms(15, 0.3)}
                  style={{
                    marginRight: ms(5, 0.3),
                  }}
                />
                <Text
                  style={[
                    {
                      fontFamily: 'Pretendard-Medium',
                      marginLeft: ms(1, 0.3),
                      color: theme.textColor,
                    },
                  ]}>
                  {date}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 0.3 }}>
              <TouchableOpacity
                style={{
                  padding: ms(8, 0.3),
                  backgroundColor: '#DD0000',
                  borderRadius: ms(5, 0.3),
                  marginLeft: ms(5, 0.3),
                }}
                onPress={() => {
                  setChanged(changed => !changed);
                  todoCompleteAnimation(true);
                  const fd = realm.objectForPrimaryKey<FullyDate>(
                    'FullyDate',
                    dateFormatKey,
                  );
                  realm.write(() => {
                    realm.delete(item);
                  });
                  if (fd?.todos.length == 0) {
                    realm.write(() => {
                      realm.delete(fd);
                    });
                  }
                  dismiss();
                }}>
                <MediumTextMemoization style={{ color: theme.backgroundColor }}>
                  삭제
                </MediumTextMemoization>
              </TouchableOpacity>
              {!item.isComplete ? (
                <TouchableOpacity
                  style={{
                    padding: ms(8, 0.3),
                    backgroundColor: theme.textColor,
                    borderRadius: ms(5, 0.3),
                    marginLeft: ms(5, 0.3),
                  }}
                  onPress={() => {
                    console.log('설정');
                  }}>
                  <MediumTextMemoization
                    style={{ color: theme.backgroundColor }}>
                    설정
                  </MediumTextMemoization>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    padding: ms(8, 0.3),
                    backgroundColor: theme.textColor,
                    borderRadius: ms(5, 0.3),
                    opacity: 0.3,
                    marginLeft: ms(5, 0.3),
                  }}>
                  <MediumTextMemoization
                    style={{ color: theme.backgroundColor }}>
                    설정
                  </MediumTextMemoization>
                </View>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: ms(0.3, 0.3),
            marginTop: ms(10, 0.3),
            padding: ms(10, 0.3),
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            {weekCycleUI.map((value, index) => {
              if (value.taskDate !== undefined) {
                return (
                  <View
                    key={value.taskDate.date.toString()}
                    style={[
                      styles.btn,
                      value.contain ? { backgroundColor: theme.textColor } : {},
                      value.leftOn
                        ? {
                            marginLeft: ms(-0.1, 0.3),
                            marginRight: ms(-0.1, 0.3),
                            borderRadius:
                              Platform.OS === 'ios' ? 0 : ms(0.1, 0.3),
                          }
                        : {
                            marginRight: ms(-0.1, 0.3),
                            borderTopLeftRadius: ms(7, 0.3),
                            borderBottomLeftRadius: ms(7, 0.3),
                          },
                      value.rightOn
                        ? {
                            marginLeft: ms(-0.1, 0.3),
                            marginRight: ms(-0.1, 0.3),
                            borderRadius:
                              Platform.OS === 'ios' ? 0 : ms(0.1, 0.3),
                          }
                        : {
                            marginLeft: ms(-0.1, 0.3),
                            borderTopRightRadius: ms(7, 0.3),
                            borderBottomRightRadius: ms(7, 0.3),
                          },
                    ]}>
                    <Text
                      style={[
                        styles.days,
                        {
                          color: theme.textColor,
                          fontFamily: 'Pretendard-Medium',
                        },
                        { marginBottom: ms(3, 0.3) },
                        value.contain ? { color: theme.backgroundColor } : {},
                      ]}>
                      {days[index]}
                    </Text>
                    <Text
                      style={[
                        styles.days,
                        { color: theme.textColor },
                        value.contain ? { color: theme.backgroundColor } : {},
                      ]}>
                      {value.taskDate.date}
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log();
            navigation.navigate('GoalDetail', { _id: goal._id.toString() });
          }}
          style={[
            {
              marginTop: ms(14, 0.3),
              backgroundColor: theme.appBackgroundColor,
              borderRadius: ms(10, 0.3),
              justifyContent: 'center',
            },
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <Text
            style={[
              {
                color: theme.textColor,
                margin: ms(20, 0.3),
                fontSize: ms(16, 0.3),
                fontFamily: 'Pretendard-Medium',
                lineHeight: ms(23, 0.3),
              },
            ]}>
            {goal.description}
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 0.3 }}>
          {!item.isComplete && taskDateFormat == todayFormat ? (
            <TouchableOpacity
              onPress={() => {
                dismiss();
                todoCompleteAnimation(false);
              }}
              style={{
                marginTop: ms(14, 0.3),
                backgroundColor: 'rgba(0, 217, 0, 1)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ms(8, 0.3),
              }}>
              <MediumTextMemoization
                style={[
                  {
                    padding: ms(16, 0.3),
                    color: theme.textColor,
                  },
                  fontStyle.fontSizeSub,
                ]}>
                완료
              </MediumTextMemoization>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginTop: ms(14, 0.3),
                flex: 0.3,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ms(8, 0.3),
              }}>
              <MediumTextMemoization
                style={[
                  {
                    padding: ms(16, 0.3),
                    color: theme.textColor,
                    opacity: 0.3,
                  },
                  fontStyle.fontSizeSub,
                ]}>
                완료
              </MediumTextMemoization>
            </View>
          )}
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(8, 0.3),
  },
  days: {
    fontFamily: 'Pretendard-Regular',
  },
});

export default TodoInfo;
