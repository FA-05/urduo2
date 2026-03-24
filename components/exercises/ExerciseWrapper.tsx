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
import { urduStyle } from '../../utils/rtl';

interface ExerciseWrapperProps {
  progress: number; // 0 to 1
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleQuitPress}
          style={styles.closeButton}
          hitSlop={20}
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
          <Text style={[styles.modalTitle, urduStyle]}>
            کیا آپ واقعی چھوڑنا چاہتے ہیں؟
          </Text>
          <Text style={[styles.modalSubtitle, urduStyle]}>
            آپ کی تمام پیشرفت ضائع ہو جائے گی۔
          </Text>
          <View style={styles.modalActions}>
            <Button
              title="جاری رکھیں"
              variant="primary"
              onPress={() => setShowQuitModal(false)}
              style={styles.modalButton}
            />
            <Button
              title="چھوڑ دیں"
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
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.textMid,
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
    color: Colors.textDark,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.textMid,
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