import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

//pages
import Home from './mainTab/Home';
import History from './mainTab/History';
import Profile from './mainTab/Profile';

const Main = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <Tab.Navigator initialRouteName='Home'
              screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#212121', borderTopWidth: 0 },
                tabBarShowLabel: false,
              }}>
            <Tab.Screen name="History" component={History} />       
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Main;
