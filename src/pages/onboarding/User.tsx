import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TextInput,
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
import { useState } from 'react';
import { useRealm } from '@realm/react';

const UserOnboarding = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState<string>('');
  const realm = useRealm();

  const { top } = useSafeAreaInsets();

  const isValid = () => {
    if (username === '') {
      Alert.alert('이름을 입력해주세요');
      return false;
    } else if (username.length >= 20) {
      Alert.alert('이름은 20 자 이하로 설정해주세요');
      return false;
    }
    return true;
  };

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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{
          flex: ms(0.7, 0.3),
          justifyContent: 'center',
          paddingHorizontal: ms(18, 0.3),
          paddingBottom: ms(50, 0.3),
        }}>
        <Text
          style={[
            fontStyle.fontSizeMain,
            { color: 'white', marginBottom: ms(5, 0.3) },
          ]}>
          이름을 알려주세요
        </Text>
        <TextInput
          style={{
            width: '100%',
            height: ms(40, 0.3),
            borderRadius: ms(5, 0.3),
            marginBottom: ms(5, 0.3),
            color: 'white',
            backgroundColor: '#282828',
            padding: ms(7, 0.3),
          }}
          value={username}
          onChangeText={setUsername}
          onEndEditing={e => setUsername(e.nativeEvent.text.trim())}
        />
      </TouchableOpacity>
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
            if (isValid()) {
              realm.write(() => {
                realm.create('User', {
                  username: username,
                  phrase: [],
                });
              });
              navigation.navigate('Use');
            }
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

export default UserOnboarding;
