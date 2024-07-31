import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack, Redirect, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "@gluestack-ui/themed-native-base";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform, StatusBar } from "react-native";
import React from "react";
import TrackPlayer from "react-native-track-player";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useSetupTrackPlayer, useLogTrackPlayerState } from "@/src/hooks";
import { PlaybackService } from "@/src/services/PlaybackService";
import { StateProvider, useStateValue } from "@/src/context/State";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useVerifyToken } from "@/src/hooks";

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => PlaybackService);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  const handleTrackPlayerLoaded = React.useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });
  const [isLoged] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const queryClient = new QueryClient();

  useLogTrackPlayerState();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    </StateProvider>
  );
}

function Navigator() {
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
          <Slot />
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </GestureHandlerRootView>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
