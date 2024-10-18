import React from "react";
import {
  SafeAreaView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  ImageBackground,
  Image,
  useColorScheme,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { useStateValue } from "@/src/context/State";
import {
  Center,
  Box,
  Text,
  Avatar,
  HStack,
} from "@gluestack-ui/themed-native-base";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import Controller from "@/src/screens/Controller";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  useGetAlbumsArtist,
  useGetArtist,
  useGetRelatedArtist,
  useGetToptracksArtist,
} from "./hooks";
import { TopSongs } from "./TopSongs";
import { CardArtist } from "@/src/components/Cards/Artist";
import { Loading } from "@/src/components/Loading";

const { width } = Dimensions.get("screen");

export default function Artist() {
  const formatingFollowers = (followers: any): string => {
    var followers = followers.toFixed(3).split(".");
    followers[0] = followers[0].split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
  };

  const [context, dispatch] = useStateValue().reducer;
  const album = context.album.album;
  const idArtist = album.artists[0].id;
  const colorScheme = useColorScheme();

  const {
    data: topTracks,
    isLoading,
    isFetching,
  } = useGetToptracksArtist({ id: idArtist });

  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums,
  } = useGetAlbumsArtist({ id: idArtist });

  if (isLoading || isFetching || isLoadingAlbums || isFetchingAlbums) {
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
              source={{
                uri: context.artist.images[0].url,
              }}
              alt="ArtWork albuns"
              style={{ width: width, height: width }}
            >
              <TouchableOpacity
                style={{
                  top: "10%",
                  width: 40,
                  height: 40,
                  backgroundColor: colorScheme === "dark" ? "orange" : "gray",
                  borderRadius: 10000,
                  left: 10,
                }}
                onPress={() => router.back()}
              >
                <Feather
                  name={"arrow-left"}
                  size={40 % 100}
                  color={colorScheme === "dark" ? "blue" : "#FFFFFF"}
                />
              </TouchableOpacity>
            </ImageBackground>
          </>
        }
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <ThemedText type="title">{context.artist.name}</ThemedText>
            <ThemedText type="subtitle">Sobre o artista</ThemedText>
          </View>

          <View>
            <ThemedText type="title">
              {formatingFollowers(context.artist.followers.total)}
            </ThemedText>
            <ThemedText type="subtitle" style={{ textAlign: "right" }}>
              Ouvintes mensais
            </ThemedText>
          </View>
        </View>

        <Box style={{ flex: 1, padding: 10 }}>
          <View style={{ paddingVertical: 10 }}></View>
          <ThemedText type="title">Músicas mais populares</ThemedText>

          <View style={{ paddingVertical: 20 }}>
            <FlatList
              data={topTracks?.tracks}
              style={{ height: 300 }}
              renderItem={({ item, index }) => {
                return <TopSongs song={item} />;
              }}
            />
          </View>
          <View style={{ paddingVertical: 8 }}>
            <ThemedText type="title" style={{ textAlign: "justify" }}>
              Discografia do artista
            </ThemedText>
          </View>
          <View style={{ paddingVertical: 8 }}>
            <FlatList
              data={albums?.tracks}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View style={{ paddingRight: 8 }}>
                    <Image
                      width={180}
                      height={180}
                      source={{ uri: item.album.images[0].url }}
                      borderRadius={8}
                    />
                    <ThemedText
                      type="subtitle"
                      numberOfLines={1}
                      style={{ maxWidth: 180 }}
                    >
                      {item.album.name}
                    </ThemedText>
                    <ThemedText
                      type="default"
                      numberOfLines={1}
                      style={{ maxWidth: 180 }}
                    >
                      {item.album.artists[0].name}
                    </ThemedText>
                  </View>
                );
              }}
            />
          </View>
          <View style={{ paddingVertical: 8 }}>
            <ThemedText type="subtitle" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              consequuntur, quasi repudiandae maiores provident assumenda vel,
              accusantium minima quod hic voluptates accusamus debitis ipsum
              eaque tempora recusandae inventore minus fuga.
            </ThemedText>
          </View>
        </Box>
      </ParallaxScrollView>
      <SafeAreaView>
        <Controller />
      </SafeAreaView>
    </>
  );
}
