import React, { useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@realm/react';
import { Goal } from '../../../realm/models';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/AntDesign';

const Goals = (): React.ReactElement => {
  const { theme } = useColors();
  const [iconSize, setIconSize] = useState<number>(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goals = useQuery(Goal);

  const progressMap: Map<string, number> = useMemo(() => {
    const map = new Map();
    goals?.map(goal => {
      const total = goal.d_day + goal.startDayCnt;
      const progress = Math.floor((goal.startDayCnt / total) * 100);
      map.set(goal._id.toString(), progress);
    });
    return map;
  }, [goals]);

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GoalDetail', { _id: item._id.toString() });
        }}>
        <LinearGradient
          colors={theme.goalGradientColor[item.color]}
          style={[goalStyle.layout]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View
              style={[{ flex: ms(0.2, 0.3) }, goalStyle.iconD_dayContainer]}>
              <View
                style={goalStyle.iconD_day}
                onLayout={e => {
                  setIconSize(e.nativeEvent.layout.height);
                }}>
                <Icon name={item.icon} size={iconSize}></Icon>
                <Text style={[fontStyle.fontSizeSub]}>D-{item.d_day}</Text>
              </View>
            </View>
            <View style={[{ flex: ms(0.9, 0.3) }, goalStyle.titleContainer]}>
              <Text style={goalStyle.todoText}>
                {item.todos.length}개의 해야 할 일
              </Text>
              <Text style={goalStyle.titleText}>{item.title}</Text>
            </View>
            <View style={[{ flex: ms(0, 0.3) }]}>
              <View style={goalStyle.pbbg}></View>
              <View
                style={[
                  goalStyle.curProgress,
                  {
                    width: `${progressMap.get(item._id.toString()) ?? 0}%`,
                  },
                ]}></View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
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
            {goals.length}개의 목표 진행중
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GoalAdd');
          }}>
          <PlusIcon name='plus' color={theme.textColor} size={ms(25, 0.3)} />
        </TouchableOpacity>
      </View>
      {goals.length != 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: ms(10, 0.3) }}
          horizontal={true}
          data={goals}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <TouchableOpacity
          style={[
            goalStyle.layout,
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
          activeOpacity={1}>
          <PlusIcon name='plus' color={theme.textColor} size={30}></PlusIcon>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: ms(20, 0.3),
  },
  subTitle: {
    paddingTop: ms(5, 0.3),
  },
});

const goalStyle = StyleSheet.create({
  layout: {
    flex: 1,
    width: ms(147, 0.3),
    height: ms(147, 0.3),
    marginRight: ms(10, 0.3),
    borderRadius: ms(5, 0.3),
    padding: ms(9, 0.3),
  },
  iconD_dayContainer: {
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  titleContainer: {
    justifyContent: 'flex-end',
  },
  iconD_day: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  d_dayContianer: {
    flex: ms(0.7, 0.3),
  },
  todo: {
    flex: ms(0.3, 0.3),
    justifyContent: 'flex-end',
  },
  todoText: {
    fontSize: ms(13, 0.3),
    color: '#282828',
    fontFamily: 'Pretendard-Medium',
  },
  titleText: {
    fontSize: ms(16, 0.3),
    fontFamily: 'Pretendard-SemiBold',
    paddingBottom: ms(5, 0.3),
  },
  pbbg: {
    width: '100%',
    position: 'absolute',
    height: ms(5, 0.3),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: ms(1.5, 0.3),
  },
  curProgress: {
    height: ms(5, 0.3),
    backgroundColor: 'black',
    borderRadius: ms(1.5, 0.3),
    zIndex: 10,
  },
});

export default Goals;
