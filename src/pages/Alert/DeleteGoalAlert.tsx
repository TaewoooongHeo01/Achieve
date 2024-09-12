import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { closeAlert } from 'react-native-customisable-alert';
import { useRealm } from '@realm/react';
import { Goal, Todo } from '../../../realm/models';
import { List, Results } from 'realm';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DeleteGoalAlert = ({
  goal,
  todos,
}: {
  goal: Goal | null;
  todos: Results<Todo> | List<Todo> | undefined;
}) => {
  const { theme } = useColors();
  const realm = useRealm();

  return (
    <View
      style={[
        {
          backgroundColor: theme.backgroundColor,
          padding: ms(20, 0.3),
          borderRadius: ms(5, 0.3),
          width: ms(290, 0.3),
        },
      ]}>
      <View
        style={{
          width: ms(40, 0.3),
          height: ms(40, 0.3),
          borderRadius: ms(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          // padding: ms(11, 0.3),
          backgroundColor: theme.red,
        }}>
        <View
          // onLayout={e => {
          //   setIconSize(e.nativeEvent.layout.height);
          // }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: 1,
          }}>
          <Ionicons name='trash' size={ms(22, 0.3)} />
        </View>
      </View>
      <Text
        style={[
          {
            fontFamily: 'Pretendard-Semibold',
            fontSize: ms(17, 0.3),
            color: theme.textColor,
            marginTop: ms(15, 0.3),
          },
        ]}>
        {goal ? goal.title : '?'} 을/를 삭제할까요?
      </Text>
      <Text
        style={[
          fontStyle.fontSizeSub,
          {
            color: theme.textColor,
            marginBottom: ms(20, 0.3),
            marginTop: ms(5, 0.3),
          },
        ]}>
        목표에 포함된 할 일들도 삭제됩니다.
      </Text>
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
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: ms(36, 0.3),
          backgroundColor: theme.red,
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          목표삭제
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteGoalAlert;
