import React from 'react';
import { Todo } from '../../../../realm/models';
import { PAGE_TYPE } from '../../../utils/pageType';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';

const TodoItemDetail = ({
  item,
  pageType,
}: {
  item: Todo;
  pageType: string;
}) => {
  return (
    <View style={styles.todoContainer}>
      <Text style={{ color: 'white' }}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    borderRadius: ms(3, 0.3),
  },
  todoContainer: {
    flex: 1,
    backgroundColor: '#282828',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(20, 0.3),
  },
});

export default TodoItemDetail;
