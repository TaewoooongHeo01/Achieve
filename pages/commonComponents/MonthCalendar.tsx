import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import {
  BottomSheetFlatList,
  TouchableHighlight,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

export interface TaskDate {
  year?: number;
  month?: number;
  date: number;
  day?: string;
  isActive?: boolean;
}

const MonthCalendar = (): React.ReactElement => {
  const date = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const { dismiss } = useBottomSheetModal();
  const [curMonth, setCurMonth] = useState(date.getMonth() + 1);
  const [curYear, setCurYear] = useState(date.getFullYear());
  const [monthDays, setMonthDays] = useState<TaskDate[]>([]);

  useEffect(() => {
    handleMoveMonth(0);
  }, []);

  useEffect(() => {
    const startDayOfMonth = new Date(curYear, curMonth - 1, 1).getDay();
    const startDayOfNextMonth = new Date(curYear, curMonth, 1).getDay();
    const lastDayOfMonth = new Date(curYear, curMonth, 0).getDate();
    const lastDayOfPrevMonth = new Date(curYear, curMonth - 1, 0).getDate();

    let startWeekDateOfMonth = lastDayOfPrevMonth - startDayOfMonth + 1;
    let lastWeekDateOfMonth = lastDayOfMonth - startDayOfNextMonth + 1;
    startWeekDateOfMonth = startDayOfMonth == 0 ? 1 : startWeekDateOfMonth;
    lastWeekDateOfMonth =
      startDayOfNextMonth == 0 ? lastDayOfMonth - 6 : lastWeekDateOfMonth;

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

  const renderItem = ({ item }: { item: TaskDate }) => {
    if (!item.isActive) {
      return (
        <TouchableHighlight style={{ flex: 1 }}>
          <View style={styles.cell}>
            <Text style={{ color: '#949494' }}>{item.date}</Text>
          </View>
        </TouchableHighlight>
      );
    }
    console.log(item);
    return (
      <TouchableHighlight
        onPress={() => {
          console.log(item);
          dismiss();
        }}
        style={{ flex: 1 }}
        underlayColor={'transparent'}>
        <View style={styles.cell}>
          <Text style={{ color: 'white' }}>{item.date}</Text>
        </View>
      </TouchableHighlight>
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
        <Text style={styles.ym}>
          {curYear}년 {curMonth}월
        </Text>
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
              <View style={[styles.cell]}>
                <Text style={styles.daysfont}>{value}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <BottomSheetFlatList
            data={monthDays}
            numColumns={7}
            renderItem={renderItem}
            // keyExtractor={(item, index) => index + 1}
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
    fontSize: ms(15, 0.3),
  },
  cell: {
    padding: ms(10, 0.3), //요일 박스 크기
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysfont: {
    fontSize: ms(15, 0.3),
    color: 'white',
    fontWeight: '200',
    opacity: 0.87,
  },
});

export default MonthCalendar;
