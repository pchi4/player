import React from "react";
import { View } from "react-native";
import {
  Box,
  Image,
  Text,
  VStack,
  Pressable,
} from "@gluestack-ui/themed-native-base";
import { ThemedText } from "@/src/components/ThemedText";
import { PropsCardAlbum } from "../../types/Album/propsCardAlbum";
import { useStateValue } from "@/src/context/State";
import { router } from "expo-router";

export const CardAlbum = ({
  items,
  handleClick,
  width,
  height,
}: PropsCardAlbum) => {
  const [context, dispatch] = useStateValue().reducer;

  return (
    <Box paddingRight="4" justifyContent="center" alignItems="center">
      <Pressable
        onPress={() => {
          dispatch({
            type: "setAlbum",
            payload: {
              album: items,
            },
          });
          router.push("/album/[details]");
        }}
      >
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
          <ThemedText type="subtitle" style={{ width: 200 }} numberOfLines={1}>
            {items.album?.name}
          </ThemedText>

          <ThemedText type="default">
            {items.album?.type[0].toUpperCase() +
              items.album?.type.slice(1) +
              " ° " +
              items.album?.artists[0].name}
          </ThemedText>
        </Box>
      </Pressable>
    </Box>
  );
};
