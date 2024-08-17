import React from 'react';
import { View, StatusBar, FlatList, Platform, Text } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';

//mainTab components
import Intro from '../homeComponents/Intro';
import Goals from '../homeComponents/Goals';
import TodoDate from '../homeComponents/Todos/TodoDate';

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
  goal: number;
};

const Home = (): React.ReactElement => {
  const { top } = useSafeAreaInsets();
  const username = 'username';

  const data = [<Intro username={username} />, <Goals />, <TodoDate />];

  const renderItem = ({ item }: { item: React.ReactElement }) => {
    return <View style={{ flex: 1 }}>{item}</View>;
  };

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <View style={{ backgroundColor: '#121212', height: top }}>
          <StatusBar barStyle='light-content' />
        </View>
      ) : (
        <StatusBar barStyle='light-content' backgroundColor='#121212' />
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: '#121212',
          paddingHorizontal: ms(20, 0.3),
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
