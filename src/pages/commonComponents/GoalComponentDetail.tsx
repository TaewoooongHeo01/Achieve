import React, { useCallback, useMemo, useRef } from 'react';
import { Goal } from '../../../realm/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { ColorSet } from '../../assets/style/ThemeColor';
import { fontStyle } from '../../assets/style/fontStyle';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import CardDetail from '../profileComponents/CardDetail';

const GoalComponentDetail = ({
  item,
  theme,
  navigation,
}: {
  item: Goal;
  theme: ColorSet;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const cardRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const cardRefPresent = useCallback(() => {
    cardRef.current?.present();
  }, []);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          !item.isComplete
            ? navigation.navigate('GoalDetail', { _id: item._id.toString() })
            : cardRefPresent();
        }}>
        <LinearGradient
          colors={theme.gradientColor[item.color]}
          style={[GoalStyle.layout]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View
              style={[GoalStyle.iconD_day, { flex: ms(0.2, 0.3) }]}
              // onLayout={e => {
              //   setIconSize(e.nativeEvent.layout.height);
              // }}
            >
              <Icon name={item.icon} size={ms(23, 0.3)}></Icon>
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
      <BottomSheetModal
        ref={cardRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: 'black', opacity: 0.8 }}
        handleIndicatorStyle={{ backgroundColor: 'transparent' }}
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}>
        <BottomSheetView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CardDetail item={item} theme={theme} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

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

export default GoalComponentDetail;
