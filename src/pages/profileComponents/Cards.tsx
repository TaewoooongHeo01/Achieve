import React from 'react';
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
import { useColors } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from '@realm/react';
import { Goal } from '../../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import GoalComponentDetail from '../commonComponents/GoalComponentDetail';
import { fontStyle } from '../../assets/style/fontStyle';

const Cards = () => {
  const { theme, currentTheme } = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { top } = useSafeAreaInsets();
  const goals = useQuery(Goal)
    .filtered('isComplete == true')
    .sorted('todoCnt', true);

  const renderItem = ({ item }: { item: Goal[] }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        {item[0] ? (
          <View style={{ margin: ms(5, 0.3) }}>
            <GoalComponentDetail
              item={item[0]}
              theme={theme}
              navigation={navigation}
            />
          </View>
        ) : null}
        {item[1] ? (
          <View style={{ margin: ms(5, 0.3) }}>
            <GoalComponentDetail
              item={item[1]}
              theme={theme}
              navigation={navigation}
            />
          </View>
        ) : null}
      </View>
    );
  };

  const goalArr: Goal[][] = [];
  let idx = 0;
  const t = true;
  while (t) {
    let flag;
    const gArr: Goal[] = [];
    for (let i = 0; i < 2; i++) {
      gArr[i] = goals[idx];
      if (idx == goals.length) {
        flag = true;
        break;
      }
      idx += 1;
    }
    goalArr.push(gArr);
    if (flag) {
      break;
    }
  }

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
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? ms(10, 0.3) : 0,
          marginHorizontal: ms(18, 0.3),
        }}>
        <Text
          style={[
            fontStyle.fontSizeMain,
            { color: theme.textColor, marginVertical: ms(20, 0.3) },
          ]}>
          완료한 목표들
        </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={goalArr}
            renderItem={renderItem}
            style={{ marginHorizontal: ms(20, 0.3) }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cards;
