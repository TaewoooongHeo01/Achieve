import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColors } from '../../context/ThemeContext';
import { fontStyle } from '../../assets/style/fontStyle';
import { ms } from 'react-native-size-matters';
import { days, months, TaskDate } from '../../context/DateContext';
import { makeDateFormatKey } from '../../utils/makeDateFormatKey';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery, useRealm } from '@realm/react';
import { FullyDate, Todo } from '../../../realm/models';
import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedBar from '../AchieveComponents/AnimatedBar';
import { hitmapColorSet } from '../../assets/style/ThemeColor';

type heapmapDataType = {
  dateKey: string;
  day: number;
};

//최적화전략
//2. hitmapData 만들 때 하나하나 useMemo 사용 + React.memo 로 메모이제이션 이용
//3. makeyearhitmap 을 useCallback 으로 감싸기.
//자동 스크롤

//성능최적화에서 고려해야 될 것
//만약 useEffect, useMemo 같이 특정 값에 의존하는 경우에만 변경하는 경우 todos 를 넣을 수 밖에 없음
//문제는 이 경우 저 많은 계산이 todo 변경마다 된다는 것임.
//과연 사용자가 achieve page 에 들어오는 경우가 더 많을까 아니면 todo 를 변경시키는 경우가 더 많을까?
//나는 후자라고 생각함. 따라서 저 함수 자체를 useCallback 해서 함수의 선언을 메모이제이션 하는 건 몰라도 의존성배열에 넣는 건 다시 고려해봐야 함.

export default function Achieve() {
  const { theme, currentTheme } = useColors();
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
  const realm = useRealm();
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

  const changeDate = (dateKey: string) => {
    // const fd = realm.objectForPrimaryKey<FullyDate>('FullyDate', dateKey);
    setDateKey(dateKey);
    // if (fd) {
    //   setTodos(fd.todos);
    // }
  };

  //cell 정보 만드는 함수 최적화
  const makeCell = useCallback((item: heapmapDataType[]) => {
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
        map.set(item[i].dateKey, Number((fullyDate.fullness / 0.2).toFixed(0)));
      }
    }
    return {
      map: map,
      monthStart: monthStart,
      month: month,
    };
  }, []);

  const renderItem = ({ item }: { item: heapmapDataType[] }) => {
    const { map, monthStart, month } = makeCell(item);
    return (
      <View>
        <View style={{ height: ms(40, 0.3) }}>
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
        {item.map(value => {
          return (
            <View
              key={value.dateKey.toString()}
              style={{
                height: ms(32, 0.3),
                aspectRatio: 1,
                margin: ms(3, 0.3),
              }}>
              {days.includes(value.dateKey) ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      fontStyle.fontSizeSub,
                      { fontSize: ms(18, 0.3), color: theme.textColor },
                    ]}>
                    {value.dateKey}
                  </Text>
                </View>
              ) : value.dateKey.substring(6, 8) ===
                '00' ? null : value.dateKey <= todayFormat &&
                map.get(value.dateKey) ? (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => changeDate(value.dateKey)}
                  style={{
                    flex: 1,
                    borderWidth: ms(0.3, 0.3),
                    borderRadius: ms(5, 0.3),
                    borderColor:
                      currentTheme === 'light' ? '#B8B8B8' : '#121212',
                    backgroundColor:
                      hitmapColorSet[
                        Math.max((map.get(value.dateKey) ?? 0) - 1, 0)
                      ] || 'green',
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
          {theme.hitmapColor.map((value, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  backgroundColor: value,
                  borderTopRightRadius: index === 4 ? ms(5, 0.3) : 0,
                  borderBottomRightRadius: index === 4 ? ms(5, 0.3) : 0,
                  borderTopLeftRadius: index === 0 ? ms(5, 0.3) : 0,
                  borderBottomLeftRadius: index === 0 ? ms(5, 0.3) : 0,
                  marginHorizontal: ms(-0.1, 0.3),
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
