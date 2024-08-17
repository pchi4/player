import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    console.log({ refreshToken });

    const response = await axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.EXPO_PUBLIC_API_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_API_URL,
      }).toString(),
    });

    console.log({ response });

    return ({ access_token } = response.data);
  } catch (error) {
    console.log("error ao pegar o refresh token:", error);
  }
};
