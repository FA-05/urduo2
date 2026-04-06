import React from 'react';
import { Pressable, View, Text, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

const { width } = Dimensions.get('window');

interface TopicCardProps {
  title: string;
  emoji: string;
  wordCount: number;
  /** Accent colour for the emoji circle when unlocked */
  accentColor?: string;
  isLocked?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  title,
  emoji,
  wordCount,
  accentColor = Colors.jade,
  isLocked = false,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        !isLocked ? undefined : { opacity: 0.55 },
        { opacity: pressed ? 0.88 : isLocked ? 0.55 : 1 },
        style,
      ]}
      onPress={onPress}
    >
      {isLocked && (
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-closed" size={20} color={Colors.inkMuted} />
        </View>
      )}

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

      <View style={styles.footer}>
        <Text style={[styles.wordCount, urduStyle]}>{wordCount} الفاظ</Text>
        {!isLocked && (
          <Ionicons name="chevron-forward" size={12} color={Colors.inkMuted} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - Layout.spacing.md * 3) / 2,
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    marginBottom: Layout.spacing.sm,
  },
  lockOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  emojiCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.sm,
  },
  emoji: {
    fontSize: 30,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
    textAlign: 'center',
    minHeight: 40,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  wordCount: {
    fontSize: 13,
    color: Colors.inkMuted,
  },
});
