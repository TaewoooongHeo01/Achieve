import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
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
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { topMargin } from '../../assets/style/StackNavTopPadding';
import Introduction from '../onboarding/Introduction';

const HowToUse = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const darkmodeHightlight = '#415E46';
  const lightmodeHightlight = '#C3D5C6';
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
      <ScrollView style={[topMargin.margin, { flex: 1 }]}>
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
            backgroundColor: theme.appBackgroundColor,
            paddingTop: Platform.OS === 'android' ? ms(10, 0.3) : 0,
          }}>
          <View
            style={{
              flex: ms(1, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Introduction
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
            />
          </View>
          <View
            style={{
              flex: ms(0.3, 0.3),
              marginTop: ms(50, 0.3),
              paddingHorizontal: ms(18, 0.3),
            }}>
            <Text
              style={[
                {
                  color: theme.textColor,
                  marginVertical: ms(10, 0.3),
                  fontSize: ms(25, 0.3),
                  fontFamily: 'Pretendard-SemiBold',
                },
              ]}>
              <Text
                style={{
                  backgroundColor:
                    currentTheme === 'dark'
                      ? darkmodeHightlight
                      : lightmodeHightlight,
                }}>
                Achieve
              </Text>{' '}
              제대로 사용하기
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: ms(15, 0.3),
              }}>
              <Image
                source={require('../../assets/images/island.png')}
                resizeMode={'contain'}
                style={{
                  width: ms(170, 0.3),
                  height: ms(170, 0.3),
                  borderRadius: ms(5, 0.3),
                }}></Image>
            </View>
            <Text style={[font.font, { color: theme.textColor }]}>
              Achieve 는{' '}
              <Text
                style={{
                  backgroundColor:
                    currentTheme === 'dark'
                      ? darkmodeHightlight
                      : lightmodeHightlight,
                  fontFamily: 'Pretendard-Medium',
                }}>
                어떻게 원하는 바를 달성하고 끝까지 완수할 수 있을까?
              </Text>{' '}
              라는 질문에서 시작되었어요.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              사람들은 대개 열정을 가지고 무언가를 시작하지만, 시간이 지날수록
              흐려지는 경우가 많죠. 무엇이 문제였을까요? 의욕이 꺾여서? 의지와
              인내력이 부족해서? 이유는 많지만 이를 어떻게 해결할 수 있을지는 잘
              몰라요.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              사실, 먼 미래를 위해 지금부터 준비하는 것은 쉽지 않아요. 많은
              유혹에 의지도 약해질 수 있죠. 그리고 그럴 때마다 실패했다고
              자책하는 경우도 있고요.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              <Text
                style={{
                  backgroundColor:
                    currentTheme === 'dark'
                      ? darkmodeHightlight
                      : lightmodeHightlight,
                  fontFamily: 'Pretendard-Medium',
                }}>
                그래서 Achieve 는 지금, 이 순간에 집중해요.
              </Text>{' '}
              무언가에 몰입했을 때를 떠올려보세요. 힘든 것과 별개로 꽤 후련하지
              않았나요? Achieve 가 여러분에게 묻고 싶은 것은 “오늘 하루에 얼마나
              몰입했는가? “에요.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              <Text
                style={{
                  backgroundColor:
                    currentTheme === 'dark'
                      ? darkmodeHightlight
                      : lightmodeHightlight,
                  fontFamily: 'Pretendard-Medium',
                }}>
                Achieve는 목표(Goal)와 할 일(Todo), 이 두 가지만 존재해요.
              </Text>{' '}
              목표(Goal)는 내가 실현하고자 하는 방향으로, 중간에 길을 잃지
              않도록 하는 역할을 해요. 할 일(Todo)은 목표의 일부로서, 그날
              여러분이 해야 할 일들을 포함하죠.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              진짜 중요한 것은 할 일(Todo)이에요.{' '}
              <Text
                style={{
                  backgroundColor:
                    currentTheme === 'dark'
                      ? darkmodeHightlight
                      : lightmodeHightlight,
                  fontFamily: 'Pretendard-Medium',
                }}>
                강조하고 싶은 건 오늘 할 일들만큼은 온전히 몰입해 끝내보자는
                마음이에요.
              </Text>{' '}
              몰입한 오늘을 뒤돌아볼 때 여러분의 하루는 충만해져 있을 것이기
              때문이죠.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              다만 Achieve 에선 할 일을 미룰 수 있어요. 만약 할 일이 너무 많은데
              끝나는 데에만 조급하다면 몰입할 수 없기 때문이에요.
            </Text>
            <Text style={[font.font, { color: theme.textColor }]}>
              Achieve 를 통해 진짜 나에게 필요한 것들이 무엇인지 생각해 보고,
              몰입하여 하루를 채워보세요.
            </Text>
          </View>
          <View style={{ width: '100%', height: ms(40, 0.3) }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const font = StyleSheet.create({
  font: {
    fontFamily: 'Pretendard-Regaular',
    fontSize: ms(16, 0.3),
    marginVertical: ms(12, 0.3),
    lineHeight: ms(28, 0.3),
    opacity: 0.9,
  },
});

export default HowToUse;
