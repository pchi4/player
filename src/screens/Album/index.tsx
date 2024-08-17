import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  LogBox,
  RefreshControl,
  StatusBar,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Box,
  Text,
  HStack,
  VStack,
  Spacer,
} from "@gluestack-ui/themed-native-base";

import { useGetArtist, useGetSeveralArtist } from "./hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "@/src/components/Loading";
import { useStateValue } from "@/src/context/State";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

import Controller from "@/src/screens/Controller";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useImageColors } from "@/src/hooks";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";
import { ThemedText } from "@/src/components/ThemedText";

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

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

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
    <>
      <Box style={{ backgroundColor: colors?.colorThree.value }}>
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
          nestedScrollEnabled={true}
          renderItem={({ item, index }) => {
            const isBackGround = index === album.tracks.items[index];
            return (
              <Box
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                py="2"
                style={{
                  margin: 4,
                  paddingHorizontal: 8,
                }}
              >
                <TouchableOpacity onPress={() => handlePLayTrack(index, item)}>
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <VStack>
                      <ThemedText type="subtitle" numberOfLines={1}>
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
      </Box>
      <Controller />
    </>
  );
}
