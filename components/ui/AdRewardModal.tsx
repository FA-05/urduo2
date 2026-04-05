import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { Button } from './Button';
import { urduStyle } from '../../utils/rtl';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AdRewardModalProps {
  visible: boolean;
  onClose: () => void;
  onWatchAd: () => void;
  isLoading?: boolean;
}

export const AdRewardModal: React.FC<AdRewardModalProps> = ({
  visible,
  onClose,
  onWatchAd,
  isLoading,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.centeredView} onStartShouldSetResponder={() => true}>
          <View style={styles.modalView}>
            {/* Header / Icon */}
            <View style={styles.iconContainer}>
              <Text style={styles.heroIcon}>❤️</Text>
            </View>

            {/* Content */}
            <Text style={styles.modalTitle}>Refill Hearts?</Text>
            <Text style={[styles.urduTitle, urduStyle]}>تمام زندگیاں بحال کریں؟</Text>
            
            <Text style={styles.modalText}>
              Watch a quick video to refill all your hearts and keep learning!
            </Text>
            <Text style={[styles.urduText, urduStyle]}>
              اپنی تمام زندگیاں دوبارہ حاصل کرنے اور سیکھنے کو جاری رکھنے کے لیے ایک مختصر ویڈیو دیکھیں۔
            </Text>

            {/* Actions */}
            <View style={styles.buttonContainer}>
              <Button
                title="Watch Video"
                onPress={onWatchAd}
                loading={isLoading}
                size="lg"
                style={styles.watchButton}
              />
              <TouchableOpacity onPress={onClose} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>No thanks</Text>
                <Text style={[styles.skipUrdu, urduStyle]}>نہیں شکریہ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    width: '90%',
    maxWidth: 400,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.xxl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    ...Layout.shadow.card,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  heroIcon: {
    fontSize: 40,
  },
  modalTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.textDark,
    textAlign: 'center',
  },
  urduTitle: {
    fontSize: 24,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  modalText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMid,
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
  },
  urduText: {
    fontSize: 14,
    color: Colors.textMid,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.sm,
  },
  buttonContainer: {
    width: '100%',
    gap: Layout.spacing.md,
  },
  watchButton: {
    width: '100%',
  },
  skipButton: {
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textMuted,
  },
  skipUrdu: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
