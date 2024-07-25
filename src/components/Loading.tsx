import { Center, Box, Spinner } from "@gluestack-ui/themed-native-base";
import { Wave } from "react-native-animated-spinkit";

export const Loading = () => {
  return (
    <Center bg="rgb(24, 26, 27)">
      <Box padding="4/5">
        <Wave size={50} color="blue" />
      </Box>
    </Center>
  );
};
