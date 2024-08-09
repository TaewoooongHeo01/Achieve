import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TaskDate, useDateContext } from '../../context/DateContext';
import { FlatList } from 'react-native-gesture-handler';

const TodoDetail = (): React.ReactElement => {
  const selectedDate: TaskDate = useDateContext().taskDate;
  const [dateFormat, setDateFormat] = useState<string>('');

  const renderItem = ({ item }: { item: Todo }) => {
    return <View style={styles.todoLayout}></View>;
  };

  return <View style={styles.layout}></View>;
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: 'grey',
    flex: 1,
  },
  todoLayout: {
    backgroundColor: 'white',
  },
});

export default TodoDetail;
