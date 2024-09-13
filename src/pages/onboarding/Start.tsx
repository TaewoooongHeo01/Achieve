import { useNavigation } from '@react-navigation/native';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';

const Start = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: '#121212' }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: top,
          }}>
          <StatusBar barStyle={'light-content'} />
        </View>
      ) : (
        <StatusBar barStyle={'light-content'} backgroundColor={'#121212'} />
      )}
      <View
        style={{
          flex: ms(0.7, 0.3),
          justifyContent: 'center',
          paddingHorizontal: ms(18, 0.3),
          paddingBottom: ms(50, 0.3),
        }}>
        <Text style={[fontStyle.fontSizeMain, { color: 'white' }]}>
          안녕하세요👋
        </Text>
        <Text style={[fontStyle.fontSizeMain, { color: 'white' }]}>
          Achieve 에 오신걸 환영해요
        </Text>
      </View>
      <View
        style={{
          flex: ms(0.3, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: ms(30, 0.3),
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('UserOnboarding');
          }}
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: ms(43, 0.3),
            borderRadius: ms(5, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[{ color: '#282828' }, fontStyle.BtnFont]}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Start;
