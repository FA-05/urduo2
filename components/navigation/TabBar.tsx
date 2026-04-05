import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { outline: TabIconName; filled: TabIconName }> = {
  index:       { outline: 'home-outline',       filled: 'home' },
  vocabulary:  { outline: 'book-outline',       filled: 'book' },
  profile:     { outline: 'person-outline',     filled: 'person' },
};

const TabItem = ({
  name,
  label,
  isFocused,
  onPress,
  onLongPress,
}: {
  name: string;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) => {
  const scale = useSharedValue(1);
  const indicatorWidth = useSharedValue(isFocused ? 1 : 0);

  React.useEffect(() => {
    indicatorWidth.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    width: `${indicatorWidth.value * 100}%` as any,
    opacity: indicatorWidth.value,
  }));

  const color = isFocused ? Colors.tabActive : Colors.tabInactive;
  const iconName = isFocused ? TAB_ICONS[name]?.filled : TAB_ICONS[name]?.outline;

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
      {/* Active indicator bar at top */}
      <View style={styles.indicatorTrack}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>

      <Animated.View style={iconStyle}>
        <Ionicons 
          name={iconName as any} 
          size={24} 
          color={color} 
          style={styles.icon}
        />
      </Animated.View>

      <Text
        style={[
          styles.label,
          {
            color,
            fontFamily: isFocused ? Fonts.bold : Fonts.regular,
            opacity: isFocused ? 1 : 0.6,
          },
        ]}
        numberOfLines={1}
      >
        {label as string}
      </Text>
    </Pressable>
  );
};

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: Math.max(insets.bottom, Layout.spacing.sm) },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
            label={label as string}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Layout.spacing.xs,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    gap: 2,
  },
  indicatorTrack: {
    position: 'absolute',
    top: -1,
    left: '25%',
    right: '25%',
    height: 3,
    borderRadius: Layout.radius.round,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  indicator: {
    height: '100%',
    backgroundColor: Colors.tabActive,
    borderRadius: Layout.radius.round,
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});