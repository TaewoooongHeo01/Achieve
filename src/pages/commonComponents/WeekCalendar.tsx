import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ms } from 'react-native-size-matters';
import { TaskDate, useDateContext } from '../../context/DateContext';
import { calculateStartAndEndDayOfMonth } from '../../utils/calStartEndWeek';
import { days } from '../../context/DateContext';
import { useQuery } from '@realm/react';
import { Todo } from '../../../realm/models';
import { makeDateFormat } from '../../utils/makeDateFormat';

const WeekCalender = (): React.ReactElement => {
  const dateContext = useDateContext();

  const [week, setWeek] = useState<TaskDate[]>([]);
  const todos = useQuery(Todo);
  //todo 가 변경될 때마다 todo 정보를 가져와서 각 dateformat 을 만들고, 리스트에서 일치하는게 하나라도 있으면 true,

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

    let dateFormat: string;
    let isInclude: boolean = false;

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
        isInclude = false;
        if (dateOfWeek > lastDayOfPrevMonth) {
          dateOfWeek = 1;
          monthOfWeek = monthOfWeek + 1 > 12 ? 1 : monthOfWeek + 1;
          yearOfWeek = monthOfWeek == 1 ? (yearOfWeek += 1) : yearOfWeek;
        }
        dateFormat = makeDateFormat(yearOfWeek, monthOfWeek, dateOfWeek);
        for (let j = 0; j < todos.length; j++) {
          if (todos[j].date == dateFormat) {
            isInclude = true;
            break;
          }
        }
        const dateData: TaskDate = {
          year: yearOfWeek,
          month: monthOfWeek,
          date: dateOfWeek,
          day: i,
          isInclude: isInclude,
        };

        printWeek[i] = dateData;
        dateOfWeek += 1;
      }
    } else if (lastWeekDateOfMonth <= curDate) {
      //선택된 날짜가 마지막 주에 포함
      dateOfWeek = lastWeekDateOfMonth;
      for (let i = 0; i < 7; i++) {
        isInclude = false;
        if (dateOfWeek > lastDayOfMonth) {
          dateOfWeek = 1;
          monthOfWeek = monthOfWeek + 1 > 12 ? 1 : monthOfWeek + 1;
          yearOfWeek = monthOfWeek == 1 ? (yearOfWeek += 1) : yearOfWeek;
        }
        dateFormat = makeDateFormat(yearOfWeek, monthOfWeek, dateOfWeek);
        for (let j = 0; j < todos.length; j++) {
          if (todos[j].date == dateFormat) {
            isInclude = true;
            break;
          }
        }
        const dateData: TaskDate = {
          year: yearOfWeek,
          month: monthOfWeek,
          date: dateOfWeek,
          day: i,
          isInclude: isInclude,
        };
        printWeek[i] = dateData;
        dateOfWeek += 1;
      }
    } else {
      if (curDay !== undefined) {
        dateOfWeek = curDate - curDay;
        for (let i = 0; i < 7; i++) {
          isInclude = false;
          dateFormat = makeDateFormat(yearOfWeek, monthOfWeek, dateOfWeek);
          for (let j = 0; j < todos.length; j++) {
            if (todos[j].date == dateFormat) {
              isInclude = true;
              break;
            }
          }
          const dateData: TaskDate = {
            year: yearOfWeek,
            month: monthOfWeek,
            date: dateOfWeek,
            day: i,
            isInclude: isInclude,
          };
          printWeek[i] = dateData;
          dateOfWeek += 1;
        }
      }
    }
    setWeek(printWeek);
  }, [dateContext, todos]);

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
            key={index}
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
            {value.isInclude ? (
              <Text
                style={[
                  styles.days,
                  isToday ? { color: 'black' } : { color: 'white' },
                ]}>
                i
              </Text>
            ) : (
              <></>
            )}
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
    alignItems: 'flex-start',
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
