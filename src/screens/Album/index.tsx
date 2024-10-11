import React from "react";
import { SafeAreaView, View, useColorScheme, Dimensions } from "react-native";

import { useGetArtist, useGetSeveralArtist } from "./hooks";
import { Loading } from "@/src/components/Loading";
import { useStateValue } from "@/src/context/State";
import TrackPlayer from "react-native-track-player";

import Controller from "@/src/screens/Controller";
import { Footer } from "./Footer";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";
import { ThemedText } from "@/src/components/ThemedText";
import { DetailsHeaderScrollView } from "react-native-sticky-parallax-header";
import { ButtonRowBack } from "@/src/components/ButtonRowBack";
import { TrackList } from "./Track";
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
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get("screen");

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

  function dispatchDetailsArtist() {
    dispatch({
      type: "setArtist",
      payload: {
        artist: artists,
      },
    });
  }

  const playTrack = async (index: number, item: Track) => {
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
      >
        <View style={{ paddingTop: 10, width }}>
          <ThemedText
            type="title"
            numberOfLines={2}
            style={{ paddingVertical: 10, paddingHorizontal: 6 }}
          >
            {album.name}
          </ThemedText>
          {album.tracks.items.map((track: object, index: number) => (
            <TrackList
              index={index}
              track={track}
              key={index}
              playTrack={playTrack}
            />
          ))}
          <Footer
            realeaseDate={album?.release_date}
            totalTracks={album?.total_tracks}
            uriImageArtist={artists?.images[0].url}
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
