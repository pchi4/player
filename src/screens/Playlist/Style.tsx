import React from "react";
import { StyleSheet, Dimensions, useColorScheme } from "react-native";

const { width } = Dimensions.get("screen");
// const colorScheme = useColorScheme();

export const styles = StyleSheet.create({
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
  cardTitle: {
    width: width / 1.3,
  },
});
