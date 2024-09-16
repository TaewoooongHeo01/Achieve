import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { closeAlert } from 'react-native-customisable-alert';
import { Todo } from '../../../realm/models';

const DeleteTodoAlert = ({
  item,
  todoCompleteAnimation,
}: {
  item: Todo;
  todoCompleteAnimation(isRemove: boolean): void;
}) => {
  const { theme } = useColors();

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
          {item.title} 을/를 삭제할까요?
        </Text>
        <Text
          style={[
            fontStyle.fontSizeSub,
            { color: theme.textColor, marginVertical: ms(15, 0.3) },
          ]}>
          삭제하면 이후 반복되는 {item.title} 도 삭제돼요.
        </Text>
        <Text
          style={[
            fontStyle.fontSizeSub,
            { color: theme.textColor, marginVertical: ms(15, 0.3) },
          ]}>
          (이전에 완료한 내용들은 남아있어요)
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          todoCompleteAnimation(true);
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
        <Text style={[fontStyle.BtnFont, { color: theme.textColor }]}>
          할 일 삭제
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteTodoAlert;
