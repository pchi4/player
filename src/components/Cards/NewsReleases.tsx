import React from "react";
import { View, useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme();
  return (
    <Box paddingRight="4">
      <Pressable onPress={handleClick}>
        <Box>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={width}
            height={height}
            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            source={{
              uri: items?.images[0]?.url,
            }}
          />
        </Box>
        <View
          style={{
            height: 80,
            backgroundColor: colorScheme === "dark" ? "#212224" : "#ffffff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 4,
          }}
        >
          <ThemedText type="subtitle" style={{ width: 200 }} numberOfLines={1}>
            {items.name}
          </ThemedText>

          <ThemedText type="default" style={{ width: 200 }} numberOfLines={1}>
            {items.artists[0].name}
          </ThemedText>
        </View>
      </Pressable>
    </Box>
  );
};
