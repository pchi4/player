import React from "react";
import {
  Image,
  Center,
  Box,
  Text,
  Avatar,
  HStack,
  Flex,
} from "@gluestack-ui/themed-native-base";

import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  RefreshControl,
  ImageBackground,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
const { width } = Dimensions.get("screen");

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
        <View style={{ top: width / 1.2, left: width / 1.2 }}>
          {playerState.state == "paused" ? (
            <TouchableOpacity onPress={staterdAllTracks}>
              <Feather name={"play"} size={50 % 100} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={async () => await TrackPlayer.pause()}>
              <Feather name={"pause"} size={50 % 100} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
      <ThemedText type="title" style={{ padding: 10, paddingTop: 30 }}>
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
