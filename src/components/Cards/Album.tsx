import React from "react";
import { View } from "react-native";
import {
  Box,
  Image,
  Text,
  VStack,
  Pressable,
} from "@gluestack-ui/themed-native-base";
import { ThemedText } from "../ThemedText";
import { PropsCardAlbum } from "../../types/Album/propsCardAlbum";

export const CardAlbum = ({
  items,
  handleClick,
  width,
  height,
}: PropsCardAlbum) => {
  return (
    <Box paddingRight="4" justifyContent="center" alignItems="center">
      <Box>
        <Image
          alt="Art work Album"
          resizeMode="cover"
          width={width}
          height={height}
          rounded="10"
          source={{
            uri: items?.album?.images[0].url,
          }}
        />
      </Box>
      <Box>
        <ThemedText>
          <Text fontSize="xl" fontWeight="bold" isTruncated width="200">
            {items.album?.name}
          </Text>
        </ThemedText>

        <ThemedText type="subtitle">
          <Text fontSize="md">
            {items.album?.type[0].toUpperCase() +
              items.album?.type.slice(1) +
              " ° " +
              items.album?.artists[0].name}
          </Text>
        </ThemedText>
      </Box>
    </Box>
  );
};
