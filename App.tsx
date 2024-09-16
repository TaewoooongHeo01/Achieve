import React, { useEffect, useState } from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Main from './src/pages/Main';
import GoalDetail from './src/pages/commonComponents/GoalDetail';
import GoalAdd from './src/pages/commonComponents/GoalAdd';
import HowToUse from './src/pages/profileComponents/HowToUse';
import LateTodo from './src/pages/profileComponents/LateTodo';
import Options from './src/pages/profileComponents/Options';
import GoalAddDescription from './src/pages/goalAdd/GoalAddDescription';
import GoalAddIconAndColor from './src/pages/goalAdd/GoalAddIconAndColor';
import Cards from './src/pages/profileComponents/Cards';
import SettingUser from './src/pages/profileComponents/SettingPages/SettingUser';
import SettingPhrase from './src/pages/profileComponents/SettingPages/SettingPhrase';
import SettingScreen from './src/pages/profileComponents/SettingPages/SettingScreen';
import GoalEdit from './src/pages/commonComponents/GoalEdit';
import { useQuery, useRealm } from '@realm/react';
import { User } from './realm/models';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DateContextProvider } from './src/context/DateContext';
import { ThemeContextProvider } from './src/context/ThemeContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Start from './src/pages/onboarding/Start';
import UserOnboarding from './src/pages/onboarding/User';
import Use from './src/pages/onboarding/Use';
import { initialize } from './src/context/test';
import UserInformation from './src/pages/profileComponents/AppUse/UserInformation';
import TermsOfUse from './src/pages/profileComponents/AppUse/TermsOfUse';
import License from './src/pages/profileComponents/AppUse/License';

export type RootStackParamList = {
  Main: undefined;
  GoalDetail: { _id: string };
  GoalAdd: undefined;
  HowToUse: undefined;
  LateTodo: undefined;
  Cards: undefined;
  Options: undefined;
  GoalAddDescription: { title: string };
  GoalAddIconAndColor: { title: string; description: string };
  SettingScreen: undefined;
  SettingPhrase: undefined;
  SettingUser: undefined;
  GoalEdit: { goalId: string };
  Home: undefined;
  Start: undefined;
  UserOnboarding: undefined;
  Use: undefined;
  License: undefined;
  UserInformation: undefined;
  TermsOfUse: undefined;
};

export type GoalDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GoalDetail'
>;

export type GoalAddDescriptionProps = NativeStackScreenProps<
  RootStackParamList,
  'GoalAddDescription'
>;

export type GoalAddIconAndColorProps = NativeStackScreenProps<
  RootStackParamList,
  'GoalAddIconAndColor'
>;

export type GoalEditProps = NativeStackScreenProps<
  RootStackParamList,
  'GoalEdit'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [firstLaunch, setFirstLaunch] = useState<boolean | undefined>(
    undefined,
  );

  const realm = useRealm();
  console.log(realm.path);
  // initialize();

  const user = useQuery(User)[0];

  useEffect(() => {
    if (user) {
      setFirstLaunch(() => false);
    } else {
      setFirstLaunch(() => true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <DateContextProvider>
              <ThemeContextProvider>
                <BottomSheetModalProvider>
                  <Stack.Navigator
                    initialRouteName={firstLaunch ? 'Start' : 'Main'}
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name='Main'
                      component={Main}
                      options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen name='GoalDetail' component={GoalDetail} />
                    <Stack.Screen name='GoalAdd' component={GoalAdd} />
                    <Stack.Screen name='HowToUse' component={HowToUse} />
                    <Stack.Screen name='LateTodo' component={LateTodo} />
                    <Stack.Screen name='Cards' component={Cards} />
                    <Stack.Screen name='Options' component={Options} />
                    {/* GoalAdd Stack Nav */}
                    <Stack.Screen
                      name='GoalAddDescription'
                      component={GoalAddDescription}
                    />
                    <Stack.Screen
                      name='GoalAddIconAndColor'
                      component={GoalAddIconAndColor}
                    />
                    {/* Goal Edit Stack Nav */}
                    <Stack.Screen name='GoalEdit' component={GoalEdit} />
                    {/* Setting Stack Nav */}
                    <Stack.Screen name='SettingUser' component={SettingUser} />
                    <Stack.Screen
                      name='SettingPhrase'
                      component={SettingPhrase}
                    />
                    <Stack.Screen
                      name='SettingScreen'
                      component={SettingScreen}
                    />
                    <Stack.Screen name='Start' component={Start} />
                    <Stack.Screen
                      name='UserOnboarding'
                      component={UserOnboarding}
                    />
                    <Stack.Screen name='Use' component={Use} />
                    <Stack.Screen
                      name='UserInformation'
                      component={UserInformation}
                    />
                    <Stack.Screen name='TermsOfUse' component={TermsOfUse} />
                    <Stack.Screen name='License' component={License} />
                  </Stack.Navigator>
                </BottomSheetModalProvider>
              </ThemeContextProvider>
            </DateContextProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </View>
  );
}

export default App;
