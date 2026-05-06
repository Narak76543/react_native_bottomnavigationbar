import React from "react";
import {
    FlatList, Text, ActivityIndicator, View,
    StyleSheet, Image, Dimensions
} from "react-native";
import { useFetchProducts } from "../Hook/useFetchProducts";
import { Typography } from "../constants/Typography";

const { width } = Dimensions.get('window');

const CheckScreen = () => {
    const { products, loading, refetch } = useFetchProducts();

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#41849A" />
                <Text style={{ marginTop: 10 }}>Fetching Data...!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <Text style={[styles.category , Typography.poppins]}>{item.category.toUpperCase()}</Text>
                            <Text style={[styles.title , Typography.poppins]} numberOfLines={2}>{item.title}</Text>
                            <View style={styles.footer}>
                                <Text style={[styles.price , Typography.poppins]}>${item.price.toFixed(2)}</Text>
                                <View style={styles.ratingBox}>
                                    <Text style={[styles.ratingText , Typography.poppins]}>⭐ {item.rating.rate}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                onRefresh={refetch}
                refreshing={loading}
                contentContainerStyle={styles.listPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listPadding: { padding: 10 },
    card: {
        backgroundColor: '#97dbf6',
        borderRadius: 10,
        margin: 5,
        width: (width / 2) - 20,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        resizeMode: 'contain',
        marginBottom: 10
    },
    infoContainer: { 
        justifyContent: 'space-between' 
    },
    category: { 
        fontSize: 10, 
        color: '#888', 
        fontWeight: '600' 
    },
    title: { 
        fontSize: 13, 
        fontWeight: 'bold', 
        color: '#333', 
        marginVertical: 4, 
        height: 35 
    },
    footer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 5 
    },
    price: { 
        fontSize: 15, 
        fontWeight: '700', 
        color: '#41849A' 
    },
    ratingBox: { 
        backgroundColor: '#e7e0e0', 
        paddingHorizontal: 5, 
        paddingVertical: 2, 
        borderRadius: 5 
    },
    ratingText: { 
        fontSize: 10, 
        color: '#ee2c2c' 
    }
});

export default CheckScreen;