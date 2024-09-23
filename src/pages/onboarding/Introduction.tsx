import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { darkmodeImagePath, lightmodeImagePath } from '../../utils/imagePath';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useColors } from '../../context/ThemeContext';
import { shadow } from '../../assets/style/shadow';

const Introduction = ({
  selectedIdx,
  setSelectedIdx,
}: {
  selectedIdx: number | null;
  setSelectedIdx(selectedIdx: number | null): void;
}) => {
  const windowWidth = useWindowDimensions().width;

  const { theme, currentTheme } = useColors();

  const darkmode = [
    darkmodeImagePath.addGoal,
    darkmodeImagePath.todolist,
    darkmodeImagePath.swipe,
    darkmodeImagePath.heatmap,
  ];

  const lightmode = [
    lightmodeImagePath.addGoal,
    lightmodeImagePath.todolist,
    lightmodeImagePath.swipe,
    lightmodeImagePath.heatmap,
  ];

  const description = [
    [
      '먼저 목표부터 만들어보세요',
      '원하는 아이콘과 컬러를 골라 목표를',
      '완성하세요',
    ],
    [
      '목표를 이루기 위해 할 일들을 만들어보세요',
      '할 일들은 항상 목표에 포함돼요',
    ],
    [
      '할 일은 완료하거나 미룰 수 있어요',
      '왼쪽은 완료, 오른쪽은 다음날로 미루기에요',
    ],
    ['얼마나 몰입했는지 매일 기록해보세요'],
  ];

  const tabs = [0, 1, 2, 3];

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType | undefined;
    index: number;
  }) => {
    return (
      <View
        style={{
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ padding: ms(5, 0.3) }}>
          <Image
            source={item}
            resizeMode={'contain'}
            style={{ width: ms(320, 0.3), height: ms(350, 0.3) }}
          />
        </View>
        <View
          style={[
            currentTheme === 'light' ? shadow.boxShadow : {},
            {
              backgroundColor: theme.backgroundColor,
              marginHorizontal: ms(40, 0.3),
              padding: ms(15, 0.3),
              borderRadius: ms(5, 0.3),
            },
          ]}>
          {description[index].map((value, index) => {
            return (
              <Text
                key={index.toString()}
                style={[
                  fontStyle.fontSizeSub,
                  { color: theme.textColor, lineHeight: ms(24, 0.3) },
                ]}>
                {value}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={{}}>
      <FlatList
        data={currentTheme === 'dark' ? darkmode : lightmode}
        renderItem={renderItem}
        horizontal
        snapToInterval={windowWidth}
        snapToAlignment='center'
        decelerationRate='fast'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: ms(10, 0.3),
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          setSelectedIdx(viewableItems[0].index);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: ms(20, 0.3),
        }}>
        {tabs.map((value, index) => {
          return (
            <View
              key={index.toString()}
              style={[
                {
                  width: ms(10, 0.3),
                  height: ms(10, 0.3),
                  borderRadius: ms(5, 0.3),
                  marginHorizontal: ms(3, 0.3),
                  backgroundColor:
                    selectedIdx === value
                      ? theme.textColor
                      : theme.backgroundColor,
                },
                currentTheme === 'light' ? shadow.boxShadow : {},
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Introduction;
