import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import { Goal, Todo } from '../../../../realm/models';
import { ms } from 'react-native-size-matters';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TodoItemDetail from './TodoItemDetail';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import TodoInfo from './TodoInfoBottomSheet';
import { ColorSet } from '../../../assets/style/ThemeColor';
import TodoEditBottomSheet from './TodoEditBottomSheet';

export const MemorizedItemDetail = memo(TodoItemDetail);
const MemorizedTodoInfoBottomSheet = memo(TodoInfo);

const TodoItem = ({
  item,
  dateFormatKey,
  delayTodo,
  completeTodo,
  setChanged,
  taskDateFormat,
  todayFormat,
  theme,
  screenWidth,
}: {
  item: Todo;
  dateFormatKey: string;
  delayTodo(itemId: string): void;
  completeTodo(itemId: string, isRemove: boolean): void;
  setChanged(changed: boolean): void;
  taskDateFormat: number;
  todayFormat: number;
  theme: ColorSet;
  screenWidth: number;
}) => {
  const goal = item.linkingObjects<Goal>('Goal', 'todos')[0];

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const scaleX = useSharedValue(ms(60, 0.3));
  const marginXY = useSharedValue(ms(10, 0.3));

  const backFontOpacityLeft = useSharedValue(0);
  const backFontOpacityRight = useSharedValue(0);

  const iconBackgroundColor = useSharedValue('transparent');

  const threshold = screenWidth / 4;
  const animatiomIsRunning = useRef<boolean>(false);

  const itemId = item._id.toString();

  const todoItemOpacity = useSharedValue(1);

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

  const [todoBottomSheetSnapPoint, setTodoBottomSheetSnapPoint] =
    useState<string>('55%');
  const todoEditBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todoEditSnapPoints = useMemo(
    () => [todoBottomSheetSnapPoint],
    [todoBottomSheetSnapPoint],
  );
  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setTodoBottomSheetSnapPoint('90%');
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setTodoBottomSheetSnapPoint('60%');
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);
  const todoEditHandlePresentModal = useCallback(() => {
    todoEditBottomSheetModalRef.current?.present();
  }, []);
  const todoEditRenderBackdrop = useCallback(
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

  const completeTodoAnimation = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: todoItemOpacity.value,
    };
  });

  const todoCompleteAnimation = (isRemove: boolean) => {
    'worklet';
    iconBackgroundColor.value = withTiming('transparent');
    backFontOpacityRight.value = withTiming(0, {}, () => {
      translateX.value = withTiming(-screenWidth, {}, () => {
        marginXY.value = withTiming(0);
        scaleX.value = withTiming(0, {}, () => {
          if (!isRemove) {
            runOnJS(completeTodo)(itemId, false);
          }
          todoItemOpacity.value = 0;
          todoItemOpacity.value = withTiming(1, {
            duration: 500,
          });
        });
      });
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
        (iconBackgroundColor.value = '#FB8159'),
          (backFontOpacityLeft.value = withTiming(1));
      } else if (translateX.value < 0) {
        (iconBackgroundColor.value = '#D2E168'),
          (backFontOpacityRight.value = withTiming(1));
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
        if (state > 0) {
          iconBackgroundColor.value = withTiming('transparent');
          backFontOpacityLeft.value = withTiming(0, {}, () => {
            translateX.value = withTiming(screenWidth, {}, () => {
              marginXY.value = withTiming(0);
              scaleX.value = withTiming(0, {}, () => {
                runOnJS(delayTodo)(itemId);
              });
            });
          });
        } else {
          todoCompleteAnimation(false);
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

  const fontFadeOutLeft = useAnimatedStyle(() => ({
    opacity: backFontOpacityLeft.value,
  }));

  const fontFadeOutRight = useAnimatedStyle(() => ({
    opacity: backFontOpacityRight.value,
  }));

  const iconBackgroundColorAnime = useAnimatedStyle(() => ({
    backgroundColor: withTiming(iconBackgroundColor.value, {
      duration: 100,
    }),
  }));

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={Platform.OS === 'ios' ? 0.8 : 1}
        onPress={todoHandlePresentModal}>
        {taskDateFormat === todayFormat ? (
          !item.isComplete ? (
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
                  <MemorizedItemDetail
                    item={item}
                    goal={goal}
                    todoEditHandlePresentModal={todoEditHandlePresentModal}
                  />
                </Animated.View>
                <Animated.View
                  style={[
                    styles.hiddenContainer,
                    scrollableListSize,
                    iconBackgroundColorAnime,
                    { borderRadius: ms(6, 0.3) },
                  ]}>
                  <Animated.View style={[fontFadeOutLeft]}>
                    <Icon
                      name='doubleright'
                      color={theme.textColor}
                      size={20}
                    />
                  </Animated.View>
                  <Animated.View style={[fontFadeOutRight]}>
                    <Icon name='check' color={theme.textColor} size={20} />
                  </Animated.View>
                </Animated.View>
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
              <MemorizedItemDetail
                item={item}
                goal={goal}
                todoEditHandlePresentModal={todoEditHandlePresentModal}
              />
            </Animated.View>
          )
        ) : (
          <View
            style={[
              {
                flex: 1,
                position: 'relative',
                zIndex: 2,
                marginBottom: ms(10, 0.3),
                height: ms(60, 0.3),
              },
            ]}>
            <MemorizedItemDetail
              item={item}
              goal={goal}
              todoEditHandlePresentModal={todoEditHandlePresentModal}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* edit bottom sheet */}
      <BottomSheetModal
        ref={todoEditBottomSheetModalRef}
        index={0}
        snapPoints={todoEditSnapPoints}
        backdropComponent={todoEditRenderBackdrop}
        keyboardBehavior='interactive'
        keyboardBlurBehavior='restore'
        android_keyboardInputMode='adjustResize'
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
          <TodoEditBottomSheet
            todo={item}
            setChanged={setChanged}
            dateFormatKey={dateFormatKey}
            todayFormat={todayFormat}
          />
        </BottomSheetView>
      </BottomSheetModal>

      {/* todo info bottom sheet */}
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
            taskDateFormat={taskDateFormat}
            todayFormat={todayFormat}
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
    borderBottomRightRadius: ms(15, 0.3),
    borderBottomLeftRadius: ms(15, 0.3),
  },
});

export default TodoItem;
