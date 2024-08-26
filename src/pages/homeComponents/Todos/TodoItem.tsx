import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Easing, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Goal, Todo } from '../../../../realm/models';
import { ms } from 'react-native-size-matters';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  ReduceMotion,
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
import TodoInfo from './TodoInfoBottomSheet';

const MemorizedItemDetail = memo(TodoItemDetail);
const MemorizedTodoInfoBottomSheet = memo(TodoInfo);

const TodoItem = ({
  item,
  dateFormatKey,
  delayTodo,
  completeTodo,
}: {
  item: Todo;
  dateFormatKey: string;
  delayTodo(itemId: string): void;
  completeTodo(itemId: string): void;
}) => {
  const goal = item.linkingObjects<Goal>('Goal', 'todos')[0];
  const { theme } = useColors();
  const screenWidth = useWindowDimensions().width;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const scaleX = useSharedValue(ms(60, 0.3));
  const marginXY = useSharedValue(ms(10, 0.3));

  const backFontOpacityLeft = useSharedValue(0);
  const backFontOpacityRight = useSharedValue(0);

  const threshold = screenWidth / 4;
  const animatiomIsRunning = useRef<boolean>(false);

  const itemId = item._id.toString();

  const todoItemOpacity = useSharedValue(1);

  const completeTodoAnimation = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: todoItemOpacity.value,
    };
  });

  const todoCompleteAnimation = () => {
    'worklet';
    backFontOpacityRight.value = withTiming(0, {}, () => {
      translateX.value = withTiming(-screenWidth, {}, () => {
        marginXY.value = withTiming(0);
        scaleX.value = withTiming(0, {}, () => {
          runOnJS(completeTodo)(itemId);
        });
      });
    });
    todoItemOpacity.value = 0;
    todoItemOpacity.value = withTiming(1, {
      duration: 1800,
    });
  };

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
        const state = translateX.value;
        console.log(state);
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
          todoCompleteAnimation();
        }
        animatiomIsRunning.current = false;
      } else {
        translateX.value = withTiming(0, {
          duration: 200,
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
  const todoSnapPoints = useMemo(() => ['45%'], []);

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
        {!item.isComplete ? (
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
                <MemorizedItemDetail item={item} goal={goal} />
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
        ) : (
          <Animated.View
            style={[
              {
                flex: 1,
                position: 'relative',
                zIndex: 2,
                marginBottom: ms(10, 0.3),
                height: ms(60, 0.3),
              },
              completeTodoAnimation,
            ]}>
            <MemorizedItemDetail item={item} goal={goal} />
          </Animated.View>
        )}
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
          <MemorizedTodoInfoBottomSheet
            item={item}
            dateFormatKey={dateFormatKey}
            theme={theme}
            goal={goal}
            todoCompleteAnimation={todoCompleteAnimation}
          />
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
    paddingHorizontal: ms(30, 0.3),
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default TodoItem;
