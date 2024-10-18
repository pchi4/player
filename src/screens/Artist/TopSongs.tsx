import { ThemedText } from "@/src/components/ThemedText";
import { HStack, Image } from "@gluestack-ui/themed-native-base";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";

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
              style={{
                width: width / 1.3,
              }}
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

const styles = StyleSheet.create({
  titleAlbum: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  cardContainer: {
    paddingBottom: 14,
    paddingHorizontal: 10,
  },
  cardContent: {
    alignContent: "center",
    alignSelf: "center",
  },
});
