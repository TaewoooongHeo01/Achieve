import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//pages
import Main from './src/pages/Main';
import GoalDetail from './src/pages/commonComponents/GoalDetail';
import { RealmProvider } from '@realm/react';
import { FullyDate, Goal, Todo, User } from './realm/models';
import { ThemeContextProvider } from './src/context/ThemeContext';
import GoalAdd from './src/pages/commonComponents/GoalAdd';
import HowToUse from './src/pages/profileComponents/HowToUse';
import LateTodo from './src/pages/profileComponents/LateTodo';
import Options from './src/pages/profileComponents/Options';
import GoalAddDescription from './src/pages/goalAdd/GoalAddDescription';
import GoalAddIconAndColor from './src/pages/goalAdd/GoalAddIconAndColor';
import Cards from './src/pages/profileComponents/Cards';

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

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <RealmProvider
      schema={[Goal, Todo, User, FullyDate]}
      deleteRealmIfMigrationNeeded={true}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <ThemeContextProvider>
              <Stack.Navigator>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name='Main'
                  component={Main}
                />
                <Stack.Screen
                  name='GoalDetail'
                  component={GoalDetail}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='GoalAdd'
                  component={GoalAdd}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name='HowToUse' component={HowToUse} />
                <Stack.Screen name='LateTodo' component={LateTodo} />
                <Stack.Screen name='Cards' component={Cards} />
                <Stack.Screen name='Options' component={Options} />
                {/* GoalAdd Stack Nav */}
                <Stack.Screen
                  name='GoalAddDescription'
                  component={GoalAddDescription}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='GoalAddIconAndColor'
                  component={GoalAddIconAndColor}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </ThemeContextProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </RealmProvider>
  );
}

export default App;
