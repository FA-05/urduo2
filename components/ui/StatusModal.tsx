import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from './Modal';
import { Button } from './Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface StatusModalProps {
  visible: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  type,
  title,
  message,
  buttonText,
  onClose,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return { name: 'checkmark-circle' as const, color: Colors.jadeVivid };
      case 'error':
        return { name: 'alert-circle' as const, color: Colors.rose };
      case 'info':
        return { name: 'information-circle' as const, color: Colors.sky };
    }
  };

  const icon = getIcon();

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
          <Ionicons name={icon.name} size={64} color={icon.color} />
        </View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        
        <Button
          title={buttonText}
          onPress={onClose}
          style={[styles.button, { backgroundColor: icon.color }]}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Layout.spacing.md,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.extraBold,
    color: Colors.ink,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginBottom: Layout.spacing.xxl,
    lineHeight: 24,
    paddingHorizontal: Layout.spacing.md,
  },
  button: {
    width: '100%',
    height: 56,
  },
});
