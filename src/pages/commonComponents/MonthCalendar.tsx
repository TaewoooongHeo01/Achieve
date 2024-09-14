import React, { useState, useEffect, SetStateAction } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import { BottomSheetFlatList, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { TaskDate, useDateContext } from '../../context/DateContext';
import { calculateStartAndEndDayOfMonth } from '../../utils/calStartEndWeek';
import { days } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import TodoAdd from '../homeComponents/Todos/TodoAdd';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { makeDateFormatKey } from '../../utils/makeDateFormatKey';
import { Todo } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';

const MonthCalendar = ({
  itemAdd,
  setTodoBottomSheetSnapPoint,
  item,
  itemDelete,
}: {
  itemAdd: boolean;
  setTodoBottomSheetSnapPoint?(
    snapPoint?: SetStateAction<string> | undefined,
  ): void;
  item?: Todo;
  itemDelete?(todo: Todo): void;
}): React.ReactElement => {
  const { theme } = useColors();
  const { taskDate, today, setTaskDate } = useDateContext();

  const { dismiss } = useBottomSheetModal();
  const [curYear, setCurYear] = useState(taskDate.year);
  const [curMonth, setCurMonth] = useState(taskDate.month);
  const [monthDays, setMonthDays] = useState<TaskDate[]>([]);
  const bottomSheetWidth = useWindowDimensions().width - ms(15, 0.3);
  const bottomSheetHeight = useWindowDimensions().height / 2;
  const todayFormat = makeDateFormatKey(today.year, today.month, today.date);

  const layoutX = useSharedValue<number>(0);

  useEffect(() => {
    handleMoveMonth(0);
  }, []);

  useEffect(() => {
    const [
      startWeekDateOfMonth,
      lastWeekDateOfMonth,
      lastDayOfMonth,
      lastDayOfPrevMonth,
    ] = calculateStartAndEndDayOfMonth(curYear, curMonth);

    const printDays: TaskDate[] = [];
    let date = startWeekDateOfMonth;
    let idx = 0;
    let includeCurMonth = date == 1 ? true : false;
    let startWeek = true;
    let lastWeek = false;
    let lastWeekCnt = 0;
    let changed = false;
    const t = true;
    while (t) {
      if (date == lastWeekDateOfMonth && changed) {
        lastWeek = true;
      }
      if (startWeek) {
        if (date == lastDayOfPrevMonth + 1) {
          date = 1;
          includeCurMonth = true;
        }
        if (idx == 7) {
          changed = true;
          startWeek = false;
        }
      } else if (lastWeek) {
        if (date == lastDayOfMonth + 1) {
          date = 1;
          includeCurMonth = false;
        }
        if (lastWeekCnt == 7) {
          break;
        }
        lastWeekCnt += 1;
      }
      printDays[idx] = {
        year: curYear,
        month: curMonth,
        date: date,
        isActive: includeCurMonth,
      };
      date += 1;
      idx += 1;
    }

    setMonthDays(printDays);
  }, [curYear, curMonth]);

  const calYM = (year: number, month: number, m: number): number[] => {
    let ry = year;
    let rm = month + m;
    if (rm == 0) {
      ry = year - 1;
      rm = 12;
    } else if (rm == 13) {
      ry = year + 1;
      rm = 1;
    }
    return [ry, rm];
  };

  const handleMoveMonth = (m: number) => {
    const [ry, rm] = calYM(curYear, curMonth, m);
    setCurYear(ry);
    setCurMonth(rm);
  };

  const pressHandler = (item: TaskDate, index: number) => {
    if (item.isActive) {
      index = index % 7;
      setTaskDate({
        year: item.year,
        month: item.month,
        date: item.date,
        day: index,
      });
      if (!itemAdd) {
        dismiss();
      }
      return;
    }
  };

  const todayCheck = (item: TaskDate) => {
    const td: TaskDate = today;
    if (!item.isActive) {
      return false;
    }
    return (
      td.year == item.year && td.month == item.month && td.date == item.date
    );
  };

  const selectedCheck = (item: TaskDate) => {
    const td = taskDate;
    if (!item.isActive) {
      return false;
    }
    return (
      td.year == item.year && td.month == item.month && td.date == item.date
    );
  };

  const renderItem: ListRenderItem<TaskDate> = ({ item, index }) => {
    const isToday = todayCheck(item);
    const isSelectedDate = selectedCheck(item);
    const itemFormat = makeDateFormatKey(item.year, item.month, item.date);
    return (
      <Pressable
        onPress={() => {
          if (itemAdd) {
            if (itemFormat >= todayFormat) {
              pressHandler(item, index);
            }
            return;
          }
          pressHandler(item, index);
        }}
        key={index}
        style={[
          {
            flex: 1,
            borderRadius: ms(5, 0.3),
          },
          isSelectedDate
            ? [styles.todayBtn, { borderColor: theme.backgroundColor }]
            : {},
        ]}>
        <View
          style={[
            styles.cell,
            isToday ? [styles.todayBtn, { borderColor: theme.textColor }] : {},
            isSelectedDate ? [{ backgroundColor: theme.textColor }] : {},
          ]}>
          {isSelectedDate ? (
            <Text
              style={{
                fontSize: ms(15, 0.3),
                color: theme.backgroundColor,
              }}>
              {item.date}
            </Text>
          ) : (
            <Text
              style={[
                {
                  color: item.isActive
                    ? itemAdd
                      ? itemFormat >= todayFormat
                        ? theme.textColor
                        : '#949494'
                      : theme.textColor
                    : '#949494',
                  fontSize: ms(15, 0.3),
                },
              ]}>
              {item.date}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const transformXAnime = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(layoutX.value) }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: bottomSheetWidth * 2 - ms(15, 0.3),
          height: bottomSheetHeight + ms(150, 0.3),
          flexDirection: 'row',
          overflow: 'hidden',
          justifyContent: 'space-between',
        },
        transformXAnime,
      ]}>
      <View
        style={{
          width: bottomSheetWidth - ms(15, 0.3),
          height: bottomSheetHeight,
          paddingVertical: itemAdd ? 0 : ms(8, 0.3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: ms(45, 0.3),
            marginBottom: ms(10, 0.3),
            marginTop: ms(25, 0.3),
          }}>
          {!itemAdd ? (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.backgroundColor }]}
              onPress={() => {
                handleMoveMonth(-1);
              }}>
              <Icon name='left' color={theme.textColor}></Icon>
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.btn,
                { backgroundColor: theme.backgroundColor, opacity: 0.3 },
              ]}>
              <Icon name='left' color={theme.textColor}></Icon>
            </View>
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.ym,
                { color: theme.textColor, fontFamily: 'Pretendard-Medium' },
              ]}>
              {curYear}년 {curMonth}월
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.backgroundColor }]}
            onPress={() => {
              handleMoveMonth(1);
            }}>
            <Icon name='right' color={theme.textColor}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: ms(20, 0.3) }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {days.map(value => {
              return (
                <View key={value.toString()} style={[styles.cell, { flex: 1 }]}>
                  <Text
                    style={[
                      styles.daysfont,
                      {
                        color: theme.textColor,
                        fontFamily: 'Pretendard-Medium',
                      },
                    ]}>
                    {value}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              // marginHorizontal: ms(-8, 0.3),
            }}>
            <BottomSheetFlatList
              style={{ flex: 1 }}
              data={monthDays}
              numColumns={7}
              renderItem={renderItem}
            />
          </View>
        </View>
        {itemAdd && setTodoBottomSheetSnapPoint ? (
          <TouchableOpacity
            onPress={() => {
              layoutX.value = -bottomSheetWidth;
              setTodoBottomSheetSnapPoint('65%');
            }}
            style={{
              backgroundColor: theme.textColor,
              padding: ms(11, 0.3),
              marginHorizontal: ms(30, 0.3),
              borderRadius: ms(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: ms(30, 0.3),
            }}>
            <Text
              style={[
                {
                  color: theme.backgroundColor,
                },
                fontStyle.BtnFont,
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          width: bottomSheetWidth - ms(15, 0.3),
          height: bottomSheetHeight + ms(100, 0.3),
          padding: ms(10, 0.3),
        }}>
        <TodoAdd
          item={item}
          setTodoBottomSheetSnapPoint={setTodoBottomSheetSnapPoint}
          itemDelete={itemDelete}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: ms(6, 0.3), //좌우 버튼크기
  },
  ym: {
    fontFamily: 'Pretendard-Medium',
    fontSize: ms(18, 0.3),
  },
  cell: {
    // padding: ms(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5, 0.3),
    paddingVertical: ms(11, 0.3),
  },
  daysfont: {
    fontSize: ms(15, 0.3),
    fontFamily: 'Pretendard-Regular',
    opacity: 0.87,
  },
  todayBtn: {
    backgroundColor: 'grey',
  },
  todayText: {
    fontFamily: 'Pretendard-Regular',
  },
  pressedBtn: {
    backgroundColor: 'white',
  },
});

export default MonthCalendar;
