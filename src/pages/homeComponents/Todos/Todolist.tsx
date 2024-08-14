import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TaskDate, useDateContext } from '../../../context/DateContext';
import { makeDateFormat } from '../../../utils/makeDateFormat';
import { useQuery } from '@realm/react';
import { Todo } from '../../../../realm/models';
import TodoItem from './TodoItem';
import { FlatList } from 'react-native-gesture-handler';

const MemorizedItem = memo(TodoItem);

const Todolist = (): React.ReactElement => {
  const date: TaskDate = useDateContext().taskDate;
  const [dateFormat, setDateFormat] = useState<string>('');

  useEffect(() => {
    setDateFormat(makeDateFormat(date.year, date.month, date.date));
  }, [date]);

  const todos = useQuery(Todo).filtered('date == $0', dateFormat);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return <MemorizedItem item={item} />;
        }}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Todolist;
