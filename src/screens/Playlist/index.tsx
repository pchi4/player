import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  useColorScheme,
  RefreshControl,
  StyleSheet,
} from "react-native";

import { DetailsHeaderScrollView } from "react-native-sticky-parallax-header";

import { useGetTracksPlaylist, useGetProfile } from "./hooks";
import { Loading } from "@/src/components/Loading";
import { useStateValue } from "@/src/context/State";
import Controller from "../Controller";
import { ThemedText } from "@/src/components/ThemedText";
import { styles } from "./Style";

import { Card } from "./Card";
import { ButtonRowBack } from "@/src/components/ButtonRowBack";
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
    <>
      <DetailsHeaderScrollView
        backgroundImage={
          context.playlist?.images[0].url
            ? {
                uri: context.playlist?.images[0].url,
              }
            : require("@/assets/images/unknown_track.png")
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="blue"
          />
        }
        contentContainerStyle={[colorScheme === "dark" ? "black" : "white"]}
        image={{ uri: profile.images[0].url }}
        titleStyle={{ color: colorScheme === "dark" ? "white" : "black" }}
        contentIconNumberStyle={{ display: "none" }}
        hasBorderRadius
        enableSafeAreaTopInset
        parallaxHeight={width}
        subtitle={context.playlist.owner?.display_name}
        leftTopIcon={() => {
          return <ButtonRowBack />;
        }}
      >
        <View style={{ width: width, paddingTop: 10 }}>
          <ThemedText type="title" numberOfLines={1} style={styles.titleAlbum}>
            {context.playlist.name}
          </ThemedText>
          {tracksPlaylist?.items.map((item, key) => (
            <Card key={key} music={item} />
          ))}
        </View>
      </DetailsHeaderScrollView>
      <SafeAreaView>
        <Controller />
      </SafeAreaView>
    </>
  );
}
