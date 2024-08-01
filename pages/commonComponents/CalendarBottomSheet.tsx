import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import MonthCalendar from './MonthCalendar';

const CalendarBottomSheet = (): React.ReactElement => {
  // renders
  return (
    <BottomSheetView style={styles.container}>
      <MonthCalendar></MonthCalendar>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ms(10, 0.3),
    alignContent: 'center',
    backgroundColor: '#282828',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CalendarBottomSheet;
