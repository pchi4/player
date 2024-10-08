import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  LogBox,
  RefreshControl,
  StatusBar,
  Text,
  useColorScheme,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Box, HStack, VStack, Spacer } from "@gluestack-ui/themed-native-base";

import { useGetArtist, useGetSeveralArtist } from "./hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "@/src/components/Loading";
import { useStateValue } from "@/src/context/State";
import TrackPlayer, {
  usePlaybackState,
  useActiveTrack,
  usePlayWhenReady,
} from "react-native-track-player";

import Controller from "@/src/screens/Controller";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useImageColors } from "@/src/hooks";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";
import { ThemedText } from "@/src/components/ThemedText";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

interface Track {
  _track_number: any;
  duration_ms: any;
  preview_url: any;
  name: any;
  artists: { name: any }[];
  explicit: boolean;
}

export default function Album() {
  const [context, dispatch] = useStateValue().reducer;
  const album = context.album.album;
  const idArtist = album.artists[0].id;
  const playerState = usePlaybackState();
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useGetColorsImage({ uri: album.images[0].url });
  const colorScheme = useColorScheme();
  const [freq, setFrequencies] = useState();

  const activeTrack = useActiveTrack();

  const {
    data: artists,
    isFetching,
    isLoading,
    refetch: onRefetchArtist,
  } = useGetArtist({ id: idArtist });

  const {
    data: releatedArtist,
    isLoading: isReleatedArtistLoading,
    isFetching: isReleatedFetching,
    refetch: onRefetchRArtist,
  } = useGetSeveralArtist({ id: idArtist });

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  async function staterdAllTracks() {
    if (playerState.state == "paused") {
      await TrackPlayer.play();
      return;
    }

    await TrackPlayer.reset();

    const tracks = album.tracks.items.map((track: Track, idx: any) => {
      return {
        url: track.preview_url,
        title: track.name,
        artist: track.artists[0].name,
        duartion: track.duration_ms,
        album: album.name,
        total: album.tracks.total,
        artwork: album?.images[0].url,
        number_track: track._track_number,
        explicit: track.explicit,
        index: idx,
      };
    });

    await TrackPlayer.add(tracks);
    await TrackPlayer.play();
  }

  function dispatchDetailsArtist() {
    dispatch({
      type: "setArtist",
      payload: {
        artist: artists,
      },
    });
  }

  function onRefresh() {
    onRefetchArtist();
    onRefetchRArtist();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  const handlePLayTrack = async (index: number, item: Track) => {
    try {
      await TrackPlayer.reset();

      dispatchDetailsArtist();

      const tracks = album.tracks.items.map((track: Track, idx: number) => {
        return {
          url: track.preview_url,
          title: track.name,
          artist: track.artists[0].name,
          duartion: track.duration_ms,
          album: album.name,
          total: album.tracks.total,
          artwork: album?.images[0].url,
          number_track: track._track_number,
          explicit: track.explicit,
          index: idx,
        };
      });

      await TrackPlayer.add(tracks[index]);
      await TrackPlayer.add(
        tracks.filter((track: Track, idx: number) => idx != index)
      );
      await TrackPlayer.play();
    } catch (error) {
      console.log("error ao dar play:", error);
    }
  };

  if (
    isFetching ||
    isLoading ||
    isReleatedArtistLoading ||
    isReleatedFetching
  ) {
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
            data={album.tracks.items}
            keyExtractor={(item) => String(item.id)}
            // stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <Header
                uriImageAlbum={album?.images[0].url}
                albumName={album?.name}
                uriImageArtist={artists?.images[0].url}
                nameArtist={album?.artists[0].name}
                typeAlbum={album?.type}
                realeaseDate={album?.release_date}
                staterdAllTracks={staterdAllTracks}
              />
            }
            renderItem={({ item, index }) => {
              return (
                <Box
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  py="2"
                  style={{
                    marginBottom: 8,
                    paddingHorizontal: 8,
                    backgroundColor:
                      activeTrack?.index === index &&
                      album.name === activeTrack.album
                        ? "orange"
                        : colorScheme === "dark"
                        ? "#2b3c43"
                        : "#f1f1f1",
                    padding: 8,
                    borderRadius: 8,
                    marginHorizontal: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handlePLayTrack(index, item)}
                  >
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor:
                            activeTrack?.index === index &&
                            album.name === activeTrack.album
                              ? "gray"
                              : colorScheme === "dark"
                              ? "gray"
                              : "gray",
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "center",
                          borderRadius: 1000,
                        }}
                      >
                        <ThemedText type="defaultSemiBold" numberOfLines={1}>
                          {item.name[0]}
                        </ThemedText>
                      </View>
                      <VStack>
                        <ThemedText
                          type="subtitle"
                          numberOfLines={1}
                          style={{ width: 230 }}
                        >
                          {item.name}
                        </ThemedText>
                        <ThemedText type="default" numberOfLines={1}>
                          {album?.artists[0].name}
                        </ThemedText>
                      </VStack>
                      <Spacer />

                      <ThemedText
                        type="default"
                        numberOfLines={1}
                        style={{
                          alignItems: "center",
                          alignSelf: "flex-start",
                        }}
                      >
                        {formatTime(item.duration_ms)}
                      </ThemedText>
                    </HStack>
                  </TouchableOpacity>
                </Box>
              );
            }}
            ListFooterComponent={
              <Footer
                realeaseDate={album?.release_date}
                totalTracks={album?.total_tracks}
                uriImageArtist={artists.images[0].url}
                nameArtist={album?.artists[0].name}
                releaseArtist={releatedArtist?.artists}
                copyrights={album?.copyrights}
              />
            }
          />
          <Controller />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
