export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
  trend?: 'up' | 'down' | 'same';
}

export const mockLeaderboardData: LeaderboardEntry[] = [
  { id: 'user-1', rank: 1, username: 'Sara', avatar: '👩', xp: 1240, trend: 'up' },
  { id: 'user-2', rank: 2, username: 'Ahmad', avatar: '👨', xp: 820, trend: 'same' },
  { id: 'user-3', rank: 3, username: 'Bilal', avatar: '👦', xp: 680, trend: 'up' },
  { id: 'user-4', rank: 4, username: 'Fatima', avatar: '🧕', xp: 550, trend: 'down' },
  { id: 'user-5', rank: 5, username: 'Ali', avatar: '👱‍♂️', xp: 420, trend: 'same' },
  { id: 'user-6', rank: 6, username: 'Zainab', avatar: '👩‍🦱', xp: 390, trend: 'up' },
  { id: 'user-7', rank: 7, username: 'Umar', avatar: '👨‍🦰', xp: 310, trend: 'down' },
  { id: 'user-8', rank: 8, username: 'Ayesha', avatar: '👧', xp: 280, trend: 'same' },
  { id: 'user-9', rank: 9, username: 'Hassan', avatar: '🧔', xp: 150, trend: 'up' },
  { id: 'user-10', rank: 10, username: 'Khadija', avatar: '👵', xp: 90, trend: 'down' },
];

export const getLeaderboardData = (currentUsername: string, currentAvatar: string, currentXP: number): LeaderboardEntry[] => {
  const data = [...mockLeaderboardData];

  const currentUserEntry: LeaderboardEntry = {
    id: 'current-user',
    rank: 0,
    username: currentUsername,
    avatar: currentAvatar,
    xp: currentXP,
    isCurrentUser: true,
    trend: 'up',
  };

  data.push(currentUserEntry);

  // Sort by XP descending
  data.sort((a, b) => b.xp - a.xp);

  // Re-assign ranks
  data.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return data;
};