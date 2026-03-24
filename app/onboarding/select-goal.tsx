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

interface GoalOptionProps {
  icon: string;
  title: string;
  subtitle: string;
  xp: number;
  isSelected: boolean;
  onSelect: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GoalOption: React.FC<GoalOptionProps> = ({ icon, title, subtitle, xp, isSelected, onSelect }) => {
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
      <Text style={[styles.optionXP, isSelected && { color: Colors.blueDark }]}>
        {xp} XP / day
      </Text>
    </AnimatedPressable>
  );
};

export default function SelectGoalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setDailyGoalXP } = useSettingsStore();
  const [selectedXP, setSelectedXP] = useState<number>(20);

  const handleContinue = () => {
    setDailyGoalXP(selectedXP);
    router.push('/onboarding/select-level');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + Layout.spacing.xl }]}>
      <Text style={[styles.headerTitle, urduStyle]}>آپ کا روزانہ کا ہدف کیا ہے؟</Text>

      <View style={styles.optionsContainer}>
        <GoalOption
          icon="🥉"
          title="ہلکا"
          subtitle="5 منٹ روزانہ"
          xp={10}
          isSelected={selectedXP === 10}
          onSelect={() => setSelectedXP(10)}
        />
        <GoalOption
          icon="🥇"
          title="باقاعدہ"
          subtitle="10 منٹ روزانہ"
          xp={20}
          isSelected={selectedXP === 20}
          onSelect={() => setSelectedXP(20)}
        />
        <GoalOption
          icon="🏆"
          title="سنجیدہ"
          subtitle="20 منٹ روزانہ"
          xp={50}
          isSelected={selectedXP === 50}
          onSelect={() => setSelectedXP(50)}
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
    padding: Layout.spacing.lg,
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
    fontSize: 32,
    marginRight: Layout.spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: Colors.textDark,
  },
  optionSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMid,
  },
  optionXP: {
    fontFamily: Fonts.bold,
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