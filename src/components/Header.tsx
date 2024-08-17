import React from "react";
import { StatusBar, View, useColorScheme, Image } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";

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
        paddingTop: "15%",
        height: 110,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colorScheme === "dark" ? "blue" : "gray",
      }}
    >
      <ThemedText type="subtitle" style={{ paddingVertical: 8 }}>
        {message}
      </ThemedText>
      <Image
        style={{ width: 40, height: 40, borderRadius: 50 }}
        source={{ uri: imageProfile }}
      />
    </View>
  );
}
