import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Switch, Alert, Dimensions, TextInput, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgressStore } from '../../store/progressStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { Storage } from '../../utils/storage';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Divider } from '../../components/ui/Divider';
import { Modal } from '../../components/ui/Modal';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { expo } from '../../app.json';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const STAT_CARDS = [
  { id: 'streak',   icon: 'flame',  label: 'Day Streak', color: Colors.warning },
  { id: 'lessons',  icon: 'book',   label: 'Lessons Done', color: Colors.indigo },
  { id: 'accuracy', icon: 'star',   label: 'Accuracy',     color: Colors.primary },
  { id: 'longest',  icon: 'trophy', label: 'Best Streak', color: Colors.gold },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { 
    completedLessons, streak, longestStreak, totalExercises, correctExercises, resetProgress 
  } = useProgressStore();
  const {
    username, avatar,
    soundEnabled, dailyReminderEnabled,
    setSoundEnabled, setDailyReminderEnabled,
    setUsername, setAvatar, resetSettings,
  } = useSettingsStore();
  
  const { user, signOut, isGuest, setGuest } = useAuthStore();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const accuracy = totalExercises > 0 
    ? Math.round((correctExercises / totalExercises) * 100) 
    : 0;

  const statValues = {
    streak: streak.toString(),
    lessons: completedLessons.length.toString(),
    accuracy: `${accuracy}%`,
    longest: longestStreak.toString(),
  };

  const handleUpdateProfile = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setIsEditModalVisible(false);
    }
  };

  const handleSignOut = () => {
    if (isGuest) {
      Alert.alert(
        'Ready to Join?',
        'Save your progress and dive into the full Urduo experience.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log In', onPress: () => goToAuth('/auth/login') },
          { 
            text: 'Register', 
            style: 'default', 
            onPress: () => goToAuth('/auth/register') 
          },
        ]
      );
    } else {
      Alert.alert(
        'Log Out',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: async () => {
              await signOut();
              router.replace('/auth/login');
            },
          },
        ]
      );
    }
  };

  const goToAuth = (path: '/auth/login' | '/auth/register') => {
    router.replace(path);
    // Small delay to ensure route transition is initiated before clearing guest status
    setTimeout(() => setGuest(false), 50);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete All',
          style: 'destructive',
          onPress: async () => {
            resetProgress();
            resetSettings();
            Alert.alert('Done', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Layout.spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Section: Premium Header ── */}
        <View style={styles.header}>
          <View style={styles.profileBox}>
            <View style={styles.avatarWrapper}>
              <Avatar emoji={avatar} size="lg" />
              {!isGuest && (
                <Pressable 
                  style={styles.editBadge}
                  onPress={() => setIsEditModalVisible(true)}
                >
                  <Ionicons name="pencil" size={12} color={Colors.white} />
                </Pressable>
              )}
            </View>
            <View style={styles.headerText}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.emailLabel}>
                {isGuest ? 'Guest Learner' : user?.email}
              </Text>
              <Text style={styles.titleLabel}>Urduo Enthusiast</Text>
            </View>
          </View>
        </View>

        {/* ── Section: Guest CTA ── */}
        {isGuest && (
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.guestCTA}
          >
            <View style={styles.guestCTAContent}>
              <View style={styles.guestIconContainer}>
                <Ionicons name="sparkles" size={24} color={Colors.white} />
              </View>
              <View style={styles.guestTextContainer}>
                <Text style={styles.guestCTATitle}>Save Your Progress!</Text>
                <Text style={styles.guestCTASubtitle}>
                  Register now to sync achievements and access all features.
                </Text>
                <View style={styles.guestCTAButtons}>
                  <Pressable 
                    style={[styles.guestCTAButton, { backgroundColor: Colors.white }]}
                    onPress={() => goToAuth('/auth/login')}
                  >
                    <Text style={[styles.guestCTAButtonText, { color: Colors.primary }]}>Log In</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.guestCTAButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                    onPress={() => goToAuth('/auth/register')}
                  >
                    <Text style={[styles.guestCTAButtonText, { color: Colors.white }]}>Register</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </LinearGradient>
        )}

        {/* ── Section: Stats grid ── */}
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsGrid}>
          {STAT_CARDS.map((s) => (
            <Card key={s.id} style={[styles.statCard, { borderTopColor: s.color }]}>
              <View style={[styles.statIconBg, { backgroundColor: `${s.color}15` }]}>
                <Ionicons name={s.icon as any} size={22} color={s.color} />
              </View>
              <Text style={styles.statValue}>{statValues[s.id as keyof typeof statValues]}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </Card>
          ))}
        </View>

        {/* ── Section: Preferences ── */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="volume-high" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.settingLabel}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={soundEnabled ? Colors.primary : Colors.textDisabled}
              ios_backgroundColor={Colors.border}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: Colors.indigoLight }]}>
                <Ionicons name="notifications" size={20} color={Colors.indigo} />
              </View>
              <Text style={styles.settingLabel}>Daily Reminders</Text>
            </View>
            <Switch
              value={dailyReminderEnabled}
              onValueChange={setDailyReminderEnabled}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={dailyReminderEnabled ? Colors.primary : Colors.textDisabled}
              ios_backgroundColor={Colors.border}
            />
          </View>
        </Card>

        {/* ── Section: Account Info ── */}
        <Text style={styles.sectionTitle}>Account</Text>
        <Card style={styles.groupCard}>
          <Pressable style={styles.menuItem} onPress={() => setIsEditModalVisible(true)}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: Colors.goldLight }]}>
                <Ionicons name="person" size={18} color={Colors.gold} />
              </View>
              <Text style={styles.settingLabel}>Edit Username</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textDisabled} />
          </Pressable>
          <Divider style={styles.divider} />
          <Pressable style={styles.menuItem} onPress={handleSignOut}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: Colors.indigoLight }]}>
                <Ionicons name={isGuest ? "log-in" : "log-out"} size={18} color={Colors.indigo} />
              </View>
              <Text style={styles.settingLabel}>{isGuest ? 'Sign In / Register' : 'Log Out'}</Text>
            </View>
          </Pressable>
          <Divider style={styles.divider} />
          <Pressable style={styles.menuItem} onPress={handleClearData}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: Colors.errorLight }]}>
                <Ionicons name="trash" size={18} color={Colors.error} />
              </View>
              <Text style={[styles.settingLabel, { color: Colors.error }]}>Clear Data</Text>
            </View>
          </Pressable>
        </Card>


        {/* ── Version Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Urduo v{expo.version}</Text>
        </View>

        <View style={{ height: Layout.spacing.xxl }} />
      </ScrollView>

      {/* ── Edit Profile Modal ── */}
      <Modal visible={isEditModalVisible} onClose={() => setIsEditModalVisible(false)}>
        <Text style={styles.modalTitle}>Edit Profile</Text>
        <Text style={styles.inputLabel}>Your Name</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Enter your name..."
          autoFocus
        />
        <Button 
          title="Save Changes" 
          onPress={handleUpdateProfile}
          style={{ marginTop: Layout.spacing.lg }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: Colors.textDark,
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.xl,
    paddingLeft: 4,
  },
  // Header
  header: {
    marginBottom: Layout.spacing.lg,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    padding: Layout.spacing.lg,
    borderRadius: Layout.radius.xl,
    ...Layout.shadow.elevated,
  },
  avatarWrapper: {
    position: 'relative',
  },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.cardBg,
  },
  headerText: {
    marginLeft: Layout.spacing.lg,
    flex: 1,
  },
  username: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.textDark,
  },
  titleLabel: {
    fontSize: 14,
    color: Colors.textMid,
    marginTop: 2,
  },
  emailLabel: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: Fonts.bold,
    marginTop: 2,
  },
  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  statCard: {
    width: (width - Layout.spacing.lg * 2 - Layout.spacing.sm) / 2,
    alignItems: 'center',
    paddingVertical: Layout.spacing.lg,
    borderTopWidth: 3,
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  statValue: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.textDark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMid,
    textAlign: 'center',
  },
  // Group Card
  groupCard: {
    paddingVertical: Layout.spacing.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    flex: 1,
  },
  settingIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textDark,
  },
  divider: {
    marginHorizontal: Layout.spacing.sm,
  },
  // Footer
  footer: {
    marginTop: Layout.spacing.xl,
    alignItems: 'center',
    opacity: 0.5,
  },
  versionText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
  },
  // Modal
  modalTitle: {
    fontSize: 22,
    color: Colors.textDark,
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: Colors.textMid,
    marginBottom: Layout.spacing.sm,
  },
  input: {
    height: 52,
    backgroundColor: Colors.background,
    borderRadius: Layout.radius.md,
    paddingHorizontal: Layout.spacing.md,
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textDark,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  // Guest CTA
  guestCTA: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
    ...Layout.shadow.elevated,
  },
  guestCTAContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  guestIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  guestTextContainer: {
    flex: 1,
  },
  guestCTATitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    color: Colors.white,
    marginBottom: 4,
  },
  guestCTASubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  guestCTAButtons: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
  },
  guestCTAButton: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: 10,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCTAButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
