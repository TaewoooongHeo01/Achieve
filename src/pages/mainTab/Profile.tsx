import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { dayNames, useDateContext } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
import { ms } from 'react-native-size-matters';
import { fontStyle } from '../../assets/style/fontStyle';
import { useQuery } from '@realm/react';
import { User } from '../../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import HowToUse from '../profileComponents/HowToUse';
import LateTodo from '../profileComponents/LateTodo';
import Notes from '../profileComponents/Notes';
import Options from '../profileComponents/Options';
import { shadow } from '../../assets/style/shadow';

const Profile = (): React.JSX.Element => {
  const { today } = useDateContext();
  const { theme, currentTheme } = useColors();

  const user = useQuery(User)[0];

  // const [themeState, setThemeState] = useState<string>(currentTheme);

  // useEffect(() => {
  //   applyColor(themeState === 'light' ? Colors.light : Colors.dark, themeState);
  // }, [themeState]);

  /* <Button
    title='color change'
    onPress={() => {
      setThemeState(currentTheme === 'light' ? 'dark' : 'light');
    }}
  /> */

  const profileComponents = [
    <HowToUse />,
    <LateTodo />,
    <Notes />,
    <Options />,
  ];

  const renderItem = ({ item }: { item: React.ReactElement }) => {
    return <View style={{ flex: 1 }}>{item}</View>;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      <View>
        <Text
          style={[
            styles.title,
            fontStyle.fontSizeMain,
            { color: theme.textColor },
          ]}>
          안녕하세요, {user.username}님
        </Text>
        <Text
          style={[
            styles.subTitle,
            fontStyle.fontSizeSub,
            { color: theme.textColor, opacity: 0.7 },
          ]}>
          {today.year}.{today.month}.{today.date}.{' '}
          {dayNames[today.day ? today.day : 0]}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: ms(20, 0.3),
        }}>
        <View
          style={[
            currentTheme === 'light' ? shadow.boxShadow : {},
            { backgroundColor: theme.backgroundColor },
            styles.goalContainer,
          ]}>
          <Text
            style={[
              { color: theme.textColor, marginBottom: ms(5, 0.3) },
              fontStyle.fontSizeMain,
            ]}>
            방향 설정하기
          </Text>
          <Text style={[{ color: theme.textColor }, fontStyle.fontSizeSub]}>
            해야 할 일들의 대략적인 방향을 설정해보세요
          </Text>
        </View>
        <FlatList
          style={{ marginTop: ms(15, 0.3) }}
          data={profileComponents}
          renderItem={renderItem}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: Platform.OS === 'ios' ? ms(7, 0.3) : ms(13, 0.3),
  },
  subTitle: {
    paddingTop: ms(5, 1),
  },
  goalContainer: {
    height: ms(100, 0.3),
    borderRadius: ms(5, 0.3),
    padding: ms(13, 0.3),
  },
});

export default Profile;
