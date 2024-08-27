import React from 'react';
import { Text, View } from 'react-native';
import { fontStyle } from '../../assets/style/fontStyle';
import { ColorSet, fullnessCheckColor } from '../../assets/style/ThemeColor';
import { ms } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { closeAlert } from 'react-native-customisable-alert';

const CheckFullnessAlert = ({
  theme,
  checkedValue,
  setCheckedValue,
}: {
  theme: ColorSet;
  checkedValue: number;
  setCheckedValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const checkList: string[] = [
    '진짜 후회가 없는가?',
    '완전한 몰입을 경험했는가?',
  ];

  return (
    <View
      style={[
        {
          backgroundColor: theme.backgroundColor,
          padding: ms(20, 0.3),
          borderRadius: ms(5, 0.3),
          width: ms(300, 0.3),
        },
      ]}>
      <View>
        <Text
          style={[
            { marginBottom: ms(8, 0.3), color: theme.textColor },
            fontStyle.fontSizeMain,
          ]}>
          축하합니다! 모든 할 일을 완료했어요
        </Text>
        {checkList.map((value, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: ms(3, 0.3),
              }}>
              <Text style={[fontStyle.fontSizeSub]} key={index.toString()}>
                - {value}
              </Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: ms(30, 0.3),
          marginTop: ms(20, 0.3),
          justifyContent: 'space-between',
        }}>
        {fullnessCheckColor.map((value, index) => {
          const calValue = ((index + 1) * 20) / 100;
          return (
            <TouchableOpacity
              key={index.toString()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: ms(7, 0.3),
                borderRadius: ms(5, 0.3),
                borderWidth: 0.2,
                backgroundColor:
                  checkedValue === calValue
                    ? theme.textColor
                    : theme.backgroundColor,
              }}
              onPress={() => {
                setCheckedValue(calValue);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color:
                    checkedValue === calValue
                      ? theme.backgroundColor
                      : theme.textColor,
                }}>
                {(index + 1) * 20}%{index < 4 ? ' ' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          alignItems: 'center',
          height: ms(30, 0.3),
          marginTop: ms(20, 0.3),
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // padding: ms(7, 0.3),
            paddingHorizontal: ms(20, 0.3),
            borderRadius: ms(5, 0.3),
            backgroundColor: theme.textColor,
          }}
          onPress={() => {
            closeAlert();
          }}>
          <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckFullnessAlert;
