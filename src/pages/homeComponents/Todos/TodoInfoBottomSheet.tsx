import React, { useEffect, useState } from 'react';
import { Goal, Todo } from '../../../../realm/models';
import { StyleSheet, Text, View } from 'react-native';
import { ColorSet } from '../../../assets/style/ThemeColor';
import { ms } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  MediumTextMemoization,
  SemiBoldTextMemoization,
} from '../../../utils/CustomText';
import { makeWeekCalendar } from '../../../utils/makeWeekCalendar';
import { days, TaskDate } from '../../../context/DateContext';
import {
  BottomSheetScrollView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { fontStyle } from '../../../assets/style/fontStyle';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColors } from '../../../context/ThemeContext';
import { shadow } from '../../../assets/style/shadow';

type dateUI = {
  taskDate: TaskDate;
  contain: boolean;
  leftOn: boolean;
  rightOn: boolean;
};

const TodoInfo = ({
  item,
  theme,
  goal,
  todoCompleteAnimation,
}: {
  item: Todo;
  theme: ColorSet;
  goal: Goal;
  todoCompleteAnimation(): void;
}) => {
  const { currentTheme } = useColors();
  const week = makeWeekCalendar();
  const weekCycle = item.weekCycle;
  const { dismiss } = useBottomSheetModal();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [weekCycleUI, setWeekCycleUI] = useState<dateUI[]>([]);
  const weekUI: dateUI[] = [];
  const date = item.date
    ? item.date.substring(0, 4) +
      '.' +
      item.date.substring(4, 6) +
      '.' +
      item.date.substring(6, 8)
    : '날짜없음';

  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      const taskDate = week[i];
      let contain = false;
      let leftOn = false;
      let rightOn = false;
      let result;
      if (i == 0) {
        result = weekCycle?.includes(i + 1);
        rightOn = result != undefined ? result : false;
      } else if (i == 6) {
        result = weekCycle?.includes(i - 1);
        leftOn = result != undefined ? result : false;
      } else {
        result = weekCycle?.includes(i + 1);
        rightOn = result != undefined ? result : false;
        result = weekCycle?.includes(i - 1);
        leftOn = result != undefined ? result : false;
      }
      if (weekCycle?.includes(i)) {
        contain = true;
      }
      const dateUI: dateUI = {
        taskDate: taskDate,
        contain: contain,
        leftOn: leftOn,
        rightOn: rightOn,
      };
      weekUI.push(dateUI);
      setWeekCycleUI(weekUI);
    }
  }, [week]);

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: ms(12, 0.3) }}>
      <View
        style={{
          flex: 1,
          marginVertical: ms(10, 0.3),
        }}>
        <View style={{ flex: ms(0.3, 0.3), flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Text
                style={[
                  {
                    fontSize: ms(21, 0.3),
                    color: theme.textColor,
                    fontFamily: 'Pretendard-SemiBold',
                    paddingBottom: ms(5, 0.3),
                  },
                ]}>
                {item.title}
              </Text>
              <SemiBoldTextMemoization
                style={[{ marginLeft: ms(1, 0.3), color: theme.textColor }]}>
                {date}
              </SemiBoldTextMemoization>
            </View>
            <TouchableOpacity
              style={{
                padding: ms(8, 0.3),
                backgroundColor: theme.textColor,
                borderRadius: ms(5, 0.3),
              }}
              onPress={() => {
                console.log('설정');
              }}>
              <MediumTextMemoization style={{ color: theme.backgroundColor }}>
                설정
              </MediumTextMemoization>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: ms(0.3, 0.3),
            marginTop: ms(10, 0.3),
            padding: ms(10, 0.3),
            flexDirection: 'row',
          }}>
          {weekCycleUI.map((value, index) => {
            return value.taskDate != undefined ? (
              <View
                key={index.toString()}
                style={[
                  styles.btn,
                  value.contain ? { backgroundColor: theme.textColor } : {},
                  value.leftOn
                    ? {}
                    : {
                        borderTopLeftRadius: ms(5, 0.3),
                        borderBottomLeftRadius: ms(5, 0.3),
                      },
                  value.rightOn
                    ? {}
                    : {
                        borderTopRightRadius: ms(5, 0.3),
                        borderBottomRightRadius: ms(5, 0.3),
                      },
                ]}>
                <MediumTextMemoization
                  style={[
                    styles.days,
                    { color: theme.textColor, fontWeight: 'bold' },
                    { marginBottom: ms(3, 0.3) },
                    value.contain ? { color: theme.backgroundColor } : {},
                  ]}>
                  {days[index]}
                </MediumTextMemoization>
                <Text
                  style={[
                    styles.days,
                    { color: theme.textColor },
                    value.contain ? { color: theme.backgroundColor } : {},
                  ]}>
                  {value.taskDate.date}
                </Text>
              </View>
            ) : (
              <></>
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('GoalDetail', { _id: item._id.toString() });
          }}
          style={[
            {
              marginTop: ms(14, 0.3),
              backgroundColor: theme.appBackgroundColor,
              borderRadius: ms(10, 0.3),
              justifyContent: 'center',
            },
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <Text
            style={[
              {
                color: theme.textColor,
                margin: ms(20, 0.3),
                fontSize: ms(16, 0.3),
                fontFamily: 'Pretendard-Medium',
                lineHeight: ms(23, 0.3),
              },
            ]}>
            {goal.description}
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 0.3 }}>
          {!item.isComplete ? (
            <TouchableOpacity
              onPress={() => {
                dismiss();
                todoCompleteAnimation();
              }}
              style={{
                marginTop: ms(14, 0.3),
                backgroundColor: 'rgba(0, 217, 0, 1)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ms(8, 0.3),
              }}>
              <MediumTextMemoization
                style={[
                  {
                    padding: ms(16, 0.3),
                    color: theme.textColor,
                  },
                  fontStyle.fontSizeSub,
                ]}>
                완료
              </MediumTextMemoization>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                marginTop: ms(14, 0.3),
                flex: 0.3,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ms(8, 0.3),
              }}>
              <MediumTextMemoization
                style={[
                  {
                    padding: ms(16, 0.3),
                    color: theme.textColor,
                    opacity: 0.3,
                  },
                  fontStyle.fontSizeSub,
                ]}>
                완료
              </MediumTextMemoization>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginVertical: ms(10, 0.3),
    marginHorizontal: ms(9, 0.3),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(8, 0.3),
  },
  days: {
    fontFamily: 'Pretendard-Regular',
  },
});

export default TodoInfo;
