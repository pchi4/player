import {
  Text,
  Box,
  HStack,
  Image,
  VStack,
  Progress,
} from "@gluestack-ui/themed-native-base";
import { Dimensions, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Device from "expo-device";

import * as React from "react";
import TrackPlayer, {
  useActiveTrack,
  useProgress,
  usePlaybackState,
} from "react-native-track-player";
import { router } from "expo-router";
const { width, height } = Dimensions.get("screen");

export default function Controller() {
  var deviceModel = Device.deviceName;

  const track = useActiveTrack();
  const progress = useProgress();
  const status = usePlaybackState();

  return (
    <>
      {track && (
        <TouchableOpacity onPress={() => router.push("/play/[details]")}>
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
          >
            <HStack justifyContent="space-between">
              <Box>
                <HStack justifyContent="start">
                  <Image
                    borderRadius={6}
                    width={width / 9}
                    height={width / 9}
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
                  <VStack>
                    <Text
                      pl={2}
                      color="white"
                      fontWeight="bold"
                      fontSize="xs"
                      isTruncated
                      maxWidth={200}
                    >
                      {track.title + " - " + track.artist}
                    </Text>

                    <HStack pl="2" alignItems="center">
                      <Feather name="speaker" size={20 % 100} color="white" />
                      <Text
                        color="white"
                        pl={1}
                        fontWeight="bold"
                        fontSize="md"
                      >
                        {deviceModel}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
              <Box>
                <HStack
                  alignItems="center"
                  space={2}
                  alignContent="center"
                  pt={3}
                >
                  <Feather name="speaker" size={24 % 100} color="#FFFFFF" />
                  <Feather name="plus-circle" size={24 % 100} color="#FFFFFF" />
                  {status.state === "playing" ? (
                    <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                      <Feather name="pause" size={24 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => TrackPlayer.play()}>
                      <Feather name="play" size={24 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </HStack>
              </Box>
            </HStack>
            <Progress
              mt={2}
              style={{ marginHorizontal: 0 }}
              //   width="100%"
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
