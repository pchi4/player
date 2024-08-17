import React from "react";

import { Tabs } from "expo-router";

import { Feather } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Inicio",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Feather name="home" color={color} size={size} />;
            }

            return <Feather name="home" color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: "Biblioteca",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Feather name="menu" color={color} size={size} />;
            }

            return <Feather name="menu" color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}
