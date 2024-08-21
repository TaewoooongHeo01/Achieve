import React, { useState } from 'react';
import { Goal, Todo } from '../../../../realm/models';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { shadow } from '../../../assets/style/shadow';

const TodoItemDetail = ({
  item,
  pageType,
}: {
  item: Todo;
  pageType: string;
}) => {
  const { theme, currentTheme } = useColors();
  const goal = item.linkingObjects<Goal>('Goal', 'todos')[0];
  const [iconContainerSize, seticonContainerSize] = useState<number>(0);
  const [iconSize, setIconSize] = useState<number>(0);
  return (
    <View
      style={[
        styles.todoContainer,
        {
          borderRadius: ms(6, 0.3),
          backgroundColor: theme.backgroundColor,
        },
        currentTheme === 'light' ? shadow.boxShadow : {},
      ]}
      onLayout={e => {
        seticonContainerSize(e.nativeEvent.layout.width);
      }}>
      <View
        style={[
          styles.iconContainer,
          { aspectRatio: 1, height: iconContainerSize },
        ]}>
        <View
          style={{
            flex: 1,
            margin: ms(13, 0.3),
          }}>
          <LinearGradient
            style={{ flex: 1, borderRadius: ms(10, 0.3) }}
            colors={theme.goalGradientColor[goal.color]}>
            <View
              style={{
                marginVertical: ms(10.3, 0.3),
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onLayout={e => {
                setIconSize(e.nativeEvent.layout.height);
              }}>
              <Icon
                name={goal.icon}
                style={{ textAlign: 'center' }}
                size={iconSize}></Icon>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={[styles.infoContainer]}>
        <View style={{ flex: 0.6 }}>
          <Text style={[{ color: theme.textColor }, fontStyle.itemTitle]}>
            {item.title}
          </Text>
        </View>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name='alarm-outline' color={theme.textColor} />
          <Text
            style={[
              { color: theme.textColor, flex: 1 },
              fontStyle.itemSubTitle,
            ]}>
            {item.weekCycle.length == 7 ? ' 매일 ' : ' 오늘 '}
            {item.alertTime}시
          </Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        {(() => {
          switch (pageType) {
            case 'HOME':
              return (
                <Text style={[{ color: theme.textColor }, fontStyle.d_dayFont]}>
                  D-{goal.d_day}
                </Text>
              );
            case 'DETAIL':
              return (
                <Text style={[{ color: theme.textColor }]}>{item.date}</Text>
              );
            default:
              return null;
          }
        })()}
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
    paddingRight: ms(13, 0.3),
  },
  iconContainer: {
    flex: 0.2,
  },
  infoContainer: {
    paddingVertical: ms(10, 0.3),
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
