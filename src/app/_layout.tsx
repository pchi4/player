import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "@gluestack-ui/themed-native-base";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "react-native";
import React from "react";
import TrackPlayer from "react-native-track-player";

import { useSetupTrackPlayer, useLogTrackPlayerState } from "@/src/hooks";
import { PlaybackService } from "@/src/services/PlaybackService";
import { StateProvider } from "@/src/context/State";
import { QueryClient, QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => PlaybackService);

export default function RootLayout() {
  const handleTrackPlayerLoaded = React.useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  const queryClient = new QueryClient();

  useLogTrackPlayerState();

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <Navigator />
          <StatusBar barStyle="default" />
        </NativeBaseProvider>
      </QueryClientProvider>
    </StateProvider>
  );
}

function Navigator() {
  const [isLoged] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}