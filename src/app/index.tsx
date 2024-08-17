import { ImageBackground } from "react-native";
import { Button, Box, Center } from "@gluestack-ui/themed-native-base";
import { useGetToken } from "@/src/hooks";
import { useEffect } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import { router, Stack } from "expo-router";
import React from "react";
import { useVerifyToken } from "@/src/hooks";

export default function Auth() {
  const { accessToken } = useGetToken();
  const { token } = useVerifyToken();

  useEffect(() => {
    if (token) {
      console.log({ token });
      router.replace("/(tabs)/components");
    }
  }, [token]);

  return (
    <Box style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../assets/images/login.jpeg")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Box style={{ flex: 2 }} padding="4">
          <Center marginTop="1/3"></Center>
        </Box>

        <Box style={{ flex: 1 }}>
          <Box padding="4">
            <ThemedText type="title">App Player Music</ThemedText>

            <ThemedText type="subtitle">
              Escute milhões de músicas e podcasts de graça! Basta utilizar a
              sua conta do Spotify
            </ThemedText>
          </Box>
          <Center>
            <Button
              width="90%"
              marginTop={["8", "12", "10"]}
              onPress={async () => {
                try {
                  await accessToken();
                } catch (error) {}
              }}
              bg="blue.500"
              borderRadius="xl"
            >
              Conectar com o Spotify
            </Button>
          </Center>
        </Box>
      </ImageBackground>
    </Box>
  );
}
