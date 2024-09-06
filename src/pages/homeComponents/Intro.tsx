import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useColors } from '../../context/ThemeContext';
import { useQuery } from '@realm/react';
import { Phrase, User } from '../../../realm/models';
import { shadow } from '../../assets/style/shadow';

const Intro = (): React.JSX.Element => {
  const { theme, currentTheme } = useColors();

  const ph = useQuery(Phrase);
  const username = useQuery(User)[0].username;
  let phrase = '';

  for (let i = 0; i < ph.length; i++) {
    const idx = Math.floor(Math.random() * ph.length);
    phrase = ph[idx].content;
  }

  return (
    <View style={styles.layout}>
      <View
        style={[
          styles.pharseLayout,
          currentTheme === 'light' ? shadow.boxShadow : {},
          {
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <Text
          style={[
            { color: theme.textColor, lineHeight: ms(23, 0.3) },
            styles.font,
          ]}>
          {phrase === '' ? `${username} 님 오늘도 파이팅하세요` : `${phrase}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? ms(7, 0.3) : ms(13, 0.3),
  },
  subTitle: {
    paddingTop: ms(5, 1),
  },
  pharseLayout: {
    marginTop: ms(20, 0.3),
    padding: ms(15, 0.3),
    borderRadius: ms(5, 0.3),
  },
  font: {
    fontFamily: 'Pretendard-Medium',
    fontSize: ms(16, 0.3),
  },
});

export default Intro;
