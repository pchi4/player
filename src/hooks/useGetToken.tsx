import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateValue } from "@/src/context/State";
import apiInstance from "../services/api";
import { Platform } from "react-native";
import * as Liking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

export const useGetToken = () => {
  const [context, dispatch] = useStateValue().reducer;

  const redirectURL = Liking.createURL("auth/teste");

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  console.log(process.env.EXPO_PUBLIC_API_CLIENT_ID);

  const config = {
    clientId: process.env.EXPO_PUBLIC_API_CLIENT_ID,
    clientSecret: process.env.EXPO_PULIBC_API_CLIENT_SECRET,
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
    redirectUri: "exp://10.0.2.2:8081/--/spotify-auth-callback",
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
    try {
      let codeVerifer = generateCodeVerifier(128);
      const data = {
        grant_type: "authorization_code",
        code,
        redirect_uri: "exp://10.0.2.2:8081/--/spotify-auth-callback",
        client_id: process.env.EXPO_PUBLIC_API_CLIENT_ID,
        code_verifier: codeVerifer,
        client_secret: process.env.EXPO_PULIBC_API_CLIENT_SECRET,
      };

      const result = await apiInstance(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: new URLSearchParams(data).toString(),
        }
      );

      console.log({ result });

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
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const accessToken = async () => {
    try {
      const resultPromptAsync = await promptAsync({ showInRecents: true });
      await AsyncStorage.clear();

      await getToken(resultPromptAsync?.params?.code);

      // const resRequestAuth = await requestToken();

      // console.log(resRequestAuth?.data);

      // let resultBrowser = await Liking.openURL(resRequestAuth?.data.url);

      // const result = await apiInstance("http://10.42.0.204:4000/auth/token", {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // });

      // console.log(result.data);
      // console.log(resultBrowser);
    } catch (error) {
      // console.log(error);
    }
  };

  return {
    accessToken,
  };
};
