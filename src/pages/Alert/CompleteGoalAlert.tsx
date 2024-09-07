import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { closeAlert, showAlert } from 'react-native-customisable-alert';
import { useRealm } from '@realm/react';
import { Goal } from '../../../realm/models';
import CelebrationAlert from './CelebrationAlert';

const CompleteGoalAlert = ({ goal }: { goal: Goal | null }) => {
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
          {goal?.title} 을/를 달성했나요?
        </Text>
        <Text
          style={[
            fontStyle.fontSizeSub,
            { color: theme.textColor, marginVertical: ms(15, 0.3) },
          ]}>
          목표를 완료하면 투두 생성 시 더이상 이 목표를 사용할 수 없어요
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (goal) {
            realm.write(() => {
              goal.isComplete = true;
            });
          }
          closeAlert();
          showAlert({
            alertType: 'custom',
            dismissable: true,
            customAlert: <CelebrationAlert />,
          });
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          padding: ms(8, 0.3),
          borderRadius: ms(5, 0.3),
        }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          목표 완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteGoalAlert;
