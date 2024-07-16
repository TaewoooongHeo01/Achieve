import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//pages
import Main from './pages/Main';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Main" component={Main} />
          {/* <Stack.Screen name="Home" component={Main} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
