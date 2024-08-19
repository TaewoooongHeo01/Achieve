import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';

const BoldText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => {
  const customStyle = {
    fontFamily: 'Pretendard-Bold',
  };

  return (
    <Text style={[customStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const MediumText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => {
  const customStyle = {
    fontFamily: 'Pretendard-Medium',
  };

  return (
    <Text style={[customStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const SemiBoldText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => {
  const customStyle = {
    fontFamily: 'Pretendard-SemiBold',
  };

  return (
    <Text style={[customStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

export const BoldTextMemoization = memo(BoldText);
export const MediumTextMemoization = memo(MediumText);
export const SemiBoldTextMemoization = memo(SemiBoldText);
