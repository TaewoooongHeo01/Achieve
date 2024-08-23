import React, { memo, useCallback, useMemo, useRef } from 'react';
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
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import TodoInfo from './TodoInfo';

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
  const { theme } = useColors();
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
      } else if (translateX.value < 0) {
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
          backFontOpacityLeft.value = withTiming(0, {}, () => {
            translateX.value = withTiming(screenWidth, {}, () => {
              marginXY.value = withTiming(0);
              scaleX.value = withTiming(0, {}, () => {
                runOnJS(delayTodo)(itemId);
              });
            });
          });
        } else {
          backFontOpacityRight.value = withTiming(0, {}, () => {
            translateX.value = withTiming(screenWidth, {}, () => {
              marginXY.value = withTiming(0);
              scaleX.value = withTiming(0, {}, () => {
                runOnJS(completeTodo)(itemId);
              });
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

  const todoBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todoSnapPoints = useMemo(() => ['30%'], []);

  const todoHandlePresentModal = useCallback(() => {
    todoBottomSheetModalRef.current?.present();
  }, []);

  const todoRenderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.8}
      />
    ),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity activeOpacity={0.8} onPress={todoHandlePresentModal}>
        <GestureDetector gesture={pan}>
          <Animated.View style={{ flex: 1 }}>
            <Animated.View
              style={[
                {
                  flex: 1,
                  position: 'relative',
                  zIndex: 2,
                },
                // colorTheme === 'light' ? shadow.boxShadow : {},
                scrollableListSize,
                animatedStyle,
              ]}>
              <MemorizedItemDetail item={item} />
            </Animated.View>
            <View style={styles.hiddenContainer}>
              <Animated.View style={[fontFadeOutLeft]}>
                <Icon name='doubleright' color={theme.textColor} size={20} />
              </Animated.View>
              <Animated.View style={[fontFadeOutRight]}>
                <Icon name='check' color={theme.textColor} size={20} />
              </Animated.View>
            </View>
          </Animated.View>
        </GestureDetector>
      </TouchableOpacity>
      <BottomSheetModal
        ref={todoBottomSheetModalRef}
        index={0}
        snapPoints={todoSnapPoints}
        backdropComponent={todoRenderBackdrop}
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: theme.backgroundColor,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginHorizontal: ms(10, 0.3),
          height: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.textColor }}
        backgroundStyle={{
          marginHorizontal: ms(10, 0.3),
          flex: 1,
        }}>
        <BottomSheetView
          style={[
            styles.bottomSheetContainer,
            { backgroundColor: theme.backgroundColor },
          ]}>
          <TodoInfo item={item} theme={theme} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
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
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: ms(20, 0.3),
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default TodoItem;
