import Realm from 'realm';

//Data Object Models

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
  d_day!: number;
  startDayCnt!: number;
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
      d_day: 'int',
      startDayCnt: 'int',
      icon: 'string',
      color: 'int',
      todos: 'Todo[]',
      description: 'string?',
    },
  };
}

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  date!: string;
  goal!: Goal;
  alertOn!: boolean;
  alertTime?: number; //0~24
  weekCycle!: number[];

  static schema: Realm.ObjectSchema = {
    name: 'Todo',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      title: 'string',
      date: 'string',
      goal: {
        type: 'linkingObjects',
        objectType: 'Goal',
        property: 'todos',
      },
      alertOn: 'bool',
      alertTime: 'int?',
      weekCycle: 'int[]',
    },
  };
}
