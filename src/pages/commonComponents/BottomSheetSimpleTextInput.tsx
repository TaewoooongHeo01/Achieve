import {
  BottomSheetTextInput,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Alert, Platform, Text } from 'react-native';
import { fontStyle } from '../../assets/style/fontStyle';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../context/ThemeContext';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRealm } from '@realm/react';
import { Phrase, Todo } from '../../../realm/models';

const BottomSheetSimpleTextInput = ({ mode }: { mode: string }) => {
  const { theme, currentTheme } = useColors();
  const [title, setTitle] = useState<string>('');
  const realm = useRealm();
  const { dismiss } = useBottomSheetModal();

  const isValid = () => {
    if (mode === 'lateTodo') {
      if (title.length === 0) {
        Alert.alert('제목을 입력해주세요');
        return false;
      }
      if (title.length > 30) {
        Alert.alert('제목의 길이는 30 자 이하로 설정해주세요');
        return false;
      }
    } else if (mode === 'phrase') {
      if (title.length == 0) {
        Alert.alert('문구를 입력해주세요');
        return false;
      }
      if (title.length >= 100) {
        Alert.alert('문구의 길이는 100 자 이하로 설정해주세요');
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Text
        style={[
          fontStyle.fontSizeSub,
          { marginVertical: ms(8, 0.3), color: theme.textColor },
        ]}>
        제목
      </Text>
      <BottomSheetTextInput
        value={title}
        onChangeText={setTitle}
        onEndEditing={e => setTitle(e.nativeEvent.text.trim())}
        placeholderTextColor={'grey'}
        style={{
          // marginHorizontal: ms(10, 0.3),
          // marginTop: ms(5, 0.3),
          borderWidth: currentTheme === 'light' ? 0.2 : 0,
          borderRadius: Platform.OS === 'android' ? ms(5, 0.3) : ms(7, 0.5),
          padding: Platform.OS === 'android' ? ms(5, 0.3) : ms(10, 0.3),
          paddingLeft: Platform.OS === 'android' ? ms(10, 0.3) : null,
          borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
          backgroundColor:
            currentTheme === 'dark' ? theme.appBackgroundColor : '#F8F8F8',
          color: theme.textColor,
          fontFamily: 'Pretendard-Medium',
        }}
      />
      <TouchableOpacity
        style={{
          padding: ms(14, 0.3),
          backgroundColor: theme.textColor,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: ms(20, 0.3),
          marginBottom: ms(30, 0.3),
          borderRadius: ms(5, 0.3),
        }}
        onPress={() => {
          if (isValid()) {
            if (mode === 'lateTodo') {
              realm.write(() => {
                realm.create<Todo>('Todo', {
                  title: title,
                  date: 'none',
                  priority: 2,
                  isComplete: false,
                  originDate: -1,
                  isClone: true,
                });
              });
            } else if (mode === 'phrase') {
              realm.write(() => {
                realm.create<Phrase>('Phrase', {
                  content: title,
                });
              });
            }
            setTitle('');
            dismiss();
          }
        }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.backgroundColor }]}>
          완료
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default BottomSheetSimpleTextInput;
