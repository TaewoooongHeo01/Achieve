import React from 'react';
import { Linking, Alert, TouchableOpacity, Text } from 'react-native';
import { fontStyle } from '../../../assets/style/fontStyle';

const OpenURLButton = ({
  url,
  currentTheme,
}: {
  url: string;
  currentTheme: string;
}) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`이 URL을 열 수 없습니다: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text
        style={[
          fontStyle.fontSizeSub,
          { color: currentTheme === 'light' ? 'blue' : 'skyblue' },
        ]}>
        {url}
      </Text>
    </TouchableOpacity>
  );
};

export default OpenURLButton;
