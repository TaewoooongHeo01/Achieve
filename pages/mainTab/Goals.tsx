import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { GoalsType } from "../Home";

type GoalProps = {
    goalProps: GoalsType[] | undefined;
  };

const Goals = ({ goalProps }: GoalProps): React.JSX.Element => {

    const renderItem = ({ item }: any) => {
        return (
            <View>
                <Text>{item.title}</Text>
                <Text>{item.d_day}</Text>
            </View>
        )
    }

    if (goalProps === undefined) {
        return (
            <View>
                <Text>목표를 생성해보세요</Text>
            </View>
        )
    }

    return (
        <View style={styles.layout}>
            <FlatList
                data={goalProps}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: 'white', 
    },
    title: {

    },
    subTitle: {
  
    }
});

export default Goals;
