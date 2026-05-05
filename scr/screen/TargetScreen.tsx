import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../constants/Typography";


const TargetScreen = () => (
    <View style={styles.targetContainer}>
        <Text style={[styles.textTargetScreen, Typography.poppins]}>
            Target Screen
        </Text>
    </View>
);

const styles = StyleSheet.create({
    targetContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    textTargetScreen: {
        fontSize: 32,
        color: '#1e293b'
    }
});

export default TargetScreen; 