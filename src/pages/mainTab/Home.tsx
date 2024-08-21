import React from 'react';
import { View, FlatList } from 'react-native';

//mainTab components
import Intro from '../homeComponents/Intro';
import Distances from '../homeComponents/Distances';
import TodoDate from '../homeComponents/Todos/TodoDate';
import { useColors } from '../../context/ThemeContext';

export type GoalsType = {
  goalId: string;
  title: string;
  icon: string | undefined;
  d_day: number;
  checklist: checkboxType[];
  colorset: string[];
};

type checkboxType = {
  title: string;
  isChecked: boolean;
};

export type TodoType = {
  todoId: string;
  title: string;
  dates: number[];
  time: number;
  distances: number;
};

const Home = (): React.ReactElement => {
  const { theme } = useColors();

  const data = [<Intro />, <Distances />, <TodoDate />];

  const renderItem = ({ item }: { item: React.ReactElement }) => {
    return <View style={{ flex: 1 }}>{item}</View>;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.appBackgroundColor,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;
