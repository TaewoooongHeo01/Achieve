import React from 'react';
import { Goal } from '../../../realm/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { ColorSet } from '../../assets/style/ThemeColor';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const GoalComponentDetail = ({
  item,
  theme,
  navigation,
}: {
  item: Goal;
  theme: ColorSet;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GoalDetail', { _id: item._id.toString() });
        }}>
        <LinearGradient
          colors={theme.gradientColor[item.color]}
          style={[
            GoalStyle.layout,
            { marginRight: !item.isComplete ? ms(10, 0.3) : null },
          ]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View style={[{ flex: ms(0.8, 0.3) }, GoalStyle.titleContainer]}>
              <Text
                style={[
                  GoalStyle.titleText,
                  {
                    color: 'black',
                    fontFamily: 'Pretendard-Medium',
                    fontSize: ms(16, 0.3),
                  },
                ]}>
                {item.title}
              </Text>
            </View>
            <View
              style={[GoalStyle.iconD_day, { flex: ms(0.25, 0.3) }]}
              // onLayout={e => {
              //   setIconSize(e.nativeEvent.layout.height);
              // }}
            >
              <Icon name={item.icon} size={ms(23, 0.3)} color={'black'}></Icon>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

const GoalStyle = StyleSheet.create({
  layout: {
    flex: 1,
    width: ms(130, 0.3),
    height: ms(130, 0.3),
    borderRadius: ms(5, 0.3),
    padding: ms(9, 0.3),
  },
  titleContainer: {
    justifyContent: 'flex-start',
  },
  iconD_day: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: ms(5, 0.3),
    marginTop: ms(2, 0.3),
  },
});

export default GoalComponentDetail;
