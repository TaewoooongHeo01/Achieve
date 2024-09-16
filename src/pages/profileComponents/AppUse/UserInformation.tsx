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
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { topMargin } from '../../../assets/style/StackNavTopPadding';
import { fontStyle } from '../../../assets/style/fontStyle';

const UserInformation = (): React.ReactElement => {
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
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor, marginTop: ms(20, 0.3) },
            ]}>
            Achieve(이하 ‘Achieve’)은(는) 「개인정보 보호법」 제30조에 따라
            정보주체의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게
            처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
            수립·공개합니다. 이 개인정보처리방침은 2024년 9월 16일부터
            적용됩니다.
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
            제1조(개인정보의 처리 목적)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            Achieve은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
            받는 등 필요한 조치를 이행할 예정입니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 서비스 제공
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            • Achieve는 앱 내 로컬 데이터 저장 및 서비스 제공을 위해 개인정보를
            처리합니다.
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
            제2조(개인정보의 처리 및 보유 기간)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. Achieve는 개인정보를 서버에 보유하지 않으며, 모든 데이터는 로컬
            저장소에 저장됩니다. 따라서 개인정보의 서버 보유 및 이용 기간은
            없습니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            2. 앱 삭제 시 사용자의 모든 데이터는 자동으로 영구 삭제됩니다.{' '}
          </Text>
          <Text
            style={[
              fontStyle.fontSizeMain,
              styles.font,
              { color: theme.textColor, marginTop: ms(20, 0.3) },
            ]}>
            제3조(처리하는 개인정보의 항목)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. Achieve는 특정 개인을 식별할 수 없는 사용자 입력 정보(닉네임
            등)를 사용자의 로컬 저장소에 저장할 수 있습니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            2. 이 정보는 서버에 저장되지 않으며, 사용자가 입력한 내용에 따라
            앱의 기본 기능을 제공하는 데 사용됩니다.
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
            제4조(개인정보의 파기절차 및 파기방법)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. Achieve는 개인정보 보유 기간이 존재하지 않으며, 사용자가 앱을
            삭제할 때 로컬 저장소에 저장된 모든 데이터는 자동으로 영구
            삭제됩니다.
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
            제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 정보주체는 Achieve에 대해 언제든지 개인정보
            열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            2. 해당 권리 행사는 사용자가 앱 내에서 직접 수행할 수 있으며, 이에
            대해 Achieve는 별도의 서버에 정보를 보유하지 않으므로 지체 없이 요청
            사항을 반영합니다.
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
            제6조(개인정보의 안전성 확보조치에 관한 사항)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. Achieve는 로컬 저장소에 데이터를 저장하고 서버와 연결되지
            않으므로, 외부로 개인정보가 유출될 위험이 없습니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            2. 앱 삭제 시 모든 정보는 영구 삭제됩니다.
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
            제7조(쿠키 및 행태정보의 수집·이용·제공 및 거부에 관한 사항)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            Achieve는 쿠키를 사용하지 않으며, 행태정보를 수집하지 않습니다.
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
            제8조(개인정보 제3자 제공 여부)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            Achieve는 사용자의 개인정보를 제3자에게 제공하지 않습니다.
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
            제9조(가명정보 처리에 관한 사항)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            Achieve는 개인정보를 가명 처리하지 않으며, 사용자가 입력한 이름 또는
            닉네임 등은 사용자의 선택에 따라 입력된 정보로, 특정 개인을 식별하기
            위한 목적으로 사용되지 않습니다.
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
            제10조(개인정보 보호책임자에 관한 사항)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. Achieve는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다:
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            • 성명: 허태웅
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            • 이메일: chamjoeun0111@gmail.com
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
            제11조(국내대리인의 지정)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            Achieve는 국내대리인을 지정하지 않았습니다.
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
            제12조(영상정보처리기기 운영·관리에 관한 사항)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            Achieve는 영상정보처리기기(CCTV)를 설치하거나 운영하지 않습니다.
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
            제13조(개인정보 처리방침 변경)
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            1. 이 개인정보 처리방침은 2024년 9월 16일부터 적용됩니다.
          </Text>
          <Text
            style={[
              fontStyle.fontSizeSub,
              styles.font,
              { color: theme.textColor },
            ]}>
            2. 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다:
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

export default UserInformation;
