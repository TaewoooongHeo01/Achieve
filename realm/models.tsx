import Realm from 'realm';

//Data Object Models

//User 없애고, username 은 state 나 context 로 관리.
//phrase, fullnessChecklist 는 따로 만들어서 나중에 사용자가 바꿀 수 있도록 하기 .

export class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  username!: string;
  phrase!: Realm.List<Phrase>;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      username: 'string',
      phrase: { type: 'list', objectType: 'Phrase' },
    },
  };
}

export class Phrase extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  content!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Phrase',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      content: 'string',
    },
  };
}

export class Goal extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isComplete!: boolean;
  icon!: string;
  color!: number;
  todos!: Realm.List<Todo>;
  description!: string;
  startDate!: string;
  endDate?: string;
  todoCnt!: number;

  static schema: Realm.ObjectSchema = {
    name: 'Goal',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      title: 'string',
      isComplete: 'bool',
      icon: 'string',
      color: 'int',
      todos: {
        type: 'list',
        objectType: 'Todo',
      },
      description: 'string?',
      startDate: 'string',
      endDate: 'string?',
      todoCnt: 'int',
    },
  };
}

export class FullyDate extends Realm.Object {
  dateKey!: string;
  fullness!: number;
  dayIdx!: number;
  todos!: Realm.List<Todo>;

  static schema: Realm.ObjectSchema = {
    name: 'FullyDate',
    primaryKey: 'dateKey',
    properties: {
      dateKey: {
        type: 'string',
      },
      fullness: 'float',
      dayIdx: 'int',
      todos: 'Todo[]',
    },
  };
}

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  goal?: Goal;
  date?: string;
  weekCycle!: number[];
  priority!: number;
  isComplete!: boolean;
  originDate?: number;
  isClone?: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Todo',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      title: 'string',
      goal: {
        type: 'linkingObjects',
        objectType: 'Goal',
        property: 'todos',
      },
      date: 'string',
      weekCycle: 'int[]',
      priority: 'int',
      isComplete: 'bool',
      originDate: 'int',
      isClone: 'bool',
    },
  };
}
