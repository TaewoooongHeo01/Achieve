import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColors } from '../../context/ThemeContext';
import { fontStyle } from '../../assets/style/fontStyle';
import { ms } from 'react-native-size-matters';
import { days, months, useDateContext } from '../../context/DateContext';
import { makeDateFormatKey } from '../../utils/makeDateFormatKey';
import { FlatList } from 'react-native-gesture-handler';
import { useRealm } from '@realm/react';
import { FullyDate, Todo } from '../../../realm/models';
import Icon from 'react-native-vector-icons/AntDesign';
import AcheiveTodos from '../AchieveComponents/AcheiveTodos';
import { List } from 'realm';

type hitmapDateType = {
  dateKey: string;
  day: number;
};

export default function Achieve() {
  const { theme, currentTheme } = useColors();
  const { today } = useDateContext();
  const [year, setYear] = useState<number>(today.year);
  const realm = useRealm();

  const todayFormat = makeDateFormatKey(today.year, today.month, today.date);
  const [todos, setTodos] = useState<List<Todo> | undefined>(undefined);

  let date = 1;
  let d = new Date(year, 0, date);

  const yearArr: hitmapDateType[][] = [];
  let weekArr: hitmapDateType[] = [];
  const januaryDateStart = new Date(year, 0, 1).getDay();
  const addData = januaryDateStart;

  //useMemo 나 useCallback 으로 최적화 + useEffect 로 home 에서 todo 변경 시 반영해야 함
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

  const changeDate = (dateKey: string) => {
    const fd = realm.objectForPrimaryKey<FullyDate>('FullyDate', dateKey);
    if (fd) {
      setTodos(fd.todos);
    }
  };

  const renderItem = ({ item }: { item: hitmapDateType[] }) => {
    let monthStart = false;
    let month = 0;
    const map = new Map<string, number>();
    for (let i = 0; i < item.length; i++) {
      if (item[i].dateKey.substring(6, 8) == '01') {
        monthStart = true;
        month = Number(item[i].dateKey.substring(4, 6)) - 1;
      }
      const fullyDate = realm.objectForPrimaryKey<FullyDate>(
        'FullyDate',
        item[i].dateKey,
      );
      if (fullyDate) {
        map.set(item[i].dateKey, fullyDate.fullness);
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          {monthStart ? (
            <View>
              <Text
                style={[
                  fontStyle.fontSizeSub,
                  { fontSize: ms(18, 0.3), color: theme.textColor },
                ]}>
                {months[month]}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{ flex: 0.9 }}>
          {item.map(value => {
            return (
              <View
                key={value.dateKey.toString()}
                style={{
                  height: ms(30, 0.3),
                  aspectRatio: 1,
                  margin: ms(3, 0.3),
                }}>
                {days.includes(value.dateKey) ? (
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text
                      style={[
                        fontStyle.fontSizeSub,
                        { fontSize: ms(18, 0.3), color: theme.textColor },
                      ]}>
                      {value.dateKey}
                    </Text>
                  </View>
                ) : value.dateKey.substring(6, 8) === '00' ? null : map.get(
                    value.dateKey,
                  ) ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => changeDate(value.dateKey)}
                    style={{
                      flex: 1,
                      borderWidth: ms(0.3, 0.3),
                      borderRadius: ms(5, 0.3),
                      borderColor:
                        currentTheme === 'light' ? '#B8B8B8' : '#121212',
                      backgroundColor: theme.textColor,
                      opacity: map.get(value.dateKey),
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: ms(0.3, 0.3),
                      borderRadius: ms(5, 0.3),
                      borderColor:
                        currentTheme === 'light' ? '#B8B8B8' : '#121212',
                      backgroundColor:
                        todayFormat === value.dateKey
                          ? theme.textColor
                          : currentTheme === 'light'
                            ? '#F6F6F6'
                            : '#282828',
                    }}></View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.appBackgroundColor,
        paddingHorizontal: ms(20, 0.3),
      }}>
      <View style={{ marginVertical: ms(20, 0.3) }}>
        <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
          꾸준한 기록들
        </Text>
      </View>
      <View
        style={{
          marginBottom: ms(15, 0.3),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setYear(year => year - 1);
          }}>
          <Icon name='left' size={ms(15, 0.3)} />
        </TouchableOpacity>
        <Text style={[fontStyle.fontSizeMain]}>{year}</Text>
        <TouchableOpacity
          onPress={() => {
            setYear(year => year + 1);
          }}>
          <Icon name='right' size={ms(15, 0.3)} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.5 }}>
        <FlatList
          data={yearArr}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ flex: 0.5 }}>
        <AcheiveTodos todos={todos} />
      </View>
    </View>
  );
}
