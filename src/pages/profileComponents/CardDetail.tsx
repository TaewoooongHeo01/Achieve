import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms } from 'react-native-size-matters';
import { ColorSet } from '../../assets/style/ThemeColor';
import { Goal } from '../../../realm/models';
import GoalIcon from 'react-native-vector-icons/Ionicons';
import { fontStyle } from '../../assets/style/fontStyle';
import { TouchableOpacity, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';

type cellType = {
  cnt: number;
};

const CardDetail = ({ item, theme }: { item: Goal; theme: ColorSet }) => {
  const { dismiss } = useBottomSheetModal();
  let todoCnt = item.todoCnt;

  const heatmap: cellType[][] = [];
  for (let i = 0; i < 5; i++) {
    const cellArr: cellType[] = [];
    for (let j = 0; j < 8; j++) {
      let cellCnt = 0;
      if (todoCnt >= 5) {
        cellCnt = 5;
        todoCnt -= 5;
      } else if (todoCnt < 5) {
        cellCnt = todoCnt % 5;
        todoCnt -= cellCnt;
      } else if (todoCnt === 0) {
        cellCnt = 0;
      }
      cellArr.push({
        cnt: cellCnt,
      });
    }
    heatmap.push(cellArr);
  }

  const renderItem = ({ item }: { item: cellType[] }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {item.map((value, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                height: ms(30, 0.3),
                aspectRatio: 1,
                margin: ms(3, 0.3),
                borderRadius: ms(5, 0.3),
                backgroundColor:
                  value.cnt === 0
                    ? theme.appBackgroundColor
                    : theme.hitmapColor[value.cnt - 1],
              }}></View>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          dismiss();
        }}
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            padding: ms(20, 0.3),
            borderRadius: ms(5, 0.3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={theme.gradientColor[item.color]}
              style={{
                width: ms(300, 0.3),
                height: ms(189, 0.3),
                borderRadius: ms(5, 0.3),
                justifyContent: 'space-between',
                padding: ms(30, 0.3),
              }}>
              <View>
                <Text
                  style={{
                    fontSize: ms(20, 0.3),
                    marginBottom: ms(5, 0.3),
                    fontFamily: 'Pretendard-SemiBold',
                  }}>
                  {item.title}
                </Text>
                <Text style={[fontStyle.fontSizeSub, { opacity: 0.8 }]}>
                  {item.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={fontStyle.fontSizeSub}>
                  {item.startDate}-{item.endDate}
                </Text>
                <GoalIcon name={item.icon} size={ms(18, 0.3)} />
              </View>
            </LinearGradient>
          </View>
          <View
            style={{
              width: ms(300, 0.3),
              height: ms(245, 0.3),
            }}>
            <Text
              style={[
                { color: theme.textColor, marginVertical: ms(15, 0.3) },
                fontStyle.fontSizeSub,
              ]}>
              몰입도
            </Text>
            <FlatList data={heatmap} renderItem={renderItem} />
          </View>
          <View style={{ flexDirection: 'row' }}>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardDetail;
