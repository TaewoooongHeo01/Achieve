import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TodoDetail from './TodoDetail'; 
import { font } from "../../const/styleConst";
import { ms } from 'react-native-size-matters';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import CalendarBottomSheet from '../commonComponents/CalendarBottomSheet';

const TodoDate = (): React.ReactElement => {
  
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);  
  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback( (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.4}
    />
  ), []);

  // 임시로 만든 날짜. 추후 달력 시스템 만들어서 날짜 선택하도록 수정해야 함
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  return (
    <View style={styles.layout}>
        <TouchableOpacity onPress={handlePresentModal}>
            <Text style={styles.title}>{year}.{month}.{date}</Text>
        </TouchableOpacity>
        <TodoDetail />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          detached={true}
          bottomInset={50}
          handleStyle={{ backgroundColor: '#282828', borderTopRightRadius: 15, borderTopLeftRadius: 15, marginHorizontal: ms(10, 0.3), height: 0 }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
          backgroundStyle={{ backgroundColor: 'transparent', marginHorizontal: ms(10, 0.3), flex: 1 }}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <CalendarBottomSheet />
          </BottomSheetView>
        </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    marginTop: ms(20, 0.3),
    flex: 1, 
  },
  title: {
    color: font.mainColor.color,
    fontSize: font.mainSize.fontSize,
    fontWeight: font.mainWeight.fontWeight,
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: ms(20, 0.3),
    backgroundColor: '#282828',
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default TodoDate;
