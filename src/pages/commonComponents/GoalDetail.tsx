import React, { useState } from 'react';
import Realm from 'realm';
import { View, Text, Platform, StatusBar } from 'react-native';
import { GoalDetailScreenProps } from '../../../App';
import { useObject, useRealm } from '@realm/react';
import { Goal } from '../../../realm/models';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const GoalDetail = ({
  route,
  navigation,
}: GoalDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const realm = useRealm();
  const goal = useObject<Goal>('Goal', id);
  const todos = goal?.todos;
  const { top } = useSafeAreaInsets();
  const { theme, currentTheme } = useColors();
  const [noteWidth, setNoteWidth] = useState(0);

  const deleteGoal = () => {
    navigation.goBack();
    realm.write(() => {
      realm.delete(todos);
      realm.delete(Goal);
    });
  };

  const noteTempData = [
    {
      text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
    },
    {
      text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
    },
    {
      text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
    },
    {
      text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
    },
    {
      text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
    },
  ];

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            backgroundColor:
              currentTheme === 'light' ? '#F2F2F2' : theme.backgroundColor,
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor:
              currentTheme === 'light' ? '#F2F2F2' : theme.backgroundColor,
            borderBottomLeftRadius: ms(20, 0.3),
            borderBottomRightRadius: ms(20, 0.3),
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginLeft: ms(18, 0.3) }}>
            <Icon name='arrowleft' size={ms(23, 0.3)} />
          </TouchableOpacity>
          <View style={{ padding: ms(20, 0.3) }}>
            <Text
              style={[
                {
                  color: theme.textColor,
                  fontSize: ms(25, 0.3),
                  fontFamily: 'Pretendard-Medium',
                  marginBottom: ms(10, 0.3),
                },
              ]}>
              {goal?.title}
            </Text>
            <Text
              style={{
                color: theme.textColor,
                fontSize: ms(15, 0.3),
                lineHeight: ms(20, 0.3),
                fontFamily: 'Pretendard-Medium',
              }}>
              {goal?.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.appBackgroundColor,
            flexDirection: 'column',
            padding: ms(20, 0.3),
          }}>
          <View
            onLayout={e => {
              setNoteWidth(e.nativeEvent.layout.width);
            }}>
            <Text style={[fontStyle.fontSizeMain]}>노트들</Text>
            <FlatList
              data={noteTempData}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 32,
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: noteWidth / 3,
                    aspectRatio: 1,
                    backgroundColor: 'yellowgreen',
                    margin: ms(10, 0.3),
                  }}>
                  <Text>{item.text}</Text>
                </View>
              )}
              numColumns={3}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoalDetail;
