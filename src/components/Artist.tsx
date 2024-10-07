import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  Image,
} from "@gluestack-ui/themed-native-base";

import { useStateValue } from "../context/State";
import { useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

export const Artist = () => {
  const [context, dispatch] = useStateValue().reducer;
  const colorScheme = useColorScheme();

  const formatingFollowers = (follower: any) => {
    var followers = follower?.toFixed(3).split(".");
    followers[0] = followers[0]?.split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
  };

  return (
    <Box
      style={{ flex: 1, paddingHorizontal: 10 }}
      marginTop={["10%", "18%", "20%"]}
      paddingX="8"
      paddingBottom="4"
    >
      <Box>
        <Box
          rounded="lg"
          overflow="hidden"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 12}>
              <Image
                source={{
                  uri: context?.artist?.images[0].url,
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "md",
              }}
              position="absolute"
              top="0"
              px="3"
              py="1.5"
            >
              Sobre o artista
            </Center>
          </Box>
          <Stack p="4" space={3} maxHeight="40%" bg="gray.600">
            <Stack space={2}>
              <ThemedText
                type="title"
                style={{
                  color: colorScheme === "dark" ? "white" : "black",
                }}
              >
                {context?.artist?.name}
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{
                  color: colorScheme === "dark" ? "white" : "black",
                }}
              >
                {"Seguidores: " +
                  formatingFollowers(context?.artist?.followers?.total) ??
                  0 + " seguidores"}
              </ThemedText>
            </Stack>

            <Text
              fontWeight="200"
              style={{
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              Bengaluru (also called Bangalore) is the center of India's
              high-tech industry. The city is also known for its parks and
              nightlife.
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
