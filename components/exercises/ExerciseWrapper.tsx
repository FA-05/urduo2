import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressBar } from '../ui/ProgressBar';
import { HeartBar } from '../ui/HeartBar';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Layout } from '../../constants/layout';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface ExerciseWrapperProps {
  progress: number;
  hearts: number;
  onQuit: () => void;
  children: React.ReactNode;
}

export const ExerciseWrapper: React.FC<ExerciseWrapperProps> = ({
  progress,
  hearts,
  onQuit,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const [showQuitModal, setShowQuitModal] = useState(false);

  const handleQuitPress = () => {
    setShowQuitModal(true);
  };

  const confirmQuit = () => {
    setShowQuitModal(false);
    onQuit();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleQuitPress}
          style={styles.closeButton}
          hitSlop={Layout.hitSlop}
          accessibilityLabel="Quit Lesson"
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
        <ProgressBar
          progress={progress}
          style={styles.progressBar}
        />
        <HeartBar hearts={hearts} />
      </View>
      <View style={styles.content}>
        {children}
      </View>

      <Modal
        visible={showQuitModal}
        onClose={() => setShowQuitModal(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Are you sure you want to quit?
          </Text>
          <Text style={styles.modalSubtitle}>
            All your progress will be lost.
          </Text>
          <View style={styles.modalActions}>
            <Button
              title="Keep Learning"
              variant="primary"
              onPress={() => setShowQuitModal(false)}
              style={styles.modalButton}
            />
            <Button
              title="Quit Lesson"
              variant="danger"
              onPress={confirmQuit}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.creamDeep,
  },
  closeIcon: {
    fontSize: 18,
    color: Colors.inkSoft,
    fontFamily: Fonts.extraBold,
  },
  progressBar: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  modalContent: {
    alignItems: 'center',
    gap: Layout.spacing.xl,
  },
  modalTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.ink,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.inkSoft,
    textAlign: 'center',
  },
  modalActions: {
    width: '100%',
    gap: Layout.spacing.md,
  },
  modalButton: {
    width: '100%',
  },
});
