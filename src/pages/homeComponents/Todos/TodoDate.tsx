import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TodoDetail from './TodoDetail';
import { font } from '../../../utils/styleConst';
import { ms } from 'react-native-size-matters';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CalendarBottomSheet from '../../commonComponents/CalendarBottomSheet';
import WeekCalender from '../../commonComponents/WeekCalendar';
import { dayNames, useDateContext } from '../../../context/DateContext';

const TodoDate = (): React.ReactElement => {
  const dateContext = useDateContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.4}
      />
    ),
    [],
  );

  const year = dateContext.taskDate.year;
  const month = String(dateContext.taskDate.month).padStart(2, '0');
  const date = String(dateContext.taskDate.date).padStart(2, '0');
  const day = dateContext.taskDate.day;

  return (
    <View style={styles.layout}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={handlePresentModal}>
          <Text style={[styles.title, { paddingBottom: ms(3, 0.3) }]}>
            해야 할 일
          </Text>
          <Text style={styles.subTitle}>
            {year}.{month}.{date}.{dayNames[day !== undefined ? day : 0]}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            dateContext.setTaskDate(dateContext.today);
          }}
          style={styles.setTodayBtn}>
          <Text style={styles.setTodayBtnText}>오늘</Text>
        </Pressable>
      </View>
      <WeekCalender></WeekCalender>
      <TodoDetail></TodoDetail>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: '#282828',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginHorizontal: ms(10, 0.3),
          height: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        backgroundStyle={{
          backgroundColor: 'transparent',
          marginHorizontal: ms(10, 0.3),
          flex: 1,
        }}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <CalendarBottomSheet />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: ms(20, 0.3),
    flex: 1,
  },
  title: {
    color: font.mainColor.color,
    fontSize: font.mainSize.fontSize,
    fontWeight: 'bold', //font.mainWeight.fontWeight,
  },
  subTitle: {
    paddingTop: ms(2, 0.3), //왜 Intro, Goals 의 subText 와 padding 값이 달라지지?
    color: font.subText.color,
    fontSize: font.subSize.fontSize,
    fontWeight: 'bold',
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: ms(20, 0.3),
    backgroundColor: '#282828',
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  setTodayBtn: {
    backgroundColor: 'white',
    padding: ms(7, 0.3),
    borderRadius: ms(5, 0.3),
  },
  setTodayBtnText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TodoDate;
