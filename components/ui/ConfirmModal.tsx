import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from './Modal';
import { Button } from './Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface ConfirmAction {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  emoji?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  message: string;
  actions: ConfirmAction[];
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  emoji,
  icon,
  iconColor = Colors.jade,
  title,
  message,
  actions,
}) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {emoji ? (
          <View style={[styles.emojiContainer, { backgroundColor: `${iconColor}15` }]}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
        ) : icon ? (
          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
            <Ionicons name={icon} size={36} color={iconColor} />
          </View>
        ) : null}

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.actions}>
          {actions.map((action, index) => (
            <Button
              key={index}
              title={action.title}
              variant={action.variant ?? 'primary'}
              icon={action.icon}
              onPress={action.onPress}
              style={styles.actionButton}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Layout.spacing.sm,
  },
  emojiContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  emoji: {
    fontSize: 36,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.extraBold,
    color: Colors.ink,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
    lineHeight: 22,
    paddingHorizontal: Layout.spacing.sm,
  },
  actions: {
    width: '100%',
    gap: Layout.spacing.sm,
  },
  actionButton: {
    width: '100%',
  },
});
