import { Platform, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const shadow =
  Platform.OS === 'ios'
    ? StyleSheet.create({
        boxShadow: {
          borderWidth: 0.2,
          borderColor: '#ccc',
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          borderRadius: ms(5, 0.3),
        },
      })
    : StyleSheet.create({
        boxShadow: {
          elevation: 2,
        },
      });
