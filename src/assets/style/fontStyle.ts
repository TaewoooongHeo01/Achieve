import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const fontStyle = StyleSheet.create({
  fontSizeMain: {
    fontSize: ms(20, 0.3),
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-SemiBold',
  },
  fontSizeSub: {
    fontSize: ms(15, 0.3),
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Medium',
  },
});
