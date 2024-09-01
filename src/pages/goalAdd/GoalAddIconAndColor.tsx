import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useColors } from '../../context/ThemeContext';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { fontStyle } from '../../assets/style/fontStyle';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { GoalAddIconAndColorProps } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconNames } from '../../utils/IconSet';
import { FlatList } from 'react-native-gesture-handler';
import { useRealm } from '@realm/react';
import { showAlert } from 'react-native-customisable-alert';
import GoalAddCompleteAlert from '../Alert/GoalAddCompleteAlert';

const GoalAddIconAndColor = ({
  route,
  navigation,
}: GoalAddIconAndColorProps) => {
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const realm = useRealm();
  const title = route.params.title;
  const description = route.params.description;

  const [icon, setIcon] = useState<string>('help');
  const [color, setColor] = useState<number>(0);

  const [iconSize, setIconSize] = useState<number>(0);

  const inputValid = (): boolean => {
    if (icon === 'help') {
      Alert.alert('아이콘을 선택해주세요');
      return false;
    }
    if (color === 0) {
      Alert.alert('컬러를 선택해주세요');
      return false;
    }
    return true;
  };

  const iconRenderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setIcon(item);
        }}
        style={{
          width: ms(40, 0.3),
          aspectRatio: 1,
          backgroundColor: '#F4F4F4',
          marginRight: ms(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: ms(5, 0.3),
          borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
          borderWidth: 0.2,
        }}>
        <Ionicons name={item} size={ms(25, 0.3)} />
      </TouchableOpacity>
    );
  };

  const colorRenderItem = ({ index }: { index: number }) => {
    if (index === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setColor(index);
        }}
        style={{
          width: ms(40, 0.3),
          aspectRatio: 1,
          marginRight: ms(5, 0.3),
          borderRadius: ms(5, 0.3),
          borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
          borderWidth: 0.2,
        }}>
        <LinearGradient
          style={{ flex: 1, borderRadius: ms(5, 0.3) }}
          colors={theme.gradientColor[index]}
        />
      </TouchableOpacity>
    );
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
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
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
        <View
          style={{
            flex: ms(0.6, 0.3),
            marginHorizontal: ms(20, 0.3),
          }}>
          <View
            style={{
              flex: ms(0.25, 0.3),
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={theme.gradientColor[color]}
              style={{
                width: ms(60, 0.3),
                height: ms(60, 0.3),
                borderRadius: ms(5, 0.3),
                justifyContent: 'center',
                alignItems: 'center',
                padding: ms(11, 0.3),
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                borderWidth: 0.2,
              }}>
              <View
                onLayout={e => {
                  setIconSize(e.nativeEvent.layout.height);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  aspectRatio: 1,
                }}>
                <Ionicons name={icon} size={iconSize} />
              </View>
            </LinearGradient>
          </View>
          <Text
            style={[
              fontStyle.fontSizeMain,
              { color: theme.textColor, marginBottom: ms(10, 0.3) },
            ]}>
            마음에 드는 아이콘과 컬러를 골라주세요
          </Text>
          <View
            style={{
              flex: ms(0.15, 0.3),
              marginBottom: ms(10, 0.3),
              backgroundColor: theme.backgroundColor,
              borderRadius: ms(5, 0.3),
            }}>
            <FlatList
              data={IconNames}
              renderItem={iconRenderItem}
              horizontal={true}
              style={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: ms(10, 0.3),
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                borderWidth: 0.2,
                borderRadius: ms(5, 0.3),
              }}
              keyExtractor={value => value.toString()}
            />
          </View>
          <View
            style={{
              flex: ms(0.15, 0.3),
              marginBottom: ms(10, 0.3),
              backgroundColor: theme.backgroundColor,
              borderRadius: ms(5, 0.3),
            }}>
            <FlatList
              data={theme.gradientColor}
              renderItem={colorRenderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: ms(10, 0.3),
                borderRadius: ms(5, 0.3),
                borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
                borderWidth: 0.2,
              }}
              keyExtractor={value => value.toString()}
            />
          </View>
        </View>
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
                realm.write(() => {
                  realm.create('Goal', {
                    title: title,
                    isComplete: false,
                    icon: icon,
                    color: color,
                    todos: [],
                    description: description,
                  });
                });
                navigation.navigate('Main');
                showAlert({
                  alertType: 'custom',
                  dismissable: true,
                  customAlert: (
                    <GoalAddCompleteAlert
                      theme={theme}
                      color={color}
                      icon={icon}
                    />
                  ),
                });
              }
            }}
            style={{
              width: '100%',
              height: ms(45, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: ms(5, 0.3),
              borderColor: Platform.OS === 'ios' ? '#ccc' : 'black',
              borderWidth: 0.2,
              backgroundColor: theme.textColor,
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

export default GoalAddIconAndColor;
