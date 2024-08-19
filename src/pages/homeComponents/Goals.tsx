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
          navigation.navigate('GoalDetail', { _id: item._id });
        }}>
        <LinearGradient
          colors={theme.goalGradientColor[item.color]}
          style={[goalStyle.layout]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View
              style={goalStyle.iconD_day}
              onLayout={e => {
                setIconSize(e.nativeEvent.layout.height);
              }}>
              <Icon name={item.icon} size={iconSize}></Icon>
            </View>
            <View>
              <Text style={[goalStyle.d_day]}>D-{item.d_day}</Text>
            </View>
            <View style={goalStyle.todo}>
              <Text style={goalStyle.todoText}>
                {item.todos.length}개의 해야 할 일
              </Text>
            </View>
            <View style={goalStyle.title}>
              <Text style={goalStyle.titleText}>{item.title}</Text>
            </View>
            <View style={goalStyle.pb}>
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
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: ms(10, 0.3) }}
        horizontal={true}
        data={goals}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    width: ms(140, 0.3),
    height: ms(140, 0.3),
    marginRight: ms(10, 0.3),
    borderRadius: ms(5, 0.3),
    padding: ms(9, 0.3),
  },
  iconD_day: {
    flex: 0.4,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  d_day: {
    fontSize: ms(15, 0.3),
    marginTop: ms(4, 0.3),
    fontFamily: 'Pretendard-SemiBold',
  },
  todo: {
    flex: 0.7,
    justifyContent: 'flex-end',
  },
  todoText: {
    fontSize: ms(10, 0.3),
    color: '#747474',
    fontFamily: 'Pretendard-SemiBold',
  },
  title: {
    paddingTop: ms(2, 0.3),
    flexBasis: 'auto',
  },
  titleText: {
    fontSize: ms(16, 0.3),
    fontFamily: 'Pretendard-SemiBold',
  },
  pb: {
    flex: 0.12, //높이 조절 + paddingTop
    justifyContent: 'flex-end',
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
