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

const { width, height } = Dimensions.get("screen");

export const CardLibrary = ({
  items,
  navigation,
  handleClick,
}: PropsCardPlaylist) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        alignContent: "center",
      }}
    >
      <TouchableOpacity onPress={handleClick}>
        <Box>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={width / 3.5}
            height={width / 3.5}
            rounded="6"
            source={{
              uri: items?.images[0]?.url,
            }}
          />
        </Box>
        <Box>
          <ThemedText
            type="subtitle"
            style={{ width: width / 4 }}
            numberOfLines={1}
          >
            {items.name}
          </ThemedText>

          <ThemedText
            type="default"
            style={{ width: width / 4 }}
            numberOfLines={1}
          >
            {items.type[0].toUpperCase() +
              items.type.slice(1) +
              " ° " +
              items?.owner?.display_name}
          </ThemedText>
        </Box>
      </TouchableOpacity>
    </View>
  );
};
