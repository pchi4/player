import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
  Text,
} from "react-native";

import { HStack, Image } from "@gluestack-ui/themed-native-base";

import { useGetTracksPlaylist, useGetProfile } from "./hooks";
import { Loading } from "@/src/components/Loading";
import { LinearGradient } from "expo-linear-gradient";
import { useStateValue } from "@/src/context/State";
import Controller from "../Controller";
import { ThemedText } from "@/src/components/ThemedText";
import { Header } from "./Header";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";
import { Card } from "./Card";
const { width } = Dimensions.get("screen");

export default function Playlist() {
  const [context, dispatch] = useStateValue().reducer;
  const ownerPlaylistId = context.playlist.owner.id;
  const playlistId = context.playlist.id;
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: tracksPlaylist,
    isLoading,
    isFetching,
    refetch: onRefetchPlaylist,
  } = useGetTracksPlaylist({
    id: playlistId,
    totalTracks: 100,
  });

  const {
    data: profile,
    isLoading: profileIsLoading,
    isFetching: profileIsFetching,
    refetch: onRefetchProfile,
  } = useGetProfile({ id: ownerPlaylistId });

  const { colors } = useGetColorsImage({ uri: context.playlist.images[0].url });

  function onRefresh() {
    onRefetchProfile();
    onRefetchPlaylist();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  if (profileIsLoading || profileIsFetching || isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        paddingTop: "15%",
        height: 150,
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#212224" : "white",
      }}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? [colors.colorThree.value, "#212224", "#212224"]
            : [colors.colorThree.value, "white", "white"]
        }
      >
        <SafeAreaView>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="blue"
              />
            }
            data={tracksPlaylist?.items}
            keyExtractor={(item, idx) => String(idx)}
            ListHeaderComponent={
              <Header
                uriImageAlbum={context.playlist?.images[0].url}
                albumName={context.playlist.name}
                nameArtist={context.playlist.owner?.display_name}
              />
            }
            renderItem={({ item, index }) => {
              return <Card music={item} />;
            }}
          />
          <Controller />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
