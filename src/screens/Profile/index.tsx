import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import Controller from "@/src/screens/Controller";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGetProfile, useGetFollowingArtist, useGetTopTracks } from "./hooks";
import { ButtonRowBack } from "@/src/components/ButtonRowBack";
import { TopSongs } from "./TopSongs";
import { Loading } from "@/src/components/Loading";

export default function Profile() {
  const { data: profile, isLoading, isFetching } = useGetProfile();

  const {
    data: favArtists,
    isLoading: isLoafingFollowingArtist,
    isFetching: isFetchingFollowingArtist,
  } = useGetFollowingArtist();

  const {
    data: topTracks,
    isLoading: isLoagingTopTracks,
    isFetching: isFetchingTopTracks,
  } = useGetTopTracks();

  const { width } = Dimensions.get("screen");
  const colorScheme = useColorScheme();

  if (
    isLoafingFollowingArtist ||
    isLoading ||
    isFetching ||
    isFetchingFollowingArtist ||
    isFetchingTopTracks ||
    isLoagingTopTracks
  ) {
    return <Loading />;
  }

  return (
    <>
      <ParallaxScrollView
        heigth={250}
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <>
            <ImageBackground
              source={
                colorScheme === "dark"
                  ? require("@/assets/images/back_dark.jpeg")
                  : require("@/assets/images/back_white.jpeg")
              }
              alt="ArtWork albuns"
              resizeMode="cover"
              style={{ width: width, height: width }}
            >
              <View style={{ marginHorizontal: 18, marginTop: 40 }}>
                <ButtonRowBack />
              </View>
            </ImageBackground>
          </>
        }
      >
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                width={80}
                height={80}
                borderRadius={10}
                source={{ uri: profile?.images[0].url }}
              />
              <View
                style={{
                  paddingVertical: 8,
                  alignSelf: "center",
                  paddingLeft: 8,
                }}
              >
                <ThemedText type="title">
                  <Feather
                    name={"user"}
                    size={30 % 100}
                    color={colorScheme === "dark" ? "#FFFFFF" : "black"}
                  />
                  {profile?.display_name}
                </ThemedText>
                <ThemedText type="defaultSemiBold">
                  <Feather
                    name={"mail"}
                    size={20 % 100}
                    style={{ marginRight: 8 }}
                    color={colorScheme === "dark" ? "#FFFFFF" : "black"}
                  />

                  {profile?.email}
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={{ paddingVertical: 8 }}>
            <ThemedText
              type="title"
              style={{ textAlign: "justify", paddingVertical: 20 }}
            >
              Seus artistas favoritos
            </ThemedText>

            <FlatList
              data={favArtists?.artists?.items}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      paddingRight: 8,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      borderRadius={1000}
                      source={{ uri: item.images[0].url }}
                    />
                    <ThemedText
                      type="subtitle"
                      numberOfLines={1}
                      style={{ textAlign: "justify", maxWidth: 180 }}
                    >
                      {item.name}
                    </ThemedText>
                  </View>
                );
              }}
            />

            <ThemedText type="title" style={{ paddingVertical: 20 }}>
              Suas músicas favoritas
            </ThemedText>

            <FlatList
              data={topTracks?.items}
              renderItem={({ item }) => {
                return <TopSongs song={item} />;
              }}
            />
          </View>
        </View>
      </ParallaxScrollView>
      <SafeAreaView>
        <Controller />
      </SafeAreaView>
    </>
  );
}
