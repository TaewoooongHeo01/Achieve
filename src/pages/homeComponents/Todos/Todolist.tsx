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

  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false);
  let fullnessCheck = false;
  for (const todo of todos) {
    if (!todo.isComplete) {
      break;
    }
    fullnessCheck = true;
  }

  // console.log(todos.length);
  // for (let i = 0; i < todos.length; i++) {
  //   console.log('Ok: ' + todos[i].title);
  // }

  useEffect(() => {
    if (taskDate === today && fullnessCheck && isAlertOpened === false) {
      setIsAlertOpened(true);
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
      if (fullyDate) {
        realm.write(() => {
          fullyDate.fullness = checkedValue;
        });
      }
    }
    if (!isAlertOpened) {
      setIsAlertOpened(false);
    }
  }, [fullnessCheck, checkedValue]);

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

  const completeTodo = (itemId: string, isRemove: boolean) => {
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );
    console.log(item);
    if (item) {
      if (isRemove) {
        console.log('remove');
        realm.write(() => {
          realm.delete(item);
        });
        console.log('remove success');
      } else {
        console.log('isComplete -> true');
        realm.write(() => {
          item.isComplete = true;
        });
      }
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
            />
          );
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Todolist;
