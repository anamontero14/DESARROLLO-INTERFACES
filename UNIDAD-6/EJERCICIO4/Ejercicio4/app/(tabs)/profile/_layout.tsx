import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from "expo-router";
import React from "react";

const { Navigator } = createMaterialTopTabNavigator()
const MaterialTopTabs = withLayoutContext(Navigator)

export default function TabsLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
      tabBarActiveTintColor: 'purple',
      tabBarIndicatorStyle: { backgroundColor: 'purple', height: 3},
      tabBarLabelStyle: { fontWeight: 'bold' },
      }}>
      <MaterialTopTabs.Screen name="index" options={{ title: 'Posts' }} />
      <MaterialTopTabs.Screen name="gallery" options={{ title: 'Galería' }} />
    </MaterialTopTabs>
  );
}
