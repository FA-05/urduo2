import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgressStore } from '../../store/progressStore';
import { useSettingsStore } from '../../store/settingsStore';
import { getLeaderboardData, LeaderboardEntry } from '../../data/leaderboard';
import { Avatar } from '../../components/ui/Avatar';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { totalXP } = useProgressStore();
  const { username, avatar } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<'week' | 'all'>('week');
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // In a real app, 'week' vs 'all' would fetch different data.
    const leaderboardData = getLeaderboardData(username, avatar, totalXP);
    setData(leaderboardData);
  }, [totalXP, username, avatar, activeTab]);

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  const getPodiumColor = (rank: number) => {
    if (rank === 1) return Colors.gold;
    if (rank === 2) return Colors.borderDark; // Silver-ish
    if (rank === 3) return '#CD7F32'; // Bronze
    return Colors.green;
  };

  const renderPodiumItem = (entry: LeaderboardEntry, height: number, color: string, isCenter: boolean = false) => {
    return (
      <View style={[styles.podiumItem, isCenter && styles.podiumCenter]}>
        <Avatar emoji={entry.avatar} size={isCenter ? 'lg' : 'md'} style={styles.podiumAvatar} />
        <Text style={[styles.podiumName, isCenter && { fontFamily: Fonts.extraBold }]}>{entry.username}</Text>
        <Text style={styles.podiumXP}>{entry.xp} XP</Text>
        <View style={[styles.podiumBar, { height, backgroundColor: color }]}>
          <Text style={styles.podiumRank}>{entry.rank}</Text>
        </View>
      </View>
    );
  };

  const renderRow = ({ item }: { item: LeaderboardEntry }) => {
    return (
      <View style={[styles.row, item.isCurrentUser && styles.currentUserRow]}>
        <Text style={styles.rowRank}>{item.rank}</Text>
        <Avatar emoji={item.avatar} size="sm" style={styles.rowAvatar} />
        <Text style={[styles.rowName, item.isCurrentUser && { fontFamily: Fonts.extraBold }]}>
          {item.username}
        </Text>
        <Text style={styles.rowXP}>{item.xp} XP</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, urduStyle]}>لیڈر بورڈ</Text>
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'week' && styles.activeTab]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, urduStyle, activeTab === 'week' && styles.activeTabText]}>
            اس ہفتے
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, urduStyle, activeTab === 'all' && styles.activeTabText]}>
            تمام وقت
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={rest}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        ListHeaderComponent={
          top3.length >= 3 ? (
            <View style={styles.podiumContainer}>
              {renderPodiumItem(top3[1], 100, getPodiumColor(2))}
              {renderPodiumItem(top3[0], 140, getPodiumColor(1), true)}
              {renderPodiumItem(top3[2], 80, getPodiumColor(3))}
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: Colors.textDark,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Layout.spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: Colors.blueDark,
  },
  tabText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textMid,
  },
  activeTabText: {
    color: Colors.blueDark,
    fontFamily: Fonts.extraBold,
  },
  listContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  podiumItem: {
    alignItems: 'center',
    width: '30%',
  },
  podiumCenter: {
    zIndex: 1,
  },
  podiumAvatar: {
    marginBottom: Layout.spacing.xs,
  },
  podiumName: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 2,
  },
  podiumXP: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMid,
    marginBottom: Layout.spacing.sm,
  },
  podiumBar: {
    width: '100%',
    borderTopLeftRadius: Layout.radius.sm,
    borderTopRightRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  podiumRank: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  currentUserRow: {
    backgroundColor: Colors.greenLight,
  },
  rowRank: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textMid,
    width: 30,
  },
  rowAvatar: {
    marginRight: Layout.spacing.md,
  },
  rowName: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textDark,
  },
  rowXP: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textMid,
  },
});