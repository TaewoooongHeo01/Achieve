import Realm from 'realm';

//Data Object Models

// export class User extends Realm.Object {
//   _id!: Realm.BSON.ObjectId;
//   username!: string;
//     Goals?: Realm.List<Goal>;

//   static schema: Realm.ObjectSchema = {
//     name: 'user',
//     properties: {
//       _id: 'objectId',
//       username: 'string',
//         Goals: 'Goal[]',
//     },
//     primaryKey: '_id',
//   };
// }

export class Goal extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isComplete!: boolean;
  d_day!: number;
  icon!: number;
  color!: number;
  checklist!: Realm.List<Checklist>;
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
      icon: 'int',
      color: 'int',
      todos: 'Todo[]',
      checklist: 'Checklist[]',
      description: 'string?',
    },
  };
}

export class Checklist extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isChecked!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Checklist',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectId(),
      },
      title: 'string',
      isChecked: 'bool',
      goal: {
        type: 'linkingObjects',
        objectType: 'Goal',
        property: 'checklist',
      },
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
