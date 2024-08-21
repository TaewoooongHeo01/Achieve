import React from 'react';
import { Platform, StyleSheet, Text, Touchable, View } from 'react-native';
import { dayNames, useDateContext } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
// import Colors from '../../assets/style/ThemeColor';
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

  const profileComponents = [
    <HowToUse />,
    <LateTodo />,
    <Notes />,
    <Options />,
  ];

  const renderItem = ({ item }: React.ReactElement) => {
    return <View style={{ flex: 1 }}>{item}</View>;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {/* <Button
          title='color change'
          onPress={() => {
            setThemeState(currentTheme === 'light' ? 'dark' : 'light');
          }}
        /> */}
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
          <Text style={({ color: theme.textColor }, fontStyle.fontSizeMain)}>
            목표 생성하기
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
    width: '100%',
    height: ms(100, 0.3),
    borderRadius: ms(5, 0.3),
  },
});

export default Profile;
