import React from "react";
import { View, useColorScheme } from "react-native";
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
import { colorScheme } from "@gluestack-ui/themed-native-base/build/utils/NBsupport";

export const CardAlbum = ({
  items,
  handleClick,
  width,
  height,
}: PropsCardAlbum) => {
  const [context, dispatch] = useStateValue().reducer;
  const colorScheme = useColorScheme();

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
            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            source={{
              uri: items?.album?.images[0].url,
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
            {items.album?.name}
          </ThemedText>

          <ThemedText type="default">{items.album?.artists[0].name}</ThemedText>
        </View>
      </Pressable>
    </Box>
  );
};
