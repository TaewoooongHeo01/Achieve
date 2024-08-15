import React, { useEffect, useState } from 'react';
import { Goal, Todo } from '../../../../realm/models';
import { PAGE_TYPE } from '../../../utils/pageType';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';

const TodoItemDetail = ({
  item,
  pageType,
}: {
  item: Todo;
  pageType: string;
}) => {
  const goal = item.linkingObjects<Goal>('Goal', 'todos')[0];

  return (
    <View style={styles.todoContainer}>
      <View style={[styles.iconContainer]}>
        <Text style={fontStyle.font}>{goal.icon}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[fontStyle.font, fontStyle.itemTitle]}>{item.title}</Text>
        <Text style={[fontStyle.font, fontStyle.itemSubTitle]}>
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
                <Text style={[fontStyle.font, fontStyle.d_dayFont]}>
                  D-{goal.d_day}
                </Text>
              );
            case 'DETAIL':
              return <Text style={[fontStyle.font]}>{item.date}</Text>;
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
    backgroundColor: '#282828',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(13, 0.3),
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
  font: {
    color: 'white',
  },
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
