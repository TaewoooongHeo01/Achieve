import { Platform, StatusBar, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';

const SettingPhrase = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: top,
          }}>
          <StatusBar
            barStyle={
              currentTheme === 'dark' ? 'light-content' : 'dark-content'
            }
          />
        </View>
      ) : (
        <StatusBar
          barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.appBackgroundColor}
        />
      )}
      <View style={{ paddingHorizontal: ms(18, 0.3) }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingPhrase;
