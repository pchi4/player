import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  headerimage: {
    width: width,
    height: width,
  },
  headerButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 1000,
  },
});
