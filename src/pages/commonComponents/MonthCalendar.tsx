import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import { BottomSheetFlatList, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { TaskDate, useDateContext } from '../../context/DateContext';
import { calculateStartAndEndDayOfMonth } from '../../utils/calStartEndWeek';
import { days } from '../../context/DateContext';

const MonthCalendar = (): React.ReactElement => {
  const dateContext = useDateContext();

  const { dismiss } = useBottomSheetModal();
  const [curYear, setCurYear] = useState(dateContext.taskDate.year);
  const [curMonth, setCurMonth] = useState(dateContext.taskDate.month);
  const [monthDays, setMonthDays] = useState<TaskDate[]>([]);

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
      dateContext.setTaskDate({
        year: item.year,
        month: item.month,
        date: item.date,
        day: index,
      });
      dismiss();
      return;
    }
  };

  const todayCheck = (taskDate: TaskDate) => {
    const today: TaskDate = dateContext.today;
    return (
      today.year == taskDate.year &&
      today.month == taskDate.month &&
      today.date == taskDate.date
    );
  };

  const selectedCheck = (taskDate: TaskDate) => {
    const today = dateContext.taskDate;
    if (!taskDate.isActive) {
      //이전 달 혹은 다음 달이 포함된 경우, 요일이 같으면 동시에 체크되는 버그.
      //TaskDate 의 day 변수를 만들 때 useEffect 가 아닌, flatlist 에서 만들어 리턴하기 때문임.
      return false;
    }
    return (
      today.year == taskDate.year &&
      today.month == taskDate.month &&
      today.date == taskDate.date
    );
  };

  const renderItem: ListRenderItem<TaskDate> = ({ item, index }) => {
    const isToday = todayCheck(item);
    const isSelectedDate = selectedCheck(item);
    return (
      <Pressable
        onPress={() => {
          pressHandler(item, index);
        }}
        key={index}
        style={[
          {
            flex: 1,
            borderRadius: ms(5, 0.3),
          },
          isSelectedDate ? styles.todayBtn : {},
        ]}>
        <View
          style={[
            styles.cell,
            isToday ? styles.todayBtn : {},
            isSelectedDate ? styles.selectedDate : {},
          ]}>
          {isSelectedDate ? (
            <Text
              style={{
                fontSize: ms(15, 0.3),
              }}>
              {item.date}
            </Text>
          ) : (
            <Text
              style={[
                {
                  color: item.isActive ? 'white' : '#949494',
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

  return (
    <View
      style={{
        backgroundColor: '#282828',
        flex: 1,
        padding: ms(8, 0.3),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: ms(5, 0.3),
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleMoveMonth(-1);
          }}>
          <View>
            <Text style={{ color: 'white' }}>icl</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.ym}>
            {curYear}년 {curMonth}월
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleMoveMonth(1);
          }}>
          <View>
            <Text style={{ color: 'white' }}>icr</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {days.map(value => {
            return (
              <View key={value.toString()} style={[styles.cell]}>
                <Text style={styles.daysfont}>{value}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <BottomSheetFlatList
            style={{ flex: 1 }}
            data={monthDays}
            numColumns={7}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: ms(10, 0.3), //좌우 버튼크기
    color: 'white',
  },
  ym: {
    fontWeight: '600',
    color: 'white',
    fontSize: ms(18, 0.3),
  },
  cell: {
    padding: ms(12, 0.3), //요일 박스 크기
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5, 0.3),
  },
  daysfont: {
    fontSize: ms(15, 0.3),
    color: 'white',
    fontWeight: '200',
    opacity: 0.87,
  },
  todayBtn: {
    borderWidth: 1,
    borderColor: 'white',
  },
  todayText: {
    fontWeight: 'bold',
  },
  pressedBtn: {
    backgroundColor: 'white',
  },
  selectedDate: {
    backgroundColor: 'white',
  },
});

export default MonthCalendar;
