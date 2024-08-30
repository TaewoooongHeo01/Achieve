import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'realm';
import { Goal, Todo } from '../../../realm/models';

const AcheiveTodos = ({ todos }: { todos?: List<Todo> }) => {
  return (
    <View>
      {todos?.map(value => {
        const goal = value.linkingObjects<Goal>('Goal', 'todos')[0];
        return (
          <View key={value._id.toString()}>
            <Text>
              {goal.title} - {value.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default AcheiveTodos;
