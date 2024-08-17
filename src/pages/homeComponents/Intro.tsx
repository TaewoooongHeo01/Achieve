import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ms } from 'react-native-size-matters';
import { dayNames } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
import { fontStyle } from '../../style/fontStyle';

const Intro = ({ username }: { username: string }): React.JSX.Element => {
  const colors = useColors();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const day = now.getDay();

  return (
    <View style={styles.layout}>
      <Text
        style={[
          styles.title,
          fontStyle.fontSizeMain,
          { color: colors.theme.textColor },
        ]}>
        안녕하세요, {username}님
      </Text>
      <Text
        style={[
          styles.subTitle,
          fontStyle.fontSizeSub,
          { color: colors.theme.textColor },
        ]}>
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
  },
  subTitle: {
    paddingTop: ms(5, 0.3),
  },
});

export default Intro;
