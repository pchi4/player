import React from "react";
import {
  StatusBar,
  View,
  useColorScheme,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";

interface PropsHeader {
  imageProfile: string;
}

export function Header({ imageProfile }: PropsHeader): React.JSX.Element {
  const colorScheme = useColorScheme();
  var today = new Date();

  var hour = today.getHours();
  const message =
    "Good " +
    ((hour < 12 && "Morning") || (hour < 18 && "Afternoon") || "Evening");

  return (
    <View
      style={{
        // paddingTop: "15%",
        height: 90,
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colorScheme === "dark" ? "blue" : "gray",
        alignItems: "flex-end",
      }}
    >
      <ThemedText type="subtitle" style={{ paddingVertical: 8 }}>
        {message}
      </ThemedText>

      <TouchableOpacity onPress={() => router.push("/profile/[details]")}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={{ uri: imageProfile }}
        />
      </TouchableOpacity>
    </View>
  );
}
