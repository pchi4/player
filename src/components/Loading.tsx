import { Center, Box, Spinner } from "@gluestack-ui/themed-native-base";
import { View } from "react-native";
import { Wave } from "react-native-animated-spinkit";

export const Loading = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Wave size={50} color="blue" />
    </View>
  );
};
