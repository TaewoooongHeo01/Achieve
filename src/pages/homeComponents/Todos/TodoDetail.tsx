import React, { memo, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListRenderItemInfo,
  Dimensions,
  Animated,
} from 'react-native';
import { TaskDate, useDateContext } from '../../../context/DateContext';
import { makeDateFormat } from '../../../utils/makeDateFormat';
import { useObject, useQuery, useRealm } from '@realm/react';
import { Todo } from '../../../../realm/models';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ms } from 'react-native-size-matters';

const TodoDetail = (): React.ReactElement => {
  const date: TaskDate = useDateContext().taskDate;
  const realm = useRealm();
  const [dateFormat, setDateFormat] = useState<string>('');
  const width = Dimensions.get('window').width;

  useEffect(() => {
    setDateFormat(makeDateFormat(date.year, date.month, date.date));
  }, [date]);
  const todos = useQuery(Todo).filtered('date == $0', dateFormat);

  const list: Todo[] = []; //애니메이션을 위한 배열
  const isAnimationRunning = useRef<boolean>(false);
  const rowTranslateAnimatedValues: { [key: string]: Animated.Value } = {};
  todos.map(value => {
    list.push(value);
    rowTranslateAnimatedValues[value._id.toString()] = new Animated.Value(
      ms(20, 0.3),
    );
  });

  const onSwipeValueChange = (key: string, status: boolean) => {
    //status == true -> left
    //status == false -> right
    let selectedItem: Todo;
    todos.forEach(item => {
      if (item._id.toString() == key) {
        selectedItem = item;
      }
    });

    if (!status) {
      if (!isAnimationRunning.current) {
        isAnimationRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          completeTodo(selectedItem);
          isAnimationRunning.current = false;
        });
      }
    } else {
      if (!isAnimationRunning.current) {
        isAnimationRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          delayTodo(selectedItem);
          isAnimationRunning.current = false;
        });
      }
    }
  };

  const completeTodo = (item: Todo) => {
    realm.write(() => {
      realm.delete(item);
    });
  };

  const delayTodo = (item: Todo) => {
    const curDate = item.date;
    const nextDate = new Date(
      Number(curDate.substring(0, 4)),
      Number(curDate.substring(4, 6)) - 1,
      Number(curDate.substring(6, 8)) + 1,
    ).toLocaleDateString();
    const dateKey =
      nextDate.substring(5, 9) +
      nextDate.substring(0, 1).padStart(2, '0') +
      nextDate.substring(2, 4).padStart(2, '0');
    realm.write(() => {
      item.date = dateKey;
    });
  };

  const renderItem = (rowData: ListRenderItemInfo<Todo>) => {
    return (
      <Animated.View
        style={[
          styles.layout,
          styles.todoContainer,
          {
            padding: rowTranslateAnimatedValues[rowData.item._id.toString()],
          },
        ]}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>{rowData.item.title}</Text>
        </View>
      </Animated.View>
    );
  };

  const renderHiddenItem = (rowData: ListRenderItemInfo<Todo>) => {
    return (
      <View style={[{ flex: 1 }, styles.layout, styles.hiddenContainer]}>
        <Text style={{ color: 'white' }}>미루기</Text>
        <Text style={{ color: 'white' }}>완료</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        onSwipeValueChange={swipeData => {
          const { key, value } = swipeData;
          if (value >= width / 3) {
            onSwipeValueChange(key, true);
          } else if (value <= -width / 3) {
            onSwipeValueChange(key, false);
          }
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginBottom: ms(10, 0.3),
    borderRadius: ms(3, 0.3),
  },
  todoContainer: {
    flex: 1,
    backgroundColor: '#282828',
  },
  hiddenContainer: {
    flex: 1,
    paddingHorizontal: ms(15, 0.3),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TodoDetail;
