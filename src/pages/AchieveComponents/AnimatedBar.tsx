import { useRealm } from '@realm/react';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { FullyDate } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedBar = ({ dateKey }: { dateKey: string }) => {
  const realm = useRealm();
  const fd = realm.objectForPrimaryKey<FullyDate>(
    'FullyDate',
    dateKey,
  )?.fullness;
  const [barWidth, setBarWidth] = useState<number>(0);

  const progressBar = useSharedValue(0);
  const widthFd = Number(fd?.toFixed(2));

  useEffect(() => {
    progressBar.value = withTiming((barWidth / 100) * (widthFd * 100));
  }, [dateKey]);

  const progressAnimation = useAnimatedStyle(() => ({
    width: progressBar.value,
  }));

  return (
    <View
      style={{
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 0.2,
        borderRadius: ms(5, 0.3),
      }}>
      <View
        style={{
          flex: ms(0.45, 0.3),
          justifyContent: 'flex-end',
          paddingLeft: ms(5, 10),
        }}>
        <Text style={fontStyle.fontSizeSub}>얼마나 충만했나요?</Text>
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
            height: ms(10, 0.3),
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
                backgroundColor: 'lightgreen',
                height: ms(10, 0.3),
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
