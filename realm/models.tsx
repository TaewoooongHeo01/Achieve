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
  way!: string;
  description?: string;

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
      why: 'string',
      description: 'string?',
    },
  };
}

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  date!: string;
  objective!: Objective;
  weekCycle!: number[];
  priority!: number;
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
      date: 'string',
      objective: {
        type: 'linkingObjects',
        objectType: 'Objective',
        property: 'todos',
      },
      weekCycle: 'int[]',
      priority: 'int',
      isComplete: 'bool',
    },
  };
}
