import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ms } from 'react-native-size-matters';
import { TaskDate, useDateContext } from '../../context/DateContext';
import { calculateStartAndEndDayOfMonth } from '../../utils/calStartEndWeek';
import { days } from '../../context/DateContext';

const WeekCalender = (): React.ReactElement => {
  const dateContext = useDateContext();

  const [week, setWeek] = useState<TaskDate[]>([]);

  useEffect(() => {
    const printWeek = [];
    const curYear = dateContext.taskDate.year;
    const curMonth = dateContext.taskDate.month;
    const curDate = dateContext.taskDate.date;
    const curDay = dateContext.taskDate.day;
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
        printWeek[i] = dateData;
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
        printWeek[i] = dateData;
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
          printWeek[i] = dateData;
          dateOfWeek += 1;
        }
      }
    }
    setWeek(printWeek);
  }, [dateContext]);

  const selectedCheck = (taskDate: TaskDate) => {
    const today = dateContext.taskDate;
    return (
      today.year == taskDate.year &&
      today.month == taskDate.month &&
      today.date == taskDate.date
    );
  };

  return (
    <View style={styles.layout}>
      {week.map((value, index) => {
        const isToday: boolean = selectedCheck(value);
        return (
          <Pressable
            onPress={() => {
              dateContext.setTaskDate(value);
            }}
            style={[styles.btn, isToday ? styles.todayBtn : {}]}>
            <Text
              style={[
                styles.days,
                { marginBottom: ms(3, 0.3) },
                isToday ? styles.todayText : {},
              ]}>
              {days[index]}
            </Text>
            <Text style={[styles.days, isToday ? styles.todayText : {}]}>
              {value.date}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginVertical: ms(13, 0.3),
    marginHorizontal: ms(9, 0.3),
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(5, 0.3),
    marginHorizontal: ms(2, 0.3),
    borderRadius: ms(5, 0.3),
  },
  todayBtn: {
    backgroundColor: 'white',
  },
  todayText: {
    color: 'black',
  },
  days: {
    color: 'white',
    fontWeight: '500',
  },
});

export default WeekCalender;
