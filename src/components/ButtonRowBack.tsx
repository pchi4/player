import React from "react";
import { TouchableOpacity, View, useColorScheme } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export function ButtonRowBack() {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={{}} onPress={() => router.back()}>
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: colorScheme === "dark" ? "orange" : "gray",
          borderRadius: 1000,
        }}
      >
        <Feather
          name={"arrow-left"}
          size={40 % 100}
          color={colorScheme === "dark" ? "blue" : "#FFFFFF"}
        />
      </View>
    </TouchableOpacity>
  );
}
