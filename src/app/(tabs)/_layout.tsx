import { Tabs, Stack, Redirect } from "expo-router";
import React from "react";
import { useVerifyToken } from "@/src/hooks";
import { useStateValue } from "@/src/context/State";

export default function RootLayout() {
  const [context, dispatch] = useStateValue().reducer;

  if (context.user.token == "") {
    return <Redirect href="/" />;
  }

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
