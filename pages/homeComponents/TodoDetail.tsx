import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskDate, useDateContext } from '../context/DateContext';
import { FlatList } from 'react-native-gesture-handler';

type Todo = {
  todoId?: number;
  goalId?: number;
  title: string;
  weekCycle: number[];
  alertOn: boolean;
  alertTime: number;
  date: TaskDate;
};

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const day = now.getDay();
const today: TaskDate = {
  year: year,
  month: month,
  date: date,
  day: day,
};

const tempDate: Todo[] = [
  {
    title: '등 운동하기',
    weekCycle: [0, 2, 4, 6],
    alertOn: true,
    alertTime: 13,
    date: today,
  },
  {
    title: '가슴 운동하기',
    weekCycle: [1, 3, 5],
    alertOn: true,
    alertTime: 13,
    date: today,
  },
  {
    title: '독서 30 분',
    weekCycle: [0, 1, 2, 3, 4, 5, 6],
    alertOn: true,
    alertTime: 23,
    date: today,
  },
  {
    title: '레포트 작성하기',
    weekCycle: [0],
    alertOn: true,
    alertTime: 20,
    date: today,
  },
];

const TodoDetail = (): React.ReactElement => {
  const selectedDate: TaskDate = useDateContext().taskDate;
  //date 바뀔 때마다 재랜더링

  //현재 날짜에 맞는 투두를 가져오기 위해 DB 를 모두 순회하면 절대 안됨.
  //TodoId 로 가져오도록 설계해야 됨. 그러기 위해선 Todo 를 저장할 때 해당 날짜를 키로 해서 TodoId 들을 저장해야 됨.
  //추후 구현. 일단은 UI 부터 빠르게 완성하기

  const renderItem = ({ item }: { item: Todo }) => {
    return <View style={styles.todoLayout}></View>;
  };

  return (
    <View style={styles.layout}>
      <FlatList data={tempDate} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: 'white',
    flex: 1,
  },
  todoLayout: {
    backgroundColor: 'white',
  },
});

export default TodoDetail;
