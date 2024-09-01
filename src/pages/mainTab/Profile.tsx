import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { dayNames, useDateContext } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useQuery } from '@realm/react';
import { User } from '../../../realm/models';
import { shadow } from '../../assets/style/shadow';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

const Profile = (): React.JSX.Element => {
  const { today } = useDateContext();
  const { theme, currentTheme } = useColors();
  const [itemWidth, setItemWidth] = useState<number>(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useQuery(User)[0];

  // const [themeState, setThemeState] = useState<string>(currentTheme);

  // useEffect(() => {
  //   applyColor(themeState === 'light' ? Colors.light : Colors.dark, themeState);
  // }, [themeState]);

  /* <Button
    title='color change'
    onPress={() => {
      setThemeState(currentTheme === 'light' ? 'dark' : 'light');
    }}
  /> */

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.appBackgroundColor,
        paddingHorizontal: ms(20, 0.3),
      }}>
      <View
        onLayout={e => {
          setItemWidth(e.nativeEvent.layout.width / 2);
        }}>
        <Text
          style={[
            styles.title,
            fontStyle.fontSizeMain,
            { color: theme.textColor },
          ]}>
          안녕하세요, {user.username}님
        </Text>
        <Text
          style={[
            styles.subTitle,
            fontStyle.fontSizeSub,
            { color: theme.textColor, opacity: 0.7 },
          ]}>
          {today.year}.{today.month}.{today.date}.{' '}
          {dayNames[today.day ? today.day : 0]}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: ms(15, 0.3),
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('GoalAdd');
          }}>
          <View
            style={[
              currentTheme === 'light' ? shadow.boxShadow : {},
              { backgroundColor: theme.backgroundColor },
              styles.goalContainer,
            ]}>
            <Text
              style={[
                { color: theme.textColor, marginBottom: ms(5, 0.3) },
                fontStyle.fontSizeMain,
              ]}>
              목표 설정하기
            </Text>
            <Text style={[{ color: theme.textColor }, fontStyle.fontSizeSub]}>
              해야 할 일들의 대략적인 목표를 설정해보세요
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            marginTop: ms(15, 0.3),
            flexDirection: 'column',
          }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('HowToUse');
              }}
              style={[
                {
                  width: itemWidth - ms(7.5, 0.3),
                  aspectRatio: 1.7,
                },
                currentTheme === 'light' ? shadow.boxShadow : {},
              ]}>
              <View
                style={[
                  {
                    backgroundColor: theme.backgroundColor,
                  },
                  styles.profileTabContainer,
                ]}>
                <Text
                  style={[
                    fontStyle.fontSizeMain,
                    { color: theme.textColor, marginBottom: ms(3, 0.3) },
                  ]}>
                  Achieve
                </Text>
                <Text
                  style={[{ color: theme.textColor }, fontStyle.fontSizeSub]}>
                  제대로 사용하기
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('LateTodo');
              }}
              style={[
                {
                  width: itemWidth - ms(7.5, 0.3),
                  aspectRatio: 1.7,
                  borderRightWidth: 0.9,
                },
                currentTheme === 'light' ? shadow.boxShadow : {},
              ]}>
              <View
                style={[
                  {
                    backgroundColor: theme.backgroundColor,
                  },
                  styles.profileTabContainer,
                ]}>
                <Text
                  style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
                  나중에 할 일
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: ms(15, 0.3),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('Notes');
              }}
              style={[
                {
                  width: itemWidth - ms(7.4, 0.3),
                  aspectRatio: 1.7,
                },
                currentTheme === 'light' ? shadow.boxShadow : {},
              ]}>
              <View
                style={[
                  {
                    backgroundColor: theme.backgroundColor,
                  },
                  styles.profileTabContainer,
                ]}>
                <Text
                  style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
                  노트
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('Options');
              }}
              style={[
                {
                  width: itemWidth - ms(7.5, 0.3),
                  aspectRatio: 1.7,
                  borderRightWidth: 0.9,
                },
                currentTheme === 'light' ? shadow.boxShadow : {},
              ]}>
              <View
                style={[
                  {
                    backgroundColor: theme.backgroundColor,
                  },
                  styles.profileTabContainer,
                ]}>
                <Text
                  style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
                  설정
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: Platform.OS === 'ios' ? ms(7, 0.3) : ms(13, 0.3),
  },
  subTitle: {
    paddingTop: ms(5, 1),
  },
  goalContainer: {
    aspectRatio: 3,
    borderRadius: ms(5, 0.3),
    padding: ms(15, 0.3),
  },
  profileTabContainer: {
    flex: 1,
    padding: ms(15, 0.3),
    borderRadius: ms(5, 0.3),
  },
});

export default Profile;
