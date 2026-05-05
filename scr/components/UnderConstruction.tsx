import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../constants/Typography';

interface UnderConstructionProps {
    title?: string;
    onBack?: () => void;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ 
    title = "Feature Coming Soon", 
    onBack 
}) => {
    return (
        <View style={styles.container}>
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="transparent"
            />
            
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Icon name="hammer-wrench" size={80} color="#41849A" />
                    <View style={styles.glow} />
                </View>

                <Text style={[styles.title, Typography.poppins]}>{title}</Text>
                <Text style={[styles.subtitle, Typography.poppins]}>
                    We're working hard to bring you this feature. Stay tuned for updates!
                </Text>

                {onBack && (
                    <TouchableOpacity style={styles.button} onPress={onBack}>
                        <Text style={[styles.buttonText, Typography.poppins]}>Go Back</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    content: {
        width: '85%',
        padding: 30,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#41849A',
        opacity: 0.2,
        transform: [{ scale: 1.5 }],
        zIndex: -1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#41849A',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
        ...Platform.select({
            ios: {
                shadowColor: '#41849A',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UnderConstruction;
