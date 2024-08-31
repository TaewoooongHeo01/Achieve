import React from 'react';
import { View } from 'react-native';
import { Results } from 'realm';
import { Goal, Todo } from '../../../realm/models';
import { MemorizedItemDetail } from '../homeComponents/Todos/TodoItem';
import { ms } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';

const AcheiveTodos = ({ todos }: { todos?: Results<Todo> }) => {
  const renderItem = ({ item }: { item: Todo }) => {
    const goal = item.linkingObjects<Goal>('Goal', 'todos')[0];
    return (
      <View key={item._id.toString()}>
        <View
          style={[
            {
              marginBottom: ms(10, 0.3),
              height: ms(60, 0.3),
            },
          ]}>
          <MemorizedItemDetail item={item} goal={goal} achieved={true} />
        </View>
      </View>
    );
  };

  return <FlatList data={todos} renderItem={renderItem} />;
};

export default AcheiveTodos;
