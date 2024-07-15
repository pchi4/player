import { Tabs, Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="components" options={{ headerShown: false }} />
      <Stack.Screen name="album/[details]" options={{ headerShown: false }} />
      <Stack.Screen name="play/[details]" options={{ headerShown: false }} />
      <Stack.Screen name="artist/[details]" options={{ headerShown: false }} />
      <Stack.Screen name="library/index" options={{ headerShown: false }} />
    </Stack>
  );
}
