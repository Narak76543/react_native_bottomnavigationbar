import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import HomeScreen from './scr/screen/HomeScreen';
import CheckScreen from './scr/screen/CheckScreen';
import CalendarScreen from './scr/screen/CalendarScreen';
import TargetScreen from './scr/screen/TargetScreen';
import { BlurView } from '@react-native-community/blur';
import HouseSvg from './assets/icon/house.svg';
import CheckCircleSvg from './assets/icon/circle-check.svg';
import CalendarSvg from './assets/icon/calendar-days.svg';
import PointerSvg from './assets/icon/spline-pointer.svg';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const MARGIN = 20;
const TAB_BAR_WIDTH = width - MARGIN * 2;
const TAB_WIDTH = TAB_BAR_WIDTH / 4;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={30}
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.5)"
      />

      {/* Top Glass Edge Reflection */}
      <View style={styles.glassEdge} />

      {/* Sliding Indicator */}
      <Animated.View
        style={[
          styles.slidingIndicator,
          {
            width: TAB_WIDTH,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.indicatorPill} />
      </Animated.View>

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent =
          route.name === 'Home' ? HouseSvg :
            route.name === 'Check' ? CheckCircleSvg :
              route.name === 'Calendar' ? CalendarSvg :
                PointerSvg;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <IconComponent
              width={isFocused ? 28 : 26}
              height={isFocused ? 28 : 26}
              stroke={isFocused ? '#1e293b' : 'rgba(30, 41, 59, 0.35)'}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        {/* Global Atmospheric Background */}
        <View style={[styles.glow, styles.glowTop]} />
        <View style={[styles.glow, styles.glowBottom]} />

        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              tabBar={(props) => <CustomTabBar {...props} />}
              screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: 'transparent' },
              }}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Check" component={CheckScreen} />
              <Tab.Screen name="Calendar" component={CalendarScreen} />
              <Tab.Screen name="Target" component={TargetScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#E0E9EF', 
  },
  glow: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    opacity: 0.4,
  },
  glowTop: {
    top: -100,
    right: -100,
    backgroundColor: '#9ACBDD',
  },
  glowBottom: {
    bottom: -100,
    left: -150,
    backgroundColor: '#C5DDE8',
  },


  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 35,
    marginHorizontal: MARGIN,
    width: TAB_BAR_WIDTH,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)', 
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 1000,
  },
  glassEdge: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: 1002,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  slidingIndicator: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  indicatorPill: {
    width: 65,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.03)',
  },
});

export default App;