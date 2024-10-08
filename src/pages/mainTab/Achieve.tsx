import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColors } from '../../context/ThemeContext';
import { fontStyle } from '../../assets/style/fontStyle';
import { ms } from 'react-native-size-matters';
import { days, TaskDate } from '../../context/DateContext';
import { makeDateFormatKey } from '../../utils/makeDateFormatKey';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from '@realm/react';
import { Todo } from '../../../realm/models';
import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedBar from '../AchieveComponents/AnimatedBar';
import Cell from '../AchieveComponents/Cell';

const MemoizatinoCell = memo(Cell);

export type heapmapDataType = {
  dateKey: string;
  day: number;
};

export default function Achieve() {
  const { theme } = useColors();
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  const nowDay = now.getDay();
  const today: TaskDate = {
    year: nowYear,
    month: nowMonth,
    date: nowDate,
    day: nowDay,
  };
  const todayFormat = makeDateFormatKey(today.year, today.month, today.date);

  const [year, setYear] = useState<number>(today.year);
  const [canMoveYear, setCanMoveYear] = useState<number[]>([]);
  const [dateKey, setDateKey] = useState<string>(todayFormat);

  const todos = useQuery(Todo);
  useEffect(() => {
    const newYearArr: number[] = [];
    for (let i = 0; i < todos.length; i++) {
      const y = Number(todos[i].date?.substring(0, 4));
      if (y) {
        if (!newYearArr.includes(y)) {
          newYearArr.push(y);
        }
      }
    }
    setCanMoveYear(newYearArr);
  }, [year]);

  let date = 1;
  let d = new Date(year, 0, date);

  const yearArr: heapmapDataType[][] = [];
  let weekArr: heapmapDataType[] = [];
  const januaryDateStart = new Date(year, 0, 1).getDay();
  const addData = januaryDateStart;

  for (let i = 0; i < 7; i++) {
    weekArr.push({
      dateKey: days[i],
      day: -1,
    });
  }
  yearArr.push(weekArr);
  weekArr = [];

  let weekIdx = 0;
  for (let i = 0; i < addData; i++) {
    weekArr.push({
      dateKey: i + '0000000',
      day: -1,
    });
    weekIdx++;
  }

  while (d.getFullYear() === year) {
    if (weekIdx == 7) {
      weekIdx = 0;
      yearArr.push(weekArr);
      weekArr = [];
    }
    weekArr.push({
      dateKey: makeDateFormatKey(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
      ),
      day: d.getDay(),
    });
    date++;
    weekIdx++;
    d = new Date(year, 0, date);
  }

  if (weekIdx > 0) {
    yearArr.push(weekArr);
  }

  //cell 정보 만드는 함수 최적화
  const makeCell = useCallback((item: heapmapDataType[]) => {
    let monthStart = false;
    let month = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i].dateKey.substring(6, 8) == '01') {
        monthStart = true;
        month = Number(item[i].dateKey.substring(4, 6)) - 1;
      }
    }
    return {
      monthStart: monthStart,
      month: month,
    };
  }, []);

  const renderItem = ({ item }: { item: heapmapDataType[] }) => {
    const { monthStart, month } = makeCell(item);
    return (
      <MemoizatinoCell
        item={item}
        monthStart={monthStart}
        month={month}
        setDateKey={setDateKey}
        todayFormat={todayFormat}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.appBackgroundColor,
        paddingHorizontal: ms(20, 0.3),
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: ms(60, 0.3),
        }}>
        {canMoveYear.includes(year - 1) ? (
          <TouchableOpacity
            onPress={() => {
              setYear(year => year - 1);
            }}>
            <Icon name='left' size={ms(15, 0.3)} color={theme.textColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ opacity: 0.2 }}>
            <Icon name='left' size={ms(15, 0.3)} color={theme.textColor} />
          </View>
        )}
        <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
          {year}
        </Text>
        {canMoveYear.includes(year + 1) ? (
          <TouchableOpacity
            onPress={() => {
              setYear(year => year + 1);
            }}>
            <Icon name='right' size={ms(15, 0.3)} color={theme.textColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ opacity: 0.2 }}>
            <Icon name='right' size={ms(15, 0.3)} color={theme.textColor} />
          </View>
        )}
      </View>
      <View
        style={{
          height: ms(450, 0.3),
        }}>
        <FlatList
          data={yearArr}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => {
            return item[0].dateKey.toString();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: ms(10, 0.3),
            marginBottom: ms(30, 0.3),
          }}>
          {theme.heatmapColor.map((value, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  backgroundColor: value,
                  borderTopRightRadius: index === 4 ? ms(5, 0.3) : 0,
                  borderBottomRightRadius: index === 4 ? ms(5, 0.3) : 0,
                  borderTopLeftRadius: index === 0 ? ms(5, 0.3) : 0,
                  borderBottomLeftRadius: index === 0 ? ms(5, 0.3) : 0,
                  marginHorizontal: ms(-0.2, 0.3),
                  height: ms(22, 0.3),
                }}>
                <Text
                  style={[
                    {
                      paddingHorizontal: ms(12, 0.3),
                      marginVertical: ms(3, 0.3),
                      color: theme.textColor,
                    },
                    fontStyle.fontSizeSub,
                  ]}></Text>
              </View>
            );
          })}
        </View>
        <AnimatedBar dateKey={dateKey} />
      </View>
    </View>
  );
}
