import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, FlatList, Platform } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';

//mainTab components
import Intro from '../homeComponents/Intro';
import Goals from '../homeComponents/Goals';
import TodoDate from '../homeComponents/TodoDate';

//styles
import { gradientColorset } from '../../const/styleConst';

export type UserData = {
  _id: string;
  username: string;
  goals: GoalsType[];
  todo: TodoType[];
};

export type GoalsType = {
  goalId: string;
  title: string;
  icon: string | any;
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

  const [userId, setUserId] = useState<string>('1');

  const [userDataMap, setUserDataMap] = useState<Map<string, UserData>>(
    new Map(),
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //getUserId
    setUserId('1'); //userid = 1

    //async data -> 원래는 user id 의 데이터만 가져와야 하지만, 테스트를 위해 전체 데이터를 가져옴
    //추후 위의 데이터 type 에 맞게 각각 분할 해야 함. goals 따로, todo 따로. 그리고 userId 를 공통 키로 조회할 수 있도록
    const asyncDataList: UserData[] = [
      {
        _id: '1',
        username: 'username',
        goals: [
          {
            goalId: '1',
            title: '10kg 감량하기기기기기기기',
            icon: 'icon',
            d_day: 68,
            checklist: [
              { title: '식단만들기', isChecked: true },
              { title: '매일 운동하기', isChecked: false },
              { title: '운동 장비 구매', isChecked: false },
            ],
            colorset: gradientColorset[18],
          },
          {
            goalId: '2',
            title: '책 5권 읽기',
            icon: 'icon',
            d_day: 24,
            checklist: [
              { title: '책 1권', isChecked: true },
              { title: '책 2권', isChecked: false },
              { title: '책 3권', isChecked: false },
              { title: '책 4권', isChecked: false },
              { title: '책 5권', isChecked: false },
            ],
            colorset: gradientColorset[14],
          },
          {
            goalId: '3',
            title: '졸업작품 완성하기',
            icon: 'icon',
            d_day: 120,
            checklist: [
              { title: '아이디어 회의', isChecked: true },
              { title: '디자인 회의', isChecked: true },
              { title: '개발 회의', isChecked: true },
              { title: '테스트 회의', isChecked: true },
              { title: '발표 준비', isChecked: false },
            ],
            colorset: gradientColorset[5],
          },
          {
            goalId: '4',
            title: '자격증 취득하기',
            icon: 'icon',
            d_day: 200,
            checklist: [],
            colorset: gradientColorset[12],
          },
        ],
        todo: [
          {
            todoId: '1',
            title: '운동 1시간',
            dates: [0, 1, 2, 3, 4, 5, 6],
            time: 1440,
            goal: 1,
          },
          {
            todoId: '2',
            title: '식단조절',
            dates: [0, 1, 2, 3, 4, 5, 6],
            time: 1440,
            goal: 1,
          },
          {
            todoId: '3',
            title: '독서 30분',
            dates: [0, 3, 5],
            time: 480,
            goal: 2,
          },
          {
            todoId: '4',
            title: '레포트 작성하기',
            dates: [3],
            time: 720,
            goal: 3,
          },
        ],
      },
    ];

    const tempUserDataMap = new Map();
    for (let i = 0; i < asyncDataList.length; i++) {
      tempUserDataMap.set(asyncDataList[i]._id, asyncDataList[i]);
    }

    setUserDataMap(tempUserDataMap);
  }, []);

  const curUser: UserData | undefined = userDataMap.get(userId);
  //const curUser: UserData = userDataMap.get(userId) ?? throw new Error("User data error");

  //서버로부터 데이터를 받아오거나, 변경 시 상태관리 필요. 따라서 useState 사용
  const [data, setData] = useState<React.ReactElement[]>([
    <Intro userData={curUser} />,
    <Goals goalProps={curUser?.goals} />,
    <TodoDate />,
  ]);

  //userDataMap 업데이트 시 data 업데이트
  useEffect(() => {
    if (curUser) {
      setData([
        <Intro userData={curUser} />,
        <Goals goalProps={curUser.goals} />,
        <TodoDate />,
      ]);
    }
  }, [curUser]); // curUser가 변경될 때마다 data를 업데이트

  useEffect(() => {
    console.log('loading...');
    setIsLoading(false);
  }, []);

  const renderItem = ({ item }: { item: React.ReactElement }) => {
    return <View style={{ flex: 1 }}>{item}</View>;
  };

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

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
