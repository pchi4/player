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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          <Image
            rounded="6"
            width={width / 1}
            height={height / 3}
            alt="person"
            source={require("../../assets/images/song.jpeg")}
          />
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
            onPress={async () => {
              try {
                await AsyncStorage.setItem(
                  "token",
                  "BQDEOi4fdMKXk62MLV_HSOtgBIAI7fRqDAEvoKVVG_ri-u2rBrauZ6tTOJWJsXtlItKiLaBU0WvGSl4Awyt1X2R00coWz-JGZM2TbnbLQ8hcFsZcSKlsIXo3Wo1SYxFvkk5ZNInMhiZ0eLUBvcAc87dXfsansBgT35YcW7fm9bjnGnHj90DvYmncCv-De8jotUb5Syq_8GG5mRqk5zYRaU_bR7bM6qoFHm0JVYQ6qg7emgg"
                );
                router.replace("/components");
              } catch (error) {}
            }}
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
