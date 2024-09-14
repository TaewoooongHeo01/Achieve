import React from 'react';
import { Text, View } from 'react-native';
import { fontStyle } from '../../assets/style/fontStyle';
import { ColorSet } from '../../assets/style/ThemeColor';
import { ms } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';
import { closeAlert } from 'react-native-customisable-alert';
import { useRealm } from '@realm/react';
import { FullyDate } from '../../../realm/models';

const CheckFullnessAlert = ({
  theme,
  checkedValue,
  setCheckedValue,
  dateFormatKey,
}: {
  theme: ColorSet;
  checkedValue: number;
  setCheckedValue: React.Dispatch<React.SetStateAction<number>>;
  dateFormatKey: string;
}) => {
  const realm = useRealm();
  return (
    <View
      style={[
        {
          backgroundColor: theme.backgroundColor,
          padding: ms(20, 0.3),
          borderRadius: ms(5, 0.3),
          width: ms(290, 0.3),
        },
      ]}>
      <View>
        <Text style={[{ color: theme.textColor }, fontStyle.fontSizeMain]}>
          오늘 하루,
        </Text>
        <Text style={[{ color: theme.textColor }, fontStyle.fontSizeMain]}>
          얼마나 몰입했나요?
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: ms(30, 0.3),
          marginTop: ms(20, 0.3),
          justifyContent: 'space-between',
        }}>
        {theme.heatmapColor.map((value, index) => {
          const calValue = ((index + 1) * 20) / 100;
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={index.toString()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ms(5, 0.3),
                borderWidth: 0.2,
                borderColor: '#ccc',
                borderTopRightRadius: index === 4 ? ms(5, 0.3) : 0,
                borderBottomRightRadius: index === 4 ? ms(5, 0.3) : 0,
                borderTopLeftRadius: index === 0 ? ms(5, 0.3) : 0,
                borderBottomLeftRadius: index === 0 ? ms(5, 0.3) : 0,
                backgroundColor: value,
                marginLeft: ms(-0.1, 0.3),
                marginRight: ms(-0.1, 0.3),
                opacity: checkedValue === calValue ? 0.3 : 1,
              }}
              onPress={() => {
                setCheckedValue(calValue);
              }}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                    fontFamily: 'Pretendard-Medium',
                    color: theme.textColor,
                  },
                  fontStyle.BtnFont,
                ]}>
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
            realm.write(() => {
              const fullyDate = realm.objectForPrimaryKey<FullyDate>(
                'FullyDate',
                dateFormatKey,
              );
              if (fullyDate) {
                fullyDate.fullness = checkedValue;
              }
            });
            closeAlert();
          }}>
          <Text
            style={[
              fontStyle.BtnFont,
              { textAlign: 'center', color: theme.backgroundColor },
            ]}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckFullnessAlert;
