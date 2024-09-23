import React, { useEffect } from 'react';
import Realm from 'realm';
import {
  View,
  Platform,
  StatusBar,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { GoalDetailScreenProps } from '../../../App';
import { useObject } from '@realm/react';
import { Goal, Todo } from '../../../realm/models';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontStyle } from '../../assets/style/fontStyle';
import LinearGradient from 'react-native-linear-gradient';
import GoalIcon from 'react-native-vector-icons/Ionicons';
import { shadow } from '../../assets/style/shadow';
import { topMargin } from '../../assets/style/StackNavTopPadding';

// const MemorizedGoalDetailTodo = memo(GoalDetailTodo);

const GoalDetail = ({
  route,
  navigation,
}: GoalDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const goal = useObject<Goal>('Goal', id);
  const todos = goal?.todos.sorted([
    ['date', true],
    ['isComplete', true],
  ]);

  const { top } = useSafeAreaInsets();
  const { theme, currentTheme } = useColors();

  const map = new Map<string, Todo[]>();
  const dateArr: string[] = [];
  useEffect(() => {
    if (todos?.length) {
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.date !== undefined) {
          if (map.has(todo.date)) {
            map.get(todo.date)?.push(todo);
          } else {
            dateArr.push(todo.date);
            map.set(todo.date, [todo]);
          }
        }
      }
    }
  }, [todos]);

  // const renderItem = ({ item }: { item: string }) => {
  //   const todos = map.get(item);
  //   return <MemorizedGoalDetailTodo theme={theme} todos={todos} item={item} />;
  // };

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
      <View
        style={[
          currentTheme === 'light'
            ? {
                borderBottomWidth: 0.5,
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: '#ccc',
                shadowRadius: 1,
                borderRadius: ms(5, 0.3),
              }
            : {},
          {
            borderBottomLeftRadius: ms(20, 0.3),
            borderBottomRightRadius: ms(20, 0.3),
            flexDirection: 'column',
            flex: 1,
          },
          topMargin.margin,
        ]}>
        <View
          style={{
            marginHorizontal: ms(18, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name='arrowleft' size={ms(23, 0.3)} color={theme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (goal) {
                navigation.navigate('GoalEdit', {
                  goalId: goal._id.toString(),
                });
              }
            }}
            style={{
              marginLeft: ms(18, 0.3),
              backgroundColor: theme.textColor,
              padding: ms(8, 0.3),
              borderRadius: ms(5, 0.3),
            }}>
            <Text
              style={[{ color: theme.backgroundColor }, fontStyle.fontSizeSub]}>
              설정
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: ms(10, 0.3) }}>
          <View
            style={{
              padding: ms(20, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {goal ? (
              // <LinearGradient
              //   colors={theme.gradientColor[goal?.color]}
              //   style={{
              //     width: ms(300, 0.3),
              //     height: ms(189, 0.3),
              //     borderRadius: ms(5, 0.3),
              //     justifyContent: 'space-between',
              //     padding: ms(30, 0.3),
              //   }}>
              //   <Text
              //     style={{
              //       fontSize: ms(20, 0.3),
              //       fontFamily: 'Pretendard-SemiBold',
              //     }}>
              //     {goal.title}
              //   </Text>
              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       alignItems: 'center',
              //       justifyContent: 'space-between',
              //     }}>
              //     <Text style={fontStyle.fontSizeSub}> {goal.startDate}-</Text>
              //     <GoalIcon name={goal.icon} size={ms(18, 0.3)} />
              //   </View>
              // </LinearGradient>
              <LinearGradient
                colors={theme.gradientColor[goal.color]}
                style={[
                  GoalStyle.layout,
                  { marginRight: !goal.isComplete ? ms(10, 0.3) : null },
                ]}
                useAngle={true}
                angle={35}>
                <View style={{ flex: 1 }}>
                  <View
                    style={[{ flex: ms(0.75, 0.3) }, GoalStyle.titleContainer]}>
                    <Text
                      style={[
                        GoalStyle.titleText,
                        fontStyle.fontSizeSub,
                        {
                          color: 'black',
                          fontFamily: 'Pretendard-Medium',
                          fontSize: ms(16, 0.3),
                        },
                      ]}>
                      {goal.title}
                    </Text>
                  </View>
                  <View
                    style={[GoalStyle.iconD_day, { flex: ms(0.25, 0.3) }]}
                    // onLayout={e => {
                    //   setIconSize(e.nativeEvent.layout.height);
                    // }}
                  >
                    <GoalIcon
                      name={goal.icon}
                      size={ms(23, 0.3)}
                      color={'black'}
                    />
                  </View>
                </View>
              </LinearGradient>
            ) : null}
            <View
              style={[
                {
                  padding: ms(10, 0.3),
                  marginTop: ms(20, 0.3),
                  width: '100%',
                  borderRadius: ms(5, 0.3),
                  backgroundColor: theme.backgroundColor,
                  marginBottom: ms(10, 0.3),
                },
                currentTheme === 'light' ? shadow.boxShadow : {},
              ]}>
              <Text
                style={{
                  color: theme.textColor,
                  fontFamily: 'Pretendard-Medium',
                  fontSize: ms(16, 0.3),
                  lineHeight: ms(23, 0.3),
                }}>
                {goal?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <Text
            style={[
              {
                fontFamily: 'Pretendard-SemiBold',
                fontSize: ms(16, 0.3),
                color: theme.textColor,
                marginLeft: ms(15, 0.3),
              },
            ]}>
            기록들
          </Text> */}
      {/* <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackgroundColor,
          flexDirection: 'row',
          margin: ms(10, 0.3),
        }}>
        <FlatList
          data={dateArr}
          renderItem={renderItem}
          keyExtractor={value => value.toString()}
        />
      </View> */}
    </SafeAreaView>
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

export default GoalDetail;
