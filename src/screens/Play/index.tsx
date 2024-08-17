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
} from "react-native";

import { useStateValue } from "@/src/context/State";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useImageColors } from "@/src/hooks";
import { useEffect, useState } from "react";
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
      headerImage={
        <>
          <ImageBackground
            source={{
              uri: track?.artwork,
            }}
            alt="ArtWork albuns"
            style={{ width: width, height: height / 2 }}
          >
            <TouchableOpacity
              style={{ top: "10%", paddingHorizontal: 10 }}
              onPress={() => router.back()}
            >
              <Feather name={"arrow-left"} size={40 % 100} color="#FFFFFF" />
            </TouchableOpacity>
          </ImageBackground>
        </>
      }
    >
      <LinearGradient
        colors={
          colors
            ? [colors?.colorTwo.value, colors?.colorThree.value]
            : [colors?.background]
        }
      >
        <SafeAreaView>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <ThemedText
                type="title"
                style={{ paddingVertical: 4, width: width / 1.3 }}
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

            <Slider
              style={{ width: width, margin: 0, padding: 0, right: 10 }}
              value={formatedValueSlider(Number(position))}
              maximumValue={verifyNumberMaxSlider(Number(duration))}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              // onValueChange={(value) => onChangeSlider(value)}
            />

            <HStack space={8} justifyContent="space-between" marginBottom="5%">
              <Text
                color="#FFFFFF"
                fontWeight="bold"
                fontSize={["md", "md", "lg"]}
              >
                {formatSecondsToMinutes(position)}
              </Text>
              <Text
                color="#FFFFFF"
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
              <Box
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
              </Box>
              <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
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

              <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
                <Feather name="skip-forward" size={40 % 100} color="#FFFFFF" />
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
                  <Feather name="repeat" size={20 % 100} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </HStack>
          </View>

          <TouchableOpacity onPress={() => router.push("/artist/[details]")}>
            <Artist />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </ParallaxScrollView>
  );
}
