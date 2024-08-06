import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ms } from 'react-native-size-matters';
import { font } from '../../utils/styleConst';
import { dayNames } from '../../context/DateContext';
import { UserData } from '../mainTab/Home';

type UserDataProps = {
  userData: UserData | undefined;
};

const Intro = ({ userData }: UserDataProps): React.JSX.Element => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const day = now.getDay();

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>안녕하세요, {userData?.username ?? ''}님</Text>
      <Text style={styles.subTitle}>
        {year}.{month}.{date}. {dayNames[day]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? ms(5, 0.3) : ms(10, 0.3),
    color: font.mainColor.color,
    fontSize: font.mainSize.fontSize,
    fontWeight: font.mainWeight.fontWeight,
  },
  subTitle: {
    paddingTop: ms(5, 0.3),
    color: font.subText.color,
    fontSize: font.subSize.fontSize,
    fontWeight: font.subWeight.fontWeight,
  },
});

export default Intro;
