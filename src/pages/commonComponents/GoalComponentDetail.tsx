import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Goal } from '../../../realm/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { ColorSet } from '../../assets/style/ThemeColor';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
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
  const [title, setTitle] = useState<string>(item.title);

  useEffect(() => {
    if (item.title.length >= 20) {
      const newTitle = title.substring(0, 20) + '...';
      setTitle(newTitle);
    } else {
      setTitle(item.title);
    }
  }, [item.title]);

  const cardRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const cardRefPresent = useCallback(() => {
    cardRef.current?.present();
  }, []);
  const todoRenderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.8}
      />
    ),
    [],
  );
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
          style={[
            GoalStyle.layout,
            { marginRight: !item.isComplete ? ms(10, 0.3) : null },
          ]}
          useAngle={true}
          angle={35}>
          <View style={{ flex: 1 }}>
            <View style={[{ flex: ms(0.75, 0.3) }, GoalStyle.titleContainer]}>
              <Text
                style={[
                  GoalStyle.titleText,
                  {
                    color: 'black',
                    fontFamily: 'Pretendard-Medium',
                    fontSize: ms(16, 0.3),
                  },
                ]}>
                {title}
              </Text>
            </View>
            <View
              style={[GoalStyle.iconD_day, { flex: ms(0.25, 0.3) }]}
              // onLayout={e => {
              //   setIconSize(e.nativeEvent.layout.height);
              // }}
            >
              <Icon name={item.icon} size={ms(23, 0.3)}></Icon>
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
        backdropComponent={todoRenderBackdrop}
        detached={true}
        bottomInset={ms(130, 0.3)}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        handleIndicatorStyle={{ height: 0 }}
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
    width: ms(120, 0.3),
    height: ms(120, 0.3),
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
