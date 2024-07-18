import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, FlatList, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

//mainTab components
import Intro from "./mainTab/Intro"; 
import Goals from "./mainTab/Goals";

export type UserData = {
  _id: string,
  username: string,
  goals: GoalsType[],
  todo: TodoType[],
}

export type GoalsType = {
  goalId: string,
  title: string,
  icon: string | any,
  d_day: number,
}

export type TodoType = {
  todoId: string,
  title: string,
  dates: number[],
  time: number,
  goal: number,
}

const Home = (): React.ReactElement => {
    const {top} = useSafeAreaInsets();

    const [userId, setUserId] = useState<string>('1');

    const [userDataMap, setUserDataMap] = useState<Map<string, UserData>>(new Map());

    useEffect(() => {
      //getUserId
      setUserId('1'); //userid = 1

      //async data -> 원래는 user id 의 데이터만 가져와야 하지만, 테스트를 위해 전체 데이터를 가져옴
      const asyncDataList: UserData[] = [
        { 
          _id: "1", 
          username: "username",
          goals: [
            {goalId: '1', title: '10kg 감량하기', icon: 'icon', d_day: 68},
            {goalId: '2', title: '책 5권 읽기', icon: 'icon', d_day: 24},
            {goalId: '3', title: '졸업작품 완성하기', icon: 'icon', d_day: 120},
          ],
          todo: [
            {todoId: '1', title: '운동 1시간', dates: [0, 1, 2, 3, 4, 5, 6], time: 1440, goal: 1},
            {todoId: '2', title: '식단조절', dates: [0, 1, 2, 3, 4, 5, 6], time: 1440, goal: 1},
            {todoId: '3', title: '독서 30분', dates: [0, 3, 5], time: 480, goal: 2},
            {todoId: '4', title: '레포트 작성하기', dates: [3], time: 720, goal: 3},
          ]
        },
        { 
          "_id": "2", 
          "username": "user2",
          "goals": [
            {"goalId": "1", "title": "마라톤 완주하기", "icon": "icon", "d_day": 90},
            {"goalId": "2", "title": "온라인 강의 완강하기", "icon": "icon", "d_day": 45},
            {"goalId": "3", "title": "자격증 취득하기", "icon": "icon", "d_day": 200}
          ],
          "todo": [
            {"todoId": "1", "title": "조깅 30분", "dates": [0, 1, 4, 6], "time": 1800, "goal": 1},
            {"todoId": "2", "title": "매일 강의 듣기", "dates": [0, 1, 2, 3, 4, 5, 6], "time": 480, "goal": 2},
            {"todoId": "3", "title": "모의고사 풀기", "dates": [2, 4], "time": 1200, "goal": 3},
            {"todoId": "4", "title": "교재 1장 읽기", "dates": [1, 3, 5], "time": 720, "goal": 3}
          ]
        },
        { 
          "_id": "3", 
          "username": "user3",
          "goals": [
            {"goalId": "1", "title": "프로그래밍 스킬 향상", "icon": "icon", "d_day": 30},
            {"goalId": "2", "title": "해외 여행 준비", "icon": "icon", "d_day": 180},
            {"goalId": "3", "title": "사진 전시회 준비", "icon": "icon", "d_day": 365}
          ],
          "todo": [
            {"todoId": "1", "title": "코드 리뷰", "dates": [0, 2, 4], "time": 600, "goal": 1},
            {"todoId": "2", "title": "여권 갱신", "dates": [5], "time": 300, "goal": 2},
            {"todoId": "3", "title": "여행 경비 계산", "dates": [1, 3], "time": 120, "goal": 2},
            {"todoId": "4", "title": "사진 편집", "dates": [1, 3, 5], "time": 480, "goal": 3}
          ]
        }
      ];

      for(let i = 0; i < asyncDataList.length; i++) {
        setUserDataMap(userDataMap.set(asyncDataList[i]._id, asyncDataList[i]));
      }
    }, []);

    const curUser: UserData | undefined = userDataMap.get(userId);
    //const curUser: UserData = userDataMap.get(userId) ?? throw new Error("User data error");

    const data = [
      <Intro 
        userData={curUser}
      />,
      <Goals
        goalProps={curUser?.goals}
      />
    ]

    const renderItem = ({ item }: any ) => {
        return (
            <View style={{flex: 1}}>
                {item}
            </View>
        )
    };

    return (
        <SafeAreaView edges={Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']} style={{ flex: 1 }}>
            {
                Platform.OS === 'ios' ? 
                (<View style={{backgroundColor: '#121212', height: top}}>
                    <StatusBar barStyle="light-content"/>
                </View>) :
                (<StatusBar barStyle="light-content" backgroundColor="#121212"/>)
            }
            <View style={{ flex: 1, backgroundColor: '#121212', paddingHorizontal: ms(20, 0.3) }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default Home;
