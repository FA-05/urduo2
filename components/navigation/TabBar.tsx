import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

const TabIcon = ({ name, isFocused }: { name: string; isFocused: boolean }) => {
  const scale = useSharedValue(isFocused ? 1.2 : 1);
  const color = isFocused ? Colors.green : Colors.tabInactive;

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1.2 : 1, {
      mass: 0.5,
      damping: 15,
      stiffness: 300,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  let icon = '🏠';
  switch (name) {
    case 'index':
      icon = '🏠';
      break;
    case 'practice':
      icon = '💪';
      break;
    case 'leaderboard':
      icon = '🏅';
      break;
    case 'profile':
      icon = '👤';
      break;
  }

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ fontSize: 24, color }}>{icon}</Text>
    </Animated.View>
  );
};

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
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
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <TabIcon name={route.name} isFocused={isFocused} />
            {isFocused && (
              <Text style={[styles.label, { color: Colors.green }]}>
                {label as string}
              </Text>
            )}
          </Pressable>
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
    paddingBottom: 24, // Safe area roughly
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    marginTop: 4,
  },
});