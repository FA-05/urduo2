import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Layout } from '../../constants/layout';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  containerStyle,
}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      setShowModal(true);
      translateY.value = withTiming(0, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, {
        duration: 240,
        easing: Easing.in(Easing.quad),
      });
      opacity.value = withTiming(0, { duration: 200 }, (finished) => {
        if (finished) runOnJS(setShowModal)(false);
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!showModal) return null;

  return (
    <RNModal transparent visible={showModal} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, animatedBackdropStyle]} />
      </TouchableWithoutFeedback>
      <View style={styles.container} pointerEvents="box-none">
        <Animated.View style={[styles.content, containerStyle, animatedStyle]}>
          {/* Drag handle pill */}
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 46, 0.55)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Colors.cardBg,
    borderTopLeftRadius: Layout.radius.xxl,
    borderTopRightRadius: Layout.radius.xxl,
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
    minHeight: SCREEN_HEIGHT * 0.28,
    ...Layout.shadow.elevated,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: Layout.radius.round,
    alignSelf: 'center',
    marginBottom: Layout.spacing.lg,
  },
});