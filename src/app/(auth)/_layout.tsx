import { Tabs, Stack, Redirect } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useVerifyToken } from "@/src/hooks";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { token } = useVerifyToken();

  console.log(token);

  if (!token) {
    return <Redirect href="/index" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="album/[details]" options={{ headerShown: false }} />
      <Stack.Screen name="play/[details]" options={{ headerShown: false }} />
      <Stack.Screen name="artist/[details]" options={{ headerShown: false }} />
      <Stack.Screen name="library/index" options={{ headerShown: false }} />
    </Stack>
  );
}
