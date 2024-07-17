import {
  Center,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  VStack,
  Avatar,
  AspectRatio,
  Stack,
  Flex,
} from "@gluestack-ui/themed-native-base";
import {
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { useStateValue } from "@/src/context/State";
import { LinearGradient } from "expo-linear-gradient";

import Slider from "@react-native-community/slider";

import { Audio, AVPlaybackTolerance } from "expo-av";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Loading } from "@/src/components/Loading";
import { Feather } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";

import { useGetDetailsArtist } from "./hooks";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useSetupPlayer } from "@/src/hooks";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import TrackPlayer, {
  useActiveTrack,
  useProgress,
  usePlaybackState,
} from "react-native-track-player";
import { Artist } from "@/src/components/Artist";
import { router } from "expo-router";

// The player is ready to be used
const { width, height } = Dimensions.get("screen");

export default function Play() {
  const [context, dispatch] = useStateValue().reducer;
  // const value = useRef(route.params.album.tracks.index);
  // const numberTrackPlaylist = useRef(JSON.parse(route.params)?.tracks.index);

  const track = useActiveTrack();
  const position = useProgress();
  const status = usePlaybackState();

  const formatingFollowers = (follower: any) => {
    var followers = follower?.toFixed(3).split(".");
    followers[0] = followers[0]?.split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
  };

  const generationShuffleNumber = (array: Array<any>) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // const onChangeSlider = async (time: number) => {
  //   await currentSound?.playFromPositionAsync(time * 1000);
  // };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // const createRandomTracks = (): number => {
  //   return Math.floor(
  //     Math.random() * route.params.album.tracks.items.length + 1
  //   );
  // };

  // console.log(context.statusSound);

  // if (isLoading && isFetching) {
  //   return <Loading />;
  // }

  const formatedValueSlider = (value: number): number => {
    if (!value) return 0;
    return value / 1000;
  };

  const verifyNumberMaxSlider = (value: number): number => {
    if (!value) return 0;
    return value / 1000;
  };

  return (
    <Box style={{ flex: 1 }}>
      <ScrollView>
        <LinearGradient
          style={{ height: "100%" }}
          colors={["#a3a5a8", "#212224", "#212224"]}
        >
          <SafeAreaView>
            <Box style={{ flex: 1 }} padding="4">
              <Center>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <TouchableOpacity onPress={() => router.back()}>
                    <Feather
                      name={"arrow-left"}
                      size={30 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>

                  <Box>
                    <Center>
                      <Text color="#FFFFFF" fontSize="xs">
                        TOCANDO DO ALBUM
                      </Text>

                      <Text
                        color="#FFFFFF"
                        fontWeight="bold"
                        fontSize={["xs", "xs", "md"]}
                        marginBottom={["8", "18", "24"]}
                        isTruncated
                        width="auto"
                      >
                        {track?.album}
                      </Text>
                    </Center>
                  </Box>

                  <TouchableOpacity>
                    <Feather
                      name={"more-vertical"}
                      size={30 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </Flex>

                <Image
                  style={{
                    marginTop: "10%",
                    borderRadius: 10,
                    width: width / 1.2,
                    height: width / 1.2,
                  }}
                  source={{
                    uri: track?.artwork,
                  }}
                  alt="ArtWork albuns"
                />
              </Center>
            </Box>

            <Box
              style={{ flex: 1, paddingHorizontal: 10 }}
              marginTop={["0", "10%", "14%"]}
              paddingX="8"
            >
              <HStack
                space={1}
                justifyContent="space-between"
                marginTop={["18%", "20%", "24%"]}
                marginBottom={["4", "6", "8"]}
              >
                <Box>
                  <Text
                    color="#FFFFFF"
                    fontWeight="bold"
                    fontSize="lg"
                    isTruncated
                    maxW={270}
                  >
                    {track?.title}
                  </Text>

                  <Text color="#FFFFFF" fontSize="md">
                    {track?.artist}
                  </Text>
                </Box>
                {/* 
                <Box alignItems="center" justifyContent="center">
                   {isFavorite ? (
                    <TouchableOpacity
                      onPress={() => setIsFavorite(!isFavorite)}
                    >
                      <Feather name={"heart"} size={35 % 100} color="green" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setIsFavorite(!isFavorite)}
                    >
                      <Feather name={"heart"} size={35 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  )} 
                </Box> */}
              </HStack>

              <Slider
                style={{ height: 40, width: "100%" }}
                value={formatedValueSlider(Number(position.position))}
                maximumValue={verifyNumberMaxSlider(Number(position.duration))}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                // onValueChange={(value) => onChangeSlider(value)}
              />

              <HStack
                space={8}
                justifyContent="space-between"
                marginBottom="5%"
              >
                <Text
                  color="#FFFFFF"
                  fontWeight="bold"
                  fontSize={["md", "md", "lg"]}
                >
                  {formatTime(position.position)}
                </Text>
                <Text
                  color="#FFFFFF"
                  fontWeight="bold"
                  fontSize={["md", "md", "lg"]}
                >
                  {formatTime(position?.duration)}
                </Text>
              </HStack>

              <HStack
                space={1}
                justifyContent="space-evenly"
                alignContent="center"
                alignItems="center"
                marginTop={["0", "4", "6"]}
              >
                {/* <Box
                  justifyContent="start"
                  alignItems="start"
                  alignContent="start"
                >
                  {isRandom ? (
                    <TouchableOpacity onPress={() => setIsRandom(!isRandom)}>
                      <Feather name="shuffle" size={20 % 100} color="green" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setIsRandom(!isRandom)}>
                      <Feather name="shuffle" size={20 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  )} 
                </Box> */}
                <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
                  <Feather name="skip-back" size={40 % 100} color="#FFFFFF" />
                </TouchableOpacity>

                {status.state === "playing" ? (
                  <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                    <Feather name="pause" size={60 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => TrackPlayer.play()}>
                    <Feather name="play" size={60 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity>
                  <Feather
                    name="skip-forward"
                    size={40 % 100}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
                {/* {isReapeat ? (
                  <TouchableOpacity onPress={() => setIsRepeat(!isReapeat)}>
                    <Feather name="repeat" size={20 % 100} color="green" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setIsRepeat(!isReapeat)}>
                    <Feather name="repeat" size={20 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                )}  */}
              </HStack>
            </Box>

            <TouchableOpacity>
              <Artist />
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>
    </Box>
  );
}
