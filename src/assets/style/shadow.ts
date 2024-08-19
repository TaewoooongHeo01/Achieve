import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const shadow = StyleSheet.create({
  boxShadow: {
    borderWidth: 0.6,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: ms(7, 0.3),
  },
});
