import {
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TextInput,
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
import { useQuery, useRealm } from '@realm/react';
import { User } from '../../../../realm/models';
import { useState } from 'react';
import { fontStyle } from '../../../assets/style/fontStyle';

const SettingUser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const user = useQuery(User)[0];
  const [username, setUsername] = useState<string>(user.username);
  const realm = useRealm();

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
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginBottom: ms(20, 0.3), paddingHorizontal: ms(18, 0.3) }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: ms(18, 0.3),
          }}>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: ms(0.32, 0.3),
            }}>
            <Text
              style={[
                fontStyle.fontSizeMain,
                { color: theme.textColor, marginBottom: ms(10, 0.3) },
              ]}>
              이름을 입력하세요
            </Text>
            <TextInput
              style={{
                width: '100%',
                height: ms(40, 0.3),
                borderRadius: ms(5, 0.3),
                marginBottom: ms(5, 0.3),
                color: theme.textColor,
                backgroundColor:
                  currentTheme === 'light' ? '#F4F4F4' : theme.backgroundColor,
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                // borderWidth: 0.2,
                padding: ms(7, 0.3),
              }}
              value={username}
              onChangeText={setUsername}
              onEndEditing={e => setUsername(e.nativeEvent.text.trim())}
            />
          </View>
          <View
            style={{
              flex: ms(0.68, 0.3),
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (username !== '') {
                  realm.write(() => {
                    user.username = username;
                  });
                  navigation.goBack();
                }
              }}
              style={{
                width: '100%',
                height: ms(45, 0.3),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ms(5, 0.3),
                backgroundColor: theme.textColor,
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                borderWidth: 0.2,
                marginBottom: ms(70, 0.3),
                padding: ms(7, 0.3),
              }}>
              <Text
                style={[
                  fontStyle.fontSizeSub,
                  { color: theme.backgroundColor },
                ]}>
                다음
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingUser;
