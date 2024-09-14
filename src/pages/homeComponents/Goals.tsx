import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@realm/react';
import { Goal } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import { shadow } from '../../assets/style/shadow';
import GoalComponentDetail from '../commonComponents/GoalComponentDetail';

const Goals = (): React.ReactElement => {
  const { theme, currentTheme } = useColors();
  // const [iconSize, setIconSize] = useState<number>(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goalData = useQuery(Goal).filtered('isComplete == false');

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <GoalComponentDetail item={item} theme={theme} navigation={navigation} />
    );
  };

  return (
    <View style={styles.layout}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
            진행중인 목표
          </Text>
          <Text
            style={[
              styles.subTitle,
              fontStyle.fontSizeSub,
              { color: theme.textColor, opacity: 0.7 },
            ]}>
            {goalData.length}개의 목표
          </Text>
        </View>
        {goalData.length !== 0 ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GoalAdd');
            }}>
            <PlusIcon name='plus' color={theme.textColor} size={ms(25, 0.3)} />
          </TouchableOpacity>
        ) : null}
      </View>
      {goalData.length != 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: ms(10, 0.3) }}
          horizontal={true}
          data={goalData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <TouchableOpacity
          style={[
            GoalStyle.layout,
            currentTheme === 'light' ? shadow.boxShadow : {},
            {
              marginTop: ms(10, 0.3),
              backgroundColor: theme.backgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            navigation.navigate('GoalAdd');
          }}
          activeOpacity={0.8}>
          <PlusIcon name='plus' color={theme.textColor} size={30}></PlusIcon>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: ms(30, 0.3),
  },
  subTitle: {
    paddingTop: ms(3, 0.3),
  },
});

const GoalStyle = StyleSheet.create({
  layout: {
    // flex: 1,
    width: ms(130, 0.3),
    height: ms(130, 0.3),
    marginRight: ms(10, 0.3),
    borderRadius: ms(5, 0.3),
    padding: ms(9, 0.3),
  },
  titleContainer: {
    justifyContent: 'flex-end',
  },
  iconD_day: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: ms(2, 0.3),
  },
});

export default Goals;
