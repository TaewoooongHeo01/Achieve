import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import CheckIcon from 'react-native-vector-icons/Feather';
import { Todo } from '../../../realm/models';
import { ColorSet } from '../../assets/style/ThemeColor';

export type GoalDetailTodoType = {
  theme: ColorSet;
  todos: Todo[] | undefined;
  item: string;
};

const GoalDetailTodo = ({ theme, todos, item }: GoalDetailTodoType) => {
  const animatedOpacity = useSharedValue(0.6);
  const initialFontSize = ms(15, 0.3);
  const largerFontSize = ms(20, 0.3);
  const animatedFontSize = useSharedValue(initialFontSize);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  const animatedFontSizeStyle = useAnimatedStyle(() => {
    return {
      fontSize: animatedFontSize.value,
    };
  });

  const longPress = Gesture.LongPress()
    .minDuration(200)
    .onStart(() => {
      'worklet';
      animatedOpacity.value = withTiming(1);
      animatedFontSize.value = withTiming(largerFontSize);
    })
    .onFinalize(() => {
      'worklet';
      animatedOpacity.value = withTiming(0.6);
      animatedFontSize.value = withTiming(initialFontSize);
    });

  return (
    <GestureDetector gesture={longPress}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: 'rgba(245, 245, 245, 0.28)',
          alignItems: 'center',
          marginHorizontal: ms(25, 0.3),
          marginVertical: ms(3, 0.3),
        }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <Animated.Text
            style={[
              {
                fontFamily: 'Pretendard-Medium',
                color: theme.textColor,
                marginVertical: ms(10, 0.3),
              },
              animatedOpacityStyle,
            ]}>
            {item.substring(2, 4)}.{item.substring(4, 6)}.{item.substring(6, 8)}
          </Animated.Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.8,
          }}>
          {todos?.map(value => {
            return (
              <View
                key={value._id.toString()}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View
                  key={value._id.toString()}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: ms(2, 0.3),
                    flex: 0.8,
                  }}>
                  <Animated.Text
                    style={[
                      {
                        color: theme.textColor,
                        fontFamily: 'Pretendard-SemiBold',
                        marginRight: ms(5, 0.3),
                      },
                      animatedOpacityStyle,
                      animatedFontSizeStyle,
                    ]}>
                    {value.title}
                  </Animated.Text>
                </View>
                <Animated.View style={[animatedOpacityStyle, { flex: 0.2 }]}>
                  {value.isComplete ? (
                    <CheckIcon name='check' color={theme.textColor} />
                  ) : null}
                </Animated.View>
              </View>
            );
          })}
        </View>
      </View>
    </GestureDetector>
  );
};

export default GoalDetailTodo;
