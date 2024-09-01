import React from 'react';
import { Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { closeAlert } from 'react-native-customisable-alert';
import { useRealm } from '@realm/react';
import { Goal, Todo } from '../../../realm/models';
import { Results } from 'realm';

const DeleteGoalAlert = ({
  goal,
  todos,
}: {
  goal: Goal | null;
  todos: Results<Todo> | undefined;
}) => {
  const { theme } = useColors();
  const realm = useRealm();

  return (
    <View
      style={{
        width: ms(300, 0.3),
        backgroundColor: theme.backgroundColor,
        borderRadius: ms(5, 0.3),
        padding: ms(20, 0.3),
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
          {goal?.title} 을/를 삭제할까요?
        </Text>
        <Text
          style={[
            fontStyle.fontSizeSub,
            { color: theme.textColor, marginVertical: ms(15, 0.3) },
          ]}>
          목표를 삭제하면 지금까지 완료했던 모든 할 일들도 삭제됩니다
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          realm.write(() => {
            realm.delete(todos);
            realm.delete(goal);
          });
          closeAlert();
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          padding: ms(8, 0.3),
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          목표 삭제
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteGoalAlert;
