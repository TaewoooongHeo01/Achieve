import { Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { days, months } from '../../context/DateContext';
import { heapmapDataType } from '../mainTab/Achieve';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FullyDate } from '../../../realm/models';
import { useQuery, useRealm } from '@realm/react';

const Cell = ({
  item,
  monthStart,
  month,
  setDateKey,
  todayFormat,
}: {
  item: heapmapDataType[];
  monthStart: boolean;
  month: number;
  setDateKey(dateKey: string): void;
  todayFormat: string;
}) => {
  const { theme, currentTheme } = useColors();
  const map: Map<string, number> = new Map();
  const realm = useRealm();
  let firstDate = '-1';
  let lastDate = '-1';
  //   const dates = useQuery(FullyDate).filtered(
  //     'dateKey >= $0 AND dateKey <= $1 AND dateKey != "00000000"',
  //     firstDate,
  //     lastDate,
  //   );

  for (let i = 0; i < item.length; i++) {
    if (item[i].day !== -1 && firstDate === '-1') {
      firstDate = item[i].dateKey;
    }
  }
  if (item[item.length - 1].day !== -1) {
    lastDate = item[item.length - 1].dateKey;
  }

  const dates = useQuery(FullyDate).filtered(
    'dateKey >= $0 AND dateKey <= $1',
    firstDate,
    lastDate,
  );

  dates.forEach(dates => {
    const fullyDate = realm.objectForPrimaryKey<FullyDate>(
      'FullyDate',
      String(dates.dateKey),
    );
    if (fullyDate) {
      map.set(
        String(dates.dateKey),
        Number((fullyDate.fullness / 0.2).toFixed(0)),
      );
    }
  });

  return (
    <View style={{ flex: 1 }}>
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
            ) : value.dateKey.substring(6, 8) === '00' ? null : value.dateKey <=
                todayFormat && map.get(value.dateKey) ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setDateKey(value.dateKey)}
                style={{
                  height: ms(32, 0.3),
                  aspectRatio: 1,
                  borderWidth: ms(0.3, 0.3),
                  borderRadius: ms(5, 0.3),
                  borderColor: currentTheme === 'light' ? '#B8B8B8' : '#121212',
                  backgroundColor:
                    theme.heatmapColor[
                      Math.max((map.get(value.dateKey) ?? 0) - 1, 0)
                    ] || theme.green,
                }}
              />
            ) : (
              <View
                style={{
                  height: ms(32, 0.3),
                  aspectRatio: 1,
                  borderWidth: ms(0.3, 0.3),
                  borderRadius: ms(5, 0.3),
                  borderColor: currentTheme === 'light' ? '#B8B8B8' : '#121212',
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

export default Cell;
