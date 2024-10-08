import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import TodoDetail from './Todolist';
import { ms } from 'react-native-size-matters';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import WeekCalender from '../../commonComponents/WeekCalendar';
import { dayNames, useDateContext } from '../../../context/DateContext';
import { useColors } from '../../../context/ThemeContext';
import { fontStyle } from '../../../assets/style/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import { makeDateFormatKey } from '../../../utils/makeDateFormatKey';
import MonthCalendar from '../../commonComponents/MonthCalendar';
import { useQuery } from '@realm/react';
import { Goal } from '../../../../realm/models';

const TodoDate = (): React.ReactElement => {
  const { theme } = useColors();
  const { taskDate, today, setTaskDate } = useDateContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const windowHeight = useWindowDimensions().height;
  const snapPoints = useMemo(() => [windowHeight > 668 ? '50%' : '60%'], []);
  const todoString = '해야 할 일 ';
  const goal = useQuery(Goal).filtered('isComplete == false');

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

  const [todoBottomSheetSnapPoint, setTodoBottomSheetSnapPoint] =
    useState<string>('55%');
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
          setTodoBottomSheetSnapPoint('100%');
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setTodoBottomSheetSnapPoint('55%');
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

  const year = String(taskDate.year);
  const month = String(taskDate.month).padStart(2, '0');
  const date = String(taskDate.date).padStart(2, '0');
  const day = taskDate.day;

  const taskDateFormat = Number(
    makeDateFormatKey(taskDate.year, taskDate.month, taskDate.date),
  );
  const todayFormat = Number(
    makeDateFormatKey(today.year, today.month, today.date),
  );

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
          <Pressable
            onPress={() => {
              handlePresentModal();
            }}>
            <Text
              style={[
                fontStyle.fontSizeMain,
                { paddingBottom: ms(2, 0.3) },
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
              setTaskDate(today);
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
        {taskDateFormat >= todayFormat && goal.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              const snp = windowHeight > 668 ? '55%' : '75%';
              setTodoBottomSheetSnapPoint(snp);
              todoHandlePresentModal();
            }}>
            <PlusIcon name='plus' color={theme.textColor} size={ms(25, 0.3)} />
          </TouchableOpacity>
        ) : (
          <PlusIcon
            name='plus'
            color={theme.textColor}
            style={{ opacity: 0 }}
            size={ms(25, 0.3)}
          />
        )}
      </View>
      <WeekCalender></WeekCalender>
      <TodoDetail theme={theme}></TodoDetail>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: theme.backgroundColor,
          borderTopRightRadius: ms(10, 0.3),
          borderTopLeftRadius: ms(10, 0.3),
          height: 0,
        }}
        style={{
          borderRadius: ms(10, 0.3),
          marginHorizontal: ms(15, 0.3),
        }}
        handleIndicatorStyle={{ backgroundColor: theme.textColor }}
        backgroundStyle={{
          backgroundColor: 'transparent',
          flex: 1,
        }}>
        <BottomSheetView
          style={[
            styles.bottomSheetContainer,
            {
              backgroundColor: theme.backgroundColor,
              marginTop: ms(-2, 0.3),
            },
          ]}>
          <MonthCalendar itemAdd={false}></MonthCalendar>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={todoBottomSheetModalRef}
        index={0}
        snapPoints={todoSnapPoints}
        backdropComponent={todoRenderBackdrop}
        keyboardBehavior='interactive'
        keyboardBlurBehavior='restore'
        android_keyboardInputMode='adjustResize'
        detached={true}
        bottomInset={50}
        handleStyle={{
          backgroundColor: theme.backgroundColor,
          borderTopRightRadius: ms(10, 0.3),
          borderTopLeftRadius: ms(10, 0.3),
          height: 0,
        }}
        style={{
          borderRadius: ms(10, 0.3),
          marginHorizontal: ms(15, 0.3),
        }}
        handleIndicatorStyle={{ backgroundColor: theme.textColor }}
        backgroundStyle={{
          backgroundColor: 'transparent',
          flex: 1,
        }}>
        <BottomSheetView
          style={[
            styles.bottomSheetContainer,
            { backgroundColor: theme.backgroundColor, marginTop: ms(-2, 0.3) },
          ]}>
          <MonthCalendar
            itemAdd={true}
            setTodoBottomSheetSnapPoint={setTodoBottomSheetSnapPoint}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: ms(30, 0.3),
    flex: 1,
  },
  subTitle: {
    paddingTop: ms(2, 0.3),
  },
  bottomSheetContainer: {
    flex: 1,
    // marginHorizontal: ms(10, 0.3),
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
