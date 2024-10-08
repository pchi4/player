import React from "react";

import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  RefreshControl,
  ImageBackground,
  useColorScheme,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import { Flex } from "@gluestack-ui/themed-native-base";
const { width } = Dimensions.get("screen");
import { ButtonRowBack } from "@/src/components/ButtonRowBack";

interface PropsHeader {
  uriImageAlbum: string;
  albumName: string;
  uriImageArtist: string;
  nameArtist: string;
  typeAlbum: string;
  realeaseDate: string;
  staterdAllTracks: () => Promise<VideoEncoderEventMap>;
}

export function Header({
  uriImageAlbum,
  albumName,
  uriImageArtist,
  nameArtist,
  typeAlbum,
  realeaseDate,
  staterdAllTracks,
}: PropsHeader): React.JSX.Element {
  const playerState = usePlaybackState();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <ImageBackground
        source={
          uriImageAlbum
            ? {
                uri: uriImageAlbum,
              }
            : require("@/assets/images/unknown_track.png")
        }
        alt="ArtWork albuns"
        style={{
          width: width,
          height: width,
          flex: 1,
        }}
      >
        <ButtonRowBack />
        <View
          style={{
            position: "absolute",
            top: width / 1.1,
            left: width / 1.3,
            backgroundColor: "gray",
            borderRadius: 50,
            padding: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {playerState.state == "paused" ? (
            <TouchableOpacity onPress={staterdAllTracks}>
              <Feather
                name={"play"}
                size={50 % 100}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={async () => await TrackPlayer.pause()}>
              <Feather
                name={"pause"}
                size={50 % 100}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
      <ThemedText
        numberOfLines={2}
        type="title"
        style={{ padding: 10, paddingTop: 40 }}
      >
        {albumName}
      </ThemedText>
      <ThemedText
        type="subtitle"
        style={{ paddingHorizontal: 8, paddingBottom: 14 }}
        numberOfLines={1}
      >
        {nameArtist}
      </ThemedText>
    </SafeAreaView>
  );
}
