import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export function ButtonRowBack() {
  return (
    <TouchableOpacity
      style={{ top: "10%", left: 10 }}
      onPress={() => router.back()}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: "gray",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: 1000,
        }}
      >
        <Feather name={"arrow-left"} size={40 % 100} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}
