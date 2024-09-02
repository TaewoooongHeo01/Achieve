import { useRealm } from '@realm/react';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import { FullyDate, Todo } from '../../../../realm/models';
import { ms } from 'react-native-size-matters';
import { days } from '../../../context/DateContext';
import { useColors } from '../../../context/ThemeContext';
import { fontStyle } from '../../../assets/style/fontStyle';
import {
  BottomSheetTextInput,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/AntDesign';

const TodoEditBottomSheet = ({
  todo,
  setChanged,
  dateFormatKey,
  todayFormat,
}: {
  todo: Todo;
  setChanged(changed: boolean | ((changed: boolean) => boolean)): void;
  dateFormatKey: string;
  todayFormat: number;
}) => {
  const { theme, currentTheme } = useColors();
  const realm = useRealm();
  const { dismiss } = useBottomSheetModal();

  const [title, setTitle] = useState<string>('');
  const [weekCycle, setWeekCycle] = useState<number[]>([]);
  const [priority, setPriority] = useState<number>(2);

  useEffect(() => {
    setTitle(todo.title);
    setWeekCycle(todo.weekCycle);
    setPriority(todo.priority);
  }, []);

  const updateWeekCycle = (day: number) => {
    const newWeek = [...weekCycle];
    if (!newWeek.includes(day)) {
      newWeek.push(day);
    } else {
      const removeItemIdx = newWeek.indexOf(day);
      newWeek.splice(removeItemIdx, 1);
    }
    newWeek.sort();
    setWeekCycle(newWeek);
  };

  const inputValid = (): boolean => {
    if (title.trim() === '') {
      Alert.alert('제목을 입력해주세요');
      return false;
    }
    if (title.trim().length > 20) {
      Alert.alert('제목길이는 20자 이하로 설정해주세요');
      return false;
    }
    return true;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{
        flex: 1,
        flexDirection: 'column',
        marginTop: ms(15, 0.3),
        marginBottom: ms(-40, 0.3),
        marginHorizontal: ms(-5, 0.3),
        height: 100,
      }}>
      <View style={{ flex: ms(0.15, 0.3) }}>
        <Text
          style={[
            fontStyle.fontSizeSub,
            { marginBottom: ms(4, 0.3), color: theme.textColor },
          ]}>
          제목
        </Text>
        <BottomSheetTextInput
          value={title}
          onChangeText={setTitle}
          onEndEditing={e => setTitle(e.nativeEvent.text.trim())}
          style={{
            marginHorizontal: ms(10, 0.3),
            marginVertical: ms(5, 0.3),
            borderWidth: currentTheme === 'light' ? 0.2 : 0,
            borderRadius: Platform.OS === 'android' ? ms(5, 0.3) : ms(7, 0.5),
            padding: Platform.OS === 'android' ? ms(5, 0.3) : ms(10, 0.3),
            paddingLeft: Platform.OS === 'android' ? ms(10, 0.3) : null,
            borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
            backgroundColor:
              currentTheme === 'dark' ? theme.appBackgroundColor : '#F8F8F8',
            color: theme.textColor,
          }}
        />
      </View>
      <View style={{ flex: ms(0.16, 0.3) }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          중요도
        </Text>
        <View
          style={{
            marginTop: ms(7, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: ms(10, 0.3),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPriority(1);
            }}
            style={[
              styles.priorityBox,
              {
                borderWidth: currentTheme === 'light' ? 0.2 : 0,
                borderTopLeftRadius: ms(5, 0.3),
                borderBottomLeftRadius: ms(5, 0.3),
                backgroundColor:
                  priority === 1
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
              },
            ]}>
            <Icon name='exclamationcircle' color='green' size={ms(20, 0.3)} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPriority(2);
            }}
            activeOpacity={0.8}
            style={[
              styles.priorityBox,
              {
                borderWidth: currentTheme === 'light' ? 0.2 : 0,
                backgroundColor:
                  priority === 2
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderRadius: 1,
                borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
                marginLeft: ms(-0.1, 0.3),
                marginRight: ms(-0.1, 0.3),
              },
            ]}>
            <Icon name='exclamationcircle' color='orange' size={ms(20, 0.3)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPriority(3);
            }}
            style={[
              styles.priorityBox,
              {
                borderTopRightRadius: ms(5, 0.3),
                borderBottomRightRadius: ms(5, 0.3),
                borderWidth: currentTheme === 'light' ? 0.2 : 0,
                backgroundColor:
                  priority === 3
                    ? theme.textColor
                    : currentTheme === 'dark'
                      ? theme.appBackgroundColor
                      : '#F8F8F8',
                borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
              },
            ]}>
            <Icon name='exclamationcircle' color='red' size={ms(20, 0.3)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: ms(0.2, 0.3) }}>
        <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
          반복일
        </Text>
        <View
          style={{
            marginTop: ms(7, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: ms(10, 0.3),
          }}>
          {days.map((value, index) => {
            if (index === 0) {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateWeekCycle(index);
                  }}
                  key={index.toString()}
                  style={[
                    styles.dayBox,
                    {
                      borderWidth: currentTheme === 'light' ? 0.2 : 0,
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderTopLeftRadius: ms(5, 0.3),
                      borderBottomLeftRadius: ms(5, 0.3),
                      borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      color: weekCycle.includes(index)
                        ? theme.appBackgroundColor
                        : theme.textColor,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            } else if (index === 6) {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateWeekCycle(index);
                  }}
                  key={index.toString()}
                  style={[
                    styles.dayBox,
                    {
                      borderWidth: currentTheme === 'light' ? 0.2 : 0,
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderTopRightRadius: ms(5, 0.3),
                      borderBottomRightRadius: ms(5, 0.3),
                      borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      color: weekCycle.includes(index)
                        ? theme.appBackgroundColor
                        : theme.textColor,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateWeekCycle(index);
                  }}
                  key={index.toString()}
                  style={[
                    styles.dayBox,
                    {
                      borderWidth: currentTheme === 'light' ? 0.2 : 0,
                      backgroundColor: weekCycle.includes(index)
                        ? theme.textColor
                        : currentTheme === 'dark'
                          ? theme.appBackgroundColor
                          : '#F8F8F8',
                      borderColor: Platform.OS === 'ios' ? '#ccc' : '#737373',
                      borderRadius: Platform.OS === 'ios' ? 0 : ms(0.01, 0.1),
                      marginLeft: ms(-1, 0.3),
                      marginRight: ms(-1, 0.3),
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      color: weekCycle.includes(index)
                        ? theme.appBackgroundColor
                        : theme.textColor,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
      <View style={{ flex: ms(0.23, 0.3), marginTop: ms(5, 0.3) }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: ms(7, 0.3),
            marginBottom: ms(8, 0.3),
            marginHorizontal: ms(10, 0.3),
          }}
          onPress={() => {
            const fd = realm.objectForPrimaryKey<FullyDate>(
              'FullyDate',
              dateFormatKey,
            );
            let removeDate = false;
            if (fd?.todos.length === 1) {
              removeDate = true;
            }
            setChanged(changed => !changed);
            realm.write(() => {
              realm.delete(todo);
              if (removeDate) {
                realm.delete(fd);
              }
            });
          }}>
          <Text
            style={{
              color: theme.backgroundColor,
              fontFamily: 'Pretendard-Regular',
            }}>
            삭제
          </Text>
        </TouchableOpacity>
        {String(todayFormat) === dateFormatKey && !todo.isComplete ? (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: theme.textColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: ms(7, 0.3),
              marginHorizontal: ms(10, 0.3),
            }}
            onPress={() => {
              if (inputValid()) {
                realm.write(() => {
                  todo.title = title;
                  todo.priority = priority;
                  todo.weekCycle = weekCycle;
                });
              }
              dismiss();
            }}>
            <Text
              style={{
                color: theme.backgroundColor,
                fontFamily: 'Pretendard-Regular',
              }}>
              완료
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: theme.appBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: ms(7, 0.3),
              marginHorizontal: ms(10, 0.3),
              opacity: 0.6,
            }}>
            <Text
              style={{
                color: theme.backgroundColor,
                fontFamily: 'Pretendard-Regular',
              }}>
              완료
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(10, 0.3),
  },
  priorityBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(10, 0.3),
  },
});

export default TodoEditBottomSheet;
