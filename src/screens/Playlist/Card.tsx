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
import { styles } from "./Style";

interface Iprops {
  music: object;
}

export function Card({ music }: Iprops) {
  const { width } = Dimensions.get("screen");
  const idArtist = music?.track.album.artists[0].id;
  const [context, dispatch] = useStateValue().reducer;

  const { data: artists } = useGetArtist({ id: idArtist });

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
          style={styles.cardContainer}
        >
          <Image
            alt="art work"
            width={width / 9}
            height={width / 9}
            rounded="md"
            source={
              music?.track?.album
                ? {
                    uri: music?.track.album.images[0].url,
                  }
                : require("@/assets/images/unknown_track.png")
            }
          />

          <View style={styles.cardContent}>
            <ThemedText
              type="subtitle"
              style={styles.cardTitle}
              numberOfLines={1}
            >
              {music.track.name}
            </ThemedText>
            <ThemedText type="default">
              {music?.track.album.artists[0].name}
            </ThemedText>
          </View>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}
