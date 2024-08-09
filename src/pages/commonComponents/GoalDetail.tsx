import React from 'react';
import { View, Text } from 'react-native';
import { GoalDetailScreenProps } from '../../../App';

const GoalDetail = ({ route }: GoalDetailScreenProps): React.ReactElement => {
  const id = route.params._id; //Realm.BSON.ObjectId type

  return (
    <View>
      <Text>goal id: </Text>
    </View>
  );
};

export default GoalDetail;
