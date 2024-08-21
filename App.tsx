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
import DistanceDetail from './src/pages/commonComponents/DistanceDetail';
import { RealmProvider } from '@realm/react';
import { Distance, Todo, User } from './realm/models';
import { ThemeContextProvider } from './src/context/ThemeContext';
import DistanceAdd from './src/pages/commonComponents/DistanceAdd';

export type RootStackParamList = {
  Main: undefined;
  DistanceDetail: { _id: string };
  DistanceAdd: undefined;
};

export type DistanceDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DistanceDetail'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <RealmProvider
      schema={[Distance, Todo, User]}
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
                  name='DistanceDetail'
                  component={DistanceDetail}
                />
                <Stack.Screen name='DistanceAdd' component={DistanceAdd} />
              </Stack.Navigator>
            </ThemeContextProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </RealmProvider>
  );
}

export default App;
