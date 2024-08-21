import React from 'react';
import { Text, View } from 'react-native';
import { fontStyle } from '../../assets/style/fontStyle';

const HowToUse = () => {
  return (
    <View>
      <Text style={[fontStyle.fontSizeMain]}>Achieve</Text>
      <Text>제대로 사용하기</Text>
    </View>
  );
};

export default HowToUse;
