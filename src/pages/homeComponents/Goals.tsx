import React, { useMemo } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { font, gradientColorset } from '../../utils/styleConst';
import { ms } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@realm/react';
import { Goal } from '../../../realm/models';

const Goals = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goals = useQuery(Goal);

  const progressMap: Map<Realm.BSON.ObjectId, number> = useMemo(() => {
    const map = new Map();
    goals?.map(goal => {
      const total = goal.checklist.length;
      const checked = goal.checklist.filter(
        check => check.isChecked === true,
      ).length;
      const progress = total != 0 ? Math.floor((checked / total) * 100) : 0;
      map.set(goal._id, progress);
    });
    return map;
  }, [goals]);

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('GoalDetail', { _id: item._id });
        }}>
        <LinearGradient
          colors={gradientColorset[item.color]}
          style={goalStyle.layout}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View style={goalStyle.iconD_day}>
              <Text style={goalStyle.icon}>{item.icon}</Text>
              <Text style={goalStyle.d_day}>D-{item.d_day}</Text>
            </View>
            <View style={goalStyle.todo}>
              <Text style={goalStyle.todoText}>
                {item.checklist.length}개의 해야 할 일
              </Text>
              {/* 추후 데이터 전역관리 라이브러리를 이용해 현재 goalId 로 전역적으로 관리되는 컨텍스트에서 해야 할 일 개수를 갖고 오는 방식으로 구현 */}
            </View>
            <View style={goalStyle.title}>
              <Text style={goalStyle.titleText}>{item.title}</Text>
            </View>
            <View style={goalStyle.pb}>
              {/* progress bar 는 애니메이션이 필요하지 않으므로, 두 개의 바를 겹쳐서 정적으로 표시하는 방식으로 구현. 라이브러리 x */}
              <View style={goalStyle.pbbg}></View>
              <View
                style={[
                  goalStyle.curProgress,
                  { width: `${progressMap.get(item._id) ?? 0}%` },
                ]}></View>
            </View>
          </View>
        </LinearGradient>
      </TouchableHighlight>
    );
  };

  if (goals === undefined) {
    return (
      <View>
        <Text>목표를 생성해보세요</Text>
      </View>
    );
  }

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>진행중인 목표</Text>
      <Text style={styles.subTitle}>{goals.length}개의 목표 진행중</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: ms(8, 0.3) }}
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
    marginTop: ms(15, 0.3),
  },
  title: {
    color: font.mainColor.color,
    fontSize: font.mainSize.fontSize,
    fontWeight: font.mainWeight.fontWeight,
  },
  subTitle: {
    paddingTop: ms(5, 0.3),
    color: font.subText.color,
    fontSize: font.subSize.fontSize,
    fontWeight: font.subWeight.fontWeight,
  },
});

const goalStyle = StyleSheet.create({
  layout: {
    flex: 1,
    width: ms(130, 0.3),
    height: ms(130, 0.3),
    marginRight: ms(10, 0.3),
    borderRadius: ms(3, 0.3),
    padding: ms(7, 0.3),
  },
  iconD_day: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {},
  d_day: {
    fontSize: font.subSize.fontSize,
    fontWeight: font.subWeight.fontWeight,
  },
  todo: {
    flex: 0.7,
    justifyContent: 'flex-end',
  },
  todoText: {
    fontSize: ms(10, 0.3),
    fontWeight: font.subWeight.fontWeight,
    color: '#9B9B9B',
  },
  title: {
    paddingTop: ms(2, 0.3),
    flexBasis: 'auto',
  },
  titleText: {
    fontSize: font.subSize.fontSize,
    fontWeight: font.subWeight.fontWeight,
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
  },
});

export default Goals;
