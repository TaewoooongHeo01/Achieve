import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//pages
import Main from './pages/Main';
import GoalDetail from './pages/commonComponents/GoalDetail';

export type RootStackParamList = {
  Main: undefined;
  GoalDetail: { goalId: string };
};

export type GoalDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'GoalDetail'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
              <Stack.Screen name="GoalDetail" component={GoalDetail} />
            </Stack.Navigator>
          </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
