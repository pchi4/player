import React from "react";
import { View } from "react-native";
import {
  Box,
  Image,
  Text,
  VStack,
  Pressable,
} from "@gluestack-ui/themed-native-base";
import { PropsCardNewsReleases } from "../../types/NewRealeases/propsNewRealeases";
import { ThemedText } from "../ThemedText";

export const CardNewsReleases = ({
  items,
  navigation,
  handleClick,
  width,
  height,
}: PropsCardNewsReleases) => {
  return (
    <Box paddingRight="4">
      <Pressable onPress={handleClick}>
        <Box>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={width}
            height={height}
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
              items.artists[0].name}
          </ThemedText>
        </Box>
      </Pressable>
    </Box>
  );
};
