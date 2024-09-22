import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GoalEditProps } from '../../../App';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { fontStyle } from '../../assets/style/fontStyle';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { showAlert } from 'react-native-customisable-alert';
import DeleteGoalAlert from '../Alert/DeleteGoalAlert';
import CompleteGoalAlert from '../Alert/CompleteGoalAlert';
import { useObject, useRealm } from '@realm/react';
import { Goal } from '../../../realm/models';
import { Realm } from '@realm/react';
import { topMargin } from '../../assets/style/StackNavTopPadding';

const GoalEdit = ({ route, navigation }: GoalEditProps) => {
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const goalId = new Realm.BSON.ObjectId(route.params.goalId);
  const goal = useObject(Goal, goalId);

  const [title, setTitle] = useState<string | undefined>(
    goal ? goal.title : undefined,
  );
  const [description, setDescription] = useState<string | undefined>(
    goal ? goal.description : undefined,
  );
  const realm = useRealm();

  const isValid = () => {
    if (title === '') {
      Alert.alert('제목을 입력해주세요');
      return false;
    }
    if (title && title?.length > 30) {
      Alert.alert('제목의 길이는 30 자 이하로 설정해주세요');
      return false;
    }
    if (description === '') {
      Alert.alert('설명을 입력해주세요');
      return false;
    }
    if (description && description.length > 400) {
      Alert.alert('설명의 길이는 400 자 이하로 해주세요');
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
            marginHorizontal: ms(18, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          topMargin.margin,
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' size={ms(23, 0.3)} color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: ms(18, 0.3),
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={{ marginTop: ms(20, 0.3) }}>
            <View
              style={{
                justifyContent: 'flex-start',
              }}>
              <Text
                style={[
                  fontStyle.fontSizeMain,
                  { color: theme.textColor, marginBottom: ms(10, 0.3) },
                ]}>
                제목
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: ms(40, 0.3),
                  borderRadius: ms(5, 0.3),
                  marginBottom: ms(5, 0.3),
                  color: theme.textColor,
                  backgroundColor:
                    currentTheme === 'light'
                      ? '#F4F4F4'
                      : theme.backgroundColor,
                  borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                  // borderWidth: 0.2,
                  padding: ms(7, 0.3),
                }}
                value={title}
                onChangeText={setTitle}
                onEndEditing={e => setTitle(e.nativeEvent.text.trim())}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                marginTop: ms(20, 0.3),
              }}>
              <Text
                style={[
                  fontStyle.fontSizeMain,
                  { color: theme.textColor, marginBottom: ms(10, 0.3) },
                ]}>
                설명
              </Text>
              <KeyboardAvoidingView behavior='position'>
                <TextInput
                  style={{
                    width: '100%',
                    height: ms(225, 0.3),
                    borderRadius: ms(5, 0.3),
                    marginBottom: ms(5, 0.3),
                    color: theme.textColor,
                    backgroundColor:
                      currentTheme === 'light'
                        ? '#F4F4F4'
                        : theme.backgroundColor,
                    borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                    padding: ms(7, 0.3),
                    textAlignVertical: 'top',
                  }}
                  multiline={true}
                  value={description}
                  onChangeText={setDescription}
                  onEndEditing={e => setDescription(e.nativeEvent.text.trim())}
                />
              </KeyboardAvoidingView>
            </View>
            <Text
              style={[
                { marginTop: ms(20, 0.3), color: theme.textColor },
                fontStyle.fontSizeMain,
              ]}>
              설정
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: ms(10, 0.3),
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (goal) {
                    navigation.navigate('Main');
                    showAlert({
                      alertType: 'custom',
                      dismissable: true,
                      customAlert: (
                        <DeleteGoalAlert goal={goal} todos={goal.todos} />
                      ),
                    });
                  }
                }}
                style={{
                  width: '48%',
                  height: ms(45, 0.3),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: ms(5, 0.3),
                  backgroundColor: theme.red,
                  borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                  marginBottom: ms(70, 0.3),
                  padding: ms(7, 0.3),
                }}>
                <Text style={[fontStyle.BtnFont, { color: theme.textColor }]}>
                  목표 삭제
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Main');
                  if (goal) {
                    showAlert({
                      alertType: 'custom',
                      dismissable: true,
                      customAlert: <CompleteGoalAlert goal={goal} />,
                    });
                  }
                }}
                style={{
                  width: '48%',
                  height: ms(45, 0.3),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: ms(5, 0.3),
                  backgroundColor: theme.green,
                  borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                  marginBottom: ms(70, 0.3),
                  padding: ms(7, 0.3),
                }}>
                <Text style={[fontStyle.BtnFont, { color: theme.textColor }]}>
                  목표 완료
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (isValid() && title && description && goal) {
                  realm.write(() => {
                    goal.title = title;
                    goal.description = description;
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
                변경
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GoalEdit;
