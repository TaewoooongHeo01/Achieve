import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { fontStyle } from '../../../assets/style/fontStyle';
import Colors from '../../../assets/style/ThemeColor';
import { shadow } from '../../../assets/style/shadow';

const SettingScreen = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme, applyColor } = useColors();
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            applyColor(Colors.light, 'light');
          }}
          style={[
            {
              backgroundColor: theme.backgroundColor,
            },
            styles.container,
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <View>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                },
              ]}>
              라이트모드
            </Text>
          </View>
          {currentTheme === 'light' ? (
            <Icon name='check' color={theme.textColor} size={ms(17, 0.3)} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            applyColor(Colors.dark, 'dark');
          }}
          style={[
            {
              backgroundColor: theme.backgroundColor,
            },
            styles.container,
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <View>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                },
              ]}>
              다크모드
            </Text>
          </View>
          {currentTheme === 'dark' ? (
            <Icon name='check' color={theme.textColor} size={ms(17, 0.3)} />
          ) : null}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(13, 0.3),
    marginTop: ms(7, 0.3),
    borderRadius: ms(5, 0.3),
    paddingHorizontal: ms(15, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingScreen;
