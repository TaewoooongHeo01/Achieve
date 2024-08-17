import React from 'react';
import { Goal, Todo } from '../../../../realm/models';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../../context/ThemeContext';

const TodoItemDetail = ({
  item,
  pageType,
}: {
  item: Todo;
  pageType: string;
}) => {
  const color = useColors();
  const goal = item.linkingObjects<Goal>('Goal', 'todos')[0];

  return (
    <View
      style={[
        styles.todoContainer,
        { backgroundColor: color.theme.backgroundColor },
      ]}>
      <View style={[styles.iconContainer]}>
        <Text style={{ color: color.theme.textColor }}>{goal.icon}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[{ color: color.theme.textColor }, fontStyle.itemTitle]}>
          {item.title}
        </Text>
        <Text
          style={[{ color: color.theme.textColor }, fontStyle.itemSubTitle]}>
          (시계)
          {item.weekCycle.length == 7 ? ' 매일 ' : ' 오늘 '}
          {item.alertTime}시
        </Text>
      </View>
      <View style={styles.dateContainer}>
        {(() => {
          switch (pageType) {
            case 'HOME':
              return (
                <Text
                  style={[
                    { color: color.theme.textColor },
                    fontStyle.d_dayFont,
                  ]}>
                  D-{goal.d_day}
                </Text>
              );
            case 'DETAIL':
              return (
                <Text style={[{ color: color.theme.textColor }]}>
                  {item.date}
                </Text>
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
    paddingHorizontal: ms(13, 0.3),
    // shadowColor: '#000', // 그림자 색상
    // shadowOffset: {
    //   width: 4, // 수평 오프셋 (CSS의 offset-x)
    //   height: 1, // 수직 오프셋 (CSS의 offset-y)
    // },
    // shadowOpacity: 0.1, // 그림자의 불투명도 (CSS의 rgba의 알파값)
    // shadowRadius: 2, // 그림자의 흐림 정도 (CSS의 blur-radius)
    // elevation: 4, // 안드로이드에서의 그림자 (높이 효과)
  },
  iconContainer: {
    flex: 0.2,
  },
  infoContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
  dateContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
});

const fontStyle = StyleSheet.create({
  itemTitle: {
    fontWeight: 'bold',
    fontSize: ms(15, 0.3),
    paddingBottom: ms(3, 0.3),
  },
  itemSubTitle: {
    opacity: 0.7,
    fontWeight: 'light',
    fontSize: -ms(5, 0.3),
  },
  d_dayFont: {
    fontSize: ms(15, 0.3),
    fontWeight: 'bold',
  },
});

export default TodoItemDetail;
