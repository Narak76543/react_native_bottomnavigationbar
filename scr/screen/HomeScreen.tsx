/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState, useMemo, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ListRenderItem,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
    Platform,
    UIManager,
} from 'react-native';
import { Typography } from '../constants/Typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapPinSvg from '../../assets/icon/map-pin.svg';
import BellSvg from '../../assets/icon/bell-check.svg';
import { Appointment } from '../models/Appointment';
import { AppointmentCard } from '../components/AppointmentCard';
import type { Specialty } from '../models/Specailty';
import { SpecialtyComponent } from '../components/SpecialtyItem';
import { PopularDoctorCard } from '../components/PopularDoctorCard';
import { PopularDoctor } from '../models/PopularDoctor';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

import BrainSvg from '../../assets/icon/brain.svg';
import HouseSvg from '../../assets/icon/house.svg';
import CalendarSvg from '../../assets/icon/calendar-days.svg';
import CheckSvg from '../../assets/icon/circle-check.svg';

const specialtiesData: Specialty[] = [
    { 
        id: '1', 
        name: 'Neurologist', 
        specialtyIcon: BrainSvg 
    },
    { 
        id: '2', 
        name: 'Dentist', 
        specialtyIcon: HouseSvg 
    },
    { 
        id: '3', 
        name: 'Cardiologist', 
        specialtyIcon: CalendarSvg 
    },
    { 
        id: '4', 
        name: 'Dermatologist', 
        specialtyIcon: CheckSvg 
    },
];

const popularDoctors: PopularDoctor[] = [
    {
        id        : '1',
        name      : 'Dr. Sun Vatanak',
        specialty : 'Neurologist',
        rating    : 4.8,
        image     : require('../../assets/image/dr3.png'),
        isFavorite: true,
    },
    {
        id        : '2',
        name      : 'Dr. David Jones',
        specialty : 'Cardiologist',
        rating    : 4.9,
        image     : require('../../assets/image/dr.jpg'),
        isFavorite: false,
    },
];

const appointments: Appointment[] = [
    {
        id         : '1',
        doctorName : 'Dr. Meng Seyha',
        specialty  : 'Cardiologist',
        date       : '07 November Sunday',
        time       : '3:00 am GT+7',
        doctorImage: require('../../assets/image/dr.jpg')
    },
    {
        id         : '2',
        doctorName : 'Dr. Yon Chanranuth',
        specialty  : 'Cardiologist',
        date       : '08 November Monday',
        time       : '3:00 am GT+7',
        doctorImage: require('../../assets/image/dr2.jpg')
    },
    {
        id         : '3',
        doctorName : 'Dr. Sun Vatanak',
        specialty  : 'Cardiologist',
        date       : '09 November Tuesday',
        time       : '3:00 am GT+7',
        doctorImage: require('../../assets/image/dr3.png')
    },
];

const SCREEN_HORIZONTAL_PADDING = 20;
const CARD_GAP = 17;

const HomeHeader = React.memo(() => (
    <View style={styles.header}>
        <View style={styles.headerLeftSide}>
            <Image source={require('../../assets/image/dr.jpg')} style={styles.drImage} />
            <View>
                <Text style={[styles.drNameText, Typography.poppins]}>Fetta Hill</Text>
                <View style={styles.locationSectionRow}>
                    <MapPinSvg width={12} height={12} stroke="white" />
                    <Text style={[styles.drLocationText, Typography.poppins]}>Dubai, Marina, UAE</Text>
                </View>
            </View>
        </View>
        <View style={styles.bgOfBell}>
            <BellSvg width={20} height={20} stroke="white" strokeWidth={1.4} />
        </View>
    </View>
));

const UpcomingTitle = React.memo(() => (
    <View style={styles.upcomingWrapper}>
        <Text style={[styles.upcomingText, Typography.poppins]}>Upcoming Appointments</Text>
    </View>
));

const HomeScreen = () => {
    const { width } = useWindowDimensions();
    const [activeSpecialtyId, setActiveSpecialtyId] = useState('1');
    const scrollRef = useRef<ScrollView>(null);

    const cardWidth = useMemo(() => width - SCREEN_HORIZONTAL_PADDING * 2, [width]);
    const snapInterval = useMemo(() => cardWidth + CARD_GAP, [cardWidth]);

    const handleSpecialtyPress = useCallback((id: string) => {
        setActiveSpecialtyId(id);
    }, []);

    const renderAppointment: ListRenderItem<Appointment> = useCallback(
        ({ item, index }) => (
            <View style={[styles.carouselItem, { width: cardWidth }]}>
                <AppointmentCard data={item} index={index} />
            </View>
        ),
        [cardWidth],
    );

    const getItemLayout = useCallback(
        (_: ArrayLike<Appointment> | null | undefined, index: number) => ({
            length: snapInterval,
            offset: snapInterval * index,
            index,
        }),
        [snapInterval],
    );

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.verticalContainer}>

                <HomeHeader />
                <UpcomingTitle />

                {/* Appointment Carousel */}
                <FlatList
                    data = {appointments}
                    horizontal
                    keyExtractor                   = {item => item.id}
                    renderItem                     = {renderAppointment}
                    getItemLayout                  = {getItemLayout}
                    showsHorizontalScrollIndicator = {false}
                    snapToInterval                 = {snapInterval}
                    snapToAlignment                = "start"
                    decelerationRate               = "fast"
                    disableIntervalMomentum
                    bounces               = {false}
                    overScrollMode        = "never"
                    contentContainerStyle = {styles.carouselContent}
                    style                 = {styles.carousel}
                    removeClippedSubviews
                    initialNumToRender  = {appointments.length}
                    maxToRenderPerBatch = {appointments.length}
                    windowSize          = {3}
                /> 

                {/* Doctor Specialty Section */}
                <View style={styles.drSpecailtyHeader}>
                    <Text style={[Typography.title, { color: 'white' }]}>Doctor Specialty</Text>
                    <TouchableOpacity>
                        <Text style={[styles.viewAllText, Typography.poppins]}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.specailtyContainer}>
                    <ScrollView
                        ref = {scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        style                          = {styles.specailtyScroll}
                        contentContainerStyle          = {styles.specailtyScrollContent}
                        decelerationRate               = "fast"
                    >
                        {specialtiesData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleSpecialtyPress(item.id)}
                                activeOpacity={0.9}
                            >
                                <SpecialtyComponent
                                    item={item}
                                    isActive={activeSpecialtyId === item.id}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.drSpecailtyHeader}>
                    <Text style={[Typography.title, { color: 'white' }]}>Popular Doctor</Text>
                    <TouchableOpacity>
                        <Text style={[styles.viewAllText, Typography.poppins]}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.popularDoctorsScroll}
                >
                    {popularDoctors.map((doc) => (
                        <PopularDoctorCard key={doc.id} data={doc} />
                    ))}
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1
    },
    verticalContainer: {
        flex      : 1,
        paddingTop: 8
    },
    header: {
        flexDirection    : 'row',
        justifyContent   : 'space-between',
        alignItems       : 'center',
        marginBottom     : 10,
        paddingHorizontal: 20,
    },
    drImage: {
        width       : 44,
        height      : 44,
        borderRadius: 22
    },
    headerLeftSide: {
        flexDirection: 'row',
        gap          : 10
    },
    drNameText: {
        fontSize: 15,
        color   : 'white'
    },
    drLocationText: {
        fontSize: 10,
        color   : 'white'
    },
    locationSectionRow: {
        flexDirection: 'row', gap: 2
    },
    bgOfBell: {
        width          : 50,                       height: 50,
        borderRadius   : 25,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent : 'center',
        alignItems     : 'center',
    },
    upcomingWrapper: {
        flexDirection    : 'row',
        justifyContent   : 'center',
        alignItems       : 'center',
        marginVertical   : 2,
        paddingHorizontal: 20,
    },
    upcomingText: {
        fontSize: 10,
        color   : 'white'
    },
    carousel: {
        overflow : 'visible',
        maxHeight: 260
    },
    carouselContent: {
        gap              : CARD_GAP,
        paddingBottom    : 8,
        paddingHorizontal: 20,
    },
    carouselItem: {
        justifyContent: 'center'
    },
    drSpecailtyHeader: {
        flexDirection    : 'row',
        justifyContent   : 'space-between',
        alignItems       : 'center',
        marginTop        : 10,
        marginBottom     : 10,
        paddingHorizontal: 20,
    },
    viewAllText: {
        fontSize: 12,
        color   : 'white',
        opacity : 0.8
    },
    specailtyContainer: {
        height: 80
    },
    specailtyScroll: {
        overflow: 'visible'
    },
    specailtyScrollContent: {
        gap              : 12,
        alignItems       : 'center',
        paddingHorizontal: 20,
        paddingBottom    : 10,
    },
    popularDoctorsScroll: {
        paddingHorizontal: 20,
        paddingBottom    : 20,
    }
});

export default HomeScreen;
