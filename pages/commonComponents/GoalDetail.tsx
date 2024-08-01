import React from 'react';
import { View, Text } from 'react-native';
import { GoalDetailScreenProps } from '../../App';

const GoalDetail = ({ route }: GoalDetailScreenProps): React.ReactElement => {
  const { goalId } = route.params;

  return (
    <View>
      <Text>goal id: {goalId}</Text>
    </View>
  );
};

export default GoalDetail;
