import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, router, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "@gluestack-ui/themed-native-base";

import { StatusBar, View, useColorScheme } from "react-native";
import React from "react";
import TrackPlayer from "react-native-track-player";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useSetupTrackPlayer, useLogTrackPlayerState } from "@/src/hooks";
import { PlaybackService } from "@/src/services/PlaybackService";
import { StateProvider, useStateValue } from "@/src/context/State";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  const colorScheme = useColorScheme();

  useLogTrackPlayerState();

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <GestureHandlerRootView>
            <View>
              <StatusBar
                animated={true}
                translucent
                barStyle={
                  colorScheme === "light" ? "dark-content" : "light-content"
                }
              />
            </View>
            <Navigator />
          </GestureHandlerRootView>
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
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
