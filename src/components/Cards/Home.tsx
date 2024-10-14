import React from "react";
import { HStack, Box, Center, Image } from "@gluestack-ui/themed-native-base";
import { TouchableOpacity, View, useColorScheme } from "react-native";
import { CardType } from "../../types/Home/propsCardHome";
import { useStateValue } from "@/src/context/State";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";

export const CardHome = ({ navigation, items }: CardType) => {
  const [context, dispatch] = useStateValue().reducer;
  const colorScheme = useColorScheme();

  return (
    <Box style={{ flex: 1 }} marginRight="2">
      <TouchableOpacity
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
        <HStack paddingBottom="4" alignItems="center" alignContent="center">
          <Box
            style={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              flex: 1,
            }}
          >
            <Image
              source={{ uri: items.album.images[0].url }}
              alt="ArtWork albuns"
              width="full"
              resizeMode="cover"
              size="sm"
              roundedTopLeft="md"
              roundedBottomLeft="md"
            />
          </Box>
          <Box
            h="100%"
            padding="2"
            style={{
              flex: 2,
              backgroundColor: colorScheme === "dark" ? "#2b3c43" : "white",
            }}
          >
            <Center paddingTop="3" alignItems="start">
              <ThemedText
                type="default"
                numberOfLines={1}
                style={{ fontWeight: "bold" }}
              >
                {items.album.name}
              </ThemedText>
            </Center>
          </Box>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};
