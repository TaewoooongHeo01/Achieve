import { BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ms } from 'react-native-size-matters';

LocaleConfig.locales.fr = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const CalendarBottomSheet = (): React.ReactElement => {

  const [selected, setSelected] = useState('2024-07-25');
  const { dismiss } = useBottomSheetModal();

  // renders
  return (
    <BottomSheetView style={styles.container}>
      <Calendar
        theme={{
          arrowColor: 'white',
          calendarBackground: '#282828',
          textDayHeaderFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayFontWeight: '400',
          dayTextColor: 'white',
          monthTextColor: 'white',
        }}
        style={{ backgroundColor: '#282828' }}
        onDayPress={(day: any) => {
          dismiss();
          console.log(day);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'white', selectedTextColor: '#121212' },
        }}/>
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
