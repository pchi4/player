import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  LogBox,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { HStack, Box, Text, Pressable } from "@gluestack-ui/themed-native-base";
import { useStateValue } from "@/src/context/State";
import * as Liking from "expo-linking";

import {
  CardAlbum,
  CardHome,
  CardNewsReleases,
  CardPlaylist,
  CardTopArtist,
} from "@/src/components/Cards/index";

import { Loading } from "@/src/components/Loading";
import { Error } from "@/src/components/Error";

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

export default function Home() {
  const [_, setNavigator] = useStateValue().navigator;
  const [context, dispatch] = useStateValue().reducer;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setNavigator(router);
  }, []);

  const { data, isError, isLoading, isFetching } = useGetAlbums();
  const {
    data: profile,
    isLoading: profileIsLoading,
    isFetching: profileIsFetching,
  } = useGetProfile();

  const {
    data: newsRealeases,
    isLoading: newReleasesIsLoading,
    isFetching: newReleasesIsFetching,
  } = useGetNewsReleases();

  const {
    data: playlist,
    isLoading: playlistLoading,
    isFetching: playlistFetching,
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

  if (isError) {
    return <Error />;
  }

  const headerComponent = () => {
    return <></>;
  };

  const footerComponent = () => {
    return (
      <>
        <Box paddingTop="6" paddingBottom="6">
          <ThemedText type="title">
            Feito para {profile?.display_name}
          </ThemedText>
        </Box>
        <FlatList
          data={data?.items.filter((_, idx) => {
            return idx > 7;
          })}
          horizontal
          keyExtractor={(item, idx) => String(idx)}
          renderItem={({ item }) => (
            <CardAlbum width={250} height={250} items={item} />
          )}
        />

        <Box paddingTop="6" paddingBottom="6">
          <ThemedText type="title">Suas playlists</ThemedText>
        </Box>

        <FlatList
          data={playlist?.items}
          keyExtractor={(item, idx) => String(idx)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <CardPlaylist
              Width={250}
              Height={250}
              items={item}
              navigation={router}
              handleClick={() => {
                dispatch({
                  type: "setPlaylist",
                  payload: {
                    playlist: item,
                  },
                });
                router.push("/playlist/[details]");
              }}
            />
          )}
        />

        <Box paddingTop="6" paddingBottom="6">
          <ThemedText type="title">Novidades na área</ThemedText>
        </Box>

        <FlatList
          data={newsRealeases?.albums?.items}
          keyExtractor={(_item, idx) => String(idx)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <CardNewsReleases
              width={250}
              height={250}
              items={item}
              navigation={router}
              // handleClick={() => router.navigate("albums", item)}
            />
          )}
        />
      </>
    );
  };

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
    <Box padding="4">
      <FlatList
        style={{ paddingTop: StatusBar.currentHeight }}
        data={data?.items.filter((_, idx) => {
          return idx <= 7;
        })}
        numColumns={2}
        keyExtractor={(item, idx) => String(item.album.id + idx)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <Box paddingTop="10" paddingBottom="6">
            <ThemedText type="title">Tocados recentes</ThemedText>
          </Box>
        }
        renderItem={({ item }) => <CardHome items={item} navigation={router} />}
        ListFooterComponent={footerComponent}
      />
      <Controller />
    </Box>
  );
}
