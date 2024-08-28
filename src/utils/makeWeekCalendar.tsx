import { useEffect, useState } from 'react';
import { calculateStartAndEndDayOfMonth } from './calStartEndWeek';
import { TaskDate, useDateContext } from '../context/DateContext';
import { useQuery, useRealm } from '@realm/react';
import { makeDateFormatKey } from './makeDateFormatKey';
import { FullyDate, Todo } from '../../realm/models';

export const selectedCheck = (taskDate: TaskDate, today: TaskDate) => {
  return (
    today.year == taskDate.year &&
    today.month == taskDate.month &&
    today.date == taskDate.date
  );
};

export const makeWeekCalendar = () => {
  const { taskDate } = useDateContext();
  const realm = useRealm();

  const [week, setWeek] = useState<TaskDate[]>([]);
  const todos = useQuery(Todo);

  useEffect(() => {
    const printWeek = [];
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
        dateFormat = makeDateFormatKey(yearOfWeek, monthOfWeek, dateOfWeek);
        const date = realm.objectForPrimaryKey<FullyDate>(
          'FullyDate',
          dateFormat,
        );
        if (date && date.todos && date.todos.length > 0) {
          isInclude = true;
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
        dateFormat = makeDateFormatKey(yearOfWeek, monthOfWeek, dateOfWeek);

        const date = realm.objectForPrimaryKey<FullyDate>(
          'FullyDate',
          dateFormat,
        );
        if (date && date.todos && date.todos.length > 0) {
          isInclude = true;
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
          dateFormat = makeDateFormatKey(yearOfWeek, monthOfWeek, dateOfWeek);
          const date = realm.objectForPrimaryKey<FullyDate>(
            'FullyDate',
            dateFormat,
          );
          if (date && date.todos && date.todos.length > 0) {
            isInclude = true;
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
  }, [taskDate, todos]);

  return week;
};
