import { useRealm } from '@realm/react';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { FullyDate } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useColors } from '../../context/ThemeContext';
import { shadow } from '../../assets/style/shadow';

const AnimatedBar = ({ dateKey }: { dateKey: string }) => {
  const realm = useRealm();
  const { theme, currentTheme } = useColors();
  const fd = realm.objectForPrimaryKey<FullyDate>(
    'FullyDate',
    dateKey,
  )?.fullness;
  const [barWidth, setBarWidth] = useState<number>(0);

  const progressBar = useSharedValue(0);
  const widthFd = Number(fd?.toFixed(2));

  progressBar.value = withTiming((barWidth / 100) * (widthFd * 100));

  const progressAnimation = useAnimatedStyle(() => ({
    width: progressBar.value,
  }));

  return (
    <View
      style={[
        {
          height: ms(80, 0.3),
          backgroundColor: theme.backgroundColor,
          borderRadius: ms(5, 0.3),
        },
        currentTheme === 'light' ? shadow.boxShadow : {},
      ]}>
      <View
        style={{
          flex: ms(0.45, 0.3),
          justifyContent: 'flex-end',
          paddingLeft: ms(5, 10),
        }}>
        <Text
          style={[
            fontStyle.BtnFont,
            { color: theme.textColor, marginLeft: ms(13, 0.3) },
          ]}>
          {dateKey.substring(0, 4)}.{dateKey.substring(4, 6)}.
          {dateKey.substring(6, 8)} - {Number(fd?.toFixed(2)) * 100}%
        </Text>
      </View>
      <View
        style={{
          flex: ms(0.4, 0.3),
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: ms(0, 10),
        }}>
        <View
          onLayout={e => {
            setBarWidth(e.nativeEvent.layout.width);
          }}
          style={{
            height: ms(13, 0.3),
            backgroundColor: '#E6E6E6',
            width: '85%',
            borderRadius: ms(3, 0.3),
            position: 'absolute',
          }}>
          <Animated.View
            style={[
              progressAnimation,
              {
                position: 'absolute',
                zIndex: 10,
                backgroundColor: '#50b458',
                height: ms(13, 0.3),
                borderRadius: ms(3, 0.3),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default AnimatedBar;
