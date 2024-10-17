import React from "react";
import { TouchableOpacity, View, useColorScheme } from "react-native";
import { Box, HStack, VStack, Spacer } from "@gluestack-ui/themed-native-base";

import { ThemedText } from "@/src/components/ThemedText";
import { useActiveTrack } from "react-native-track-player";
import { useStateValue } from "@/src/context/State";

interface iProps {
  index: number;
  track: object;
  playTrack: (index: number, track: object) => Promise<void>;
}

export function TrackList({ index, track, playTrack }: iProps) {
  const activeTrack = useActiveTrack();
  const colorScheme = useColorScheme();
  const [context, dispatch] = useStateValue().reducer;
  const album = context.album.album;

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
        // backgroundColor:
        //   activeTrack?.index === index && album.name === activeTrack?.album
        //     ? "orange"
        //     : colorScheme === "dark"
        //     ? "#2b3c43"
        //     : "white",
        padding: 8,
        borderRadius: 8,
        marginHorizontal: 8,
      }}
    >
      <TouchableOpacity onPress={() => playTrack(index, track)}>
        <HStack space={[2, 3]} justifyContent="space-between">
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor:
                activeTrack?.index === index &&
                album.name === activeTrack?.album
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
              {track?.name[0]}
            </ThemedText>
          </View>
          <VStack>
            <ThemedText
              type="subtitle"
              numberOfLines={1}
              style={{ width: 230 }}
            >
              {track?.name}
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
            {formatTime(track?.duration_ms)}
          </ThemedText>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}
