import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  ImageBackground,
  View,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useActiveTrack } from "react-native-track-player";
import { styles } from "./Styles";

export function Header() {
  const track = useActiveTrack();
  const colorScheme = useColorScheme();
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
        style={styles.headerimage}
      >
        <TouchableOpacity
          style={{ top: "10%", paddingHorizontal: 10 }}
          onPress={() => router.back()}
        >
          <View
            style={{
              backgroundColor: colorScheme === "dark" ? "orange" : "gray",
              width: 50,
              height: 50,
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
