import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  Home01Icon,
  Route01Icon,
  BookOpen01Icon,
  User03Icon,
} from '@hugeicons/core-free-icons';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

/** Route icon with filled circles and stroke-only connecting line */
const RouteFilled = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
      fill={color}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 22C7.65685 22 9 20.6569 9 19C9 17.3431 7.65685 16 6 16C4.34315 16 3 17.3431 3 19C3 20.6569 4.34315 22 6 22Z"
      fill={color}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 5H8.5C6.567 5 5 6.567 5 8.5C5 10.433 6.567 12 8.5 12H15.5C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19H12"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/** Home icon with filled house and white inner stroke */
const HomeFilled = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z"
      fill={color}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TAB_CONFIG: Record<string, { icon: any; label: string; fillOnActive: boolean }> = {
  index:      { icon: Home01Icon, label: 'Home', fillOnActive: true },
  path:       { icon: Route01Icon, label: 'Path', fillOnActive: false },
  vocabulary: { icon: BookOpen01Icon, label: 'Vocab', fillOnActive: true },
  profile:    { icon: User03Icon, label: 'Profile', fillOnActive: true },
};

const TabItem = ({
  name,
  isFocused,
  onPress,
  onLongPress,
}: {
  name: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) => {
  const scale = useSharedValue(1);
  const config = TAB_CONFIG[name] ?? { icon: Home01Icon, label: '', fillOnActive: true };

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const color = isFocused ? Colors.jade : Colors.inkMuted;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItem}
      hitSlop={Layout.hitSlop}
    >
      <Animated.View style={[styles.tabContent, animatedStyle]}>
        {isFocused && name === 'index' ? (
          <HomeFilled size={22} color={color} />
        ) : isFocused && name === 'path' ? (
          <RouteFilled size={22} color={color} />
        ) : (
          <HugeiconsIcon
            icon={config.icon}
            size={22}
            color={color}
            fill={isFocused && config.fillOnActive ? color : 'none'}
            strokeWidth={isFocused ? 2 : 1.8}
          />
        )}
        <Text
          style={[
            styles.tabLabel,
            {
              color,
              fontFamily: isFocused ? Fonts.bold : Fonts.medium,
            },
          ]}
          numberOfLines={1}
        >
          {config.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const content = (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TabItem
            key={route.key}
            name={route.name}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );

  // Floating tab bar with safe area spacing below
  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.floatingWrapper, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          {content}
        </BlurView>
      </View>
    );
  }

  return (
    <View style={[styles.floatingWrapper, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.androidContainer}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  blurContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.jadeBorder08,
    shadowColor: '#0F1F15',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  androidContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.jadeBorder08,
    elevation: 3,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.85)' : Colors.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  tabContent: {
    alignItems: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: 0.3,
    textAlign: 'center',
    marginTop: 2,
  },
});
