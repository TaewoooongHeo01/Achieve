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
import { List } from 'realm';

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
    Realm.Results<Todo & Realm.Object> | Todo[] | List<Todo>
  >([]);

  const fetchTodos = useCallback(async () => {
    try {
      if (fullyDate) {
        setTodos(fullyDate.todos.sorted('isComplete', false));
      } else {
        // console.log('date 없음. 생성필요. cycleTodos: ');
        const cycleTodos = realm
          .objects<Todo>('Todo')
          .filtered('ANY weekCycle == $0 AND isClone == false', taskDate.day);

        if (cycleTodos.length === 0 || dateFormatKey === '') {
          setTodos([]);
          // console.log('사이클이 없으면 생성하지 않음');
          return;
        }

        realm.write(() => {
          const date = realm.create<FullyDate>('FullyDate', {
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
              const todo = realm.create<Todo>('Todo', {
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
          console.log(date);
          if (notAdded) {
            // console.log('추가되지 않음. date 다시 삭제');
            setTodos([]);
            realm.delete(date);
          } else {
            // console.log('todos 업데이트');
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
          dismissable: false,
          customAlert: (
            <CheckFullnessAlert
              dateFormatKey={dateFormatKey}
              theme={theme}
              checkedValue={checkedValue}
              setCheckedValue={setCheckedValue}
            />
          ),
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
    let addNextday = true;
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
          const day = fullyDate.dayIdx;
          if (todoToRemove?.weekCycle.includes(day + 1)) {
            addNextday = false;
          }
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

        if (addNextday) {
          const nextDate = realm.objectForPrimaryKey(FullyDate, nextDateKey);
          item.date = nextDateKey;
          if (nextDate) {
            nextDate.todos.push(item);
          } else {
            const day = new Date(
              taskDate.year,
              taskDate.month - 1,
              taskDate.date,
            ).getDay();
            const newNextDate = realm.create<FullyDate>('FullyDate', {
              dateKey: nextDateKey,
              fullness: 0.2,
              dayIdx: day,
              todos: [],
            });
            newNextDate.todos.push(item);
          }
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

  const deleteTodo = (itemId: string) => {
    setChanged(changed => !changed);
    const item = realm.objectForPrimaryKey<Todo>(
      'Todo',
      new Realm.BSON.ObjectId(itemId),
    );

    if (item) {
      realm.write(() => {
        try {
          const itemGoal = item.linkingObjects<Goal>('Goal', 'todos')[0];
          const goalId = itemGoal._id;
          const title = item.title;
          const priority = item.priority;
          const itemDate = item.date;

          // 삭제할 모든 Todo를 한 번에 쿼리
          const deleteTodos = realm
            .objects<Todo>('Todo')
            .filtered(
              'title == $0 AND priority == $1 AND date >= $2',
              title,
              priority,
              itemDate,
            );
          const originTodos = realm
            .objects<Todo>('Todo')
            .filtered(
              'title == $0 AND priority == $1 AND isClone == false',
              title,
              priority,
            );
          for (let i = 0; i < originTodos.length; i++) {
            originTodos[i].isClone = true;
          }

          // FullyDate 객체들을 추적
          const affectedFullyDates = new Set<FullyDate>();

          deleteTodos.forEach(todo => {
            const dateKey = todo.date;
            const goal = todo.linkingObjects<Goal>('Goal', 'todos')[0];
            if (goalId?.equals(goal._id)) {
              if (dateKey) {
                const fullyDate = realm.objectForPrimaryKey<FullyDate>(
                  'FullyDate',
                  dateKey,
                );
                if (fullyDate) {
                  affectedFullyDates.add(fullyDate);
                }
              }
              console.log('삭제: ' + todo.date);
              realm.delete(todo);
            }
          });

          affectedFullyDates.forEach(fullyDate => {
            if (
              fullyDate.todos.length === 0 &&
              Number(fullyDate.dateKey) !== taskDateFormat
            ) {
              realm.delete(fullyDate);
            }
          });
        } catch (error) {
          console.error('Error deleting todos:', error);
          // 여기에 사용자에게 오류를 알리는 로직 추가
        }
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
              taskDateFormat={taskDateFormat}
              todayFormat={todayFormat}
              theme={theme}
              screenWidth={screenWidth}
              deleteTodo={deleteTodo}
            />
          );
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Todolist;
