import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../components/navigation/TabBar';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'گھر',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'مشق',
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'درجہ',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'پروفائل',
        }}
      />
    </Tabs>
  );
}