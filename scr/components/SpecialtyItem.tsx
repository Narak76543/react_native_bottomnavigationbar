/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Platform, Animated} from 'react-native';
import { Typography } from '../constants/Typography';
import { Specailty } from '../models/Specailty';

const SpecialtyBase = ({ item, isActive }: { item: Specailty, isActive?: boolean }) => {
    const IconComponent = item.specailtyIcon;
    
    // Animation value: 0 for inactive, 1 for active
    const animatedValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: isActive ? 1 : 0,
            useNativeDriver: false,
            friction: 9, // User specified
            tension: 55, // User specified
        }).start();
    }, [isActive]);

    // Interpolations
    const containerWidth = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [54, 165], // 54 (circle) -> 165 (expanded)
    });

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.25)', '#41849A'],
    });

    const iconWrapperBackground = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#FFFFFF'], // Inactive has no white circle background in user request? 
        // Wait, "The active state should transition to a white icon wrapper"
        // "The inactive state should have a ... white icon" -> usually means icon stroke is white
    });

    const labelOpacity = animatedValue.interpolate({
        inputRange: [0.7, 1],
        outputRange: [0, 1],
    });

    const labelWidth = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // The "0 to 125" part probably refers to the expansion
    });

    return (
        <Animated.View 
            style={[
                styles.itemContainer, 
                { 
                    width: containerWidth,
                    backgroundColor 
                },
                isActive && styles.activeShadow
            ]}
        >
            <Animated.View style={[styles.iconWrapper, { backgroundColor: iconWrapperBackground }]}>
                {typeof IconComponent === 'function' ? (
                    <IconComponent 
                        width={24} 
                        height={24} 
                        stroke={isActive ? '#41849A' : '#FFFFFF'} 
                        strokeWidth={1.5}
                    />
                ) : null}
            </Animated.View>
            
            <Animated.View style={{ 
                opacity: labelOpacity, 
                width: labelWidth,
                overflow: 'hidden',
                justifyContent: 'center',
            }}>
                <Text 
                    numberOfLines={1}
                    style={[styles.specName, Typography.poppins]}
                >
                    {item.name}
                </Text>
            </Animated.View>
        </Animated.View>
    );
};

export const Specialty = React.memo(SpecialtyBase);

const styles = StyleSheet.create({
    itemContainer: {
        height: 54,
        borderRadius: 27,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    activeShadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#41849A',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    iconWrapper: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    specName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 8,
        minWidth: 110, // Prevent text wrapping
    },
});