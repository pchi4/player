import { ThemedText } from "@/src/components/ThemedText";
import { HStack, Image } from "@gluestack-ui/themed-native-base";
import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { styles } from "./Styles";

export function TopSongs({ song }) {
  const { width } = Dimensions.get("screen");
  return (
    <View>
      <TouchableOpacity>
        <HStack
          space={[2, 3]}
          justifyContent="start"
          style={styles.cardContainer}
        >
          <Image
            alt="art work"
            width={width / 9}
            height={width / 9}
            rounded="md"
            source={
              song?.album
                ? {
                    uri: song?.album.images[0].url,
                  }
                : require("@/assets/images/unknown_track.png")
            }
          />

          <View style={styles.cardContent}>
            <ThemedText
              type="subtitle"
              style={styles.cardTitle}
              numberOfLines={1}
            >
              {song.name}
            </ThemedText>
            <ThemedText type="default">{song?.artists[0].name}</ThemedText>
          </View>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}
