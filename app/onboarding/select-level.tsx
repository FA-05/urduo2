import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { useSettingsStore } from '../../store/settingsStore';
import * as Haptics from 'expo-haptics';

interface LevelOptionProps {
  icon: string;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const LevelOption: React.FC<LevelOptionProps> = ({ icon, title, subtitle, isSelected, onSelect }) => {
  const isPressed = useSharedValue(false);

  const handlePressIn = () => {
    isPressed.value = true;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    isPressed.value = false;
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isPressed.value ? 0.98 : 1, { mass: 0.5, damping: 15, stiffness: 300 });
    return {
      transform: [{ scale }],
    };
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onSelect}
      style={[
        styles.optionCard,
        isSelected && styles.optionCardSelected,
        animatedStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text style={styles.optionIcon}>{icon}</Text>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, urduStyle, isSelected && { color: Colors.blueDark }]}>
          {title}
        </Text>
        <Text style={[styles.optionSubtitle, urduStyle]}>{subtitle}</Text>
      </View>
    </AnimatedPressable>
  );
};

export default function SelectLevelScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setHasOnboarded } = useSettingsStore();
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');

  const handleContinue = () => {
    setHasOnboarded(true);
    router.replace('/(tabs)/');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + Layout.spacing.xl }]}>
      <Text style={[styles.headerTitle, urduStyle]}>آپ کا اطالوی زبان کا کیا تجربہ ہے؟</Text>

      <View style={styles.optionsContainer}>
        <LevelOption
          icon="🐣"
          title="بالکل نیا"
          subtitle="Absolute Beginner"
          isSelected={selectedLevel === 'beginner'}
          onSelect={() => setSelectedLevel('beginner')}
        />
        <LevelOption
          icon="📖"
          title="تھوڑا جانتا ہوں"
          subtitle="Some Knowledge"
          isSelected={selectedLevel === 'intermediate'}
          onSelect={() => setSelectedLevel('intermediate')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="جاری رکھیں"
          onPress={handleContinue}
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Layout.spacing.xl,
  },
  headerTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: Colors.textDark,
    textAlign: 'center',
    marginTop: Layout.spacing.xxl,
    marginBottom: Layout.spacing.xxl * 1.5,
  },
  optionsContainer: {
    gap: Layout.spacing.lg,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.xl,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  optionCardSelected: {
    borderColor: Colors.blueDark,
    backgroundColor: Colors.blueLight,
  },
  optionIcon: {
    fontSize: 40,
    marginRight: Layout.spacing.lg,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.textDark,
  },
  optionSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textMid,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Layout.spacing.xxl,
    left: Layout.spacing.xl,
    right: Layout.spacing.xl,
  },
});