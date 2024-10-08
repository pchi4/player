import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { HStack, Image } from "@gluestack-ui/themed-native-base";
import TrackPlayer from "react-native-track-player";
import { useGetArtist } from "./hooks";
import { useStateValue } from "@/src/context/State";

interface Iprops {
  music: object;
}

export function Card({ music }: Iprops) {
  const { width } = Dimensions.get("screen");
  const idArtist = music?.track.album.artists[0].id;
  const [context, dispatch] = useStateValue().reducer;

  const {
    data: artists,
    isFetching,
    isLoading,
    refetch: onRefetchArtist,
  } = useGetArtist({ id: idArtist });

  async function playMusic() {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(
        new Array({
          url: music?.track.preview_url,
          title: music?.track.name,
          artist: music?.track.album.artists[0].name,
          duration: music?.track.duration_ms,
          artwork: music?.track.album.images[0].url,
        })
      );

      dispatch({
        type: "setArtist",
        payload: {
          artist: artists,
        },
      });

      await TrackPlayer.play();
    } catch (error) {
      console.log("Não é possivel iniciar a musica", error);
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => playMusic()}>
        <HStack
          space={[2, 3]}
          justifyContent="start"
          style={{ paddingBottom: 14, paddingHorizontal: 10 }}
        >
          <Image
            alt="art work"
            width={width / 7}
            height={width / 7}
            rounded="md"
            source={
              music?.track.album.images[0].url
                ? {
                    uri: music?.track.album.images[0].url,
                  }
                : require("@/assets/images/unknown_track.png")
            }
          />

          <View style={{ alignContent: "center", alignSelf: "center" }}>
            <ThemedText
              type="subtitle"
              style={{ width: width / 1.3 }}
              numberOfLines={1}
            >
              {music.track.name}
            </ThemedText>
            <ThemedText type="default">
              {" "}
              {music?.track.album.artists[0].name}
            </ThemedText>
          </View>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}