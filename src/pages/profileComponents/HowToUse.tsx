import React from 'react';
import {
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
import { fontStyle } from '../../assets/style/fontStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { topMargin } from '../../assets/style/StackNavTopPadding';

const HowToUse = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
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
      <ScrollView
        style={[topMargin.margin, { flex: 1, paddingHorizontal: ms(18, 0.3) }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.appBackgroundColor,
            paddingTop: Platform.OS === 'android' ? ms(10, 0.3) : 0,
          }}>
          <Text style={fontStyle.fontSizeMain}>Achieve 제대로 사용하기</Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            Achieve 는 “어떻게 원하는 바를 달성하고 끝까지 완수할 수 있을까?”
            라는 질문에서 시작되었어요.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            사람들은 대개 열정을 가지고 무언가를 시작하지만, 시간이 지날수록
            흐려지는 경우가 많죠. 무엇이 문제였을까요? 의욕이 꺾여서? 의지와
            인내력이 부족해서? 무언가를 이루기 힘든 이유는 많지만 이를 어떻게
            해결할 수 있을 지는 잘 몰라요.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            사실, 먼 미래를 위해 지금부터 준비하는 것은 쉽지 않아요. 많은 유혹에
            의지도 약해질 수 있죠. 그리고 그럴 때마다 실패했다고 자책하는 경우도
            있고요.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            그래서 Achieve는 “지금, 이 순간”에 집중해요. 무언가에 몰입했을 때를
            떠올려보세요. 힘든 것과 별개로 꽤 후련하지 않았나요? Achieve 가
            여러분에게 묻고 싶은 것은 “오늘 하루에 얼마나 몰입했는가? “에요.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            Achieve는 목표와 할 일(Todo) 두 가지만 존재해요. 목표는 내가
            실현하고자 하는 방향으로, 추상적일 수 있지만, 중간에 길을 잃지
            않도록 하는 역할을 해요. 할 일은 목표의 일부로서, 그날 여러분이 해야
            할 일들을 포함하죠.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            진짜 중요한 것은 할 일(Todo)이에요. 사실 목표는 크게 중요하지
            않아요. 강조하고 싶은 건 오늘 할 일들 만큼은 온전히 몰입해
            끝내보자라는 마음이에요. 몰입한 오늘을 뒤돌아볼 때 여러분의 하루는
            충만해져 있을 것이기 때문이죠.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            우리가 현재에 충실해야 하는 이유는 간단해요. 지나간 시간대와 경험은
            돌아오지 않기 때문이죠. Achieve 에서도 이미 지나간 하루에 대해
            아무것도 할 수 없음을 명심하세요.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            Achieve 에는 오늘 할 일을 미룰 수 있어요. 만약 할 일이 너무 많은데
            끝나는 데에만 조급하다면 이건 충만한 하루가 될 수 없기 때문이죠.
          </Text>
          <Text style={[font.font, { color: theme.textColor }]}>
            결론적으로, Achieve 가 지향하는 것은 꽉 채운 하루에요. 일반적인 할
            일 목록, 습관 만들기와는 차이가 있어요. 내가 목표로 하는 것들을 먼저
            몰입하여 하루를 채우고, 그렇게 충만한 하루를 보내면 자연스레
            성과들을 얻게 될 거예요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const font = StyleSheet.create({
  font: {
    fontFamily: 'Pretendard-Medium',
    fontSize: ms(16, 0.3),
    marginVertical: ms(12, 0.3),
    lineHeight: ms(22, 0.3),
  },
});

export default HowToUse;
