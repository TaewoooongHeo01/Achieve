import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { TaskDate, useDateContext } from '../context/DateContext';

const WeekCalender = (): React.ReactElement => {
  const dateContext = useDateContext();

  // useEffect(() => {}, dateContext);

  return (
    <View style={styles.layout}>
      <Text>week</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: 'white',
    marginTop: ms(10, 0.3),
    paddingVertical: ms(3, 0.3),
  },
});

export default WeekCalender;
