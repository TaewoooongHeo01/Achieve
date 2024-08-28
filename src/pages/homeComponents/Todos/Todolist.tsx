import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDateContext } from '../../../context/DateContext';
import { makeDateFormatKey } from '../../../utils/makeDateFormatKey';
import { useObject, useQuery, useRealm } from '@realm/react';
import { FullyDate, Todo } from '../../../../realm/models';
import TodoItem from './TodoItem';
import { FlatList } from 'react-native-gesture-handler';
import { Realm } from '@realm/react';
import CustomisableAlert, { showAlert } from 'react-native-customisable-alert';
import CheckFullnessAlert from '../../Alert/CheckFullnessAlert';
import { ColorSet } from '../../../assets/style/ThemeColor';

const MemorizedItem = memo(TodoItem);

const Todolist = ({ theme }: { theme: ColorSet }) => {
  const realm = useRealm();
  const { taskDate, today } = useDateContext();
  const [checkedValue, setCheckedValue] = useState<number>(0.6);
  const [dateFormatKey, setDateFormatKey] = useState<string>('');
  useEffect(() => {
    setDateFormatKey(
      makeDateFormatKey(taskDate.year, taskDate.month, taskDate.date),
    );
  }, [taskDate]);

  const fullyDate = useObject(FullyDate, dateFormatKey);
  // const todos = fullyDate?.todos.sorted('isComplete', false);

  const todos = useQuery(Todo)
    .filtered('date == $0', dateFormatKey)
    .sorted('isComplete', false);

  //현재 date 와 today 가 같고, 현재 todos 들이 모두 완료된 상태라면 모달 띄우기
  //하지만 처음부터 완료된 상태면 모달 x.

  //completeTodo 나 delayTodo 같이 특정 기능이 실행되면 트리거 -> changed state

  const [changed, setChanged] = useState(false);

  const taskDateFormat = Number(
    makeDateFormatKey(taskDate.year, taskDate.month, taskDate.date),
  );
  const todayFormat = Number(
    makeDateFormatKey(today.year, today.month, today.date),
  );

  useEffect(() => {
    if (taskDateFormat === todayFormat) {
      let fullnessCheck = false;
      for (let i = 0; i < todos.length; i++) {
        if (!todos[i].isComplete) {
          break;
        }
        fullnessCheck = true;
      }
      if (fullnessCheck) {
        setCheckedValue(checkedValue);
        showAlert({
          alertType: 'custom',
          customAlert: (
            <CheckFullnessAlert
              theme={theme}
              checkedValue={checkedValue}
              setCheckedValue={setCheckedValue}
            />
          ),
        });
      }
      if (fullyDate) {
        realm.write(() => {
          fullyDate.fullness = checkedValue;
        });
      }
    }
  }, [checkedValue, taskDate, changed]);

  const delayTodo = (itemId: string) => {
    setChanged(changed => !changed);
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
    setChanged(changed => !changed);
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomisableAlert />
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <MemorizedItem
              item={item}
              dateFormatKey={dateFormatKey}
              delayTodo={delayTodo}
              completeTodo={completeTodo}
              setChanged={setChanged}
              taskDateFormat={taskDateFormat}
              todayFormat={todayFormat}
            />
          );
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Todolist;
