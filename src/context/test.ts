import { UpdateMode } from 'realm';
import { makeDateFormatKey } from '../utils/makeDateFormatKey';
import { FullyDate } from './../../realm/models';
//개발 단계에서 넣는 테스트 데이터
import { useQuery, useRealm } from '@realm/react';

const now = new Date();
const year = String(now.getFullYear());
const month = String(now.getMonth() + 1).padStart(2, '0');
// const yesterday = String(now.getDate() - 1).padStart(2, '0');
const today = String(now.getDate()).padStart(2, '0');
// const tomorrow = String(now.getDate() + 1).padStart(2, '0');
// const yesterdayDate: string = year + month + yesterday;
const yesterdayDate = '202401011';
const todayDate: string = year + month + today;
const tomorrowDate = '20240912';
// const tomorrowDate: string = year + month + tomorrow;

const dateArr = [];
const fArr = [0.2, 0.4, 0.6, 0.8, 1.0];
for (let i = 0; i < 104; i++) {
  const randomInt = Math.floor(Math.random() * 5);
  const fullness = fArr[randomInt];
  const date = new Date(now.getFullYear(), now.getMonth() - 3, i);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  dateArr.push({
    dateKey: year + month + d,
    fullness: fullness,
    dayIdx: date.getDay(),
    todos: [],
  });
}

const phrase = [
  '길을 걷다가 돌을 보면 약자는 그것을 걸림돌이라고 하고 강자는 그것을 디딤돌이라고 한다.',
];

const UserData = {
  fullnessCheck: [
    '진짜 후회가 없는가?',
    '완전한 몰입을 경험했는가?',
    '완전한 몰입을 경험했는가?',
    '완전한 몰입을 경험했는가?',
  ],
};

const GoalsData = [
  {
    title: '독서 30분 하기',
    isComplete: true,
    icon: 'book',
    color: 3,
    todo: [],
    description:
      '매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기매일 30분씩 독서하기30분씩 독서하기매일 30분씩 독서하기30분씩 독서하기매일 30분씩 독서하기30분씩 독서하기매일 30분씩 독서하기30분씩 독서하기매일 30분씩 독서하기',
    startDate: todayDate,
    todoCnt: 30,
  },
  {
    title: '운동운동운동운동운동운동',
    isComplete: true,
    icon: 'rocket',
    color: 4,
    todo: [],
    description: '운동하고 싶다',
    startDate: todayDate,
    todoCnt: 10,
  },
  {
    title: '음악음악음악음악음악음악',
    isComplete: true,
    icon: 'flame',
    color: 8,
    todo: [],
    description: '음악 듣고 싶다',
    startDate: todayDate,
    todoCnt: 20,
  },
  {
    title: '새로운 프로그래밍 언어 배우기',
    isComplete: false,
    icon: 'code',
    color: 10,
    todo: [],
    description: '매일 30분씩 독서하기',
    startDate: todayDate,
    todoCnt: 5,
  },
  // {
  //   title: '매일 10,000보 걷기',
  //   isComplete: true,
  //   icon: 'accessibility',
  //   color: 3,
  //   todo: [],
  //   description: '건강을 위해 매일 걷기',
  // },
  // {
  //   title: '자기 전 명상 15분 하기',
  //   isComplete: false,
  //   icon: 'leaf',
  //   color: 8,
  //   todo: [],
  //   description: '매일 자기 전 명상으로 하루를 마무리',
  // },
];

const todos = [
  // [
  //   {
  //     title: '식단 장 보기',
  //     date: todayDate,
  //     weekCycle: [1, 2],
  //     priority: 3,
  //     isComplete: false,
  //   },
  //   {
  //     title: '운동 루틴 찾아보기',
  //     date: todayDate,
  //     weekCycle: [],
  //     priority: 2,
  //     isComplete: false,
  //   },
  //   {
  //     title: '런닝 30분',
  //     date: tomorrowDate,
  //     weekCycle: [0, 1, 2, 3, 4, 5, 6],
  //     priority: 1,
  //     isComplete: false,
  //   },
  // ],
  [
    {
      title: '치열',
      date: todayDate,
      weekCycle: [0, 1, 2, 4, 6],
      priority: 3,
      isComplete: false,
    },
    // {
    //   title: '오늘',
    //   date: todayDate,
    //   weekCycle: [0, 1, 2, 3, 4, 5],
    //   priority: 2,
    //   isComplete: true,
    // },
    // {
    //   title: '점심 책',
    //   date: 'none',
    //   weekCycle: [0, 1, 2, 3, 4, 5],
    //   priority: 2,
    //   isComplete: false,
    // },
    // {
    //   title: '책 아침 점심 ',
    //   date: 'none',
    //   weekCycle: [0, 1, 2, 3, 4, 5],
    //   priority: 2,
    //   isComplete: false,
    // },
  ],
  [],
  [],
  [
    // {
    //   title: '기초 문법 공부하기',
    //   date: todayDate,
    //   weekCycle: [1, 3, 5],
    //   priority: 1,
    //   isComplete: false,
    // },
    // {
    //   title: '토이프로젝트 기획',
    //   date: todayDate,
    //   weekCycle: [3],
    //   priority: 3,
    //   isComplete: false,
    // },
    // {
    //   title: '작은 프로젝트 시작하기',
    //   date: tomorrowDate,
    //   weekCycle: [2, 4, 6],
    //   priority: 2,
    //   isComplete: false,
    // },
    // {
    //   title: '작프시',
    //   date: 'none',
    //   weekCycle: [2, 4, 6],
    //   priority: 2,
    //   isComplete: false,
    // },
  ],
  // [
  //   {
  //     title: '출근길에 걷기',
  //     date: todayDate,
  //     weekCycle: [0, 1, 2, 3, 4, 5, 6],
  //     priority: 2,
  //     isComplete: true,
  //   },
  //   {
  //     title: '저녁에 가벼운 산책하기',
  //     date: tomorrowDate,
  //     weekCycle: [0, 1, 2, 3, 4, 5, 6],
  //     priority: 3,
  //     isComplete: false,
  //   },
  // ],
  // [
  //   {
  //     title: '명상 연습하기',
  //     date: todayDate,
  //     weekCycle: [0, 1, 2, 3, 4, 5, 6],
  //     priority: 3,
  //     isComplete: true,
  //   },
  // ],
];

export const initialize = () => {
  const realm = useRealm();
  console.log(realm.path);
  realm.write(() => {
    realm.deleteAll();
  });

  // realm.write(() => {
  //   for (let i = 0; i < phrase.length; i++) {
  //     const ph = realm.create('Phrase', {
  //       content: phrase[i],
  //     });
  //     user.phrase.push(ph);
  //   }
  // });

  // const g = GoalsData[0];
  // realm.write(() => {
  //   Goal = realm.create('Goal', {
  //     title: g.title,
  //     isComplete: false,
  //     icon: g.icon,
  //     color: g.color,
  //     todos: [],
  //     description: g.description,
  //     startDate: g.startDate,
  //     todoCnt: g.todoCnt,
  //   });
  // });
  // };

  // const G = GoalsData[3];
  // let Goal;
  // realm.write(() => {
  //   Goal = realm.create('Goal', {
  //     title: G.title,
  //     isComplete: true,
  //     icon: G.icon,
  //     color: G.color,
  //     todos: [],
  //     description: G.description,
  //     startDate: G.startDate,
  //     todoCnt: G.todoCnt,
  //   });
  //   realm.create('Goal', {
  //     title:
  //       'd아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아d아ㅍ',
  //     isComplete: true,
  //     icon: 'rocket',
  //     color: 8,
  //     todos: [],
  //     description: '',
  //     startDate: G.startDate,
  //     todoCnt: 5,
  //   });
  //   realm.create('Goal', {
  //     title: '김',
  //     isComplete: true,
  //     icon: 'book',
  //     color: 11,
  //     todos: [],
  //     description: '김',
  //     startDate: G.startDate,
  //     todoCnt: 20,
  //   });
  //   realm.create('Goal', {
  //     title: '김asdfasdfasdf',
  //     isComplete: true,
  //     icon: 'book',
  //     color: 11,
  //     todos: [],
  //     description: '김asdfasdfasdf',
  //     startDate: G.startDate,
  //     todoCnt: 20,
  //   });
  // });

  // realm.write(() => {
  //   const date = realm.create('FullyDate', {
  //     dateKey: yesterdayDate,
  //     fullness: 0.2,
  //     dayIdx: 0,
  //     todos: [],
  //   });
  //   const todo = realm.create('Todo', {
  //     title: td.title,
  //     date: yesterdayDate,
  //     weekCycle: [],
  //     priority: 3,
  //     isComplete: false,
  //     originDate: Number(yesterdayDate),
  //     isClone: false,
  //   });
  //   Goal.todos.push(todo);
  //   date.todos.push(todo);
  // });

//   realm.write(() => {
//     for (let i = 0; i < dateArr.length; i++) {
//       const d = dateArr[i];
//       realm.create(
//         'FullyDate',
//         {
//           dateKey: d.dateKey,
//           fullness: d.fullness,
//           dayIdx: d.dayIdx,
//           todos: [],
//         },
//         UpdateMode.Modified,
//       );
//     }
//   });
// };

//yesterday
// realm.write(() => {
//   //yesterday
//   realm.create('FullyDate', {
//     dateKey: yesterdayDate,
//     fullness: 0.2,
//     dayIdx: 0,
//     todos: [],
//   });

//   //today
//   realm.create('FullyDate', {
//     dateKey: todayDate,
//     fullness: 0.2,
//     dayIdx: 1,
//     todos: [],
//   });

//   //tomorrrow
//   realm.create('FullyDate', {
//     dateKey: tomorrowDate,
//     fullness: 0.2,
//     dayIdx: 2,
//     todos: [],
//   });
// });

// const taskDateDay = 1;
// const nextDates = useQuery(FullyDate).filtered(
//   'dateKey > $0 AND ANY todos.weekCycle == $1',
//   tomorrowDate,
//   taskDateDay,
// );
// console.log(nextDates);

// //Todo 추가 로직
// const td = todos[0][0];
// realm.write(() => {
//   realm.create('Todo', {
//     title: td.title,
//     date: tomorrowDate,
//     Goal: Goal,
//     weekCycle: td.weekCycle,
//     priority: td.priority,
//     isComplete: td.isComplete,
//   });
// });

// for (let i = 0; i < GoalsData.length; i++) {
//   const g = GoalsData[i];
//   const t = todos[i];
//   let Goal;
//   realm.write(() => {
//     Goal = realm.create('Goal', {
//       title: g.title,
//       isComplete: g.isComplete,
//       icon: g.icon,
//       color: g.color,
//       todos: [],
//       description: g.description,
//       startDate: g.startDate,
//       todoCnt: g.todoCnt,
//     });

//     for (let i = 0; i < t.length; i++) {
//       const td = t[i];
//       const todoItem = realm.create('Todo', {
//         title: td.title,
//         date: td.date,
//         Goal: Goal,
//         weekCycle: td.weekCycle,
//         priority: td.priority,
//         isComplete: td.isComplete,
//       });
//       const date = realm.objectForPrimaryKey<FullyDate>(
//         'FullyDate',
//         todoItem.date,
//       );
//       if (date) {
//         date.todos.push(todoItem);
//       } else {
//         const newDate = realm.create('FullyDate', {
//           dateKey: todoItem.date,
//           fullness: 0.2,
//           todos: [],
//         });
//         newDate.todos.push(todoItem);
//       }
//       Goal.todos.push(todoItem);
