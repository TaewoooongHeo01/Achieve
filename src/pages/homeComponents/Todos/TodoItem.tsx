import React, { memo, useRef } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Todo } from '../../../../realm/models';
import { ms } from 'react-native-size-matters';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TodoItemDetail from './TodoItemDetail';

const MemorizedItemDetail = memo(TodoItemDetail);

const TodoItem = ({
  item,
  delayTodo,
  completeTodo,
}: {
  item: Todo;
  delayTodo(itemId: string): void;
  completeTodo(itemId: string): void;
}) => {
  let screenWidth = useWindowDimensions().width;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const scaleX = useSharedValue(ms(60, 0.3));
  const marginXY = useSharedValue(ms(10, 0.3));

  const backFontOpacityLeft = useSharedValue(0);
  const backFontOpacityRight = useSharedValue(0);

  const threshold = screenWidth / 4;
  const animatiomIsRunning = useRef<boolean>(false);

  const itemId = item._id.toString();

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(e => {
      translateX.value = startX.value + e.translationX;
      if (translateX.value > 0) {
        backFontOpacityLeft.value = withTiming(1);
      } else {
        backFontOpacityRight.value = withTiming(1);
      }
    })
    .onEnd(() => {
      if (translateX.value > threshold) {
        animatiomIsRunning.current = true;
      } else if (translateX.value < -threshold) {
        animatiomIsRunning.current = true;
      }
      if (animatiomIsRunning.current) {
        screenWidth = translateX.value > 0 ? screenWidth : -screenWidth;
        const state = translateX.value;
        if (state > 0) {
          backFontOpacityLeft.value = withTiming(0);
          translateX.value = withTiming(screenWidth, {}, () => {
            marginXY.value = withTiming(0);
            scaleX.value = withTiming(0, {}, () => {
              runOnJS(delayTodo)(itemId);
            });
          });
        } else {
          backFontOpacityRight.value = withTiming(0);
          translateX.value = withTiming(screenWidth, {}, () => {
            marginXY.value = withTiming(0);
            scaleX.value = withTiming(0, {}, () => {
              runOnJS(completeTodo)(itemId);
            });
          });
        }
        animatiomIsRunning.current = false;
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const scrollableListSize = useAnimatedStyle(() => {
    'worklet';
    return {
      height: scaleX.value,
      marginBottom: marginXY.value,
    };
  });

  const fontFadeOutLeft = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: backFontOpacityLeft.value,
    };
  });

  const fontFadeOutRight = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: backFontOpacityRight.value,
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
          <View style={{ flex: 1 }}>
            <MemorizedItemDetail item={item} pageType={'HOME'} />
          </View>
        </Animated.View>
        <View style={styles.hiddenContainer}>
          <Animated.Text style={[fontFadeOutLeft, { color: 'white' }]}>
            미루기
          </Animated.Text>
          <Animated.Text style={[fontFadeOutRight, { color: 'white' }]}>
            완료
          </Animated.Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  hiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(20, 0.3),
  },
});

export default TodoItem;
