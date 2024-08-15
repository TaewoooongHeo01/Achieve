import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TaskDate, useDateContext } from '../../../context/DateContext';
import { makeDateFormat } from '../../../utils/makeDateFormat';
import { useQuery, useRealm } from '@realm/react';
import { Todo } from '../../../../realm/models';
import TodoItem from './TodoItem';
import { FlatList } from 'react-native-gesture-handler';
import { Realm } from '@realm/react';

const MemorizedItem = memo(TodoItem);

const Todolist = (): React.ReactElement => {
  const realm = useRealm();
  const date: TaskDate = useDateContext().taskDate;
  const [dateFormat, setDateFormat] = useState<string>('');

  useEffect(() => {
    setDateFormat(makeDateFormat(date.year, date.month, date.date));
  }, [date]);

  const todos = useQuery(Todo).filtered('date == $0', dateFormat);

  const delayTodo = (itemId: string) => {
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    const year = Number(item?.date.substring(0, 4));
    const month = Number(item?.date.substring(4, 6));
    const date = Number(item?.date.substring(6, 8));
    const nextDate = new Date(year, month - 1, date + 1);
    const nextYear = String(nextDate.getFullYear());
    const nextMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
    const nextDay = String(nextDate.getDate()).padStart(2, '0');
    if (item != null) {
      realm.write(() => {
        item.date = nextYear + nextMonth + nextDay;
      });
    }
  };

  const completeTodo = (itemId: string) => {
    const item = realm.objectForPrimaryKey(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    realm.write(() => {
      realm.delete(item);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <MemorizedItem
              item={item}
              delayTodo={delayTodo}
              completeTodo={completeTodo}
            />
          );
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Todolist;
