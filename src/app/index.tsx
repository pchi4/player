import { Dimensions } from "react-native";
import {
  useColorModeValue,
  Button,
  Box,
  Center,
  Container,
  Heading,
  Text,
  Image,
} from "@gluestack-ui/themed-native-base";
import { useGetToken } from "@/src/hooks";
const { width, height } = Dimensions.get("screen");
import { useEffect } from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import React from "react";

export default function Auth() {
  const { accessToken } = useGetToken();

  //   const { resquestPermissions } = useSetupPlayer({
  //     uri: null,
  //     isRandom: false,
  //   });

  //   useEffect(() => {
  //     resquestPermissions();
  //   }, []);

  return (
    <Box style={{ flex: 1 }}>
      <Box style={{ flex: 1.6 }} padding="4">
        <Center marginTop="1/3">
          {/* <Image
            rounded="6"
            width={width / 1}
            height={height / 3}
            alt="person"
            source={require("../../../assets/person.png")}
          /> */}
        </Center>
      </Box>

      <Box style={{ flex: 1 }}>
        <Box padding="4">
          <ThemedText type="title">App Player Music</ThemedText>

          <ThemedText type="subtitle">
            Escute milhões de músicas e podcasts de graça! Basta utilizar a sua
            conta do Spotify
          </ThemedText>
        </Box>
        <Center>
          <Button
            width="90%"
            marginTop={["8", "12", "10"]}
            onPress={() => accessToken}
            bg="blue.500"
            borderRadius="xl"
          >
            Conectar com o Spotify
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
