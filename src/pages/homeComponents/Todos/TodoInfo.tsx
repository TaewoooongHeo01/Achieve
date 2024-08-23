import React from 'react';
import { Todo } from '../../../../realm/models';
import { Text, View } from 'react-native';
import { ColorSet } from '../../../assets/style/ThemeColor';

const TodoInfo = ({ item, theme }: { item: Todo; theme: ColorSet }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: theme.textColor }}>{item.title}</Text>
    </View>
  );
};

export default TodoInfo;
