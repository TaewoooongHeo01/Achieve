import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { ColorSet } from '../../assets/style/ThemeColor';
import { fontStyle } from '../../assets/style/fontStyle';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { closeAlert } from 'react-native-customisable-alert';

const GoalAddCompleteAlert = ({
  theme,
  color,
  icon,
}: {
  theme: ColorSet;
  color: number;
  icon: string;
}) => {
  // const [iconSize, setIconSize] = useState(0);
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
      <LinearGradient
        colors={theme.gradientColor[color]}
        style={{
          width: ms(40, 0.3),
          height: ms(40, 0.3),
          borderRadius: ms(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          // padding: ms(11, 0.3),
        }}>
        <View
          // onLayout={e => {
          //   setIconSize(e.nativeEvent.layout.height);
          // }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: 1,
          }}>
          <Ionicons name={icon} size={ms(22, 0.3)} color={'black'} />
        </View>
      </LinearGradient>
      <Text
        style={[
          {
            fontFamily: 'Pretendard-Semibold',
            fontSize: ms(17, 0.3),
            color: theme.textColor,
            marginTop: ms(15, 0.3),
          },
        ]}>
        축하합니다 🎉
      </Text>
      <Text
        style={[
          {
            fontFamily: 'Pretendard-Semibold',
            fontSize: ms(17, 0.3),
            color: theme.textColor,
            marginTop: ms(2, 0.3),
          },
        ]}>
        새로운 목표가 생겼어요
      </Text>
      <Text
        style={[
          fontStyle.fontSizeSub,
          {
            color: theme.textColor,
            marginBottom: ms(20, 0.3),
            marginTop: ms(5, 0.3),
          },
        ]}>
        목표를 위해 해야 할 일들을 추가해보세요
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          closeAlert();
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: ms(36, 0.3),
          backgroundColor: theme.textColor,
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.backgroundColor }]}>
          완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalAddCompleteAlert;
