import React, { useCallback, useMemo, useRef } from 'react';
import TodoItemDetail from '../homeComponents/Todos/TodoItemDetail';
import { Todo } from '../../../realm/models';
import { Text, TouchableOpacity } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../context/ThemeContext';

const LateTodoBSContainer = ({ item }: { item: Todo }) => {
  const { theme } = useColors();
  const todoBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todoSnapPoints = useMemo(() => ['45%'], []);
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
        <TodoItemDetail item={item} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={todoBottomSheetModalRef}
        index={0}
        snapPoints={todoSnapPoints}
        backdropComponent={todoRenderBackdrop}
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: theme.textColor,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginHorizontal: ms(10, 0.3),
          height: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.backgroundColor }}
        backgroundStyle={{
          marginHorizontal: ms(10, 0.3),
          flex: 1,
        }}>
        <BottomSheetView>
          <Text>{item.title}</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default LateTodoBSContainer;
