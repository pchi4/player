import React from "react";
import {
  HStack,
  Box,
  Divider,
  Center,
  Image,
  Text,
} from "@gluestack-ui/themed-native-base";
import { TouchableOpacity } from "react-native";
import { CardType } from "../../types/Home/propsCardHome";
import { useStateValue } from "@/src/context/State";
import { router } from "expo-router";

export const CardHome = ({ navigation, items }: CardType) => {
  const [context, dispatch] = useStateValue().reducer;

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
            roundedBottomLeft="md"
            roundedTopLeft="md"
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
              style={{
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
          </Box>
          <Box
            h="100%"
            bg="dark.300"
            padding="2"
            roundedBottomRight="md"
            roundedTopRight="md"
            style={{
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              flex: 1.5,
            }}
          >
            <Center paddingTop="3" alignItems="start">
              <Text
                fontSize="sm"
                alignItems="center"
                fontWeight="bold"
                alignContent="center"
                color="lightBlue.100"
                isTruncated
                maxW="250"
              >
                {items.album.name}
              </Text>
            </Center>
          </Box>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};
