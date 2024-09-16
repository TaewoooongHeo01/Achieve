import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { closeAlert } from 'react-native-customisable-alert';

const CelebrationAlert = () => {
  const { theme } = useColors();

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
      <Text
        style={[
          {
            fontFamily: 'Pretendard-Semibold',
            fontSize: ms(20, 0.3),
            color: theme.textColor,
          },
        ]}>
        축하합니다!
      </Text>
      <Text
        style={[
          {
            fontFamily: 'Pretendard-Semibold',
            fontSize: ms(20, 0.3),
            color: theme.textColor,
          },
        ]}>
        목표를 달성했어요
      </Text>
      <Text
        style={[
          fontStyle.fontSizeSub,
          {
            color: theme.textColor,
            marginBottom: ms(25, 0.3),
            marginVertical: ms(10, 0.3),
          },
        ]}>
        달성한 목표들은 [ 내 프로필 ] → [ 달성한 목표들 ] 에서 확인할 수 있어요
      </Text>
      <TouchableOpacity
        onPress={() => {
          closeAlert();
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: ms(36, 0.3),
          backgroundColor: theme.green,
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.BtnFont, { color: theme.textColor }]}>
          완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CelebrationAlert;
