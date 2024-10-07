import React from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
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
  const colorScheme = useColorScheme();
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
            {items?.owner?.display_name}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Box>
  );
};
