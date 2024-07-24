import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";


const CalendarBottomSheet = (): React.ReactElement => {

  // renders
  return (
    <BottomSheetView style={styles.container}>
      <Text>calender</Text>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CalendarBottomSheet;
