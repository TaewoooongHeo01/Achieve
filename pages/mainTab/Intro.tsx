import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";
import { font } from "../../const/styleConst";

import { UserData } from "../Home";

type UserDataProps = {
    userData: UserData | undefined;
}

const Intro = ({ userData }: UserDataProps): React.JSX.Element => {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const day = now.getDay();
    const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    
    return (
        <View style={styles.layout}>
            <Text style={styles.title}>안녕하세요, {userData?.username ?? ''}님</Text>
            <Text style={styles.subTitle}>{year}.{month}.{date}, {dayNames[day]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    title: {
        paddingTop: ms(5, 0.3),
        color: font.mainColor.color,
        fontSize: font.mainSize.fontSize,
        fontWeight: font.mainWeight.fontWeight,
    },
    subTitle: {
        paddingTop: ms(5, 0.3),
        color: font.subText.color,
        fontSize: font.subSize.fontSize,
        fontWeight: font.subWeight.fontWeight,
    }
});

export default Intro;
