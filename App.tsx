import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions, ImageBackground } from 'react-native';
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

const CustomTabBar = ({ state, descriptors: _descriptors, navigation }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 9,
      tension: 55,
    }).start();
  }, [state.index, translateX]);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.glassTint} />
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={24}
        reducedTransparencyFallbackColor="rgba(232, 246, 249, 0.84)"
      />

      <View style={styles.glassEdge} />
      <View style={styles.softGlassEdge} />
      <View style={styles.innerGlow} />

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
        // const { options } = descriptors[route.key];
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
            activeOpacity={0.7}
          >
            <IconComponent
              width={26}
              height={26}
              stroke={isFocused ? '#174456' : 'rgba(37, 65, 76, 0.54)'}
              strokeWidth={isFocused ? 1.8 : 1.45}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const App = () => {
  return (
    <SafeAreaProvider>
      <ImageBackground 
        source={require('./assets/background/bg.png')} 
        style={styles.rootContainer}
        resizeMode="cover"
      >
        <View style={styles.appContent}>
          <NavigationContainer>
            <Tab.Navigator
              tabBar={renderCustomTabBar}
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
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  appContent: {
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 34,
    marginHorizontal: MARGIN,
    width: TAB_BAR_WIDTH,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(232, 249, 252, 0.38)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.62)',
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#12313B',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 14,
    zIndex: 1000,
  },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    zIndex: 1000,
  },
  glassEdge: {
    position: 'absolute',
    top: 0,
    left: 34,
    right: 34,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    zIndex: 1002,
  },
  softGlassEdge: {
    position: 'absolute',
    top: 1,
    left: 18,
    right: 18,
    height: 10,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.34)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    zIndex: 1002,
  },
  innerGlow: {
    position: 'absolute',
    left: 1,
    right: 1,
    bottom: 1,
    height: 30,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    zIndex: 1002,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1004,
  },
  slidingIndicator: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1003,
  },
  indicatorPill: {
    width: 68,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.52)',
    shadowColor: '#234957',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default App;
