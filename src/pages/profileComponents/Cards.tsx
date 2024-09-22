import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
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
import { Goal } from '../../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import { fontStyle } from '../../assets/style/fontStyle';
import { topMargin } from '../../assets/style/StackNavTopPadding';
import LinearGradient from 'react-native-linear-gradient';
import GoalIcon from 'react-native-vector-icons/Ionicons';
import { shadow } from '../../assets/style/shadow';

const Cards = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();
  const goals = useQuery(Goal)
    .filtered('isComplete == true')
    .sorted('todoCnt', true);
  const windowWidth = useWindowDimensions().width;
  const [desc, setDesc] = useState<string>('');

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <View
        style={{
          width: windowWidth,
          height: ms(250, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={theme.gradientColor[item.color]}
          style={[GoalStyle.layout]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View
              style={[
                GoalStyle.titleContainer,
                {
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                },
              ]}>
              <View style={{ flex: 0.9 }}>
                <Text
                  style={[
                    GoalStyle.titleText,
                    fontStyle.BtnFont,
                    { color: 'black' },
                  ]}>
                  {item.title}
                </Text>
              </View>
              <View style={{}}>
                <Text style={[fontStyle.BtnFont, { color: 'black' }]}>
                  {item.todoCnt}
                </Text>
              </View>
            </View>
            <View
              style={[
                GoalStyle.iconD_day,
                { justifyContent: 'space-between', alignItems: 'center' },
              ]}>
              <Text style={[{ color: 'black' }, fontStyle.BtnFont]}>
                {item.startDate}-{item.endDate}
              </Text>
              <GoalIcon
                name={item.icon}
                size={ms(23, 0.3)}
                style={{ color: 'black' }}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
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
      <View style={[topMargin.margin, { flex: 1 }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3), paddingHorizontal: ms(18, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: ms(18, 0.3),
            marginBottom: ms(6, 0.3),
          }}>
          <Text
            style={[
              fontStyle.fontSizeMain,
              { color: theme.textColor, marginBottom: ms(2, 0.3) },
            ]}>
            달성한 목표들
          </Text>
          <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
            지금까지 달성한 목표들을 볼 수 있어요
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={goals}
            renderItem={renderItem}
            horizontal
            snapToInterval={windowWidth}
            snapToAlignment='center'
            decelerationRate='fast'
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: ms(130, 0.3),
            }}
            onViewableItemsChanged={({ viewableItems }) => {
              setDesc(() => viewableItems[0].item.description);
            }}
          />
          {desc === '' ? null : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[
                {
                  backgroundColor: theme.backgroundColor,
                  padding: ms(10, 0.3),
                  borderRadius: ms(5, 0.3),
                  width: ms(320, 0.3),
                  maxHeight: ms(300, 0.3),
                },
                shadow.boxShadow,
              ]}>
              <Text
                style={{
                  color: theme.textColor,
                  fontFamily: 'Pretendard-Medium',
                  fontSize: ms(16, 0.3),
                  lineHeight: ms(22, 0.3),
                }}>
                {desc}
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const GoalStyle = StyleSheet.create({
  layout: {
    width: ms(300, 0.3),
    height: ms(189, 0.3),
    borderRadius: ms(5, 0.3),
    padding: ms(20, 0.3),
  },
  titleContainer: {
    justifyContent: 'flex-start',
  },
  iconD_day: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  todoText: {
    fontSize: ms(13, 0.3),
    color: '#282828',
    fontFamily: 'Pretendard-Medium',
  },
  titleText: {
    fontSize: ms(16, 0.3),
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: ms(5, 0.3),
  },
});

export default Cards;
