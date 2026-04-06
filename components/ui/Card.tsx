import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Layout } from '../../constants/layout';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  surface?: boolean;  // Use slightly elevated surface colour
}

export const Card: React.FC<CardProps> = ({ children, style, surface = false }) => {
  return (
    <View
      style={[
        styles.container,
        surface && styles.surfacing,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
  },
  surfacing: {
    backgroundColor: Colors.cream,
  },
});