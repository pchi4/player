import {
  Center,
  Text,
  Box,
  HStack,
  Flex,
} from "@gluestack-ui/themed-native-base";
import {
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
  View,
  useColorScheme,
} from "react-native";

import { useStateValue } from "@/src/context/State";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useImageColors } from "@/src/hooks";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@/src/components/Loading";
import { Feather } from "@expo/vector-icons";
import { useGetDetailsArtist } from "./hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, {
  useActiveTrack,
  useProgress,
  usePlaybackState,
  RepeatMode,
} from "react-native-track-player";
import { Artist } from "@/src/components/Artist";
import { router } from "expo-router";
import Buffering from "@/src/components/Buffering";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";

import { Header } from "@/src/screens/Play/Header";

const { width, height } = Dimensions.get("screen");

export default function Play() {
  const [context, dispatch] = useStateValue().reducer;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReapeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const track = useActiveTrack();
  const { position, duration } = useProgress();
  const status = usePlaybackState();

  const { colors, loading } = useImageColors();
  const colorScheme = useColorScheme();

  const album = context?.album.album;

  // useEffect(() => {
  //   StatusBar.setBackgroundColor(colors?.colorThree?.value);
  // }, [colors]);

  const formatSecondsToMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const formatedValueSlider = (value: number): number => {
    if (!value) return 0;
    return value / 1000;
  };

  const verifyNumberMaxSlider = (value: number): number => {
    if (!value) return 0;
    return value / 1000;
  };

  if (
    loading ||
    status.state == "buffering" ||
    status.state == "loading" ||
    status.state == "ready"
  ) {
    return <Loading />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      heigth={height / 2}
      style={{ flex: 1 }}
      headerImage={<Header />}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#212224", colors.colorThree.value, "#212224"]
            : ["white", colors.colorThree.value, "white"]
        }
      >
        <View>
          <View style={{ paddingHorizontal: 10 }}>
            <ThemedText
              type="title"
              numberOfLines={1}
              style={{ paddingVertical: 4, width: width / 1.3, paddingTop: 20 }}
            >
              {track?.title}
            </ThemedText>
            <ThemedText
              type="subtitle"
              style={{ paddingVertical: 4, width: width / 1.3 }}
            >
              {track?.artist}
            </ThemedText>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Slider
              style={{
                width: width / 1,
              }}
              value={formatedValueSlider(Number(position))}
              maximumValue={verifyNumberMaxSlider(Number(duration))}
              minimumTrackTintColor={"gray"}
              maximumTrackTintColor={"gray"}

              // onValueChange={(value) => onChangeSlider(value)}
            />
          </View>
          <HStack
            space={8}
            justifyContent="space-between"
            marginBottom="5%"
            style={{ paddingHorizontal: 10 }}
          >
            <Text
              color={colorScheme === "dark" ? "white" : "black"}
              fontWeight="bold"
              fontSize={["md", "md", "lg"]}
            >
              {formatSecondsToMinutes(position)}
            </Text>
            <Text
              color={colorScheme === "dark" ? "white" : "black"}
              fontWeight="bold"
              fontSize={["md", "md", "lg"]}
            >
              {formatSecondsToMinutes(duration)}
            </Text>
          </HStack>
          <HStack
            space={1}
            justifyContent="space-evenly"
            alignContent="center"
            alignItems="center"
            marginTop={["0", "4", "6"]}
          >
            <Box justifyContent="start" alignItems="start" alignContent="start">
              {isRandom ? (
                <TouchableOpacity onPress={() => setIsRandom(!isRandom)}>
                  <Feather name="shuffle" size={20 % 100} color="green" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsRandom(!isRandom)}>
                  <Feather
                    name="shuffle"
                    size={20 % 100}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              )}
            </Box>
            <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
              <Feather
                name="skip-back"
                size={40 % 100}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>

            {status.state === "playing" ? (
              <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                <Feather
                  name="pause"
                  size={60 % 100}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => TrackPlayer.play()}>
                <Feather
                  name="play"
                  size={60 % 100}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
              <Feather
                name="skip-forward"
                size={40 % 100}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            {isReapeat ? (
              <TouchableOpacity onPress={() => setIsRepeat(!isReapeat)}>
                <Feather name="repeat" size={20 % 100} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  setIsRepeat(!isReapeat);
                  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
                }}
              >
                <Feather
                  name="repeat"
                  size={20 % 100}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            )}
          </HStack>
        </View>

        <TouchableOpacity onPress={() => router.push("/artist/[details]")}>
          <Artist />
        </TouchableOpacity>
      </LinearGradient>
    </ParallaxScrollView>
  );
}
