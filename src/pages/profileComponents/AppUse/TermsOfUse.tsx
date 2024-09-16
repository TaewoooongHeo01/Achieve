import {
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
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
import { topMargin } from '../../../assets/style/StackNavTopPadding';
import { fontStyle } from '../../../assets/style/fontStyle';

const TermsOfUse = (): React.ReactElement => {
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
      <View
        style={[topMargin.margin, { paddingHorizontal: ms(18, 0.3), flex: 1 }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              {
                color: theme.textColor,
                marginTop: ms(20, 0.3),
              },
            ]}>
            제 1 조 (목적)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            본 약관은 Achieve(이하 “앱”이라 합니다)에서 제공하는 서비스(이하
            “서비스”라 한다)를 이용함에 있어 앱과 이용자의 권리, 의무 및
            책임사항을 규정함을 목적으로 합니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              { color: theme.textColor, marginTop: ms(20, 0.3) },
            ]}>
            제 2 조 (용어의 정의)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 앱이란 사용자가 스마트폰 등의 기기를 통해 설치하여 서비스를
            이용할 수 있는 어플리케이션을 의미합니다.{'\n'}
            2. 이용자란 앱을 설치하고 서비스를 이용하는 모든 사용자를 말합니다.
            회원가입 여부와 관계없이 모든 사용자가 포함됩니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              { color: theme.textColor, marginTop: ms(20, 0.3) },
            ]}>
            제 3 조 (약관의 공시 및 효력과 변경)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 본 약관은 앱 내에 게시하여 공시하며, 앱은 사정변경 및 운영상
            중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은
            공지사항을 통해 공시합니다.{'\n'}
            2. 본 약관 및 차후 변경된 약관은 이용자에게 공시함으로써 효력을
            발생합니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              { color: theme.textColor, marginTop: ms(20, 0.3) },
            ]}>
            제 4 조 (약관 외 준칙)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            본 약관에 명시되지 않은 사항에 대해서는 관계 법령 및 상관례에
            따릅니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              { color: theme.textColor, marginTop: ms(20, 0.3) },
            ]}>
            제 5 조 (이용신청 및 회원가입)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. Achieve는 회원가입 절차 없이 서비스를 제공합니다. 사용자는 앱을
            설치함으로써 이용계약을 체결한 것으로 간주됩니다.{'\n'}
            2. 회원가입이 없으며, 이용자는 개인정보를 제공하지 않고도 서비스를
            이용할 수 있습니다.
          </Text>

          {/* 나머지 조항들을 동일한 형식으로 추가 */}

          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              {
                color: theme.textColor,
                marginTop: ms(20, 0.3),
                marginBottom: ms(7, 0.3),
              },
            ]}>
            제 13 조 (앱의 업데이트 및 변경)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 앱은 사용자 경험 개선, 서비스 개선 등을 위해 정기적 또는
            비정기적으로 업데이트될 수 있습니다.{'\n'}
            2. 앱의 업데이트는 기능 추가, 수정, 삭제, 디자인 변경 등을 포함할 수
            있으며, 이러한 변경 사항은 앱 내 공지 또는 앱 스토어의 업데이트
            설명을 통해 안내됩니다.{'\n'}
            3. 앱은 업데이트로 인해 사용자의 서비스 이용 방법이나 기능이 변경될
            수 있으며, 이로 인해 발생하는 불편함에 대해서는 별도의 책임을 지지
            않습니다.
          </Text>

          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              {
                color: theme.textColor,
                marginTop: ms(20, 0.3),
                marginBottom: ms(7, 0.3),
              },
            ]}>
            제 14 조 (데이터 삭제 및 복구 불가)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 앱 내에서 사용자가 데이터를 직접 삭제할 경우, 해당 데이터는
            복구가 불가능합니다.{'\n'}
            2. 앱은 서버에 데이터를 저장하지 않으며, 모든 데이터는 사용자의
            기기에 저장되므로, 삭제된 데이터는 다시 복구할 수 없습니다.{'\n'}
            3. 사용자가 데이터를 삭제할 경우, 그로 인해 발생하는 불이익에 대해
            앱은 책임을 지지 않습니다.
          </Text>
          <View style={{ height: ms(50, 0.3) }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  font: {
    lineHeight: ms(25, 0.3),
  },
});

export default TermsOfUse;
