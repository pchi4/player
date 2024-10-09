import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  RefreshControl,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Box, HStack, VStack, Spacer } from "@gluestack-ui/themed-native-base";

import { useGetArtist, useGetSeveralArtist } from "./hooks";
import { Loading } from "@/src/components/Loading";
import { useStateValue } from "@/src/context/State";
import TrackPlayer, {
  usePlaybackState,
  useActiveTrack,
} from "react-native-track-player";

import Controller from "@/src/screens/Controller";
import { Footer } from "./Footer";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";
import { ThemedText } from "@/src/components/ThemedText";
import { DetailsHeaderScrollView } from "react-native-sticky-parallax-header";
import { ButtonRowBack } from "@/src/components/ButtonRowBack";

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
  const { width } = Dimensions.get("screen");
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
      <DetailsHeaderScrollView
        leftTopIcon={() => {
          return <ButtonRowBack />;
        }}
        contentContainerStyle={[colorScheme === "dark" ? "black" : "white"]}
        titleStyle={{ color: colorScheme === "dark" ? "white" : "black" }}
        backgroundImage={
          album?.images[0].url
            ? { uri: album?.images[0].url }
            : require("@/assets/images/unknown_track.png")
        }
        parallaxHeight={width}
        subtitle={album?.artists[0].name}
        image={{ uri: artists?.images[0].url }}
        contentIconNumber={album?.total_tracks}
        enableSafeAreaTopInset
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     tintColor="blue"
        //   />
        // }
      >
        <View style={{ paddingTop: 10, width }}>
          <ThemedText
            type="title"
            numberOfLines={2}
            style={{ paddingVertical: 10, paddingHorizontal: 6 }}
          >
            {album.name}
          </ThemedText>
          {album.tracks.items.map((item, index) => (
            <Box
              key={index}
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
                    : "white",
                padding: 8,
                borderRadius: 8,
                marginHorizontal: 8,
              }}
            >
              <TouchableOpacity onPress={() => handlePLayTrack(index, item)}>
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
          ))}
          <Footer
            realeaseDate={album?.release_date}
            totalTracks={album?.total_tracks}
            uriImageArtist={artists.images[0].url}
            nameArtist={album?.artists[0].name}
            releaseArtist={releatedArtist?.artists}
            copyrights={album?.copyrights}
          />
        </View>
      </DetailsHeaderScrollView>
      <SafeAreaView>
        <Controller />
      </SafeAreaView>
    </>
  );
}
