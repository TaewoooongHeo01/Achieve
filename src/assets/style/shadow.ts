import { Platform, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const shadow =
  Platform.OS === 'ios'
    ? StyleSheet.create({
        boxShadow: {
          borderWidth: ms(0.2, 0.3),
          borderColor: '#ccc',
          shadowColor: '#000',
          shadowOffset: { width: ms(0.8, 0.3), height: ms(0.8, 0.3) },
          shadowOpacity: ms(0.1, 0.3),
          shadowRadius: 1,
          borderRadius: ms(5, 0.3),
        },
      })
    : StyleSheet.create({
        boxShadow: {
          borderColor: '#ccc',
          borderWidth: ms(0.2, 0.3),
          elevation: ms(0.4, 0.3),
        },
      });
