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

export class Objective extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isComplete!: boolean;
  icon!: string;
  color!: number;
  todos!: Realm.List<Todo>;
  why?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Objective',
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
      why: 'string?',
    },
  };
}

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  date!: string;
  objective!: Objective;
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
      Objective: {
        type: 'linkingObjects',
        objectType: 'Objective',
        property: 'todos',
      },
      alertOn: 'bool',
      alertTime: 'int?',
      weekCycle: 'int[]',
    },
  };
}
