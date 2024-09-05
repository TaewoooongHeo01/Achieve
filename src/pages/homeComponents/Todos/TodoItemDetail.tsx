import React, { useState } from 'react';
import { Goal, Todo } from '../../../../realm/models';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { shadow } from '../../../assets/style/shadow';
import { days } from '../../../context/DateContext';
import CalendarIcon from 'react-native-vector-icons/AntDesign';
import CheckIcon from 'react-native-vector-icons/AntDesign';
import Question from 'react-native-vector-icons/AntDesign';

const TodoItemDetail = ({
  item,
  goal,
  todoEditHandlePresentModal,
  achieved,
}: {
  item: Todo;
  goal?: Goal;
  todoEditHandlePresentModal?(): void;
  achieved?: boolean;
}) => {
  const { theme, currentTheme } = useColors();
  const [iconContainerSize, seticonContainerSize] = useState<number>(0);

  return (
    <View
      style={[
        styles.todoContainer,
        {
          borderRadius: ms(6, 0.3),
          backgroundColor: !achieved
            ? item.isComplete
              ? currentTheme === 'dark'
                ? '#222222'
                : '#F4F4F4'
              : theme.backgroundColor
            : theme.backgroundColor,
        },
        currentTheme === 'light' ? shadow.boxShadow : {},
      ]}
      onLayout={e => {
        seticonContainerSize(e.nativeEvent.layout.width);
      }}>
      <View
        style={[
          styles.iconContainer,
          {
            aspectRatio: 1,
            height: iconContainerSize,
          },
        ]}>
        <View
          style={{
            flex: 1,
            margin: ms(11, 0.3),
          }}>
          {goal !== undefined ? (
            <LinearGradient
              style={{
                flex: 1,
                borderRadius: ms(10, 0.3),
                opacity: !achieved ? (item.isComplete ? 0.5 : 1) : 1,
              }}
              colors={theme.gradientColor[goal != undefined ? goal.color : 1]}>
              <View
                style={{
                  marginVertical: ms(10.3, 0.3),
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                // onLayout={e => {
                //   setIconSize(e.nativeEvent.layout.height);
                // }}
              >
                <Icon
                  name={goal.icon}
                  style={{
                    textAlign: 'center',
                  }}
                  size={ms(20, 0.3)}></Icon>
              </View>
            </LinearGradient>
          ) : (
            <View
              style={{
                flex: 1,
                borderRadius: ms(10, 0.3),
                backgroundColor: theme.textColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Question
                name='question'
                style={{
                  textAlign: 'center',
                }}
                size={ms(20, 0.3)}
              />
            </View>
          )}
        </View>
      </View>
      <View style={[styles.infoContainer]}>
        <View
          style={{
            flex: ms(0.4, 0.3),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                color: theme.textColor,
                opacity: !achieved ? (item.isComplete ? 0.4 : 1) : 1,
              },
              fontStyle.itemTitle,
            ]}>
            {item.title}
          </Text>
          <CalendarIcon
            name='exclamationcircle'
            color={
              item.priority === 2
                ? 'orange'
                : item.priority === 1
                  ? 'green'
                  : 'red'
            }
            size={ms(10, 0.3)}
            style={{
              marginLeft: ms(5, 0.3),
            }}
          />
        </View>
        <View
          style={{
            flex: ms(0.4, 0.3),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name='calendar-outline' color={theme.textColor} />
          {goal !== undefined ? (
            <Text
              style={[
                {
                  color: theme.textColor,
                  flex: 1,
                },
                fontStyle.itemSubTitle,
              ]}>
              {item.weekCycle
                ? item.weekCycle.length == 7
                  ? ' 매일 '
                  : item.weekCycle.length != 0
                    ? item.weekCycle.map(value => {
                        return ' ' + days[value];
                      })
                    : ' 오늘 '
                : ''}
            </Text>
          ) : (
            <Text
              style={[
                fontStyle.itemSubTitle,
                { color: theme.textColor, marginLeft: ms(5, 0.3) },
              ]}>
              ?
            </Text>
          )}
        </View>
      </View>
      <View style={styles.dateContainer}>
        {todoEditHandlePresentModal ? (
          <TouchableOpacity
            style={{
              paddingLeft: ms(15, 0.3),
              paddingBottom: ms(15, 0.3),
              paddingTop: ms(15, 0.3),
            }}
            onPress={() => {
              todoEditHandlePresentModal();
            }}>
            <Icon name='pencil' size={ms(20, 0.3)} color={theme.textColor} />
          </TouchableOpacity>
        ) : achieved ? (
          item.isComplete ? (
            <CheckIcon
              name='check'
              color='green'
              size={ms(20, 0.3)}
              style={{
                marginLeft: ms(5, 0.3),
              }}
            />
          ) : null
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: ms(10, 0.3),
  },
  iconContainer: {
    flex: 0.2,
  },
  infoContainer: {
    marginVertical: ms(9, 0),
    flex: 0.6,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  dateContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
});

const fontStyle = StyleSheet.create({
  itemTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: ms(16, 0.3),
    // paddingBottom: ms(3, 0.3),
  },
  itemSubTitle: {
    opacity: 0.7,
    fontFamily: 'Pretendard-M',
    // fontSize: -ms(5, 0.3),
  },
  d_dayFont: {
    fontSize: ms(15, 0.3),
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default TodoItemDetail;
