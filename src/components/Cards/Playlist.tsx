import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import {
  Box,
  Image,
  Text,
  VStack,
  Pressable,
} from "@gluestack-ui/themed-native-base";
import { PropsCardPlaylist } from "../../types/Playlist/propsCardPlaylist";
import { ThemedText } from "../ThemedText";

export const CardPlaylist = ({
  items,
  navigation,
  handleClick,
  Width,
  Height,
}: PropsCardPlaylist) => {
  return (
    <Box
      paddingBottom="4"
      justifyContent="center"
      alignItems="center"
      paddingX="2"
      paddingRight="4"
    >
      <TouchableOpacity onPress={handleClick}>
        <Box>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={Width}
            height={Height}
            rounded="6"
            source={{
              uri: items?.images[0]?.url,
            }}
          />
        </Box>
        <Box>
          <ThemedText type="subtitle" style={{ width: 200 }} numberOfLines={1}>
            {items.name}
          </ThemedText>

          <ThemedText type="default" style={{ width: 200 }} numberOfLines={1}>
            {items.type[0].toUpperCase() +
              items.type.slice(1) +
              " ° " +
              items?.owner?.display_name}
          </ThemedText>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
