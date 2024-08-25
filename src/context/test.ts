import { FullyDate } from './../../realm/models';
//개발 단계에서 넣는 테스트 데이터
import { useObject, useQuery, useRealm } from '@realm/react';

export const initialize = () => {
  const realm = useRealm();
  console.log(realm.path);
  realm.write(() => {
    realm.deleteAll();
  });

  realm.write(() => {
    realm.create('User', {
      username: UserData.username,
      phrase: UserData.phrase,
    });
  });

  for (let i = 0; i < GoalsData.length; i++) {
    const g = GoalsData[i];
    const t = todos[i];
    realm.write(() => {
      const Goal = realm.create('Goal', {
        title: g.title,
        isComplete: g.isComplete,
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
          Goal: Goal,
          weekCycle: td.weekCycle,
          priority: td.priority,
          isComplete: td.isComplete,
        });
        const date = useObject(FullyDate, todoItem.date);
        if (date != undefined) {
          date.todos?.push(todoItem);
        } else {
          realm.create('FullyDate', {
            dateKey: todoItem.date,
            fullness: 0,
            todos: [],
          });
        }
        Goal.todos.push(todoItem);
      }
    });
  }
};

const UserData = {
  username: 'username',
  phrase: [
    '여전할 것인가, 역전할 것인가',
    '길을 걷다가 돌을 보면 약자는 그것을 걸림돌이라고 하고 강자는 그것을 디딤돌이라고 한다.',
    '먹는 칼로리보다 에너지 소모가 적으면 살이 찌듯이, 걱정만 하고 행동하지 않으면 걱정이 찐다.',
    '이미 끝나버린 일을 후회하기 보다는 하고 싶었던 일을 하지 못한 것을 후회하라.',
  ],
};

const GoalsData = [
  {
    title: '독서 30분 하기',
    isComplete: false,
    icon: 'book',
    color: 3,
    todo: [],
    description: '매일 30분씩 독서하기',
  },
  {
    title: '새로운 프로그래밍 언어 배우기',
    isComplete: false,
    icon: 'code',
    color: 11,
    todo: [],
    description: '매일 30분씩 독서하기',
  },
  {
    title: '매일 10,000보 걷기',
    isComplete: true,
    icon: 'accessibility',
    color: 3,
    todo: [],
    description: '건강을 위해 매일 걷기',
  },
  {
    title: '자기 전 명상 15분 하기',
    isComplete: false,
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
const yesterdayDate = '20240824';
const todayDate: string = year + month + today;
const tomorrowDate = '20240828';
// const tomorrowDate: string = year + month + tomorrow;

const todos = [
  [
    {
      title: '식단 장 보기',
      date: todayDate,
      weekCycle: [1, 2],
      priority: 3,
      isComplete: false,
    },
    {
      title: '운동 루틴 찾아보기',
      date: todayDate,
      weekCycle: [],
      priority: 2,
      isComplete: false,
    },
    {
      title: '런닝 30분',
      date: tomorrowDate,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
      priority: 1,
      isComplete: false,
    },
  ],
  [
    {
      title: '아침에 책 읽기',
      date: todayDate,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
      priority: 3,
      isComplete: true,
    },
    {
      title: '점심 시간에 책 읽기',
      date: todayDate,
      weekCycle: [0, 1, 2, 3, 4, 5],
      priority: 2,
      isComplete: true,
    },
  ],
  [
    {
      title: '기초 문법 공부하기',
      date: yesterdayDate,
      weekCycle: [1, 3, 5],
      priority: 1,
      isComplete: true,
    },
    {
      title: '작은 프로젝트 시작하기',
      date: todayDate,
      weekCycle: [2, 4, 6],
      priority: 2,
      isComplete: false,
    },
  ],
  [
    {
      title: '출근길에 걷기',
      date: todayDate,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
      priority: 2,
      isComplete: true,
    },
    {
      title: '저녁에 가벼운 산책하기',
      date: tomorrowDate,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
      priority: 3,
      isComplete: false,
    },
  ],
  [
    {
      title: '명상 연습하기',
      date: todayDate,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
      priority: 3,
      isComplete: true,
    },
  ],
];
