import React from "react";
import { View, Text, StatusBar, FlatList, StyleSheet, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

//mainTab components
import Intro from "./mainTab/Intro";

const Home = (): React.JSX.Element => {
    const {top} = useSafeAreaInsets();

    const data = [
        {type: 'intro', username: 'username'},
    ];

    const renderItem = ({ item }: { item: any }) => {
        switch (item.type) {
          case 'intro':
            return (
              <Intro username={data[0].username}/>
            );
          case 'image':
            return (
              <View style={{ alignItems: 'center', margin: 100 }}>
                <Text>{item.description}</Text>
              </View>
            );
          case 'text':
            return <Text style={{ margin: 10 }}>{item.content}</Text>;
          default:
            return <View />;
        }
    };

    return (
        <SafeAreaView edges={Platform.OS === 'ios' ? ['left', 'right'] : ['top', 'left', 'right']} style={{ flex: 1 }}>
            {
                Platform.OS === 'ios' ? 
                (<View style={{backgroundColor: '#121212', height: top}}>
                    <StatusBar barStyle="light-content"/>
                </View>) :
                (<StatusBar barStyle="light-content" backgroundColor="#121212"/>)
            }
            <View style={{ flex: 1, backgroundColor: '#121212', paddingHorizontal: ms(20, 0.3) }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default Home;
