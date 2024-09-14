import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
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
import { useColors } from '../../context/ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery, useRealm } from '@realm/react';
import { Todo } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import LateTodoBSContainer from './LateTodoBSContainer';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { topMargin } from '../../assets/style/StackNavTopPadding';
import BottomSheetSimpleTextInput from '../commonComponents/BottomSheetSimpleTextInput';
import { Realm } from '@realm/react';

const LateTodo = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();
  const realm = useRealm();

  // const [todos, setTodos] = useState<Realm.Results<Todo & Realm.Object> | Todo[] | List<Todo>>([]);
  const todos = useQuery(Todo).filtered('date == "none"');

  const renderItem = ({ item }: { item: Todo }) => {
    console.log('renderItem: ' + item.title);
    return (
      <View style={{ marginVertical: ms(5, 0.3) }}>
        <LateTodoBSContainer item={item} itemDelete={itemDelete} />
      </View>
    );
  };

  const itemDelete = (itemId: string) => {
    const _id = new Realm.BSON.ObjectId(itemId);
    const item = realm.objectForPrimaryKey<Todo>('Todo', _id);
    realm.write(() => {
      realm.delete(item);
    });
  };

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
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: ms(20, 0.3),
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackgroundColor,
          // paddingTop: Platform.OS === 'android' ? ms(15, 0.3) : 0,
          paddingHorizontal: ms(20, 0.3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={[
                fontStyle.fontSizeMain,
                {
                  color: theme.textColor,
                  marginTop: ms(15, 0.3),
                },
              ]}>
              나중에 할 일
            </Text>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                  marginVertical: ms(2, 0.3),
                  marginBottom: ms(15, 0.3),
                },
              ]}>
              나중에 해야 할 일들을 간단하게 만들어보세요
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
          data={todos}
          renderItem={renderItem}
          keyExtractor={value => value._id.toString()}
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
          marginHorizontal: ms(15, 0.3),
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
          <BottomSheetSimpleTextInput mode={'lateTodo'} />
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    marginHorizontal: ms(15, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: ms(20, 0.3),
    justifyContent: 'center',
  },
});

export default LateTodo;
