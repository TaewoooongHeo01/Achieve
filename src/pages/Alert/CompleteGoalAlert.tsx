import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { closeAlert, showAlert } from 'react-native-customisable-alert';
import { useRealm } from '@realm/react';
import { Goal } from '../../../realm/models';
import CelebrationAlert from './CelebrationAlert';
import { useDateContext } from '../../context/DateContext';
import { makeDateFormatKey } from '../../utils/makeDateFormatKey';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CompleteGoalAlert = ({ goal }: { goal: Goal | null }) => {
  const { theme } = useColors();
  const realm = useRealm();
  const { today } = useDateContext();
  const todayFormat = makeDateFormatKey(today.year, today.month, today.date);

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
          backgroundColor: theme.green,
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
          <Ionicons
            name='checkmark'
            size={ms(22, 0.3)}
            color={theme.textColor}
          />
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
        {goal ? goal.title : '?'} 을/를 달성했나요?
      </Text>
      <Text
        style={[
          fontStyle.fontSizeSub,
          {
            color: theme.textColor,
            marginBottom: ms(25, 0.3),
            marginVertical: ms(10, 0.3),
          },
        ]}>
        목표를 완료하면 투두 생성 시 더이상 이 목표를 사용할 수 없어요
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (goal) {
            const todos = goal.todos;
            realm.write(() => {
              realm.delete(todos);
              goal.isComplete = true;
              goal.endDate = todayFormat;
            });
          }
          closeAlert();
          showAlert({
            alertType: 'custom',
            dismissable: true,
            customAlert: <CelebrationAlert />,
          });
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: ms(36, 0.3),
          backgroundColor: theme.green,
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.BtnFont, { color: theme.textColor }]}>
          목표완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteGoalAlert;
