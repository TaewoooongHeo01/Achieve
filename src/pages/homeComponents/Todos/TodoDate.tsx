import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TodoDetail from './Todolist';
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
import { useColors } from '../../../context/ThemeContext';
import { fontStyle } from '../../../assets/style/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlusIcon from 'react-native-vector-icons/AntDesign';

const TodoDate = (): React.ReactElement => {
  const { theme } = useColors();
  const dateContext = useDateContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const todoString = '해야 할 일 ';

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
        opacity={0.8}
      />
    ),
    [],
  );

  const todoBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todoSnapPoints = useMemo(() => ['70%'], []);

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

  const year = dateContext.taskDate.year;
  const month = String(dateContext.taskDate.month).padStart(2, '0');
  const date = String(dateContext.taskDate.date).padStart(2, '0');
  const day = dateContext.taskDate.day;

  return (
    <View style={styles.layout}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable onPress={handlePresentModal}>
            <Text
              style={[
                fontStyle.fontSizeMain,
                { paddingBottom: ms(3, 0.3) },
                { color: theme.textColor },
              ]}>
              {todoString}
              <Icon name='chevron-down' color={theme.textColor}></Icon>
            </Text>
            <Text style={[styles.subTitle, { color: theme.textColor }]}>
              {year}.{month}.{date}.{dayNames[day !== undefined ? day : 0]}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dateContext.setTaskDate(dateContext.today);
            }}
            style={[
              styles.setTodayBtn,
              { backgroundColor: theme.textColor, marginLeft: ms(10, 0.3) },
            ]}>
            <Text
              style={[
                styles.setTodayBtnText,
                { color: theme.backgroundColor },
              ]}>
              오늘
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity onPress={todoHandlePresentModal}>
          <PlusIcon name='plus' color={theme.textColor} size={ms(25, 0.3)} />
        </TouchableOpacity>
      </View>
      <WeekCalender></WeekCalender>
      <TodoDetail></TodoDetail>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: theme.backgroundColor,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginHorizontal: ms(10, 0.3),
          height: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.textColor }}
        backgroundStyle={{
          backgroundColor: 'transparent',
          marginHorizontal: ms(10, 0.3),
          flex: 1,
        }}>
        <BottomSheetView
          style={[
            styles.bottomSheetContainer,
            { backgroundColor: theme.backgroundColor },
          ]}>
          <CalendarBottomSheet />
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={todoBottomSheetModalRef}
        index={0}
        snapPoints={todoSnapPoints}
        backdropComponent={todoRenderBackdrop}
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: theme.backgroundColor,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginHorizontal: ms(10, 0.3),
          height: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.textColor }}
        backgroundStyle={{
          backgroundColor: 'transparent',
          marginHorizontal: ms(10, 0.3),
          flex: 1,
        }}>
        <BottomSheetView
          style={[
            styles.bottomSheetContainer,
            { backgroundColor: theme.backgroundColor },
          ]}>
          <Text>todo</Text>
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
  subTitle: {
    paddingTop: ms(2, 0.3),
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: ms(20, 0.3),
    marginHorizontal: ms(10, 0.3),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  setTodayBtn: {
    padding: ms(7, 0.3),
    borderRadius: ms(5, 0.3),
  },
  setTodayBtnText: {
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default TodoDate;
