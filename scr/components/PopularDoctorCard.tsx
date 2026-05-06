import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../constants/Typography';
import { PopularDoctor } from '../models/PopularDoctor';

const PopularDoctorCardBase = ({ data }: { data: PopularDoctor }) => {
    return (
        <View style={styles.container}>
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"
            />
            <View style={styles.content}>
                <View style={styles.leftSection}>
                    <Text style={[styles.name, Typography.poppins]} numberOfLines={2}>
                        {data.name}
                    </Text>
                    <Text style={[styles.specialty, Typography.poppins]}>
                        {data.specialty}
                    </Text>
                    
                    <View style={styles.ratingBadge}>
                        <Icon name="star" size={14} color="#FFB800" />
                        <Text style={styles.ratingText}>{data.rating}</Text>
                    </View>
                </View>

                <View style={styles.rightSection}>
                    <Image source={data.image} style={styles.doctorImage} />
                    <TouchableOpacity style={styles.favoriteBtn}>
                        <BlurView
                            style      = {StyleSheet.absoluteFill}
                            blurType   = "light"
                            blurAmount = {10}
                        />
                        <Icon 
                            name  = {data.isFavorite ? "heart" : "heart-outline"}
                            size  = {18}
                            color = {data.isFavorite ? "#41849A" : "#41849A"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export const PopularDoctorCard = React.memo(PopularDoctorCardBase);

const styles = StyleSheet.create({
    container: {
        width          : 280,
        height         : 160,
        borderRadius   : 24,
        overflow       : 'hidden',
        borderWidth    : 1,
        borderColor    : 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginRight    : 16,
        ...Platform.select({
            ios: {
                shadowColor  : '#000',
                shadowOffset : { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius : 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    content: {
        flex         : 1,
        flexDirection: 'row',
        padding      : 16,
    },
    leftSection: {
        flex          : 1,
        justifyContent: 'center',
    },
    name: {
        fontSize    : 20,
        fontWeight  : '500',
        color       : '#333',
        lineHeight  : 24,
        marginBottom: 4,
    },
    specialty: {
        fontSize    : 14,
        color       : '#666',
        marginBottom: 12,
    },
    ratingBadge: {
        flexDirection    : 'row',
        alignItems       : 'center',
        backgroundColor  : 'rgba(255, 255, 255, 0.5)',
        alignSelf        : 'flex-start',
        paddingHorizontal: 8,
        paddingVertical  : 4,
        borderRadius     : 12,
    },
    ratingText: {
        fontSize  : 12,
        fontWeight: '700',
        color     : '#333',
        marginLeft: 4,
    },
    rightSection: {
        width         : 100,
        height        : '100%',
        justifyContent: 'flex-end',
        alignItems    : 'flex-end',
    },
    doctorImage: {
        width     : 120,
        height    : 140,
        position  : 'absolute',
        bottom    : -20,
        right     : -10,
        resizeMode: 'contain',
    },
    favoriteBtn: {
        width          : 36,
        height         : 36,
        borderRadius   : 18,
        overflow       : 'hidden',
        justifyContent : 'center',
        alignItems     : 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth    : 1,
        borderColor    : 'rgba(255, 255, 255, 0.3)',
        position       : 'absolute',
        top            : 0,
        right          : 0,
    },
});
