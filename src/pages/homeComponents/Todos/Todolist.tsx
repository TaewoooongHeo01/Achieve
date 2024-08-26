import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDateContext } from '../../../context/DateContext';
import { makeDateFormatKey } from '../../../utils/makeDateFormatKey';
import { useQuery, useRealm } from '@realm/react';
import { FullyDate, Todo } from '../../../../realm/models';
import TodoItem from './TodoItem';
import { FlatList } from 'react-native-gesture-handler';
import { Realm } from '@realm/react';

const MemorizedItem = memo(TodoItem);

const Todolist = () => {
  const realm = useRealm();
  const { taskDate } = useDateContext();
  const [dateFormatKey, setDateFormatKey] = useState<string>('');
  useEffect(() => {
    setDateFormatKey(
      makeDateFormatKey(taskDate.year, taskDate.month, taskDate.date),
    );
  }, [taskDate]);

  // const fullyDate = useObject(FullyDate, dateFormatKey);
  // const todos = fullyDate?.todos.sorted('isComplete', false);
  const todos = useQuery(Todo)
    .filtered('date == $0', dateFormatKey)
    .sorted('isComplete', false);

  const delayTodo = (itemId: string) => {
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    const dateKey = makeDateFormatKey(
      taskDate.year,
      taskDate.month,
      taskDate.date + 1,
    );
    if (item != null) {
      realm.write(() => {
        const fullyDate = realm.objectForPrimaryKey(FullyDate, item.date);
        console.log(item.date);
        if (fullyDate) {
          const todoToRemove = fullyDate.todos.find(todo =>
            todo._id.equals(item._id),
          );
          if (todoToRemove) {
            for (let i = 0; i < fullyDate.todos.length; i++) {
              const todosItem = fullyDate.todos[i];
              if (todoToRemove._id.equals(todosItem._id)) {
                fullyDate.todos.splice(i, 1);
              }
            }
          } else {
            throw new Error("can't find todo to remove");
          }
        } else {
          throw new Error("can't find fully date");
        }

        const nextDate = realm.objectForPrimaryKey(FullyDate, dateKey);
        item.date = dateKey;
        if (nextDate) {
          nextDate.todos.push(item);
        } else {
          const newNextDate = realm.create<FullyDate>('FullyDate', {
            dateKey: dateKey,
            fullness: 0,
            todos: [],
          });
          newNextDate.todos.push(item);
        }
      });
    }
    console.log(item?.date);
  };

  const completeTodo = (itemId: string) => {
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    if (item) {
      realm.write(() => {
        item.isComplete = true;
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <MemorizedItem
              item={item}
              dateFormatKey={dateFormatKey}
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
