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

export class Distance extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isComplete!: boolean;
  icon!: string;
  color!: number;
  todos!: Realm.List<Todo>;
  intrinsicMotivation?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Distance',
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
      intrinsicMotivation: 'string?',
    },
  };
}

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  date!: string;
  distance!: Distance;
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
      distance: {
        type: 'linkingObjects',
        objectType: 'Distance',
        property: 'todos',
      },
      alertOn: 'bool',
      alertTime: 'int?',
      weekCycle: 'int[]',
    },
  };
}
