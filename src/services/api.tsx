import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRefreshToken } from "@/src/utils/getRefreshToken";

const apiInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "https://api.spotify.com/v1",
  withCredentials: true,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      originalRequest._retry = true;

      const { access_token } = await getRefreshToken();

      await AsyncStorage.setItem("token", access_token);
      apiInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return apiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
