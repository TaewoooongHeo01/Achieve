import React, { useRef } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Todo } from '../../../../realm/models';
import { ms } from 'react-native-size-matters';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const TodoItem = ({ item }: { item: Todo }) => {
  let screenWidth = useWindowDimensions().width;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const scaleX = useSharedValue(ms(55, 0.3));
  const marginXY = useSharedValue(ms(10, 0.3));

  const backFontOpacity = useSharedValue(1);

  const threshold = 30;
  const animatiomIsRunning = useRef<boolean>(false);

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    // .activeOffsetY([-1000, 1000])
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(e => {
      translateX.value = startX.value + e.translationX;
    })
    .onEnd(() => {
      if (translateX.value > threshold) {
        animatiomIsRunning.current = true;
      } else if (translateX.value < -threshold) {
        animatiomIsRunning.current = true;
      }
      if (animatiomIsRunning) {
        screenWidth = translateX.value > 0 ? screenWidth : -screenWidth;
        const state = translateX.value;
        translateX.value = withTiming(screenWidth, {}, () => {
          marginXY.value = withTiming(0);
          scaleX.value = withTiming(0);
          backFontOpacity.value = withTiming(0);
        });
        animatiomIsRunning.current = false;
        state > 0 ? console.log('미루기') : console.log('완료');
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const scrollableListSize = useAnimatedStyle(() => {
    return {
      height: scaleX.value,
      marginBottom: marginXY.value,
    };
  });

  const fontFadeOut = useAnimatedStyle(() => {
    return {
      opacity: backFontOpacity.value,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              flex: 1,
              position: 'relative',
              zIndex: 2,
            },
            scrollableListSize,
            animatedStyle,
          ]}>
          <View style={[styles.layout, styles.todoContainer]}>
            <Text style={{ color: 'white' }}>{item.title}</Text>
          </View>
        </Animated.View>
        <View style={[{ flex: 1, position: 'absolute', zIndex: 1 }]}>
          <Animated.Text style={[fontFadeOut, { color: 'white' }]}>
            미루기
          </Animated.Text>
          <Animated.Text style={[fontFadeOut, { color: 'white' }]}>
            완료
          </Animated.Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  layout: {
    borderRadius: ms(3, 0.3),
  },
  todoContainer: {
    flex: 1,
    backgroundColor: '#282828',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TodoItem;
