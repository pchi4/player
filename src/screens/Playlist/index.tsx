import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
} from "react-native";

import {
  HStack,
  Box,
  Divider,
  Center,
  Image,
  Text,
  VStack,
  Icon,
  Button,
  Spinner,
  Pressable,
  Heading,
  Avatar,
  Flex,
  Spacer,
} from "@gluestack-ui/themed-native-base";

import { useGetTracksPlaylist, useGetProfile } from "./hooks";
import { Loading } from "@/src/components/Loading";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useStateValue } from "@/src/context/State";
import Controller from "../Controller";
import { ThemedText } from "@/src/components/ThemedText";
import { Header } from "./Header";
import { useGetColorsImage } from "@/src/hooks/useGetColorsImage";

const { width, height } = Dimensions.get("screen");

export default function Playlist() {
  const [context, dispatch] = useStateValue().reducer;
  const ownerPlaylistId = context.playlist.owner.id;
  const playlistId = context.playlist.id;
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const verifyLimitMax100 = (value: number): number => {
    if (value >= 100) {
      return 100;
    }
    return value;
  };

  console.log(context.playlist);

  const {
    data: tracksPlaylist,
    isLoading,
    isFetching,
    refetch: onRefetchPlaylist,
  } = useGetTracksPlaylist({
    id: playlistId,
    totalTracks: 100,
  });

  const {
    data: profile,
    isLoading: profileIsLoading,
    isFetching: profileIsFetching,
    refetch: onRefetchProfile,
  } = useGetProfile({ id: ownerPlaylistId });

  const { colors } = useGetColorsImage({ uri: context.playlist.images[0].url });

  function onRefresh() {
    onRefetchProfile();
    onRefetchPlaylist();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  if (profileIsLoading || profileIsFetching || isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        paddingTop: "15%",
        height: 150,
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#212224" : "white",
      }}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? [colors.colorThree.value, "#212224", "#212224"]
            : [colors.colorThree.value, "white", "white"]
        }
      >
        <SafeAreaView>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="blue"
              />
            }
            data={tracksPlaylist?.items}
            keyExtractor={(item) => String(item.id)}
            // stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <Header
                uriImageAlbum={context.playlist?.images[0].url}
                albumName={context.playlist.name}
                nameArtist={context.playlist.owner?.display_name}
              />
            }
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity

                // onPress={() =>
                //   navigation.navigate("home", {
                //     screen: "playMusic",
                //     params: {
                //       item,
                //       album: {
                //         tracks: {
                //           index,
                //           items: tracksPlaylist.items.map((value) => {
                //             return formatedParams(value);
                //           }),
                //         },
                //       },
                //     },
                //   })
                // }
                >
                  <HStack
                    space={[2, 3]}
                    justifyContent="start"
                    style={{ paddingBottom: 14, paddingHorizontal: 10 }}
                  >
                    <Image
                      alt="art work"
                      width={width / 7}
                      height={width / 7}
                      rounded="md"
                      source={{
                        uri: item.track.album.images[0].url,
                      }}
                    />

                    <View
                      style={{ alignContent: "center", alignSelf: "center" }}
                    >
                      <ThemedText
                        type="subtitle"
                        style={{ width: width / 1.3 }}
                        numberOfLines={1}
                      >
                        {item.track.name}
                      </ThemedText>
                      <ThemedText type="default">
                        {" "}
                        {item.track.album.artists[0].name}
                      </ThemedText>
                    </View>
                  </HStack>
                </TouchableOpacity>
              );
            }}
          />
          <Controller />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
