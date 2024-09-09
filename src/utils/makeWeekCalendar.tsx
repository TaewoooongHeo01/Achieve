import { useEffect, useState } from 'react';
import { calculateStartAndEndDayOfMonth } from './calStartEndWeek';
import { TaskDate, useDateContext } from '../context/DateContext';
import { useQuery } from '@realm/react';
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

  const [week, setWeek] = useState<TaskDate[]>([]);
  const todos = useQuery(Todo);

  const weekInclude: boolean[] = [];

  for (let i = 0; i < 7; i++) {
    weekInclude[i] = false;
  }
  for (let i = 0; i < todos.length; i++) {
    for (let j = 0; j < todos[i].weekCycle.length; j++) {
      weekInclude[todos[i].weekCycle[j]] = true;
      const taskDateDay = todos[i].linkingObjects<FullyDate>(
        'FullyDate',
        'todos',
      )[0].dayIdx;
      weekInclude[taskDateDay] = true;
    }
  }

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
        if (weekInclude[i]) {
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
        if (weekInclude[i]) {
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
          if (weekInclude[i]) {
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
