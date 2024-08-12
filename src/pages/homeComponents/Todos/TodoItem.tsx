import React from 'react';
import { Text, View } from 'react-native';
import { Todo } from '../../../../realm/models';

const TodoItem = (item: Todo) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
};
