import Realm from 'realm';

//Data Object Models

//User 없애고, username 은 state 나 context 로 관리.
//phrase, fullnessChecklist 는 따로 만들어서 나중에 사용자가 바꿀 수 있도록 하기 .

export class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  username!: string;
  phrase!: string[];

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      username: 'string',
      phrase: 'string[]',
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
  description?: string;

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
      todos: 'Todo[]',
      description: 'string?',
    },
  };
}

export class FullyDate extends Realm.Object {
  dateKey!: string;
  fullness!: number;
  todos!: Realm.List<Todo>;

  static schema: Realm.ObjectSchema = {
    name: 'FullyDate',
    primaryKey: 'dateKey',
    properties: {
      dateKey: {
        type: 'string',
      },
      fullness: 'float',
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
  priority?: number;
  isComplete!: boolean;

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
    },
  };
}
