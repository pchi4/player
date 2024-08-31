import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
  useColorScheme,
  StatusBar,
} from "react-native";
import { Box, Pressable, Avatar } from "@gluestack-ui/themed-native-base";

const { width, height } = Dimensions.get("screen");

import { CardLibrary } from "@/src/components/Cards/index";
import { useGetPlaytlist } from "./hooks/useGetPlaytlist";
import { Loading } from "@/src/components/Loading";
import { Feather } from "@expo/vector-icons";

import { router } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderList = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await AsyncStorage.getItem("profile");
      } catch (error) {}
    };

    fetchProfile();
  });

  return (
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "blue" : "gray",
        paddingTop: "15%",
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <Avatar
          marginLeft="2"
          bg="green.500"
          size="md"
          source={{
            uri: "https://i.scdn.co/image/ab67616d0000b2732c5b24ecfa39523a75c993c4",
          }}
        ></Avatar>
        <ThemedText style={{ marginLeft: 4 }} type="subtitle">
          Sua Biblioteca
        </ThemedText>
      </View>

      <FlatList
        data={["Playlist", "Podcasts", "Àlbuns", "Artistas", "Baixado"]}
        keyExtractor={(item, idx) => String(idx)}
        horizontal
        renderItem={({ item }) => (
          <View
            style={{
              width: 100,
              padding: 2,
              backgroundColor: colorScheme === "dark" ? "gray" : "gray",
              margin: 8,
              borderRadius: 30,
            }}
          >
            <ThemedText style={{ textAlign: "center" }} type="default">
              {item}
            </ThemedText>
          </View>
        )}
      />
    </View>
  );
};

export default function Library() {
  const { data, isError, isLoading, isFetching } = useGetPlaytlist();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Box justifyContent="space-between">
      <FlatList
        data={data?.items}
        numColumns={3}
        ListHeaderComponent={HeaderList}
        keyExtractor={(item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        stickyHeaderIndices={[0]}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardLibrary
            items={item}
            navigation={router}
            handleClick={() => router.navigate("playlists")}
            Width={null}
            Height={null}
          />
        )}
      />
    </Box>
  );
}
