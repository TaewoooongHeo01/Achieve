import React, { useState } from 'react';
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
import { shadow } from '../../assets/style/shadow';

const Goals = (): React.ReactElement => {
  const { theme, currentTheme } = useColors();
  const [iconSize, setIconSize] = useState<number>(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goalData = useQuery(Goal);

  const renderItem = ({ item }: { item: Goal }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GoalDetail', { _id: item._id.toString() });
        }}>
        <LinearGradient
          colors={theme.gradientColor[item.color]}
          style={[GoalStyle.layout]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View
              style={[GoalStyle.iconD_day, { flex: ms(0.2, 0.3) }]}
              onLayout={e => {
                setIconSize(e.nativeEvent.layout.height);
              }}>
              <Icon name={item.icon} size={iconSize}></Icon>
            </View>
            <View style={[{ flex: ms(0.9, 0.3) }, GoalStyle.titleContainer]}>
              <Text style={[fontStyle.fontSizeSub, GoalStyle.todoText]}>
                {item.todos ? item.todos.length : 0}개의 투 두
              </Text>
              <Text style={GoalStyle.titleText}>{item.title}</Text>
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
              backgroundColor: 'theme.backgroundColor',
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
    paddingTop: ms(3, 0.3),
  },
});

const GoalStyle = StyleSheet.create({
  layout: {
    flex: 1,
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
