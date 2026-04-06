import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  ViewToken,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts, TypeScale, UrduTypeScale } from '../constants/fonts';
import { Layout } from '../constants/layout';
import { Storage, StorageKeys } from '../utils/storage';

const { width, height } = Dimensions.get('window');

interface OnboardingPage {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  titleEn: string;
  titleUr: string;
  description: string;
  gradient: [string, string];
  accent: string;
}

const PAGES: OnboardingPage[] = [
  {
    id: '1',
    icon: 'book-outline',
    titleEn: 'Learn Urdu',
    titleUr: 'اردو سیکھیں',
    description:
      'Master Urdu through fun, bite-sized lessons designed for Italian speakers. Build your vocabulary one word at a time.',
    gradient: [Colors.jade, Colors.jadeDim],
    accent: Colors.jadeVivid,
  },
  {
    id: '2',
    icon: 'game-controller-outline',
    titleEn: 'Interactive Exercises',
    titleUr: 'انٹرایکٹو مشقیں',
    description:
      'Practice with flashcards, quizzes, sentence building, and more. Every lesson keeps you engaged and learning.',
    gradient: [Colors.jade, Colors.jadeDim],
    accent: Colors.jadeVivid,
  },
  {
    id: '3',
    icon: 'flame-outline',
    titleEn: 'Track Your Progress',
    titleUr: 'اپنی ترقی دیکھیں',
    description:
      'Build daily streaks, earn rewards, and watch your skills grow. Your journey to fluency starts now!',
    gradient: [Colors.saffron, Colors.saffronDim],
    accent: Colors.saffronLight,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonScale = useSharedValue(1);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handleGetStarted = async () => {
    await Storage.set(StorageKeys.ONBOARDED, true);
    router.replace('/auth/login');
  };

  const isLastPage = currentIndex === PAGES.length - 1;

  const buttonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const renderPage = ({ item, index }: { item: OnboardingPage; index: number }) => (
    <View style={[styles.page, { width }]}>
      <LinearGradient colors={item.gradient} style={StyleSheet.absoluteFill} />

      {/* Decorative circles */}
      <View style={[styles.circle1, { backgroundColor: `${item.accent}15` }]} />
      <View style={[styles.circle2, { backgroundColor: `${item.accent}10` }]} />

      <View style={[styles.pageContent, { paddingTop: insets.top + 60 }]}>
        {/* Icon */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600).springify()}
          style={[styles.iconContainer, { backgroundColor: `${item.accent}25` }]}
        >
          <Ionicons name={item.icon} size={56} color={Colors.white} />
        </Animated.View>

        {/* Urdu Title */}
        <Animated.Text
          entering={FadeIn.delay(350).duration(500)}
          style={styles.urduTitle}
        >
          {item.titleUr}
        </Animated.Text>

        {/* English Title */}
        <Animated.Text
          entering={FadeInUp.delay(400).duration(600).springify()}
          style={styles.title}
        >
          {item.titleEn}
        </Animated.Text>

        {/* Description */}
        <Animated.Text
          entering={FadeInUp.delay(500).duration(600)}
          style={styles.description}
        >
          {item.description}
        </Animated.Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={PAGES}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Bottom controls */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 24 }]}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {PAGES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Action button */}
        <Animated.View style={[buttonAnimStyle, { width: '100%' }]}>
          <Pressable
            onPress={isLastPage ? handleGetStarted : handleNext}
            onPressIn={() => {
              buttonScale.value = withSpring(0.95);
            }}
            onPressOut={() => {
              buttonScale.value = withSpring(1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isLastPage ? 'Login' : 'Next'}
            </Text>
            <Ionicons
              name={isLastPage ? 'log-in-outline' : 'chevron-forward'}
              size={20}
              color={Colors.white}
            />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.jadeDim,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    top: -width * 0.3,
    right: -width * 0.3,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    bottom: -width * 0.1,
    left: -width * 0.2,
  },
  pageContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  urduTitle: {
    fontFamily: Fonts.urduBold,
    fontSize: UrduTypeScale.h1,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 34,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 28,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: Colors.white,
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.jadeVivid,
    borderColor: Colors.jade,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: Layout.radius.lg,
    minHeight: 48,
    width: '100%',
    gap: 8,
    ...Layout.shadow.btn,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 0.4,
  },
});
