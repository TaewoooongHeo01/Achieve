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
import { useEffect, useState } from 'react';
import Introduction from './Introduction';

const Use = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { top } = useSafeAreaInsets();
  const [start, setStart] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  useEffect(() => {
    if (selectedIdx === 3) {
      setStart(() => true);
    }
  }, [selectedIdx]);

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: '#FDFDFD' }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: top,
          }}>
          <StatusBar barStyle={'dark-content'} />
        </View>
      ) : (
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FDFDFD'} />
      )}
      <View
        style={{
          flex: ms(0.8, 0.3),
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
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: ms(30, 0.3),
        }}>
        {start ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('Main');
            }}
            style={{
              backgroundColor: '#282828',
              width: '100%',
              height: ms(43, 0.3),
              borderRadius: ms(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[{ color: 'white' }, fontStyle.BtnFont]}>
              시작하기
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              backgroundColor: '#282828',
              width: '100%',
              height: ms(43, 0.3),
              borderRadius: ms(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.3,
            }}>
            <Text style={[{ color: 'white' }, fontStyle.BtnFont]}>
              시작하기
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Use;
