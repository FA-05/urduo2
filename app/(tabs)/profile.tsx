import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Switch, Dimensions, TextInput, Pressable,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, Ellipse, Path, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgressStore } from '../../store/progressStore';
import { useSettingsStore, LANGUAGES, AppLanguage } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Divider } from '../../components/ui/Divider';
import { Modal } from '../../components/ui/Modal';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { StatusModal } from '../../components/ui/StatusModal';
import { MenuItem } from '../../components/ui/MenuItem';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { expo } from '../../app.json';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BG_HEIGHT = SCREEN_HEIGHT * 0.30;
const AVATAR_SIZE = 96;
const AVATAR_OVERLAP = AVATAR_SIZE / 2 + 8;

const STAT_ITEMS = [
  { id: 'streak',   emoji: '🔥', label: 'Day Streak',  color: Colors.saffron },
  { id: 'lessons',  emoji: '📘', label: 'Lessons',      color: Colors.indigo },
  { id: 'accuracy', emoji: '⭐', label: 'Accuracy',     color: Colors.jadeVivid },
  { id: 'longest',  emoji: '🏆', label: 'Best Streak',  color: Colors.saffron },
];

/** Placeholder SVG illustration — rolling hills, clouds, sky gradient */
{/* Replace with <Image source={require('../../assets/profile-bg.png')} /> when asset is ready */}
const IllustrationBackground = () => (
  <Svg width={SCREEN_WIDTH} height={BG_HEIGHT} style={StyleSheet.absoluteFill}>
    <Defs>
      <SvgGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#C8E8F0" />
        <Stop offset="1" stopColor="#EAF5F0" />
      </SvgGradient>
    </Defs>

    {/* Sky */}
    <Rect x="0" y="0" width={SCREEN_WIDTH} height={BG_HEIGHT} fill="url(#sky)" />

    {/* Clouds */}
    <Ellipse cx={SCREEN_WIDTH * 0.2} cy={BG_HEIGHT * 0.25} rx={40} ry={14} fill="rgba(255,255,255,0.85)" />
    <Ellipse cx={SCREEN_WIDTH * 0.2 + 28} cy={BG_HEIGHT * 0.25 - 8} rx={28} ry={10} fill="rgba(255,255,255,0.85)" />
    <Ellipse cx={SCREEN_WIDTH * 0.7} cy={BG_HEIGHT * 0.18} rx={34} ry={12} fill="rgba(255,255,255,0.8)" />
    <Ellipse cx={SCREEN_WIDTH * 0.7 + 22} cy={BG_HEIGHT * 0.18 - 6} rx={22} ry={8} fill="rgba(255,255,255,0.8)" />
    <Ellipse cx={SCREEN_WIDTH * 0.45} cy={BG_HEIGHT * 0.35} rx={26} ry={9} fill="rgba(255,255,255,0.7)" />

    {/* Far hill */}
    <Path
      d={`M0,${BG_HEIGHT * 0.65} Q${SCREEN_WIDTH * 0.25},${BG_HEIGHT * 0.42} ${SCREEN_WIDTH * 0.5},${BG_HEIGHT * 0.58} Q${SCREEN_WIDTH * 0.75},${BG_HEIGHT * 0.72} ${SCREEN_WIDTH},${BG_HEIGHT * 0.55} L${SCREEN_WIDTH},${BG_HEIGHT} L0,${BG_HEIGHT} Z`}
      fill="#7EC8A0"
      opacity={0.6}
    />

    {/* Mid hill */}
    <Path
      d={`M0,${BG_HEIGHT * 0.78} Q${SCREEN_WIDTH * 0.3},${BG_HEIGHT * 0.55} ${SCREEN_WIDTH * 0.55},${BG_HEIGHT * 0.7} Q${SCREEN_WIDTH * 0.8},${BG_HEIGHT * 0.82} ${SCREEN_WIDTH},${BG_HEIGHT * 0.65} L${SCREEN_WIDTH},${BG_HEIGHT} L0,${BG_HEIGHT} Z`}
      fill={Colors.jade}
      opacity={0.5}
    />

    {/* Front hill */}
    <Path
      d={`M0,${BG_HEIGHT * 0.88} Q${SCREEN_WIDTH * 0.35},${BG_HEIGHT * 0.7} ${SCREEN_WIDTH * 0.6},${BG_HEIGHT * 0.82} Q${SCREEN_WIDTH * 0.85},${BG_HEIGHT * 0.92} ${SCREEN_WIDTH},${BG_HEIGHT * 0.78} L${SCREEN_WIDTH},${BG_HEIGHT} L0,${BG_HEIGHT} Z`}
      fill={Colors.jade}
      opacity={0.7}
    />

    {/* Decorative Urdu watermark — top right */}
    <SvgText
      x={SCREEN_WIDTH - 50}
      y={BG_HEIGHT * 0.3}
      fontSize={48}
      fill="rgba(255,255,255,0.12)"
      textAnchor="middle"
      fontFamily="NotoNastaliqUrdu_400Regular"
    >
      ا
    </SvgText>
  </Svg>
);

/** Section title with left accent bar */
const SectionTitle = ({ children }: { children: string }) => (
  <View style={styles.sectionTitleRow}>
    <View style={styles.sectionAccent} />
    <Text style={styles.sectionTitle}>{children}</Text>
  </View>
);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    completedLessons, streak, longestStreak, totalExercises, correctExercises, resetProgress
  } = useProgressStore();
  const {
    username, avatar, language,
    soundEnabled, dailyReminderEnabled,
    setSoundEnabled, setDailyReminderEnabled,
    setUsername, setAvatar, setLanguage, resetSettings,
  } = useSettingsStore();

  const { user, signOut, isGuest, setGuest } = useAuthStore();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [showClearedStatus, setShowClearedStatus] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
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
      setShowSignInModal(true);
    } else {
      setShowLogOutModal(true);
    }
  };

  const goToAuth = (path: '/auth/login' | '/auth/register') => {
    setShowSignInModal(false);
    router.replace(path);
    setTimeout(() => setGuest(false), 50);
  };

  const handleLogOut = async () => {
    setShowLogOutModal(false);
    await signOut();
    router.replace('/auth/login');
  };

  const handleClearData = () => {
    setShowClearDataModal(true);
  };

  const handleConfirmClearData = () => {
    setShowClearDataModal(false);
    resetProgress();
    resetSettings();
    setShowClearedStatus(true);
  };

  return (
    <View style={styles.root}>
      {/* Fixed illustration background */}
      <View style={[styles.bgFixed, { paddingTop: insets.top }]}>
        <IllustrationBackground />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: BG_HEIGHT - 32, paddingBottom: insets.bottom + 32 }}
      >
        {/* Bottom sheet surface */}
        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          {/* Avatar overlapping banner/sheet boundary */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarRing}>
              {/* Mascot illustration replaces emoji here */}
              <Avatar emoji={avatar} size="xl" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }} />
            </View>
            {!isGuest && (
              <Pressable
                style={styles.editBadge}
                onPress={() => setIsEditModalVisible(true)}
              >
                <Ionicons name="pencil" size={12} color={Colors.white} />
              </Pressable>
            )}
          </View>

          {/* Name */}
          <Text style={styles.username}>{username}</Text>

          {/* Level badge pill */}
          <View style={styles.levelBadge}>
            <Ionicons name="ribbon-outline" size={13} color={Colors.saffron} />
            <Text style={styles.levelBadgeText}>Level 4 · Urduo Enthusiast</Text>
          </View>

          {/* Email / guest label */}
          <Text style={styles.emailLabel}>
            {isGuest ? 'Guest Learner' : user?.email}
          </Text>

          {/* XP progress bar */}
          <View style={styles.xpSection}>
            <View style={styles.xpLabelRow}>
              <Text style={styles.xpLabelLeft}>XP Progress</Text>
              <Text style={styles.xpLabelRight}>340 / 500</Text>
            </View>
            <View style={styles.xpTrack}>
              <LinearGradient
                colors={[Colors.jade, Colors.jadeVivid]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.xpFill, { width: '68%' }]}
              />
            </View>
          </View>

          {/* Stats 2×2 grid */}
          <View style={styles.statsGrid}>
            {STAT_ITEMS.map((s) => (
              <View key={s.id} style={styles.statCell}>
                <View style={[styles.statEmoji, { backgroundColor: `${s.color}15` }]}>
                  <Text style={{ fontSize: 16 }}>{s.emoji}</Text>
                </View>
                <Text style={styles.statValue}>
                  {statValues[s.id as keyof typeof statValues]}
                </Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Guest CTA */}
          {isGuest && (
            <LinearGradient
              colors={[Colors.jade, Colors.jadeVivid]}
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
                      <Text style={[styles.guestCTAButtonText, { color: Colors.jade }]}>Log In</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.guestCTAButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
                      onPress={() => goToAuth('/auth/register')}
                    >
                      <Text style={[styles.guestCTAButtonText, { color: Colors.white }]}>Register</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </LinearGradient>
          )}

          {/* Preferences */}
          <SectionTitle>Preferences</SectionTitle>
          <Card style={styles.groupCard}>
            <MenuItem
              label="Sound Effects"
              icon="volume-high"
              iconColor={Colors.jade}
              iconBg={Colors.jadeTint10}
              showChevron={false}
              rightAccessory={
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: Colors.jadeBorder12, true: Colors.jadeVivid }}
                  thumbColor={Colors.white}
                  ios_backgroundColor={Colors.jadeBorder12}
                />
              }
            />
            <Divider style={styles.divider} />
            <MenuItem
              label="Daily Reminders"
              icon="notifications"
              iconColor={Colors.indigo}
              iconBg={Colors.jadeTint12}
              showChevron={false}
              rightAccessory={
                <Switch
                  value={dailyReminderEnabled}
                  onValueChange={setDailyReminderEnabled}
                  trackColor={{ false: Colors.jadeBorder12, true: Colors.jadeVivid }}
                  thumbColor={Colors.white}
                  ios_backgroundColor={Colors.jadeBorder12}
                />
              }
            />
          </Card>

          {/* Language */}
          <SectionTitle>Language</SectionTitle>
          <Card style={styles.groupCard}>
            <MenuItem
              label="App Language"
              icon="language"
              iconColor={Colors.jade}
              iconBg={Colors.jadeTint10}
              onPress={() => setShowLanguageModal(true)}
              rightAccessory={
                <View style={styles.langBadgeRow}>
                  <Text style={styles.langBadgeText}>
                    {LANGUAGES.find(l => l.code === language)?.flag}{' '}
                    {LANGUAGES.find(l => l.code === language)?.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={Colors.inkMuted} />
                </View>
              }
            />
          </Card>

          {/* Account */}
          <SectionTitle>Account</SectionTitle>
          <Card style={styles.groupCard}>
            <MenuItem
              label="Edit Username"
              icon="person"
              iconColor={Colors.saffron}
              iconBg={Colors.saffronTint12}
              onPress={() => setIsEditModalVisible(true)}
            />
            <Divider style={styles.divider} />
            <MenuItem
              label={isGuest ? 'Sign In / Register' : 'Log Out'}
              icon={isGuest ? 'log-in' : 'log-out'}
              iconColor={Colors.indigo}
              iconBg={Colors.jadeTint12}
              showChevron={false}
              onPress={handleSignOut}
            />
            <Divider style={styles.divider} />
            <MenuItem
              label="Clear Data"
              icon="trash"
              iconColor={Colors.rose}
              iconBg={Colors.roseTint08}
              labelColor={Colors.rose}
              showChevron={false}
              onPress={handleClearData}
            />
          </Card>

          <View style={styles.footer}>
            <Text style={styles.versionText}>Urduo v{expo.version}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Modals (unchanged) ─────────────────────────────────── */}
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

      <ConfirmModal
        visible={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        emoji="✨"
        iconColor={Colors.jadeVivid}
        title="Ready to Join?"
        message="Save your progress and dive into the full Urduo experience."
        actions={[
          {
            title: 'Log In',
            variant: 'primary',
            icon: 'log-in',
            onPress: () => goToAuth('/auth/login'),
          },
          {
            title: 'Register',
            variant: 'outline',
            icon: 'person-add',
            onPress: () => goToAuth('/auth/register'),
          },
        ]}
      />

      <ConfirmModal
        visible={showLogOutModal}
        onClose={() => setShowLogOutModal(false)}
        icon="log-out"
        iconColor={Colors.saffron}
        title="Log Out"
        message="Are you sure you want to log out?"
        actions={[
          {
            title: 'Yes, Log Out',
            variant: 'danger',
            onPress: handleLogOut,
          },
          {
            title: 'Cancel',
            variant: 'ghost',
            onPress: () => setShowLogOutModal(false),
          },
        ]}
      />

      <ConfirmModal
        visible={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        icon="trash"
        iconColor={Colors.rose}
        title="Clear Data"
        message="Are you sure you want to delete all your data? This action cannot be undone."
        actions={[
          {
            title: 'Yes, Delete All',
            variant: 'danger',
            onPress: handleConfirmClearData,
          },
          {
            title: 'Cancel',
            variant: 'ghost',
            onPress: () => setShowClearDataModal(false),
          },
        ]}
      />

      <StatusModal
        visible={showClearedStatus}
        type="success"
        title="All Clear!"
        message="All data has been cleared successfully."
        buttonText="Got it"
        onClose={() => setShowClearedStatus(false)}
      />

      <Modal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)}>
        <Text style={styles.modalTitle}>Choose Language</Text>
        <View style={styles.langList}>
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            const isDisabled = !!lang.comingSoon;
            return (
              <Pressable
                key={lang.code}
                style={[
                  styles.langOption,
                  isSelected && styles.langOptionSelected,
                  isDisabled && styles.langOptionDisabled,
                ]}
                onPress={() => {
                  if (isDisabled) return;
                  setLanguage(lang.code);
                  setShowLanguageModal(false);
                }}
                disabled={isDisabled}
              >
                <Text style={styles.langFlag}>{lang.flag}</Text>
                <View style={styles.langTextCol}>
                  <Text style={[
                    styles.langLabel,
                    isSelected && styles.langLabelSelected,
                    isDisabled && styles.langLabelDisabled,
                  ]}>
                    {lang.label}
                  </Text>
                  {lang.comingSoon && (
                    <Text style={styles.comingSoonBadge}>Coming Soon</Text>
                  )}
                </View>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={22} color={Colors.jadeVivid} />
                )}
              </Pressable>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Root & banner ───────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  bgFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BG_HEIGHT,
    zIndex: 0,
  },
  sheet: {
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.lg,
    minHeight: SCREEN_HEIGHT + BG_HEIGHT,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.jadeBorder12,
    alignSelf: 'center',
    marginTop: 10,
  },

  // ── Avatar ─────────────────────────────────────────────────
  avatarContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: -AVATAR_OVERLAP,
  },
  avatarRing: {
    width: AVATAR_SIZE + 8,
    height: AVATAR_SIZE + 8,
    borderRadius: (AVATAR_SIZE + 8) / 2,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.creamDeep,
    overflow: 'hidden',
    ...Layout.shadow.elevated,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    backgroundColor: Colors.jadeVivid,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: Colors.white,
  },

  // ── Name + level ───────────────────────────────────────────
  username: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.ink,
    textAlign: 'center',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.saffronTint12,
    borderWidth: 1,
    borderColor: 'rgba(244,169,42,0.30)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: Layout.spacing.sm,
    gap: 4,
  },
  levelBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.saffron,
  },
  emailLabel: {
    fontSize: 12,
    color: Colors.inkMuted,
    fontFamily: Fonts.medium,
    marginTop: 6,
    textAlign: 'center',
  },

  // ── XP bar ─────────────────────────────────────────────────
  xpSection: {
    marginTop: 12,
    marginHorizontal: Layout.spacing.xl,
  },
  xpLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  xpLabelLeft: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Colors.inkMuted,
  },
  xpLabelRight: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: Colors.ink,
  },
  xpTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.jadeBorder12,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 4,
  },

  // ── Stats 2×2 grid ──────────────────────────────────────────
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
    marginTop: 20,
  },
  statCell: {
    width: (SCREEN_WIDTH - Layout.spacing.lg * 2 - Layout.spacing.sm) / 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.jadeBorder08,
  },
  statEmoji: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    color: Colors.ink,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.inkMuted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  // ── Section title with accent bar ──────────────────────────
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
    marginTop: 24,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    backgroundColor: Colors.jadeVivid,
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: Colors.ink,
  },

  // ── Guest CTA ──────────────────────────────────────────────
  guestCTA: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    marginTop: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    flex: 1,
    paddingVertical: 10,
    borderRadius: Layout.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCTAButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },

  // ── Shared ─────────────────────────────────────────────────
  groupCard: {
    paddingVertical: Layout.spacing.xs,
  },
  divider: {
    marginHorizontal: Layout.spacing.sm,
  },
  footer: {
    marginTop: Layout.spacing.xl,
    alignItems: 'center',
    opacity: 0.5,
  },
  versionText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.inkMuted,
  },
  modalTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.ink,
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.inkSoft,
    marginBottom: Layout.spacing.sm,
  },
  input: {
    height: 52,
    backgroundColor: Colors.cream,
    borderRadius: Layout.radius.sm,
    paddingHorizontal: Layout.spacing.md,
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.ink,
    borderWidth: 1,
    borderColor: Colors.jadeBorder10,
  },
  langBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langBadgeText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.inkSoft,
  },
  langList: {
    gap: Layout.spacing.sm,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.radius.sm,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    backgroundColor: Colors.white,
  },
  langOptionSelected: {
    borderColor: Colors.jadeVivid,
    backgroundColor: Colors.jadeTint06,
  },
  langOptionDisabled: {
    opacity: 0.5,
  },
  langFlag: {
    fontSize: 24,
    marginRight: Layout.spacing.md,
  },
  langTextCol: {
    flex: 1,
  },
  langLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },
  langLabelSelected: {
    color: Colors.jade,
  },
  langLabelDisabled: {
    color: Colors.inkMuted,
  },
  comingSoonBadge: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Colors.saffron,
    marginTop: 2,
  },
});
