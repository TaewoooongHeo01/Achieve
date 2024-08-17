import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const fontStyle = StyleSheet.create({
  fontSizeMain: {
    fontSize: ms(18, 0.3),
    fontWeight: 'bold',
  },
  fontSizeSub: {
    fontSize: ms(13, 0.3),
    fontWeight: 'bold',
  },
});
