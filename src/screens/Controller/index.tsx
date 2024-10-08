import {
  Text,
  Box,
  HStack,
  Image,
  VStack,
  Progress,
} from "@gluestack-ui/themed-native-base";
import {
  Dimensions,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Device from "expo-device";

import * as React from "react";
import TrackPlayer, {
  useActiveTrack,
  useProgress,
  usePlaybackState,
} from "react-native-track-player";
import { router } from "expo-router";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";
import { ThemedText } from "@/src/components/ThemedText";
const { width, height } = Dimensions.get("screen");
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default function Controller() {
  var deviceModel = Device.deviceName;

  const track = useActiveTrack();
  const progress = useProgress();
  const status = usePlaybackState();
  const colorScheme = useColorScheme();

  const { colors } = useGetColorsImage({ uri: track?.artwork });

  return (
    <>
      {track && (
        <TouchableOpacity
          style={{ marginHorizontal: 8 }}
          onPress={() => router.push("/play/[details]")}
        >
          <Box
            width="100%"
            bg="#5C5E60"
            padding="2"
            marginX={2}
            fontSize="md"
            fontWeight="bold"
            rounded="md"
            bottom={Platform.OS === "android" ? height / 80 : height / 46}
            position="absolute"
            style={{
              position: "absolute",
              backgroundColor: colorScheme === "dark" ? "#6495ED" : "#566D7E",
            }}
          >
            <HStack justifyContent="space-between">
              <Box>
                <HStack justifyContent="start">
                  <Image
                    borderRadius={6}
                    width={scale(34)}
                    height={scale(34)}
                    source={{
                      uri:
                        track.artwork ??
                        "https://i.scdn.co/image/ab67616d0000b2731dc7483a9fcfce54822a2f19",
                    }}
                    fallbackSource={{
                      uri: "https://i.scdn.co/image/ab67616d0000b2731dc7483a9fcfce54822a2f19",
                    }}
                    alt="album art work"
                  />
                  <VStack style={{ alignSelf: "flex-end" }}>
                    <ThemedText
                      type="subtitle"
                      style={{
                        maxWidth: 200,
                        marginLeft: 10,
                        fontSize: scale(14),
                      }}
                      numberOfLines={1}
                    >
                      {track.title}
                    </ThemedText>

                    <ThemedText
                      type="default"
                      style={{
                        maxWidth: 200,
                        marginLeft: 10,
                        fontSize: scale(10),
                      }}
                      numberOfLines={1}
                    >
                      {track.artist}
                    </ThemedText>
                  </VStack>
                </HStack>
              </Box>
              <Box style={{ alignSelf: "center" }}>
                <HStack space={2}>
                  {status.state === "playing" ? (
                    <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                      <Feather
                        name="pause"
                        size={scale(25)}
                        color={colorScheme === "dark" ? "white" : "black"}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => TrackPlayer.play()}>
                      <Feather
                        name="play"
                        size={scale(25)}
                        color={colorScheme === "dark" ? "white" : "black"}
                      />
                    </TouchableOpacity>
                  )}
                </HStack>
              </Box>
            </HStack>
            <Progress
              style={{ marginHorizontal: 0 }}
              mx={progress.duration / 1000}
              value={
                Math.floor((progress.position / progress.duration) * 100) ?? 0
              }
              colorScheme="emerald"
              size="xs"
            />
          </Box>
        </TouchableOpacity>
      )}
    </>
  );
}
