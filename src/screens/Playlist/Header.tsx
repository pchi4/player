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

interface PropsHeader {
  uriImageAlbum: string;
  albumName: string;
  nameArtist: string;
}

export function Header({
  uriImageAlbum,
  albumName,
  nameArtist,
}: PropsHeader): React.JSX.Element {
  const playerState = usePlaybackState();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <ImageBackground
        source={{
          uri: uriImageAlbum,
        }}
        alt="ArtWork albuns"
        style={{
          width: width,
          height: width,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{ top: "10%", left: 10 }}
          onPress={() => router.back()}
        >
          <Feather name={"arrow-left"} size={40 % 100} color="#FFFFFF" />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            top: width / 1.1,
            left: width / 1.3,
            backgroundColor: "blue",
            borderRadius: 50,
            padding: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {playerState.state == "paused" ? (
            <TouchableOpacity>
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
        style={{ paddingHorizontal: 8, paddingVertical: 18 }}
        numberOfLines={1}
      >
        Created by {nameArtist}
      </ThemedText>
    </SafeAreaView>
  );
}
