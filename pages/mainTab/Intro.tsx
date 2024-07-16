import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

interface IntroProps {
    username: string,
}

const Intro = (props: IntroProps): React.JSX.Element => {

    // 현재 날짜 객체 생성
    const now = new Date();

    // 날짜와 요일 표시 포맷 설정
    const dateStr = now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long'
    });

    return (
        <View style={styles.layout}>
            <Text style={styles.title}>안녕하세요, {props.username}님</Text>
            <Text style={styles.subTitle}>{dateStr}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {

    },
    title: {
        paddingTop: ms(5, 0.3),
        color: 'white', 
        fontSize: ms(20, 0.3),
        fontWeight: 'bold', 
    },
    subTitle: {
        paddingTop: ms(5, 0.3),
        color: 'rgba(255, 255, 255, 0.7)', 
        fontSize: ms(15, 0.3),
        fontWeight: 'bold',
    }
});

export default Intro;
