import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { MiniRing } from './MiniRing';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface TopicPillProps {
  title: string;
  emoji: string;
  wordCount: number;
  masteredCount: number;
  accentColor?: string;
  isLocked?: boolean;
  onPress: () => void;
}

export const TopicPill: React.FC<TopicPillProps> = ({
  title,
  emoji,
  wordCount,
  masteredCount,
  accentColor = Colors.jadeVivid,
  isLocked = false,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const progress = wordCount > 0 ? masteredCount / wordCount : 0;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isLocked) {
      scale.value = withTiming(0.97, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          isLocked && styles.containerLocked,
        ]}
      >
        <View
          style={[
            styles.emojiCircle,
            { backgroundColor: isLocked ? Colors.creamDeep : `${accentColor}18` },
          ]}
        >
          <Text style={[styles.emoji, isLocked && { opacity: 0.3 }]}>{emoji}</Text>
        </View>

        <Text
          style={[styles.title, isLocked && { color: Colors.inkMuted }]}
          numberOfLines={2}
        >
          {title}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.wordCount}>{wordCount} words</Text>
          {isLocked ? (
            <Ionicons name="lock-closed" size={14} color={Colors.inkMuted} />
          ) : (
            <MiniRing progress={progress} />
          )}
        </View>

        <View
          style={[
            styles.accentBar,
            { backgroundColor: isLocked ? Colors.creamDeep : accentColor },
          ]}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    padding: 14,
    paddingBottom: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerLocked: {
    opacity: 0.55,
  },
  emojiCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.ink,
    textAlign: 'center',
    minHeight: 32,
    lineHeight: 16,
    marginBottom: Layout.spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  wordCount: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Colors.inkMuted,
  },
  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: Layout.radius.lg,
    borderBottomRightRadius: Layout.radius.lg,
  },
});
