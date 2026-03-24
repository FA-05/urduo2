import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useProgressStore } from '../../store/progressStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Storage } from '../../utils/storage';
import { calculateLevel, getLevelProgress } from '../../utils/xp';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Divider } from '../../components/ui/Divider';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { totalXP, completedLessons, weeklyXP } = useProgressStore();
  const { username, avatar, soundEnabled, dailyReminderEnabled, dailyGoalXP, setSoundEnabled, setDailyReminderEnabled, setDailyGoalXP } = useSettingsStore();

  const { currentLevel, xpProgress, xpRequired } = getLevelProgress(totalXP);

  // Create mock weekly data for the chart based on current date
  const generateWeeklyData = () => {
    const today = new Date();
    const data = [];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Simplistic mock data generation
    for (let i = 0; i < 7; i++) {
        data.push(Math.floor(Math.random() * 50) + 10);
    }

    // Override today's value with actual data if exists
    const dayOfWeek = today.getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0=Mon, 6=Sun
    const todayString = today.toISOString().split('T')[0];

    if (weeklyXP[todayString]) {
        data[adjustedDay] = weeklyXP[todayString];
    }

    return { labels, data };
  };

  const chartData = generateWeeklyData();

  const handleClearData = () => {
    Alert.alert(
      'ڈیٹا صاف کریں',
      'کیا آپ واقعی اپنا تمام ڈیٹا حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں لیا جا سکتا۔',
      [
        { text: 'منسوخ کریں', style: 'cancel' },
        {
          text: 'ہاں، حذف کریں',
          style: 'destructive',
          onPress: async () => {
            await Storage.clearAll();
            // In a real app, you might want to reload the app or navigate to welcome here
            Alert.alert('ہو گیا', 'ڈیٹا صاف کر دیا گیا ہے۔ تبدیلیاں دیکھنے کے لیے ایپ دوبارہ شروع کریں۔');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, urduStyle]}>پروفائل</Text>
      </View>

      <Card style={styles.userCard}>
        <View style={styles.userInfoRow}>
          <Avatar emoji={avatar} size="lg" />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{username}</Text>
            <Badge label={`Level ${currentLevel} 🌱`} variant="level" style={{ marginTop: Layout.spacing.sm }} />
          </View>
        </View>
        <Divider />
        <View style={styles.levelProgressContainer}>
          <View style={styles.levelProgressTextRow}>
            <Text style={styles.levelText}>XP to Level {currentLevel + 1}</Text>
            <Text style={styles.levelText}>{xpProgress} / {xpRequired}</Text>
          </View>
          <ProgressBar progress={xpProgress / xpRequired} color={Colors.purple} />
        </View>
      </Card>

      <Text style={[styles.sectionTitle, urduStyle]}>اعداد و شمار</Text>
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>7</Text>
          <Text style={[styles.statLabel, urduStyle]}>سلسلہ کے دن</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={styles.statValue}>{totalXP}</Text>
          <Text style={[styles.statLabel, urduStyle]}>کل XP</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>📚</Text>
          <Text style={styles.statValue}>{completedLessons.length}</Text>
          <Text style={[styles.statLabel, urduStyle]}>مکمل اسباق</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>🎯</Text>
          <Text style={styles.statValue}>87%</Text>
          <Text style={[styles.statLabel, urduStyle]}>درستگی</Text>
        </Card>
      </View>

      <Text style={[styles.sectionTitle, urduStyle]}>ہفتہ وار پیشرفت</Text>
      <Card style={styles.chartCard}>
        <BarChart
          data={{
            labels: chartData.labels,
            datasets: [{ data: chartData.data }],
          }}
          width={width - Layout.spacing.xl * 2 - Layout.spacing.lg * 2} // card padding and margins
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(88, 204, 2, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(75, 75, 75, ${opacity})`,
            style: { borderRadius: 16 },
            barPercentage: 0.6,
          }}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </Card>

      <Text style={[styles.sectionTitle, urduStyle]}>ترتیبات</Text>
      <Card style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, urduStyle]}>آواز</Text>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: Colors.border, true: Colors.greenLight }}
            thumbColor={soundEnabled ? Colors.green : Colors.textDisabled}
          />
        </View>
        <Divider />
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, urduStyle]}>روزانہ یاد دہانی</Text>
          <Switch
            value={dailyReminderEnabled}
            onValueChange={setDailyReminderEnabled}
            trackColor={{ false: Colors.border, true: Colors.greenLight }}
            thumbColor={dailyReminderEnabled ? Colors.green : Colors.textDisabled}
          />
        </View>
        <Divider />
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, urduStyle]}>روزانہ کا ہدف (XP)</Text>
          <Text style={styles.settingValue}>{dailyGoalXP}</Text>
        </View>
        <Divider />
        <Button
          title="ڈیٹا صاف کریں"
          variant="danger"
          onPress={handleClearData}
          style={{ marginTop: Layout.spacing.md }}
        />
      </Card>

      <View style={{ height: Layout.spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  header: {
    marginBottom: Layout.spacing.xl,
  },
  headerTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: Colors.textDark,
  },
  userCard: {
    marginBottom: Layout.spacing.xl,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.lg,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.textDark,
  },
  levelProgressContainer: {
    marginTop: Layout.spacing.sm,
  },
  levelProgressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xs,
  },
  levelText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textMid,
  },
  sectionTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.textDark,
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
  statCard: {
    width: '47%', // Roughly half width minus gap
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: Layout.spacing.sm,
  },
  statValue: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.textDark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMid,
  },
  chartCard: {
    marginBottom: Layout.spacing.xl,
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  settingsCard: {
    marginBottom: Layout.spacing.xl,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textDark,
  },
  settingValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textMid,
  },
});