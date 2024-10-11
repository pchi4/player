import React, { useEffect, useState } from "react";
import {
  StatusBar,
  LogBox,
  FlatList,
  RefreshControl,
  View,
  Image,
  useColorScheme,
} from "react-native";
import { Box } from "@gluestack-ui/themed-native-base";
import { useStateValue } from "@/src/context/State";
import { CardHome } from "@/src/components/Cards/index";

import { Loading } from "@/src/components/Loading";
import {
  useGetProfile,
  useGetAlbums,
  useGetNewsReleases,
  useGetPlaytlist,
} from "./hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router, Link } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import Controller from "@/src/screens/Controller";
import { Footer } from "./Footer";
import { Header } from "@/src/components/Header";
import { colorScheme } from "@gluestack-ui/themed-native-base/build/utils/NBsupport";

export default function Home() {
  const [_, setNavigator] = useStateValue().navigator;
  const [context, dispatch] = useStateValue().reducer;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setNavigator(router);
  }, []);

  const { data, isError, isLoading, isFetching } = useGetAlbums();

  const colorScheme = useColorScheme();
  const {
    data: profile,
    isLoading: profileIsLoading,
    isFetching: profileIsFetching,
    refetch: onRefetchProfile,
  } = useGetProfile();

  const {
    data: newsRealeases,
    isLoading: newReleasesIsLoading,
    isFetching: newReleasesIsFetching,
    refetch: onRefetchRealeases,
  } = useGetNewsReleases();

  const {
    data: playlist,
    isLoading: playlistLoading,
    isFetching: playlistFetching,
    refetch: onRefetchPlaylist,
  } = useGetPlaytlist();

  const setProfileStore = async () => {
    try {
      if (profile) {
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
      }
    } catch (error) {}
  };

  useEffect(() => {
    setProfileStore();
  }, [profile]);

  function onRefetch() {
    onRefetchPlaylist();
    onRefetchRealeases();
    onRefetchProfile();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  if (
    isLoading ||
    isFetching ||
    profileIsFetching ||
    profileIsLoading ||
    newReleasesIsLoading ||
    newReleasesIsFetching ||
    playlistFetching ||
    playlistLoading
  ) {
    return <Loading />;
  }

  return (
    <View style={{ paddingBottom: "25%" }}>
      <Header imageProfile={profile?.images[0].url} />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefetch}
            tintColor="blue"
          />
        }
        style={{ paddingHorizontal: 10 }}
        data={data?.items?.filter((_, idx) => {
          return idx <= 7;
        })}
        numColumns={2}
        keyExtractor={(item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <Box paddingTop="4" paddingBottom="6">
            <ThemedText type="title">Tocados recentes</ThemedText>
          </Box>
        }
        renderItem={({ item, idx }) => (
          <CardHome key={idx} items={item} navigation={router} />
        )}
        ListFooterComponent={
          <Footer
            profile={profile?.display_name}
            recents={data?.items}
            playlists={playlist?.items}
            newRealeases={newsRealeases?.albums?.items}
          />
        }
      />
      <Controller />
    </View>
  );
}
