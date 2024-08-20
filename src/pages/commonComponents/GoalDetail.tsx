import React from 'react';
import { View, Text, Button } from 'react-native';
import { GoalDetailScreenProps } from '../../../App';
import { useObject, useRealm } from '@realm/react';
import { Goal } from '../../../realm/models';
import { useNavigation } from '@react-navigation/native';

const GoalDetail = ({ route }: GoalDetailScreenProps): React.ReactElement => {
  const id = route.params._id;
  const realm = useRealm();
  const navigation = useNavigation();
  const goal = useObject<Goal>('Goal', id);

  const deleteGoal = () => {
    navigation.goBack();
    realm.write(() => {
      realm.delete(goal);
    });
  };

  return (
    <View>
      <Text>goal id: </Text>
      <Button
        title='delete'
        onPress={() => {
          deleteGoal();
        }}></Button>
    </View>
  );
};

export default GoalDetail;
