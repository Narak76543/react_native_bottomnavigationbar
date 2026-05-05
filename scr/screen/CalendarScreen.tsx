import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Typography } from "../constants/Typography";

const CalendarScreen = () => (
    <View style={styles.calendarContainer}>
        <Text style={[styles.textCalendarScreen, Typography.poppins]}>
            Calendar Screen
        </Text>
    </View>
);

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    textCalendarScreen: {
        fontSize: 32,
        color: '#1e293b'
    }
});

export default CalendarScreen; 