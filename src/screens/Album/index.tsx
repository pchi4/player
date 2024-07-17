import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  LogBox,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Image,
  Center,
  Box,
  Text,
  Avatar,
  HStack,
  Heading,
  VStack,
  Spacer,
  Pressable,
  Spinner,
  Flex,
  Select,
} from "@gluestack-ui/themed-native-base";
import { format } from "date-fns";
import { eoLocale } from "date-fns/locale/eo";

import { useGetArtist, useGetSeveralArtist } from "./hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "@/src/components/Loading";
import { Feather } from "@expo/vector-icons";
import { CardArtist } from "@/src/components/Cards/Artist";
import { useStateValue } from "@/src/context/State";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, {
  useIsPlaying,
  State,
  usePlaybackState,
} from "react-native-track-player";

import Controller from "@/src/screens/Controller";

import {
  router,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { de } from "date-fns/locale";
import { ThemedText } from "@/src/components/ThemedText";

type PropsAlbums = {
  route: object;
  navigation: object;
};

const { width, height } = Dimensions.get("screen");

interface Track {
  _track_number: any;
  duration_ms: any;
  preview_url: any;
  name: any;
  artists: { name: any }[];
  explicit: boolean;
}

export default function Album() {
  const [context, dispatch] = useStateValue().reducer;
  const album = context.album.album;

  const idArtist = album.artists[0].id;

  const playerState = usePlaybackState();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const {
    data: artists,
    isFetching,
    isLoading,
  } = useGetArtist({ id: idArtist });

  const {
    data: releatedArtist,
    isLoading: isReleatedArtistLoading,
    isFetching: isReleatedFetching,
  } = useGetSeveralArtist({ id: idArtist });

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleDispatchs = async (index: number, item: object) => {
    try {
      await TrackPlayer.reset();

      const tracks = album.tracks.items.map((track: Track, idx: any) => {
        return {
          url: track.preview_url,
          title: track.name,
          artist: track.artists[0].name,
          duartion: track.duration_ms,
          album: album.name,
          total: album.tracks.total,
          artwork: album?.images[0].url,
          number_track: track._track_number,
          explicit: track.explicit,
        };
      });

      await TrackPlayer.add(tracks[index]);
      await TrackPlayer.add(
        tracks.filter((track: Track, idx: number) => idx != index)
      );
      const trackQueue = await TrackPlayer.getQueue();

      await TrackPlayer.play();
    } catch (error) {
      console.log("error ao dar play:", error);
    }
  };

  if (
    isFetching ||
    isLoading ||
    isReleatedArtistLoading ||
    isReleatedFetching
  ) {
    return <Loading />;
  }

  return (
    <View>
      <LinearGradient colors={["#a3a5a8", "#212224", "#212224"]}>
        <View style={{ paddingHorizontal: 8 }}>
          <ScrollView>
            <SafeAreaView>
              <Box style={{ paddingTop: StatusBar.currentHeight }}>
                <HStack
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingX="4"
                >
                  <TouchableOpacity onPress={() => router.back()}>
                    <Feather
                      name={"arrow-left"}
                      size={30 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Feather
                      name={"more-vertical"}
                      desce
                      lico
                      size={30 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </HStack>
                <Center>
                  <Image
                    alt="art work"
                    width={width / 1.5}
                    height={width / 1.5}
                    rounded="md"
                    source={{ uri: album?.images[0].url }}
                  />
                </Center>
              </Box>

              <View style={{ margin: 4 }}>
                <Box>
                  <ThemedText type="title" style={{ paddingVertical: 8 }}>
                    {" "}
                    {album?.name}
                  </ThemedText>

                  <HStack justifyContent="start" paddingY="4">
                    <Avatar
                      bg="green.500"
                      size="sm"
                      source={{
                        uri: artists?.images[0].url,
                      }}
                    ></Avatar>
                    <Text
                      fontSize="lg"
                      marginLeft="2"
                      fontWeight="bold"
                      color="white"
                    >
                      {album?.artists[0].name}
                    </Text>
                  </HStack>
                  <Box>
                    <Text
                      fontSize={["sm", "sm", "md"]}
                      fontWeight="bold"
                      paddingBottom="2"
                      color="coolGray.300"
                    >
                      {album?.type[0].toUpperCase() +
                        album?.type.slice(1) +
                        " ° " +
                        new Date(album?.release_date).getFullYear()}
                    </Text>
                  </Box>
                  <Box>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row"
                      paddingY="4"
                    >
                      <Box flexDirection="row">
                        <TouchableOpacity style={{ marginRight: 10 }}>
                          <Feather
                            name={"heart"}
                            size={26 % 100}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginRight: 10 }}>
                          <Feather
                            name={"arrow-down-circle"}
                            size={26 % 100}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight: 10 }}>
                          <Feather
                            name={"more-vertical"}
                            size={26 % 100}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      </Box>

                      <Box flexDirection="row">
                        <TouchableOpacity style={{ marginRight: 10 }}>
                          <Feather
                            name="shuffle"
                            size={38 % 100}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Feather
                            name={"play"}
                            size={38 % 100}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      </Box>
                    </Flex>
                  </Box>
                  <FlatList
                    data={album.tracks.items}
                    keyExtractor={(item) => String(item.id)}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => (
                      <Box
                        _dark={{
                          borderColor: "muted.50",
                        }}
                        borderColor="muted.800"
                        py="2"
                      >
                        <TouchableOpacity
                          onPress={() => handleDispatchs(index, item)}
                        >
                          <HStack space={[2, 3]} justifyContent="space-between">
                            <VStack>
                              <Text
                                _dark={{
                                  color: "warmGray.50",
                                }}
                                color="white"
                                bold
                                isTruncated
                                maxWidth={[280, 300]}
                                fontSize="md"
                              >
                                {item.name}
                              </Text>
                              <Text
                                fontSize="xs"
                                color="white"
                                _dark={{
                                  color: "warmGray.200",
                                }}
                              >
                                {album?.artists[0].name}
                              </Text>
                            </VStack>
                            <Spacer />
                            <Text
                              fontSize="xs"
                              _dark={{
                                color: "warmGray.50",
                              }}
                              color="white"
                              alignSelf="flex-start"
                            >
                              {formatTime(item.duration_ms)}
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      </Box>
                    )}
                  />
                </Box>

                <Box style={{ paddingVertical: 8 }}>
                  <Text color="white" fontSize="md" fontWeight="bold">
                    {format(new Date(album.release_date), "do 'de' MMMM yyyy", {
                      locale: eoLocale,
                    })}
                  </Text>
                  <Text color="white" fontSize="md" fontWeight="bold">
                    {album.total_tracks + " músicas"}
                  </Text>
                </Box>

                <Box style={{ paddingVertical: 4 }}>
                  <HStack justifyContent="start" paddingY="4">
                    <Avatar
                      bg="green.500"
                      size="sm"
                      source={{
                        uri: artists?.images[0].url,
                      }}
                    ></Avatar>
                    <Text
                      fontSize="lg"
                      marginLeft="2"
                      fontWeight="bold"
                      color="white"
                    >
                      {album?.artists[0].name}
                    </Text>
                  </HStack>
                </Box>

                <Box style={{ paddingVertical: 4 }}>
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    Mais que talvez você goste
                  </Text>

                  <FlatList
                    style={{ paddingTop: StatusBar.currentHeight }}
                    data={releatedArtist?.artists}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item }) => (
                      <CardArtist
                        width={180}
                        height={180}
                        items={item}
                        // navigation={navigation}
                        // handleClick={() =>
                        //   // navigation.navigate("home", {
                        //   //   screen: "art",
                        //   //   params: item,
                        //   // })
                        // }
                      />
                    )}
                  />

                  <Box paddingTop="4">
                    {album?.copyrights.map(
                      (
                        value: {
                          text:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                        },
                        idx: React.Key | null | undefined
                      ) => (
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          key={idx}
                          color="white"
                        >
                          {value.text}
                        </Text>
                      )
                    )}
                  </Box>
                </Box>
              </View>
            </SafeAreaView>
          </ScrollView>
          <Controller />
        </View>
      </LinearGradient>
    </View>
  );
}
