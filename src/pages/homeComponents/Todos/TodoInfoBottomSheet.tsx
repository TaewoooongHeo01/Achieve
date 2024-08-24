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
import {
  makeWeekCalendar,
  selectedCheck,
} from '../../../utils/makeWeekCalendar';
import { days, TaskDate, useDateContext } from '../../../context/DateContext';
import {
  BottomSheetScrollView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

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
}: {
  item: Todo;
  theme: ColorSet;
  goal: Goal;
}) => {
  const week = makeWeekCalendar();
  const weekCycle = item.weekCycle;
  const { today } = useDateContext();
  const { dismiss } = useBottomSheetModal();

  const [weekCycleUI, setWeekCycleUI] = useState<dateUI[]>([]);
  const weekUI: dateUI[] = [];
  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      const taskDate = week[i];
      let contain = false;
      let leftOn = false;
      let rightOn = false;
      if (i == 0) {
        rightOn = weekCycle.includes(i + 1);
      } else if (i == 6) {
        leftOn = weekCycle.includes(i - 1);
      } else {
        rightOn = weekCycle.includes(i + 1);
        leftOn = weekCycle.includes(i - 1);
      }
      if (taskDate != undefined) {
        if (selectedCheck(taskDate, today) || weekCycle.includes(i)) {
          contain = true;
        }
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
                    fontSize: ms(25, 0.3),
                    color: theme.textColor,
                    fontFamily: 'Pretendard-SemiBold',
                    paddingBottom: ms(1, 0.3),
                  },
                ]}>
                {item.title}
              </Text>
              <SemiBoldTextMemoization
                style={[{ marginLeft: ms(1, 0.3), color: theme.textColor }]}>
                {item.date.substring(0, 4)}.{item.date.substring(4, 6)}.
                {item.date.substring(6, 8)}
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
            marginTop: ms(14, 0.3),
            backgroundColor: theme.appBackgroundColor,
            borderRadius: ms(10, 0.3),
            justifyContent: 'center',
          }}>
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
        <View style={{ flex: 0.3 }}>
          {!item.isComplete ? (
            <TouchableOpacity
              onPress={() => {
                dismiss;
              }}
              style={{
                marginTop: ms(14, 0.3),
                backgroundColor: 'green',
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
                backgroundColor: '#121212',
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
    padding: ms(5, 0.3),
  },
  days: {
    fontFamily: 'Pretendard-Regular',
  },
});

export default TodoInfo;
