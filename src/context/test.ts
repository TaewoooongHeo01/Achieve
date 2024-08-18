//개발 단계에서 넣는 테스트 데이터
import { useRealm } from '@realm/react';

export const initialize = () => {
  const realm = useRealm();
  console.log(realm.path);
  realm.write(() => {
    realm.deleteAll();
  });
  for (let i = 0; i < GoalsData.length; i++) {
    const g = GoalsData[i];
    const t = todos[i];
    realm.write(() => {
      const goal = realm.create('Goal', {
        title: g.title,
        isComplete: g.isComplete,
        d_day: g.d_day,
        startDayCnt: g.startDayCnt,
        icon: g.icon,
        color: g.color,
        todos: [],
        description: g.description,
      });
      for (let i = 0; i < t.length; i++) {
        const td = t[i];
        const todoItem = realm.create('Todo', {
          title: td.title,
          date: td.date,
          goal: goal,
          alertOn: td.alertOn,
          alertTime: td.alertTime,
          weekCycle: td.weekCycle,
        });
        goal.todos.push(todoItem);
      }
    });
  }
};

const GoalsData = [
  {
    title: '10kg 감량하기',
    isComplete: false,
    d_day: 60,
    startDayCnt: 30,
    icon: 'barbell',
    color: 0,
    todo: [],
    description: '세달 동안 10kg 감량하기 목표',
  },
  {
    title: '일일 독서 30분 하기',
    isComplete: false,
    d_day: 30,
    startDayCnt: 60,
    icon: 'book',
    color: 3,
    todo: [],
    description: '매일 30분씩 독서하기',
  },
  {
    title: '새로운 프로그래밍 언어 배우기',
    isComplete: false,
    d_day: 30,
    startDayCnt: 8,
    icon: 'code',
    color: 11,
    todo: [],
    description: '2달 동안 새로운 프로그래밍 언어 마스터하기',
  },
  {
    title: '매일 10,000보 걷기',
    isComplete: true,
    d_day: 15,
    startDayCnt: 15,
    icon: 'accessibility',
    color: 3,
    todo: [],
    description: '건강을 위해 매일 걷기',
  },
  {
    title: '자기 전 명상 15분 하기',
    isComplete: false,
    d_day: 45,
    startDayCnt: 90,
    icon: 'leaf',
    color: 8,
    todo: [],
    description: '매일 자기 전 명상으로 하루를 마무리',
  },
];

const now = new Date();
const year = String(now.getFullYear());
const month = String(now.getMonth() + 1).padStart(2, '0');

// const yesterday = String(now.getDate() - 1).padStart(2, '0');
const today = String(now.getDate()).padStart(2, '0');
// const tomorrow = String(now.getDate() + 1).padStart(2, '0');

// const yesterdayDate: string = year + month + yesterday;
const yesterdayDate = '20240810';
const todayDate: string = year + month + today;
const tomorrowDate = '20240814';
// const tomorrowDate: string = year + month + tomorrow;

const todos = [
  [
    {
      title: '식단 장 보기',
      goal: 'Goal1',
      date: todayDate,
      alertOn: false,
      alertTime: 13,
      weekCycle: [],
    },
    {
      title: '운동 루틴 찾아보기',
      goal: 'Goal1',
      date: todayDate,
      alertOn: true,
      alertTime: 20,
      weekCycle: [],
    },
    {
      title: '런닝 30분',
      goal: 'Goal1',
      date: tomorrowDate,
      alertOn: true,
      alertTime: 22,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  [
    {
      title: '아침에 책 읽기',
      goal: 'Goal2',
      date: todayDate,
      alertOn: true,
      alertTime: 8,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      title: '점심 시간에 책 읽기',
      goal: 'Goal2',
      date: todayDate,
      alertOn: true,
      alertTime: 12,
      weekCycle: [0, 1, 2, 3, 4, 5],
    },
  ],
  [
    {
      title: '기초 문법 공부하기',
      goal: 'Goal3',
      date: yesterdayDate,
      alertOn: true,
      alertTime: 10,
      weekCycle: [1, 3, 5],
    },
    {
      title: '작은 프로젝트 시작하기',
      goal: 'Goal3',
      date: todayDate,
      alertOn: true,
      alertTime: 16,
      weekCycle: [2, 4, 6],
    },
  ],
  [
    {
      title: '출근길에 걷기',
      goal: 'Goal4',
      date: todayDate,
      alertOn: false,
      alertTime: 8,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      title: '저녁에 가벼운 산책하기',
      goal: 'Goal4',
      date: tomorrowDate,
      alertOn: true,
      alertTime: 20,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  [
    {
      title: '명상 연습하기',
      goal: 'Goal5',
      date: todayDate,
      alertOn: true,
      alertTime: 22,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
];
