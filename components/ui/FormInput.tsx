import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface FormInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** Optional right-side element in the label row (e.g. "Forgot?") */
  labelRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  labelRight,
  style,
  ...inputProps
}) => {
  const focus = useSharedValue(0);
  const [isFocused, setIsFocused] = React.useState(false);

  const animatedBorder = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focus.value,
      [0, 1],
      [Colors.jadeBorder10, Colors.jade]
    ),
    transform: [{ scale: withTiming(focus.value ? 1.01 : 1, { duration: 200 }) }],
  }));

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focus.value = withTiming(1);
    inputProps.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focus.value = withTiming(0);
    inputProps.onBlur?.(e);
  };

  return (
    <View style={[styles.container, style]}>
      {labelRight ? (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {labelRight}
        </View>
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
      <Animated.View style={[styles.inputWrapper, animatedBorder]}>
        <Ionicons
          name={icon}
          size={20}
          color={isFocused ? Colors.jade : Colors.inkMuted}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.inkMuted}
          {...inputProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.ink,
    marginLeft: 4,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderWidth: 2,
    borderColor: Colors.jadeBorder10,
    borderRadius: 12,
    paddingHorizontal: Layout.spacing.md,
    backgroundColor: Colors.white,
  },
  inputIcon: {
    marginRight: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.ink,
  },
});
