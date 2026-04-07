import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/colors';
import { Layout } from '../../constants/layout';

interface SwipeActionsProps {
  onDunno: () => void;
  onFlip: () => void;
  onKnow: () => void;
}

const ActionButton: React.FC<{
  size: number;
  backgroundColor: string;
  borderColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize: number;
  iconColor: string;
  onPress: () => void;
}> = ({ size, backgroundColor, borderColor, iconName, iconSize, iconColor, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 80 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            borderColor,
          },
        ]}
      >
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </Pressable>
    </Animated.View>
  );
};

export const SwipeActions: React.FC<SwipeActionsProps> = ({
  onDunno,
  onFlip,
  onKnow,
}) => {
  return (
    <View style={styles.container}>
      <ActionButton
        size={52}
        backgroundColor={Colors.roseTint08}
        borderColor={Colors.rose}
        iconName="close"
        iconSize={24}
        iconColor={Colors.rose}
        onPress={onDunno}
      />
      <ActionButton
        size={44}
        backgroundColor={Colors.jadeTint10}
        borderColor={Colors.jadeBorder20}
        iconName="sync-outline"
        iconSize={20}
        iconColor={Colors.jade}
        onPress={onFlip}
      />
      <ActionButton
        size={52}
        backgroundColor={Colors.jadeTint10}
        borderColor={Colors.jadeVivid}
        iconName="checkmark"
        iconSize={24}
        iconColor={Colors.jadeVivid}
        onPress={onKnow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
  },
  button: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
