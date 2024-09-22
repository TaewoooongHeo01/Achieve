import {
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
import DeleteIcon from 'react-native-vector-icons/FontAwesome5';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import BottomSheetSimpleTextInput from '../../commonComponents/BottomSheetSimpleTextInput';
import { topMargin } from '../../../assets/style/StackNavTopPadding';

const SettingPhrase = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const phrases = useQuery(Phrase);
  const realm = useRealm();

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
          <DeleteIcon name='trash' color={theme.textColor} size={ms(15, 0.3)} />
        </TouchableOpacity>
      </View>
    );
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
        style={[
          topMargin.margin,
          {
            paddingHorizontal: ms(18, 0.3),
            flex: 1,
          },
        ]}>
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
          <BottomSheetSimpleTextInput mode={'phrase'} />
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
