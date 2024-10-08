import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useActiveTrack } from "react-native-track-player";

export function Header() {
  const { width } = Dimensions.get("screen");
  const track = useActiveTrack();

  return (
    <SafeAreaView>
      <ImageBackground
        source={
          track?.artwork
            ? {
                uri: track?.artwork,
              }
            : require("@/assets/images/unknown_track.png")
        }
        alt="ArtWork albuns"
        style={{ width: width, height: width }}
      >
        <TouchableOpacity
          style={{ top: "10%", paddingHorizontal: 10 }}
          onPress={() => router.back()}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "gray",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              borderRadius: 1000,
            }}
          >
            <Feather name={"arrow-left"} size={40 % 100} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
