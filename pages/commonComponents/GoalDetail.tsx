import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalDetailScreenProps } from '../../App';

const GoalDetail = ({ route, navigation }: GoalDetailScreenProps ): React.ReactElement => {

    const { goalId } = route.params;
    
    return (
        <View>
            <Text>goal id: {goalId}</Text>
        </View>
    );
}

export default GoalDetail;
