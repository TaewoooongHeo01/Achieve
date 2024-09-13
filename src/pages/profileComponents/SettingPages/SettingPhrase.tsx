import {
  Alert,
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../../assets/style/fontStyle';
import { useQuery, useRealm } from '@realm/react';
import { Phrase } from '../../../../realm/models';
import { shadow } from '../../../assets/style/shadow';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

const SettingPhrase = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const phrases = useQuery(Phrase);
  const [title, setTitle] = useState<string>('');
  const realm = useRealm();
  const { dismiss } = useBottomSheetModal();

  console.log(title);

  const data: Phrase[] = [];
  for (let i = 0; i < phrases.length; i++) {
    data.push(phrases[i]);
  }

  const [todoBottomSheetSnapPoint, setTodoBottomSheetSnapPoint] =
    useState<string>('25%');
  const todoBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todoSnapPoints = useMemo(
    () => [todoBottomSheetSnapPoint],
    [todoBottomSheetSnapPoint],
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setTodoBottomSheetSnapPoint('40%');
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setTodoBottomSheetSnapPoint('25%');
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  const todoHandlePresentModal = useCallback(() => {
    todoBottomSheetModalRef.current?.present();
  }, []);

  const todoRenderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.8}
        onPress={() => {
          setTitle('');
        }}
      />
    ),
    [],
  );

  const renderItem = ({ item }: { item: Phrase }) => {
    return (
      <View
        style={[
          styles.pharseLayout,
          currentTheme === 'light' ? shadow.boxShadow : {},
          {
            backgroundColor: theme.backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Text
          style={[
            {
              color: theme.textColor,
              lineHeight: ms(23, 0.3),
              flex: ms(0.9, 0.3),
            },
            styles.font,
          ]}>
          {item.content}
        </Text>
        <TouchableOpacity
          onPress={() => {
            realm.write(() => {
              realm.delete(item);
            });
          }}
          activeOpacity={1}
          style={{
            flex: ms(0.1),
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: ms(6, 0.3),
          }}>
          <Icon name='delete' color={theme.textColor} size={ms(13, 0.3)} />
        </TouchableOpacity>
      </View>
    );
  };

  const isValid = () => {
    if (title === '') {
      Alert.alert('문구를 입력해주세요');
      return false;
    } else if (title.length >= 100) {
      Alert.alert('문구는 100 자 이하로 설정해주세요');
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: top,
          }}>
          <StatusBar
            barStyle={
              currentTheme === 'dark' ? 'light-content' : 'dark-content'
            }
          />
        </View>
      ) : (
        <StatusBar
          barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.appBackgroundColor}
        />
      )}
      <View
        style={{
          paddingHorizontal: ms(18, 0.3),
          flex: 1,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: ms(13, 0.3),
            marginBottom: ms(6, 0.3),
          }}>
          <View>
            <Text
              style={[
                fontStyle.fontSizeMain,
                { color: theme.textColor, marginBottom: ms(2, 0.3) },
              ]}>
              문구 설정하기
            </Text>
            <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
              설정한 문구들을 홈 화면에서 볼 수 있어요
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              todoHandlePresentModal();
            }}>
            <Icon name='plus' color={theme.textColor} size={ms(23, 0.3)} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flex: ms(0.9) }}
          data={data}
          renderItem={renderItem}
        />
      </View>
      <BottomSheetModal
        ref={todoBottomSheetModalRef}
        index={0}
        snapPoints={todoSnapPoints}
        backdropComponent={todoRenderBackdrop}
        keyboardBehavior='interactive'
        keyboardBlurBehavior='restore'
        android_keyboardInputMode='adjustResize'
        detached={true}
        bottomInset={ms(50, 0.3)}
        handleStyle={{
          backgroundColor: theme.backgroundColor,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginHorizontal: ms(10, 0.3),
          height: 0,
          borderColor: 'transparent',
          borderBottomWidth: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.textColor }}
        backgroundStyle={{
          backgroundColor: 'transparent',
          flex: 1,
        }}>
        <BottomSheetView
          style={[
            styles.bottomSheetContainer,
            { backgroundColor: theme.backgroundColor },
          ]}>
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
              fontFamily: 'Pretendard-Semibold',
              fontWeight: 'normal',
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
                realm.write(() => {
                  realm.create('Phrase', {
                    content: title,
                  });
                });
                dismiss();
                setTitle('');
              }
            }}>
            <Text
              style={[fontStyle.fontSizeSub, { color: theme.backgroundColor }]}>
              완료
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pharseLayout: {
    marginTop: ms(7, 0.3),
    padding: ms(15, 0.3),
    borderRadius: ms(5, 0.3),
  },
  font: {
    fontFamily: 'Pretendard-Medium',
    fontSize: ms(16, 0.3),
  },
  bottomSheetContainer: {
    flex: 1,
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: ms(20, 0.3),
    justifyContent: 'center',
  },
});

export default SettingPhrase;
