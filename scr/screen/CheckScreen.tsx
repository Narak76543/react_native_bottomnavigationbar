import React from "react";
import { Typography } from "../constants/Typography";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const CheckScreen = () => (
    <View style={styles.CheckContainer}>
        <Text style={[styles.textCheckScreen, Typography.poppins]}>
            Check Screen
        </Text>
    </View>
);

const styles = StyleSheet.create({
    CheckContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    textCheckScreen: {
        fontSize: 32,
        color: '#1e293b'
    }
});

export default CheckScreen; 