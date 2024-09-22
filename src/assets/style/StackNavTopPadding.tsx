import { Platform, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const topMargin =
  Platform.OS === 'android'
    ? StyleSheet.create({ margin: { marginTop: ms(20, 0.3) } })
    : StyleSheet.create({ margin: { marginTop: ms(5, 0.3) } });
