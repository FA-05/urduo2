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
        name="vocabulary"
        options={{
          title: 'الفاظ',
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