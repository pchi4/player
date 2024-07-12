import React from "react";

import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="explore" options={{ headerShown: false }} />
    </Tabs>
  );
}
