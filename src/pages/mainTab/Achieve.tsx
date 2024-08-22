import React from 'react';
import { View } from 'react-native';
import { useColors } from '../../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';

export default function Achieve() {
  const { theme } = useColors();

  return (
    <View style={{ flex: 1 }}>
      {theme.gradientColor.map(value => {
        return (
          <LinearGradient
            style={{ width: 80, height: 80 }}
            colors={value}></LinearGradient>
        );
      })}
    </View>
  );
}
