import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export default function History() {
  const offsetX = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(1);
  const scale = useSharedValue<number>(1);
  const demensionWidth = useWindowDimensions().width;

  const pan = Gesture.Pan()
    .onChange(e => {
      const xCor = e.translationX;
      offsetX.value = xCor;
      if (Math.abs(xCor) > demensionWidth / 2) {
        // 항목 사라짐 애니메이션 시작
        offsetX.value = withTiming(demensionWidth * Math.sign(xCor), {
          duration: 300,
        });
        opacity.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(0, { duration: 300 });
      }
    })
    .onFinalize(() => {
      if (Math.abs(offsetX.value) < demensionWidth / 2) {
        // 원래 위치로 돌아가기
        offsetX.value = withSpring(0);
        opacity.value = withSpring(1);
        scale.value = withSpring(1);
      }
    });

  const listItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.box, listItemAnimatedStyle]}>
          <Text>Inout</Text>
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.box, listItemAnimatedStyle]}>
          <Text>Inout</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
