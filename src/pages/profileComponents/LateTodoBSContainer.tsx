import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TodoItemDetail from '../homeComponents/Todos/TodoItemDetail';
import { Todo } from '../../../realm/models';
import { Keyboard, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../context/ThemeContext';
import MonthCalendar from '../commonComponents/MonthCalendar';

const LateTodoBSContainer = ({
  item,
  itemDelete,
  completeDelete,
}: {
  item: Todo;
  itemDelete(todo: Todo): void;
  completeDelete(itemId: Realm.BSON.ObjectId): void;
}) => {
  const { theme } = useColors();

  const [todoBottomSheetSnapPoint, setTodoBottomSheetSnapPoint] =
    useState<string>('60%');
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
          setTodoBottomSheetSnapPoint('90%');
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setTodoBottomSheetSnapPoint('70%');
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
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ flex: 1 }}
        onPress={() => {
          todoHandlePresentModal();
        }}>
        <TodoItemDetail item={item} itemDelete={itemDelete} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={todoBottomSheetModalRef}
        index={0}
        snapPoints={todoSnapPoints}
        backdropComponent={todoRenderBackdrop}
        keyboardBehavior='interactive'
        keyboardBlurBehavior='restore'
        android_keyboardInputMode='adjustResize'
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
          <MonthCalendar
            itemAdd={true}
            setTodoBottomSheetSnapPoint={setTodoBottomSheetSnapPoint}
            item={item}
            completeDelete={completeDelete}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default LateTodoBSContainer;
