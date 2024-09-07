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
      style={{
        width: ms(300, 0.3),
        backgroundColor: theme.backgroundColor,
        borderRadius: ms(5, 0.3),
        padding: ms(20, 0.3),
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
        🥳 축하드려요!
      </Text>
      <Text
        style={[
          fontStyle.fontSizeMain,
          { color: theme.textColor, marginBottom: ms(15, 0.3) },
        ]}>
        목표를 달성했어요
      </Text>
      <Text
        style={[
          fontStyle.fontSizeSub,
          { color: theme.textColor, marginBottom: ms(15, 0.3) },
        ]}>
        달성한 목표들은 [ 내 프로필 ] → [ 달성한 목표들 ] 에서 확인할 수 있어요
      </Text>
      <TouchableOpacity
        onPress={() => {
          closeAlert();
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          padding: ms(8, 0.3),
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CelebrationAlert;
