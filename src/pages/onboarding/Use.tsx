import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
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
import { imagePath } from '../../utils/imagePath';
import { useEffect, useState } from 'react';

const Use = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const windowWidth = useWindowDimensions().width;
  const { top } = useSafeAreaInsets();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    if (selectedIdx === 3) {
      setStart(() => true);
    }
  }, [selectedIdx]);

  const imageSet = [
    imagePath.addGoal,
    imagePath.todolist,
    imagePath.swipe,
    imagePath.heatmap,
  ];

  const description = [
    '가장 먼저 목표부터 만들어보세요. 원하는 아이콘과 컬러를 골라 ~ 를 만들어보세요',
    '목표를 이루기 위한 할 일들을 만들어보세요',
    '할 일은 완료하거나 미룰 수 있어요. 왼쪽은 완료, 오른쪽은 미루기에요',
    '얼마나 몰입했는지 매일 기록해보세요',
  ];

  const tabs = [0, 1, 2, 3];

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType | undefined;
    index: number;
  }) => {
    return (
      <View
        style={{
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ padding: ms(5, 0.3) }}>
          <Image
            source={item}
            resizeMode={'contain'}
            style={{ width: ms(320, 0.3), height: ms(270, 0.3) }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#282828',
            marginHorizontal: ms(40, 0.3),
            padding: ms(15, 0.3),
            borderRadius: ms(5, 0.3),
          }}>
          <Text
            style={[
              fontStyle.fontSizeSub,
              { color: 'white', lineHeight: ms(22, 0.3) },
            ]}>
            {description[index]}
          </Text>
        </View>
      </View>
    );
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
      <View
        style={{
          flex: ms(0.7, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: ms(50, 0.3),
        }}>
        <FlatList
          data={imageSet}
          renderItem={renderItem}
          horizontal
          snapToInterval={windowWidth}
          snapToAlignment='center'
          decelerationRate='fast'
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onViewableItemsChanged={({ viewableItems }) => {
            setSelectedIdx(viewableItems[0].index);
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          {tabs.map((value, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  width: ms(10, 0.3),
                  height: ms(10, 0.3),
                  borderRadius: ms(5, 0.3),
                  marginHorizontal: ms(3, 0.3),
                  backgroundColor: selectedIdx === value ? 'white' : '#6A6A6A',
                }}
              />
            );
          })}
        </View>
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
              backgroundColor: 'white',
              width: '100%',
              height: ms(43, 0.3),
              borderRadius: ms(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[{ color: '#282828' }, fontStyle.BtnFont]}>
              시작하기
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: ms(43, 0.3),
              borderRadius: ms(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.3,
            }}>
            <Text style={[{ color: '#282828' }, fontStyle.BtnFont]}>
              시작하기
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Use;
