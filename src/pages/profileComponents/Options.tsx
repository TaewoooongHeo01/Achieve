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
import { useColors } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from '@realm/react';
import { User } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import { shadow } from '../../assets/style/shadow';
import { topMargin } from '../../assets/style/StackNavTopPadding';
import { version } from '../../../package.json';

type Setting = {
  title: string;
  subTitle: string;
};

const Options = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();
  const user = useQuery(User)[0];
  const boxHeight = ms(50, 0.3);

  const acount: Setting = {
    title: user.username,
    subTitle: '이름 수정하기',
  };

  const setting: Setting[] = [
    {
      title: '문구',
      subTitle: '나만의 문구 수정하기',
    },
    {
      title: '일반',
      subTitle: '화면 테마',
    },
  ];

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
      <View style={[topMargin.margin, { paddingHorizontal: ms(18, 0.3) }]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
        <Text
          style={[
            fontStyle.fontSizeMain,
            { color: theme.textColor, marginTop: ms(27, 0.3) },
          ]}>
          계정
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingUser');
          }}
          activeOpacity={0.8}
          style={[
            {
              backgroundColor: theme.backgroundColor,
              marginBottom: ms(20, 0.3),
              height: boxHeight,
            },
            styles.container,
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <View>
            <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
              {acount.title}
            </Text>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                  opacity: 0.5,
                },
              ]}>
              {acount.subTitle}
            </Text>
          </View>
          <Icon name='right' color={theme.textColor} size={ms(17, 0.3)} />
        </TouchableOpacity>
        <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
          설정
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('SettingPhrase');
          }}
          style={[
            {
              backgroundColor: theme.backgroundColor,
              height: boxHeight,
            },
            styles.container,
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <View>
            <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
              {setting[0].title}
            </Text>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                  opacity: 0.5,
                },
              ]}>
              {setting[0].subTitle}
            </Text>
          </View>
          <Icon name='right' color={theme.textColor} size={ms(17, 0.3)} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('SettingScreen');
          }}
          style={[
            {
              backgroundColor: theme.backgroundColor,
              height: boxHeight,
            },
            styles.container,
            currentTheme === 'light' ? shadow.boxShadow : {},
          ]}>
          <View>
            <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
              {setting[1].title}
            </Text>
            <Text
              style={[
                fontStyle.fontSizeSub,
                {
                  color: theme.textColor,
                  opacity: 0.5,
                },
              ]}>
              {setting[1].subTitle}
            </Text>
          </View>
          <Icon name='right' color={theme.textColor} size={ms(17, 0.3)} />
        </TouchableOpacity>
        <View style={{ marginTop: ms(20, 0.3) }}>
          <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
            이용안내
          </Text>
          <View
            style={[
              {
                backgroundColor: theme.backgroundColor,
                height: boxHeight,
              },
              styles.container,
              currentTheme === 'light' ? shadow.boxShadow : {},
            ]}>
            <View>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                앱 버전
              </Text>
              <Text
                style={[
                  fontStyle.fontSizeSub,
                  {
                    color: theme.textColor,
                    opacity: 0.5,
                  },
                ]}>
                {version}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('UserInformation');
            }}
            style={[
              {
                backgroundColor: theme.backgroundColor,
                height: boxHeight,
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
                개인정보 처리방침
              </Text>
            </View>
            <Icon name='right' color={theme.textColor} size={ms(17, 0.3)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('TermsOfUse');
            }}
            style={[
              {
                backgroundColor: theme.backgroundColor,
                height: boxHeight,
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
                이용약관
              </Text>
            </View>
            <Icon name='right' color={theme.textColor} size={ms(17, 0.3)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('License');
            }}
            style={[
              {
                backgroundColor: theme.backgroundColor,
                height: boxHeight,
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
                라이선스
              </Text>
            </View>
            <Icon name='right' color={theme.textColor} size={ms(17, 0.3)} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(6, 0.3),
    marginTop: ms(7, 0.3),
    borderRadius: ms(5, 0.3),
    paddingHorizontal: ms(15, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Options;
