import React from 'react';
import Realm from 'realm';
import { View, Text, Button } from 'react-native';
import { GoalDetailScreenProps } from '../../../App';
import { useObject, useRealm } from '@realm/react';
import { Goal } from '../../../realm/models';

const GoalDetail = ({
  route,
  navigation,
}: GoalDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const realm = useRealm();
  const Goal = useObject<Goal>('Goal', id);
  const todos = Goal?.todos;

  const deleteGoal = () => {
    navigation.goBack();
    realm.write(() => {
      realm.delete(todos);
      realm.delete(Goal);
    });
  };

  return (
    <View>
      <Text>Goal id: </Text>
      <Button
        title='delete'
        onPress={() => {
          deleteGoal();
        }}></Button>
    </View>
  );
};

export default GoalDetail;
