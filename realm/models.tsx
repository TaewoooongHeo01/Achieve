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
  icon!: string;
  color!: number;
  todos?: Realm.List<Todo>;
  way!: string;
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
      why: 'string',
      description: 'string?',
    },
  };
}

// export class FullyDate extends Realm.Object {
//   dateKey!: string;
//   fullness!: number;
//   todos?: Realm.List<Todo>;

//   static schema: Realm.ObjectSchema = {
//     name: 'FullyDate',
//     primaryKey: 'dateKey',
//     properties: {
//       dateKey: {
//         type: 'string',
//         // default: () =>
//       },
//       fullness: 'int',
//       todos: 'Todo[]',
//     },
//   };
// }

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  date!: string;
  goal!: Goal;
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
      goal: {
        type: 'linkingObjects',
        objectType: 'Goal',
        property: 'todos',
      },
      weekCycle: 'int[]',
      priority: 'int',
      isComplete: 'bool',
    },
  };
}
