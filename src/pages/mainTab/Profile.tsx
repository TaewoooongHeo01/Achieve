import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useColors } from '../../context/ThemeContext';
import Colors from '../../assets/style/ThemeColor';
import { ms } from 'react-native-size-matters';

const Profile = (): React.JSX.Element => {
  const { currentTheme, applyColor } = useColors();

  const [themeState, setThemeState] = useState<string>(currentTheme);

  useEffect(() => {
    applyColor(themeState === 'light' ? Colors.light : Colors.dark, themeState);
  }, [themeState]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Profile</Text>
      <View style={{ marginTop: ms(50, 0.3) }}>
        <Button
          title='color change'
          onPress={() => {
            setThemeState(currentTheme === 'light' ? 'dark' : 'light');
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
