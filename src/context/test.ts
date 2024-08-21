//개발 단계에서 넣는 테스트 데이터
import { useRealm } from '@realm/react';

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

  for (let i = 0; i < distancesData.length; i++) {
    const g = distancesData[i];
    const t = todos[i];
    realm.write(() => {
      const distance = realm.create('Distance', {
        title: g.title,
        isComplete: g.isComplete,
        icon: g.icon,
        color: g.color,
        todos: [],
        intrinsicMotivation: g.intrinsicMotivation,
      });
      for (let i = 0; i < t.length; i++) {
        const td = t[i];
        const todoItem = realm.create('Todo', {
          title: td.title,
          date: td.date,
          distance: distance,
          alertOn: td.alertOn,
          alertTime: td.alertTime,
          weekCycle: td.weekCycle,
        });
        distance.todos.push(todoItem);
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

const distancesData = [
  {
    title: '10kg 감량하기',
    isComplete: false,
    icon: 'barbell',
    color: 0,
    todo: [],
    intrinsicMotivation: '세달 동안 10kg 감량하기 목표',
  },
  {
    title: '독서 30분 하기',
    isComplete: false,
    d_day: 30,
    startDayCnt: 60,
    icon: 'book',
    color: 3,
    todo: [],
    intrinsicMotivation: '매일 30분씩 독서하기',
  },
  {
    title: '새로운 프로그래밍 언어 배우기',
    isComplete: false,
    d_day: 30,
    startDayCnt: 8,
    icon: 'code',
    color: 11,
    todo: [],
    intrinsicMotivation: '2달 동안 새로운 프로그래밍 언어 마스터하기',
  },
  {
    title: '매일 10,000보 걷기',
    isComplete: true,
    d_day: 15,
    startDayCnt: 15,
    icon: 'accessibility',
    color: 3,
    todo: [],
    intrinsicMotivation: '건강을 위해 매일 걷기',
  },
  {
    title: '자기 전 명상 15분 하기',
    isComplete: false,
    d_day: 45,
    startDayCnt: 90,
    icon: 'leaf',
    color: 8,
    todo: [],
    intrinsicMotivation: '매일 자기 전 명상으로 하루를 마무리',
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
      date: todayDate,
      alertOn: false,
      alertTime: 13,
      weekCycle: [],
    },
    {
      title: '운동 루틴 찾아보기',
      date: todayDate,
      alertOn: true,
      alertTime: 20,
      weekCycle: [],
    },
    {
      title: '런닝 30분',
      date: tomorrowDate,
      alertOn: true,
      alertTime: 22,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  [
    {
      title: '아침에 책 읽기',
      date: todayDate,
      alertOn: true,
      alertTime: 8,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      title: '점심 시간에 책 읽기',
      date: todayDate,
      alertOn: true,
      alertTime: 12,
      weekCycle: [0, 1, 2, 3, 4, 5],
    },
  ],
  [
    {
      title: '기초 문법 공부하기',
      date: yesterdayDate,
      alertOn: true,
      alertTime: 10,
      weekCycle: [1, 3, 5],
    },
    {
      title: '작은 프로젝트 시작하기',
      date: todayDate,
      alertOn: true,
      alertTime: 16,
      weekCycle: [2, 4, 6],
    },
  ],
  [
    {
      title: '출근길에 걷기',
      date: todayDate,
      alertOn: false,
      alertTime: 8,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      title: '저녁에 가벼운 산책하기',
      date: tomorrowDate,
      alertOn: true,
      alertTime: 20,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  [
    {
      title: '명상 연습하기',
      date: todayDate,
      alertOn: true,
      alertTime: 22,
      weekCycle: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
];
