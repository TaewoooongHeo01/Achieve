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
import ObjectiveDetail from './src/pages/commonComponents/ObjectiveDetail';
import { RealmProvider } from '@realm/react';
import { Objective, Todo, User } from './realm/models';
import { ThemeContextProvider } from './src/context/ThemeContext';
import ObjectiveAdd from './src/pages/commonComponents/ObjectiveAdd';
import HowToUse from './src/pages/profileComponents/HowToUse';
import LateTodo from './src/pages/profileComponents/LateTodo';
import Notes from './src/pages/profileComponents/Notes';
import Options from './src/pages/profileComponents/Options';

export type RootStackParamList = {
  Main: undefined;
  ObjectiveDetail: { _id: string };
  ObjectiveAdd: undefined;
  HowToUse: undefined;
  LateTodo: undefined;
  Notes: undefined;
  Options: undefined;
};

export type ObjectiveDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ObjectiveDetail'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <RealmProvider
      schema={[Objective, Todo, User]}
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
                  name='ObjectiveDetail'
                  component={ObjectiveDetail}
                />
                <Stack.Screen name='ObjectiveAdd' component={ObjectiveAdd} />
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
