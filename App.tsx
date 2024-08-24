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
import { Goal, Todo, User } from './realm/models';
import { ThemeContextProvider } from './src/context/ThemeContext';
import GoalAdd from './src/pages/commonComponents/GoalAdd';
import HowToUse from './src/pages/profileComponents/HowToUse';
import LateTodo from './src/pages/profileComponents/LateTodo';
import Notes from './src/pages/profileComponents/Notes';
import Options from './src/pages/profileComponents/Options';

export type RootStackParamList = {
  Main: undefined;
  GoalDetail: { _id: string };
  GoalAdd: undefined;
  HowToUse: undefined;
  LateTodo: undefined;
  Notes: undefined;
  Options: undefined;
};

export type GoalDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GoalDetail'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <RealmProvider
      schema={[Goal, Todo, User]}
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
                <Stack.Screen name='GoalDetail' component={GoalDetail} />
                <Stack.Screen name='GoalAdd' component={GoalAdd} />
                <Stack.Screen name='HowToUse' component={HowToUse} />
                <Stack.Screen name='LateTodo' component={LateTodo} />
                <Stack.Screen name='Notes' component={Notes} />
                <Stack.Screen name='Options' component={Options} />
              </Stack.Navigator>
            </ThemeContextProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </RealmProvider>
  );
}

export default App;
