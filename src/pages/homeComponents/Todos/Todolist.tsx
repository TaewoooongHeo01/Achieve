import React, { memo, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDateContext } from '../../../context/DateContext';
import { makeDateFormatKey } from '../../../utils/makeDateFormatKey';
import { useObject, useQuery, useRealm } from '@realm/react';
import { FullyDate, Goal, Todo } from '../../../../realm/models';
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
  const screenWidth = useWindowDimensions().width;
  useEffect(() => {
    setDateFormatKey(
      makeDateFormatKey(taskDate.year, taskDate.month, taskDate.date),
    );
  }, [taskDate]);

  const fullyDate = useObject(FullyDate, dateFormatKey);

  const todos = useQuery(Todo)
    .filtered('date == $0', dateFormatKey)
    .sorted([
      ['isComplete', false], // false: isComplete가 false인 항목이 위로 정렬됨
      ['priority', true], // true: priority가 높은 항목이 위로 정렬됨
    ]);

  //현재 date 와 today 가 같고, 현재 todos 들이 모두 완료된 상태라면 모달 띄우기
  //하지만 처음부터 완료된 상태면 모달 x.

  //completeTodo 나 delayTodo 같이 특정 기능이 실행되면 트리거 -> changed state

  // for (let i = 0; i < todos.length; i++) {
  //   console.log(todos[i].title);
  //   console.log(todos[i].linkingObjects<Goal>('Goal', 'todos')[0]);
  //   console.log('--------------------');
  // }

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
  }, [checkedValue, changed]);

  const delayTodo = (itemId: string) => {
    setChanged(changed => !changed);
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    const dateKey = makeDateFormatKey(
      taskDate.year,
      taskDate.month,
      taskDate.date,
    );
    const nextDateKey = makeDateFormatKey(
      taskDate.year,
      taskDate.month,
      taskDate.date + 1,
    );
    if (item) {
      realm.write(() => {
        const fullyDate = realm.objectForPrimaryKey<FullyDate>(
          'FullyDate',
          dateKey,
        );
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

        const nextDate = realm.objectForPrimaryKey(FullyDate, nextDateKey);
        item.date = nextDateKey;
        if (nextDate) {
          nextDate.todos.push(item);
        } else {
          const newNextDate = realm.create<FullyDate>('FullyDate', {
            dateKey: nextDateKey,
            fullness: 0.2,
            todos: [],
          });
          newNextDate.todos.push(item);
        }
      });
    }
  };

  const completeTodo = (itemId: string) => {
    setChanged(changed => !changed);
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    const goal = item?.linkingObjects<Goal>('Goal', 'todos')[0];
    if (item && goal) {
      realm.write(() => {
        goal.todoCnt += 1;
        item.isComplete = true;
      });
    }
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
              theme={theme}
              screenWidth={screenWidth}
            />
          );
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Todolist;
