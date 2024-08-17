import axios from "axios";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateValue } from "@/src/context/State";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export const useGetToken = () => {
  const [context, dispatch] = useStateValue().reducer;

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const config = {
    clientId: process.env.EXPO_PUBLIC_API_CLIENT_ID,
    clientSecret: process.env.EXPO_PUBLIC_API_URL,
    scopes: [
      "user-read-email",
      "user-library-read",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
    ],
    usePKCE: false,
    redirectUri: makeRedirectUri({
      native: "myapp://",
      scheme: "myapp",
      path: "redirect-callback",
    }),
  };

  function generateCodeVerifier(length: number): string {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  const getToken = async (code: string) => {
    let codeVerifer = generateCodeVerifier(128);

    try {
      const result = await axios("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: makeRedirectUri({
            native: "myapp://",
            scheme: "myapp",
            path: "redirect-callback",
          }),
          client_id: process.env.EXPO_PUBLIC_API_CLIENT_ID,
          code_verifier: codeVerifer,
          client_secret: process.env.EXPO_PUBLIC_API_URL,
        }).toString(),
      });

      if (result.data && result.data.access_token) {
        await AsyncStorage.setItem("token", result.data.access_token);
        await AsyncStorage.setItem("refreshToken", result.data.refresh_token);
        dispatch({
          type: "setUser",
          payload: {
            user: {
              ...context.user,
              token: result.data.access_token,
            },
          },
        });
        router.push("/(auth)/components");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const accessToken = async () => {
    try {
      const resultPromptAsync = await promptAsync();
      await AsyncStorage.clear();
      await getToken(resultPromptAsync?.params?.code);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    accessToken,
  };
};
