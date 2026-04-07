import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface MiniRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}

export const MiniRing: React.FC<MiniRingProps> = ({
  progress,
  size = 22,
  strokeWidth = 2.5,
  color = Colors.jadeVivid,
  trackColor = Colors.jadeBorder10,
}) => {
  if (progress >= 1) {
    return (
      <View style={[styles.checkContainer, { width: size, height: size }]}>
        <Ionicons name="checkmark-circle" size={size} color={Colors.jadeVivid} />
      </View>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
