import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { topMargin } from '../../../assets/style/StackNavTopPadding';
import { fontStyle } from '../../../assets/style/fontStyle';
import OpenURLButton from './OpenUrl';

type LicenseType = {
  title: string;
  version: string;
  url: string;
  copyright: string;
};

const License = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentTheme } = useColors();
  const { top } = useSafeAreaInsets();

  const LicenseArr: LicenseType[] = [
    {
      title: 'react',
      version: '18.2.0',
      url: 'https://github.com/facebook/react',
      copyright: 'Copyright (c) Meta Platforms, Inc. and affiliates.',
    },
    {
      title: 'react-native',
      version: '0.74.3',
      url: 'https://github.com/facebook/react-native',
      copyright: 'Copyright (c) Meta Platforms, Inc. and affiliates.',
    },
    {
      title: 'babel',
      version: '7.24.8',
      url: 'https://github.com/babel/babel',
      copyright:
        'Copyright (c) 2014-present Sebastian McKenzie and other contributors',
    },
    {
      title: 'prettier',
      version: '3.3.3',
      url: 'https://github.com/prettier/prettier',
      copyright: 'Copyright © James Long and contributors',
    },
    {
      title: 'eslint',
      version: '8.57.0',
      url: 'https://github.com/eslint/eslint',
      copyright:
        'Copyright OpenJS Foundation and other contributors, <www.openjsf.org>',
    },
    {
      title: 'eslint-plugin-prettier',
      version: '5.2.1',
      url: 'https://github.com/prettier/eslint-plugin-prettier',
      copyright: 'Copyright © 2017 Andres Suarez and Teddy Katz',
    },
    {
      title: 'eslint-config-prettier',
      version: '9.1.0',
      url: 'https://github.com/prettier/eslint-config-prettier',
      copyright:
        'Copyright (c) 2017, 2018, 2019, 2020, 2021, 2022, 2023 Simon Lydell and contributors',
    },
    {
      title: 'metro',
      version: '0.74.85',
      url: 'https://github.com/facebook/metro',
      copyright: 'Copyright (c) Meta Platforms, Inc. and affiliates.',
    },
    {
      title: 'TypeScript',
      version: '5.5.3',
      url: 'https://github.com/microsoft/TypeScript',
      copyright: 'Copyright (c) Microsoft Corporation',
    },
    {
      title: 'jest',
      version: '29.7.0',
      url: 'https://github.com/jestjs/jest',
      copyright:
        'Copyright (c) Meta Platforms, Inc. and affiliates, Copyright Contributors to the Jest project.',
    },
    {
      title: 'react-native-bottom-sheet',
      version: '4.6.4.',
      url: 'https://github.com/gorhom/react-native-bottom-sheet',
      copyright: 'Copyright (c) 2020 Mo Gorhom',
    },
    {
      title: '@react-navigation/bottom-tabs',
      version: '6.6.0',
      url: 'https://github.com/react-navigation/react-navigation/tree/main/packages/bottom-tabs',
      copyright: 'Copyright (c) 2017 React Navigation Contributors',
    },
    {
      title: '@react-navigation/native',
      version: '6.1.17',
      url: 'https://github.com/react-navigation/react-navigation/tree/main/packages/native',
      copyright: 'Copyright (c) 2017 React Navigation Contributors',
    },
    {
      title: '@react-navigation/native-stack',
      version: '6.10.0',
      url: 'https://github.com/react-navigation/react-navigation/tree/main/packages/stack',
      copyright: 'Copyright (c) 2017 React Navigation Contributors',
    },
    {
      title: 'react-native-customisable-alert',
      version: '0.1.20',
      url: 'https://github.com/MaiconGilton/react-native-customisable-alert',
      copyright: 'Copyright (c) 2020 Maicon Gilton',
    },
    {
      title: 'react-native-gesture-handler',
      version: '2.17.1',
      url: 'https://github.com/software-mansion/react-native-gesture-handler',
      copyright: 'Copyright (c) 2016 Software Mansion <swmansion.com>',
    },
    {
      title: 'react-native-get-random-values',
      version: '1.11.0',
      url: 'https://github.com/LinusU/react-native-get-random-values',
      copyright: 'Copyright (c) 2018, 2020 Linus Unnebäck',
    },
    {
      title: 'react-native-linear-gradient',
      version: '2.8.3',
      url: 'https://github.com/react-native-linear-gradient/react-native-linear-gradient',
      copyright: 'Copyright (c) 2016 React Native Community',
    },
    {
      title: 'react-native-reanimated',
      version: '3.2.14',
      url: 'https://github.com/software-mansion/react-native-reanimated',
      copyright: 'Copyright (c) 2016 Software Mansion <swmansion.com>',
    },
    {
      title: 'react-native-safe-area-context',
      version: '4.10.8',
      url: 'https://github.com/th3rdwave/react-native-safe-area-context',
      copyright: 'Copyright (c) 2019 Th3rd Wave',
    },
    {
      title: 'react-native-screens',
      version: '3.32.0',
      url: 'https://github.com/software-mansion/react-native-screens',
      copyright: 'Copyright (c) 2018 Software Mansion <swmansion.com>',
    },
    {
      title: 'react-native-size-matters',
      version: '0.4.2',
      url: 'https://github.com/nirsky/react-native-size-matters',
      copyright: 'Copyright (c) 2017 Nir Hadassi',
    },
    {
      title: 'react-native-status-bar-height',
      version: '2.6.0',
      url: 'https://github.com/ovr/react-native-status-bar-height',
      copyright:
        'Copyright (c) 2017-present Dmitry Patsura <talk@dmtry.me> https://github.com/ovr',
    },
    {
      title: 'react-native-vector-icons',
      version: '10.1.0',
      url: 'https://github.com/oblador/react-native-vector-icons',
      copyright: 'Copyright (c) 2015 Joel Arvidsson',
    },
    {
      title: 'ant-design-icons',
      version: '4.0.0',
      url: 'https://github.com/ant-design/ant-design',
      copyright:
        'Copyright (c) 2018-present Ant UED, https://xtech.antfin.com/',
    },
    {
      title: 'FontAwesome5',
      version: '2.1.11',
      url: 'https://github.com/MartinTopfstedt/FontAwesome5/tree/master',
      copyright: 'Copyright (c) 2018 MartinTopfstedt',
    },
    {
      title: 'ionicons',
      version: '7.4.0',
      url: 'https://github.com/ionic-team/ionicons',
      copyright: 'Copyright (c) 2015-present Ionic (http://ionic.io/)',
    },
    {
      title: 'nodeJS',
      version: '20.13.1',
      url: 'https://github.com/nodejs/node/releases/tag/v22.8.0',
      copyright: 'Copyright Node.js contributors. All rights reserved.',
    },
  ];

  return (
    <SafeAreaView
      edges={
        Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']
      }
      style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: top,
          }}>
          <StatusBar
            barStyle={
              currentTheme === 'dark' ? 'light-content' : 'dark-content'
            }
          />
        </View>
      ) : (
        <StatusBar
          barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.appBackgroundColor}
        />
      )}
      <View
        style={[topMargin.margin, { paddingHorizontal: ms(18, 0.3), flex: 1 }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: ms(7, 0.3) }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrowleft' color={theme.textColor} size={ms(23, 0.3)} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {LicenseArr.map((value, index) => {
              return (
                <View key={index.toString()} style={{ marginTop: ms(15, 0.3) }}>
                  <Text
                    style={[
                      fontStyle.fontSizeMain,
                      { color: theme.textColor },
                    ]}>
                    {value.title}
                  </Text>
                  <Text
                    style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                    {value.version}
                  </Text>
                  <OpenURLButton url={value.url} currentTheme={currentTheme} />
                  <Text
                    style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                    {value.copyright}
                  </Text>
                  <Text
                    style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                    MIT License
                  </Text>
                </View>
              );
            })}
            <View style={{ marginTop: ms(15, 0.3) }}>
              <Text
                style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
                realm-js
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                0.10.1
              </Text>
              <OpenURLButton
                url={'https://github.com/realm/realm-js/tree/main'}
                currentTheme={currentTheme}
              />
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright (c) MongoDB, Inc.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright (c) Intel Corp.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright (c) Free Software Foundation, Inc.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Apache License
              </Text>
            </View>
            <View style={{ marginTop: ms(15, 0.3) }}>
              <Text
                style={[fontStyle.fontSizeMain, { color: theme.textColor }]}>
                pretendard
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                1.3.9
              </Text>
              <OpenURLButton
                url={'https://github.com/realm/realm-js/tree/main'}
                currentTheme={currentTheme}
              />
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright (c) 2021, Kil Hyung-jin
                (https://github.com/orioncactus/pretendard), with Reserved Font
                Name 'Pretendard'.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved
                Font Name 'Source'. Source is a trademark of Adobe in the United
                States and/or other countries.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright (c) 2016 The Inter Project Authors
                (https://github.com/rsms/inter), with Reserved Font Name
                'Inter'.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                Copyright 2021 The M+ FONTS Project Authors
                (https://github.com/coz-m/MPLUS_FONTS), with Reserved Font Name
                'M PLUS 1'.
              </Text>
              <Text style={[fontStyle.fontSizeSub, { color: theme.textColor }]}>
                SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
              </Text>
            </View>
            <View style={{ height: ms(50, 0.3) }}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default License;
