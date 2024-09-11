import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useColors } from '../../context/ThemeContext';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { fontStyle } from '../../assets/style/fontStyle';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { GoalAddDescriptionProps } from '../../../App';
import { topMargin } from '../../assets/style/StackNavTopPadding';

const GoalAddDescription = ({ route, navigation }: GoalAddDescriptionProps) => {
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const title = route.params.title;
  const [description, setDescription] = useState<string>('');

  // const tips = ['팁~~~~~~~~~~~', '탭~~~~~~~~~~~', '톡~~~~~~~~~~~~'];

  const inputValid = (): boolean => {
    console.log(description.trim().length);
    if (description.trim() === '') {
      Alert.alert('설명을 입력해주세요');
      return false;
    }
    if (description.trim().length > 400) {
      Alert.alert('설명은 400 자 이하로 해주세요');
      return false;
    }
    return true;
  };

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
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
          },
          topMargin.margin,
        ]}>
        <View
          style={{
            flex: ms(0.2, 0.3),
            paddingHorizontal: ms(18, 0.3),
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name='arrowleft'
                color={theme.textColor}
                size={ms(23, 0.3)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Main');
              }}>
              <Text style={[{ color: theme.textColor }, fontStyle.fontSizeSub]}>
                나가기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{
            flex: ms(0.6, 0.3),
            marginHorizontal: ms(20, 0.3),
            paddingTop: ms(50, 0.3),
          }}>
          <Text
            style={[
              fontStyle.fontSizeMain,
              { color: theme.textColor, marginBottom: ms(2, 0.3) },
            ]}>
            왜 이루고 싶나요?
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              { color: theme.textColor, marginBottom: ms(2, 0.3) },
            ]}>
            {title} 에 대한
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              { color: theme.textColor, marginBottom: ms(10, 0.3) },
            ]}>
            추가적인 설명을 자유롭게 해주세요
          </Text>
          {/* <Text
            style={[
              fontStyle.fontSizeMain,
              { color: theme.textColor, marginBottom: ms(10, 0.3) },
            ]}>
            얻고자 하는 건 무엇인가요?
            (무엇을, 어떻게 - '왜' 라고 직접적으로
            묻는 대신)
          </Text> */}
          <TextInput
            style={{
              width: '100%',
              height: ms(150, 0.3),
              borderRadius: ms(5, 0.3),
              marginBottom: ms(5, 0.3),
              color: theme.textColor,
              backgroundColor:
                currentTheme === 'light' ? '#F4F4F4' : theme.backgroundColor,
              borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
              // borderWidth: 0.2,
              padding: ms(7, 0.3),
              textAlignVertical: 'top',
            }}
            value={description}
            onChangeText={setDescription}
            onEndEditing={e => setDescription(e.nativeEvent.text.trim())}
            multiline={true}
          />
          {/* {tips.map((value, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: ms(5, 0.3),
                }}>
                <Circle
                  name='circle-medium'
                  color={theme.textColor}
                  size={ms(15, 0.3)}
                />
                <Text
                  style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                  {value}
                </Text>
              </View>
            );
          })} */}
        </TouchableOpacity>
        <View
          style={{
            flex: ms(0.2, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: ms(30, 0.3),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (inputValid()) {
                navigation.navigate('GoalAddIconAndColor', {
                  title: title,
                  description: description,
                });
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
              marginBottom: ms(5, 0.3),
              padding: ms(7, 0.3),
            }}>
            <Text
              style={[fontStyle.fontSizeSub, { color: theme.backgroundColor }]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity />
      </View>
    </SafeAreaView>
  );
};

export default GoalAddDescription;
