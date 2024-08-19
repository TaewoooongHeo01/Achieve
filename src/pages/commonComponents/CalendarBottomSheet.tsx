import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import MonthCalendar from './MonthCalendar';
import { useColors } from '../../context/ThemeContext';

const CalendarBottomSheet = (): React.ReactElement => {
  const { theme } = useColors();
  return (
    <BottomSheetView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <MonthCalendar></MonthCalendar>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ms(10, 0.3),
    alignContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CalendarBottomSheet;
