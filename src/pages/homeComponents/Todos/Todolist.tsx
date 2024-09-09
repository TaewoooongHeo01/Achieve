import React, { memo, useCallback, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDateContext } from '../../../context/DateContext';
import { makeDateFormatKey } from '../../../utils/makeDateFormatKey';
import { useObject, useRealm } from '@realm/react';
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
  const [todos, setTodos] = useState<
    Realm.Results<Todo & Realm.Object> | Todo[]
  >([]);

  const fetchTodos = useCallback(async () => {
    try {
      if (fullyDate) {
        setTodos(fullyDate.todos);
      } else {
        // console.log('date 없음. 생성필요. cycleTodos: ');
        const cycleTodos = realm
          .objects<Todo>('Todo')
          .filtered('ANY weekCycle == $0 AND isClone == false', taskDate.day);
        console.log(cycleTodos);

        if (cycleTodos.length === 0 || dateFormatKey === '') {
          setTodos([]);
          // console.log('사이클이 없으면 생성하지 않음');
          return;
        }

        realm.write(() => {
          const date = realm.create('FullyDate', {
            dateKey: dateFormatKey,
            fullness: 0.2,
            dayIdx: taskDate.day,
            todos: [],
          });
          let notAdded = true;
          cycleTodos.forEach(td => {
            if (taskDateFormat > Number(td.originDate)) {
              // console.log('새로 생성중...');
              const Goal = td.linkingObjects<Goal>('Goal', 'todos')[0];
              const todo = realm.create('Todo', {
                title: td.title,
                date: dateFormatKey,
                goal: Goal,
                weekCycle: td.weekCycle,
                priority: td.priority,
                isComplete: false,
                originDate: td.originDate,
                isClone: true,
              });

              date.todos.push(todo);
              Goal.todos.push(todo);
              notAdded = false;
            }
          });
          if (notAdded) {
            // console.log('추가되지 않음. date 다시 삭제');
            setTodos([]);
            realm.delete(date);
          } else {
            // console.log('todos 업데이트');
            console.log(date.todos);
            setTodos(date.todos);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      //에러 알림?
      setTodos([]);
    }
  }, [dateFormatKey, fullyDate, realm, taskDate.day]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
