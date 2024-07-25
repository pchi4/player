import { Wave } from "react-native-animated-spinkit";
import { View } from "react-native";

export default function Buffering() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Wave size={50} color="blue" />
    </View>
  );
}
