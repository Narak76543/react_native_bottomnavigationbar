import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../constants/Typography";

const HomeScreen = () => (
    <View style={styles.homeContainer}>
        <Text style={[styles.textHomeScreen, Typography.poppins]}>
            Home Screen
        </Text>
    </View>
);

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textHomeScreen: {
        fontSize: 32,
        color: '#1e293b',
    }
});

export default HomeScreen;