/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import { Typography } from '../constants/Typography';
import { Appointment } from '../models/Appointment';

const AppointmentCardBase = ({ data }: { data: Appointment; index?: number }) => {
  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Image source={data.doctorImage} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={[Typography.poppins, styles.name]}>{data.doctorName}</Text>
            <Text style={[Typography.poppins, styles.sub]}>{data.specialty}</Text>
          </View>
          <TouchableOpacity><Text style={styles.viewDetail}>View Details</Text></TouchableOpacity>
        </View>

        <View style={styles.dateTimeRow}>
          <Icon name="calendar-blank" size={16} color="#41849A" />
          <Text style={styles.dateTimeText}>{data.date}</Text>
          <Icon name="clock-outline" size={16} color="#41849A" style={{marginLeft: 15}} />
          <Text style={styles.dateTimeText}>{data.time}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btnReschedule}>
            <Text style={styles.btnRescheduleText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnJoin}>
              <Icon name="video" color="#fff" size={18}/>
              <Text style={styles.btnJoinText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const AppointmentCard = React.memo(AppointmentCardBase);

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.7)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: 'rgba(65, 132, 154, 0.3)',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '400', 
    color: '#0F1419',
  },
  sub: {
    fontSize: 13,
    color: '#5A6B73',
    marginTop: 2,
  },
  viewDetail: {
    fontSize: 12,
    color: '#2B8AA0', 
    fontWeight: '600',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateTimeText: {
    fontSize: 12,
    color: '#2B8AA0',
    marginLeft: 6,
    fontFamily: 'Poppins-Regular',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btnReschedule: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  btnJoin: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#2B8AA0',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2B8AA0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnRescheduleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F1419',
    fontFamily: 'Poppins-Regular',
  },
  btnJoinText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});

